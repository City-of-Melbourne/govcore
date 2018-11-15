# GovCore dynamic templates

https://trello.com/c/7Af7Kfu6/55-govcore-dynamic-templates

At the moment our templates are hardcoded in code as graphql strings.

We need to extract these templates from the code and store them in the database.

So that they can be modified without changing code.

The ideal scenario would be that each templates is:

- Represented as JSON
- Independent (one template per entity)
- Stored in the database
- Loaded when they change

---

We're moving again from graphql to do this as we discovered that:

- Resolvers are written in code not pure JSON
- Not built in way to re-load templates when they change


## Resources

[Spec](https://json-schema.org/)

[Validation Gem](https://github.com/ruby-json-schema/json-schema)

[On line validator](https://www.jsonschemavalidator.net/)


# 2018-11-14

So the approach I'm trying now is to use the JSON-Schema format to validate our templates.

I found a ruby gem that does the validation

https://github.com/ruby-json-schema/json-schema

So let's start playing.

What are the entities we need to represent/validate?

Let's have a look at our graphql schema. So far we have:


        type BusinessService {
            id: ID!
            business: Business
            service: Service
            date:String
        }
        type BusinessPerson {
            id: ID!
            business: Business
            person: Person
            role: Role
            date: String
        }
        type BusinessPersonRequest {
            id: ID!
            business: Business
            person: Person
            role: Role
            date:String
        }
        type GraphEdge {
            id: ID!
            type: String
            a: String
            b: String
            date:String
        }
        type Person {
            id: ID,
            name:String
            email:String
            mobile:String
        }
        type Service {
            id: ID!
            name: String
            bucket: String
        }
        type Role {
            id: ID!
            name: String
            bucket: String
        }
        type Business {
            id: ID!
            name: String
            abn: String
            bucket: String
        }
        type Event {
            id: ID!,
            type: String
            name: String
            document_id: String
            date: String
        }
        type Idp {
            id: ID
            name: String
        }

Our fundamental types are:

     Person
     Business
     Service
     Role
     Idp
     GraphEdge

So let's start with those.

Even before we do that let's have a look at the whole thing:

    Client -> HTTP API -> GovCoreRules ->  GovCoreCRUD -> Bucket -> DB
                               👆
                           We are here

So we're starting from the assumption that the basic CRUD operations are done. And we're moving from the bottom up the stack.

Although we have a way to store documents in our system we don't yet have a way to store templates in a way that they can be used to validate document structure.

So we're doing two things at once here

1. Represent the templates/types we already have in JSON-Schema format
2. Provide a mechanism to validate the schema

Ok let's start with a simple case Person.

The current definition of a person looks like this:

    type Person {
        id: ID,
        name: String
        email: String
        mobile: String
    }

What would that look like as in JSON-Schema format?

    {
      "title": "Person",
      "description": "A person/customer as seen by CoM",
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "mobile": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name",
        "email"
      ]
    }

Slightly more verbose 😅 however it's single JSON file.

to validate a person using that schema using the `json-schema` gem we would do something like this

    JSON::Validator.validate(person_schema, person_instance)

Where

`person_schema` is a Hash representation of the schema JSON

`And the person` is a Hash representation of a person JSON

so to make this work we need to

- Convert `schema.json` to a Hash
- Convert `person.json` to a Hash
- Run JSON::Validator.validate(schema, instance)

I got that working.

It seems like the rest of our entities have only string fields so far so I'm confident we have enough to move to the next step.

What's the next step?

Wrap this with the API and the DB.