require 'fdb'
require 'irb'

FDB.api_version 520

####################################
##        Initialization          ##
####################################

# Data model:
# ['attends', student, class] = ''
# ['class', class_name] = seats_left

@db = FDB.open

def add_class(db_or_tr, c)
  db_or_tr.transact do |tr|
    tr[FDB::Tuple.pack(['class',c])] = '100'
  end
end

# Generate 1,620 classes like '9:00 chem for dummies'
levels = ['intro', 'for dummies', 'remedial', '101', '201', '301', 'mastery', 'lab', 'seminar']
types = ['chem', 'bio', 'cs', 'geometry', 'calc', 'alg', 'film', 'music', 'art', 'dance']
times = Array(2...20).map {|h| h.to_s.encode('UTF-8') + ':00'}
class_combos = times.product(types, levels)
@class_names = class_combos.map {|combo| combo.join(' ')}

def init(db_or_tr)
  db_or_tr.transact do |tr|
    tr.clear_range_start_with(FDB::Tuple.pack(['attends']))
    tr.clear_range_start_with(FDB::Tuple.pack(['class']))
    @class_names.each do |class_name|
      add_class(tr, class_name)
    end
  end
end

def available_classes(db_or_tr)
  db_or_tr.transact do |tr|
    r = FDB::Tuple.range(['class'])
    tr.get_range(r[0], r[1]) {|kv| FDB::Tuple.unpack(kv.key)[1] if kv.value.to_i > 0}
  end
end

def list_classes(db)
  db.transact do |tr|
    r = FDB::Tuple.range(['class'])
    db.get_range(r[0], r[1]).map {|x| FDB::Tuple.unpack(x.key)}
  end
end


def signup(db_or_tr, s, c)
  db_or_tr.transact do |tr|
    rec = FDB::Tuple.pack(['attends', s, c])
    if not tr[rec].nil?
      return # already signed up
    end

    seats_left = tr[FDB::Tuple.pack(['class', c])].to_i
    if seats_left == 0
      raise 'No remaining seats'
    end

    r = FDB::Tuple.range(['attends', s])
    classes = tr.get_range(r[0], r[1])
    if classes.count == 5
      raise 'Too many classes'
    end

    tr[FDB::Tuple.pack(['class',c])] = (seats_left - 1).to_s.encode('UTF-8')
    tr[rec] = ''
  end
end

def drop(db_or_tr, s, c)
  db_or_tr.transact do |tr|
    rec = FDB::Tuple.pack(['attends', s, c])
    if tr[rec].nil?
      return  # not taking this class
    end
    class_key = FDB::Tuple.pack(['class',c])
    tr[class_key] = (tr[class_key].to_i + 1).to_s.encode('UTF-8')
    tr.clear(rec)
  end
end

def switch(db_or_tr, s, old_c, new_c)
  db_or_tr.transact do |tr|
    drop(tr, s, old_c)
    signup(tr, s, new_c)
  end
end

####################################
##           Testing              ##
####################################

def indecisive_student(i, ops)
  student_ID = "s%d" % i
  all_classes = @class_names
  my_classes = []

  Array(0...ops).each do |i|
    class_count = my_classes.length
    moods = []
    if class_count > 0
      moods.push('drop','switch')
    end
    if class_count < 5
      moods.push('add')
    end
    mood = moods.sample

    begin
      if all_classes.empty?
        all_classes = available_classes(@db)
      end
      if mood == 'add'
        c = all_classes.sample
        signup(@db, student_ID, c)
        my_classes.push(c)
      elsif mood == 'drop'
        c = my_classes.sample
        drop(@db, student_ID, c)
        my_classes.delete(c)
      elsif mood == 'switch'
        old_c = my_classes.sample
        new_c = all_classes.sample
        switch(@db, student_ID, old_c, new_c)
        my_classes.delete(old_c)
        my_classes.push(new_c)
      end
    rescue => e
      print e, "Need to recheck available classes."
      all_classes = []
    end
  end
end

def run(students, ops_per_student)
  threads = Array(0...students).map {|i| Thread.new(i, ops_per_student) {
    indecisive_student(i, ops_per_student)}
  }
  threads.each {|thr| thr.join}
  print "Ran %d transactions" % (students * ops_per_student)
end

# if __FILE__ == $0
#   init(@db)
#   print "initialized"
#   run(10, 10)
# end

init(@db)
list_classes(@db)