require 'json'
require 'json-schema'
require 'irb'

schema         = JSON.parse(File.read('person.schema.json'))
person_valid   = JSON.parse(File.read('person.instance.valid.json'))
person_invalid = JSON.parse(File.read('person.instance.invalid.json'))

puts JSON::Validator.validate(schema, person_valid)
puts JSON::Validator.validate(schema, person_invalid)
puts JSON::Validator.fully_validate(schema, person_invalid)