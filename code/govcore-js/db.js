const fs = require('fs');

// TODO handle errors {result: object, error: blah}

const GovCoreDB = function(dataFile) {
  // TODO Create dataFile if it doesn't exists.

  // TODO use uuid library
  const randomID = () => Array(10).fill().map(n => Math.floor(Math.random() * 10)).join('')

  // TODO const loadData =
  // TODO const saveData =

  const create = function(doc) {
    // TODO valdate doc is valid json
    // TODO valdate keys exist: bucket, type
    // Add a random id to the doc
    let id = randomID();

    // Add ID to doc
    doc = Object.assign({'id': id }, doc);

    // load data
    let data = JSON.parse(fs.readFileSync(dataFile));

    // update data
    data[id] = doc;
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return doc
  }

  const get = function(id) {
    // load data
    let data = JSON.parse(fs.readFileSync(dataFile));
    return data[id]
  }

  const update = function(doc) {
    let id = doc.id

    // load data
    let data = JSON.parse(fs.readFileSync(dataFile));
    let oldDoc = data[id];

    let updatedDoc = Object.assign(oldDoc, doc);

    // update data
    data[id] = updatedDoc;
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return updatedDoc
  }

  const _delete = function(id) {
    // load data
    let data = JSON.parse(fs.readFileSync(dataFile));
    let doc = data[id];
    delete data[id];
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return doc
  }

  const list = function(type) {
    // load data
    let data = JSON.parse(fs.readFileSync(dataFile));
    return Object.values(data).filter(x => x.type === type)
  }

  return {
    create: create,
    get:    get,
    list:   list,
    update: update,
    delete: _delete,
  }
}

module.exports = GovCoreDB;