const GovCoreDB = require('./db.js')

let data_file = 'data.json';

let db = GovCoreDB(data_file);

const puts = console.log;

puts('Create')
let createResult = db.create({
  bucket: 'entities',
  type: 'person',
  name: 'Pedro'
});

puts(createResult);

puts();
puts("Get")
puts(db.get(createResult.id));

puts();
puts("Update")
puts(db.update({id: createResult.id, name: 'Walter'}));

puts();
puts("List")
puts(db.list('person'));

puts();
puts("Delete")
puts(db.delete(createResult.id));

puts();
puts("List")
puts(db.list('person'));