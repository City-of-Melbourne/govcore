const GovCoreDB = require('./db.js')

let data_file = 'data.json';

let db = GovCoreDB(data_file);

console.log('Create')
let createResult = db.create({
  bucket: 'entities',
  type: 'person',
  name: 'Pedro'
});
console.log(createResult);

console.log()

console.log("Get")
let getResult = db.get(createResult._id);
console.log(getResult)

console.log()

console.log("List")
let listResult = db.list('person');
console.log(listResult)