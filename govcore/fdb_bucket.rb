require 'fdb'

class FDBBucket
  def self.db_open
    FDB.api_version 520
    FDB.open
  end

  attr_reader :db, :bucket

  def initialize(db, bucket)
    @db = db
    @bucket = bucket
  end

  def put(id, value)
    db.set(key_for(bucket, id), value)
  end

  def get(id)
    db.get(key_for(bucket, id))
  end

  def delete(id)
    db.clear(key_for(bucket, id))
  end

  def all
    db.get_range_start_with(key_for(bucket)).map(&:value)
  end

  def key_for(*parts)
    FDB::Tuple.pack(parts.compact.map { |s| s.to_s.encode('ASCII-8BIT') })
  end
end