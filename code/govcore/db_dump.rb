require 'json'
require './fdb_playground'
include FDBPLayground

values = db_open.get_range('', '\xFF').map { |kv| JSON.parse(kv.value) }

puts JSON.pretty_generate(values)
