$:.unshift(File.join(File.dirname(__FILE__), '../'))

require 'minitest/spec'
require 'minitest/autorun'
require './test/fdb_playground'
require './fdb_bucket'

include FDBPLayground

describe FDBBucket do
  before do
    @db = FDBBucket.db_open
    bucket_wipe(@db, 'test_events')
    bucket_wipe(@db, 'test_entities')
    bucket_wipe(@db, 'test_relationships')
  end

  it "Just works™" do
    [
      [FDBBucket.new(@db, 'test_events'),        ['this', 'then than', 'and lastly']],
      [FDBBucket.new(@db, 'test_entities'),    %w[Adam Maynard Justin Danny]],
      [FDBBucket.new(@db, 'test_relationships'), ['uno<->dos', 'uno<->tres', 'dos<->tres']],
    ].each do |bucket, things|

      # Test individual put get
      things.each_with_index do |thing, i|
        bucket.put(i, thing)
        assert_equal thing, bucket.get(i)
      end

      # Test all things went in
      assert_equal things.count, bucket.all.count

      # Delete a few random ids
      random_ids = (0...things.size).to_a.sample(rand(1...things.size))
      random_ids.each do |id|
        bucket.delete(id)
      end

      # Test it deleted things
      assert_equal (things.count - random_ids.count), bucket.all.count
    end
  end
end
