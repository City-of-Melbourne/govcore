const fs = require('fs');

const GovCoreDB = function(dataPath) {

  // Create dataFile if it doesn't exist
  if (!fs.existsSync(dataPath)) {
    console.log(`DB file doesn't exist. Creating one at ${dataPath}.`)
    fs.writeFileSync(dataPath, '{}', null, 2);
  }

  const loadData = () => JSON.parse(fs.readFileSync(dataPath));

  const saveData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  // TODO use uuid library
  const randomID = () => Array(10).fill().map(n => Math.floor(Math.random() * 10)).join('')

  const create = function(doc) {
    // TODO valdate doc is valid json
    // TODO valdate keys exist: bucket, type

    doc.id = randomID();

    let data = loadData();

    // update data
    data[doc.id] = doc;
    saveData(data);
    return doc;
  }

  const get = function(id) {
    let data = loadData();
    return data[id];
  }

  const update = function(doc) {
    let data = loadData();
    let oldDoc = data[doc.id];

    let updatedDoc = Object.assign(oldDoc, doc);

    // update data
    data[updatedDoc.id] = updatedDoc;
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