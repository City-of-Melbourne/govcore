require 'minitest/spec'
require 'minitest/autorun'
require './fdb_playground.rb'
require './fdb_bucket.rb'
require './store.rb'

include FDBPLayground

class Hash
  def normalize
    JSON.parse(JSON.dump(self))
  end
end

describe Store do
  before do
    db = FDBBucket.db_open
    bucket_wipe(db, 'test_doc')
    @bucket = FDBBucket.new(db, 'test_doc')
  end

  it "create" do
    person = { type: "person", name: "Person1" }.normalize
    subject, _ = Store.create(@bucket, person)
    assert_equal person['type'], subject['type']
    assert_equal person['name'], subject['name']
    assert subject['id']
  end

  it "get" do
    target, _  = Store.create(@bucket, { type: "person", name: "Person2" }.normalize)
    subject, _ = Store.get(@bucket, target['id'])
    assert_equal target, subject
  end
end