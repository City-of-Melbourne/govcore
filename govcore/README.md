# GovCore

Simple GovCore implementation.

## Overview

TODO: What is this thing?

Consist mainly of 3 parts:

- [API](api.rb): Simple Rest API
- [Store](store.rb): Library for basic CRUD operations on Documents
- [FDBBucket](fdb_bucket.rb): Database adapter for FoundationDB database

## Dependencies

- Ruby
- Bundler
- FoundationDB

## Getting Started

1. Install dependencies (depends on system so google it 😊)

2. Install libraries

        $ bundle install

3. Run a test to ensure everything's 👌

        $ ruby store_test.rb

4. Load some data

        $ ruby db_load.rb ../govauth/seed_templates.json

5. Run the api server

        $ ruby api.rb

Bob's your uncle.
