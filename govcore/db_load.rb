require './fdb_bucket'
require './store'
require './doc'
require 'json'

records = Doc.parse(File.read(ARGV.first))

bucket = FDBBucket.new(FDBBucket.db_open, 'docs')

records.each do |record|
  validate = 'templates' != record[:bucket]

  doc, errors = Store.create(bucket, record, validate: validate)

  if errors
    puts "ERROR: errors: #{errors}"
    puts "  record: #{record}"
  else
    puts "Created: #{doc}"
  end
end
