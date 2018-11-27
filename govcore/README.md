# GovCore

Simple GovCore implementation.

## Overview

This is a prototype implementation of a GovCore backend written in Ruby.

It uses:

- FoundationDB as data store
- JSON to represent and store documents
- JSON-Schema for templates and validation

And consist of 3 main parts:

- [API](api.rb): Simple Rest API
- [Store](store.rb): Library for basic CRUD operations on Documents
- [FDBBucket](fdb_bucket.rb): FoundationDB database adapter

## Dependencies

- Ruby
- Bundler
- FoundationDB

## Getting Started

1. Install dependencies (depends on system so google it 😊)

2. Install libraries

        $ bundle install

3. Run the test suite to ensure everything's 👌

        $ rake test

4. Load some data

        $ rake db_load[test/test_templates.json]

5. Run the api server

        $ ruby api.rb

6. Make a request

        curl localhost:4567

Bob's your uncle.


## REST API

The API provides basic CRUD operations on documents plus a very simple find function.

It's a JSON api so all operations either take or return JSON documents.

### GET /doc/:id

Get document by ID.

    params: id
    returns: JSON Document

### POST /doc

Create a document.

    params: none
    data: document in JSON format
    returns: JSON Document

### PUT /doc

Update a document.

    params: none
    data: document in JSON format
    returns: JSON Document

### DELETE /doc/:id

Delete a document.

    params: id
    returns: Nada

### GET /find/:props

Find documents by properties.

    params: JSON Properties (of documents)
    returns: List of Documents in JSON format


## Utility

There are a few tasks that can be run from the command like to do things like load, dump and wipe the database.

To get a list of available tasks run:

    rake -T

Enjoy!