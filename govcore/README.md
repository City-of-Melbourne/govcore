# GovCore

Simple GovCore implementation.

## Overview

TODO: What is this thing?

Consist mainly of 3 parts:

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

        $ rake db_load[../govauth/seed_templates.json]

5. Run the api server

        $ ruby api.rb

6. Make a request

        curl localhost:4567

Bob's your uncle.
