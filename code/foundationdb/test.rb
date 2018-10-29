require 'fdb'
FDB.api_version 520
@db = FDB.open


@db['hello'] = 'world'
print 'hello ', @db['hello']