const fs = require('fs');

const GovCoreDB = function(dataFile) {
  // TODO use uuid library
  const randomID = () => Array(10).fill().map(n => Math.floor(Math.random() * 10)).join('')
  
  const _create = function(doc) {
    doc = JSON.parse(JSON.stringify(doc));
    
    // TODO keys exist: bucket, type
    
    // Add a random id to the doc
    let id = randomID();
    
    // Add ID to doc
    doc = Object.assign({'_id': id }, doc);
    
    // load data
    let data = JSON.parse(fs.readFileSync(dataFile));
    
    data[id] = doc;
    
    // update data
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    return doc
  }
  
  const _get = function(id) {
    // load data
    let data = JSON.parse(fs.readFileSync(dataFile));
    return data[id]
  }
  
  const _list = function(type) {
    // load data
    let data = JSON.parse(fs.readFileSync(dataFile));
    return Object.values(data).filter(x => x.type === type)
  }

  return {
    create: _create,
    get:    _get,
    list:   _list
    // delete: _delete,
  }
}

module.exports = GovCoreDB;