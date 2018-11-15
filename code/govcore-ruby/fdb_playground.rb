require 'fdb'

module FDBPLayground
  def db_open
    FDB.api_version 520
    FDB.open
  end

  def db_wipe(db, bucket=nil)
    db.clear_range('', '\xFF')
  end

  def db_dump(db)
    db.get_range('', '\xFF').map do |kv|
      puts [unpack(kv.key).to_s, kv.value].join(":")
    end
    nil
  end

  def bucket_wipe(db, bucket)
    db.clear_range_start_with(pack([bucket.encode('ASCII-8BIT')]))
  end

  def pack(array)
    FDB::Tuple.pack(array)
  end

  def unpack(string)
    FDB::Tuple.unpack(string)
  end
end

if __FILE__ == $0
  require './fdb_bucket'
  require './store'
  require 'irb'

  include FDBPLayground
  db = db_open

  bucket = FDBBucket.new(db, 'docs')
  binding.irb
end