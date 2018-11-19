require_relative 'fdb_playground'
include FDBPLayground

puts db_dump(db_open)