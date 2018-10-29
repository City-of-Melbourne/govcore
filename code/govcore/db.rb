require 'fdb'
require 'json'
require 'securerandom'
require 'irb'

module FDBPLayground
  def db_open
    FDB.api_version 520
    FDB.open
  end

  def db_wipe(db)
    db.transact do |c|
      # Hack. How do can we know the value of the last key?
      db.clear_range('', 'z'*10000)
    end
  end

  def db_dump(db)
    db.get_range('', 'z'*10000)
  end

  def pack(array)
    FDB::Tuple.pack(array)
  end

  def unpack(string)
    FDB::Tuple.unpack(string)
  end
end

class FDBBucket
  class << self
    def put(db, bucket, id, value)
      db.set(key_for(bucket, id), value)
    end

    def get(db, bucket, id)
      db.get(key_for(bucket, id))
    end

    def delete(db, bucket, id)
      db.clear(key_for(bucket, id))
    end

    def all(db, bucket)
      db.get_range_start_with(key_for(bucket))
    end

    def key_for(bucket, id=nil)
      parts = [bucket, id].compact.map { |s| s.to_s.encode('ASCII-8BIT') }
      FDB::Tuple.pack(parts)
    end
  end

  attr_reader :db, :bucket

  def initialize(db, bucket)
    @db = db
    @bucket = bucket
  end

  def put(id, value)
    self.class.put(@db, @bucket, id, value)
  end

  def get(id)
    self.class.get(@db, @bucket, id)
  end

  def delete(id)
    self.class.delete(@db, @bucket, id)
  end

  def all
    self.class.all(@db, @bucket)
  end
end

class GovCoreDB
  class << self
    def create(bucket, doc)
      # Generate id
      doc['_id'] = random_id
      doc['_created_at'] = Time.now.to_s

      # TODO handle error
      unserialise(bucket.put(doc['_id'], serialise(doc)))
    end

    def get(bucket, id)
      unserialise(bucket.get(id))
    end

    def update(bucket, doc)
      # TODO
    end

    private
    def serialise(doc)
      JSON.generate(doc)
    end

    def unserialise(doc)
      JSON.parse(doc)
    end

    def random_id
      # This must be uniq
      SecureRandom.hex
    end
  end
end

############### TEST ###############

include FDBPLayground
require 'minitest/spec'
require 'minitest/autorun'

class Hash
  def as_doc
    JSON.parse(JSON.generate(self))
  end
end

describe FDBBucket do
  before do
    @db = db_open
    db_wipe(@db)
  end

  it "Just works™" do
    [
      [FDBBucket.new(@db, 'events'),        ['this', 'then than', 'and lastly']],
      [FDBBucket.new(@db, 'entities'),    %w[Adam Maynard Justin Danny]],
      [FDBBucket.new(@db, 'relationships'), ['uno<->dos', 'uno<->tres', 'dos<->tres']],
    ].each do |bucket, things|

      # Test individual put get
      things.each_with_index do |thing, i|
        bucket.put(i, thing)
        assert_equal thing, bucket.get(i)
      end

      # Test all things went in
      assert_equal things.count, bucket.all.count

      # Delete a few random ids
      random_ids = (0...things.size).to_a.shuffle.first(rand(0...things.size))
      random_ids.each do |id|
        bucket.delete(id)
      end

      # Test it deleted things
      assert_equal (things.count - random_ids.count), bucket.all.count
    end
  end
end

describe GovCoreDB do
  before do
    @db = db_open
    db_wipe(@db)
    @entities = FDBBucket.new(@db, 'entities')
  end

  it "create" do
    person = { type: "person", name: "Person1" }.as_doc
    subject = GovCoreDB.create(@entities, person)
    assert_equal person['type'], subject['type']
    assert_equal person['name'], subject['name']
    assert subject['_id']
    assert subject['_created_at']
  end

  it "get" do
    target  = GovCoreDB.create(@entities, { type: "person", name: "Person2" }.as_doc)
    subject = GovCoreDB.get(@entities, target['_id'])
    assert_equal target, subject
  end
end

# binding.irb