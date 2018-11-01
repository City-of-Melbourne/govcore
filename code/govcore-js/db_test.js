const fs = require('fs');

const GovCoreDB = require('./db.js')

let dataPath = 'test_data.json';

fs.writeFileSync(dataPath, '{}', null, 2);

let db = GovCoreDB(dataPath);

const puts = console.log;

puts('Create')
let createResult = db.create({bucket: 'entities', type: 'person', name: 'Pedro'})
puts(createResult)

puts()
puts('Create with id')
puts(db.create({id: '', bucket: 'entities', type: 'person', name: 'Ideal'}))

puts()
puts("Get")
puts(db.get(createResult.id))

puts()
puts("Update")
puts(db.update({id: createResult.id, name: 'Walter'}))

puts()
puts("Find")
puts(db.find({type: 'person'}))

puts()
puts("Delete")
puts(db.delete(createResult.id))

puts()
puts("Find")
puts(db.find({type: 'person'}))