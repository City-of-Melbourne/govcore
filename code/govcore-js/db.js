const fs = require('fs');

// TODO handle errors {result: object, error: blah}

const GovCoreDB = function(dataFile) {
  // TODO Create dataFile if it doesn't exists.
  const loadData = () => JSON.parse(fs.readFileSync(dataFile));
  const saveData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  // TODO use uuid library
  const randomID = () => Array(10).fill().map(n => Math.floor(Math.random() * 10)).join('')

  const create = function(doc) {
    // TODO valdate doc is valid json
    // TODO valdate keys exist: bucket, type
    let id = randomID();

    // Add ID to doc
    doc = Object.assign({'id': id }, doc);

    let data = loadData();

    // update data
    data[id] = doc;
    saveData(data);
    return doc;
  }

  const get = function(id) {
    let data = loadData();
    return data[id];
  }

  const update = function(doc) {
    let id = doc.id

    let data = loadData();
    let oldDoc = data[id];

    let updatedDoc = Object.assign(oldDoc, doc);

    // update data
    data[id] = updatedDoc;
    saveData(data);
    return updatedDoc;
  }

  const _delete = function(id) {
    let data = loadData();
    let doc = data[id];
    delete data[id];
    saveData(data);
    return doc
  }

  const list = function(type) {
    return Object.values(loadData()).filter(x => x.type === type)
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