$:.unshift(File.join(File.dirname(__FILE__), '../'))

require 'minitest/spec'
require 'minitest/autorun'
require './fdb_playground'
require './fdb_bucket'
require './store'
require './doc'

include FDBPLayground

class Hash
  def normalize
    Doc.parse(Doc.dump(self))
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
    person = { bucket: 'entities', type: "person", name: "p1", email: "p1@test.io" }
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
    assert_equal 1, errors.count
    assert_match /not contain a required property of 'bucket'/, errors.join
  end

  it "get" do
    person = { bucket: 'entities', type: "person", name: "p1", email: "p1@test.io"}
    target, _  = Store.create(@bucket, person)
    subject, _ = Store.get(@bucket, target[:id])
    assert_equal target, subject
  end

  it "update" do
    person = { bucket: 'entities', type: "person", name: "p1", email: "p1@test.io"}
    original, _ = Store.create(@bucket, person)

    Store.update(@bucket, original.merge(name: "Larry"))

    subject, _ = Store.get(@bucket, original[:id])

    assert_equal "Larry", subject[:name]
  end

  it "events" do
    events_before = Store.find(@bucket, { bucket: 'events' })

    doc, errors = Store.create(@bucket, { bucket: 'entities', type: "business", name: "Frank's Cafe" })

    assert doc

    # Create
    assert_nil events_before.find { |event| doc[:id] == event[:doc_id] }
    assert_equal 1, Store.find(@bucket, { name: 'document_created', doc_id: doc[:id] }).size

    # Update
    assert_equal 0, Store.find(@bucket, { name: 'document_updated', doc_id: doc[:id] }).size
    Store.update(@bucket, doc.merge(name: "Caña de Melbourne"))
    assert_equal 1, Store.find(@bucket, { name: 'document_updated', doc_id: doc[:id] }).size

    # Delete
    assert_equal 0, Store.find(@bucket, { name: 'document_deleted', doc_id: doc[:id] }).size
    Store.delete(@bucket, doc[:id])
    assert_equal 1, Store.find(@bucket, { name: 'document_deleted', doc_id: doc[:id] }).size
  end
end

def load_fixtures
  records = Doc.parse(File.read('test/test_templates.json'))

  bucket = FDBBucket.new(FDBBucket.db_open, 'test')

  records.each do |record|
    doc, errors = Store.create(bucket, record, validate: false)
    if errors
      raise "Couldn't create record #{record}: #{error}" if errors
      exit
    end
  end
end
