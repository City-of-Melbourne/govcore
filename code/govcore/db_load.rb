require './fdb_bucket'
require './store'
require 'json'

records = JSON.parse(File.read(ARGV.first))

bucket = FDBBucket.new(FDBBucket.db_open, 'docs')

records.each do |record|
  response = Store.create(bucket, record)
  puts "Created: #{response}"
end
