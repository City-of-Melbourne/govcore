require 'minitest/spec'
require 'minitest/autorun'
require './fdb_playground'
require './fdb_bucket'
require './store'

include FDBPLayground

class Hash
  def normalize
    JSON.parse(JSON.dump(self))
  end
end

describe Store do
  before do
    db = FDBBucket.db_open
    bucket_wipe(db, 'test')
    @bucket = FDBBucket.new(db, 'test')
    load_fixtures
  end

  it "create" do
    person = { bucket: 'entities', type: "person", name: "p1", email: "p1@test.io"}
    subject, errors = Store.create(@bucket, person)

    assert_nil errors
    assert subject[:id]

    subject.delete(:id)

    assert_equal person, subject
  end

  it "create validation" do
    subject, errors = Store.create(@bucket, {})

    assert_nil subject
    assert_equal 1, errors.count
    assert_match /No template found/, errors.first

    subject, errors = Store.create(@bucket, { type: 'person' })
    assert_equal 3, errors.count
    assert_match /not contain a required property of 'name'/, errors.join
    assert_match /not contain a required property of 'email'/, errors.join
    assert_match /not contain a required property of 'bucket'/, errors.join
  end

  it "get" do
    person = { bucket: 'entities', type: "person", name: "p1", email: "p1@test.io"}
    target, _  = Store.create(@bucket, person)
    subject, _ = Store.get(@bucket, target[:id])
    assert_equal target, subject
  end
end

def load_fixtures
  records = JSON.parse(File.read('./test_templates.json'))

  bucket = FDBBucket.new(FDBBucket.db_open, 'test')

  records.each do |record|
    response = Store.create(bucket, record, validate: false)
  end
end