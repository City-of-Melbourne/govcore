/*!
 * GovCore Javascript Version
 * Copyright(c) 2018-2020 Code For Australia
 * MIT Licensed
 */

'use strict';

// if we wanna use structured folders and module structure such as graphql does -- check BuildSchema 

// Object.defineProperty(exports, "buildSchema", {
//   enumerable: true,
//   get: function get() {
//     return _utilities.buildSchema;
//   }
// });

Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function get() {

    return create;
    //return _utilities.buildSchema;
  }
});



/**
 * Module exports.
 * @public
 */

//exports.create = create;

/**
 * Module variables.
 * @private
 */

function create() {

  return {id:1,name:'GovCoreModule'};

}
