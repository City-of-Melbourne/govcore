# Templates

https://trello.com/c/9VOPynpi/35-govcore-templates

- What are templates?
- Why do they exist?
- How to make it happen?

## What

My understanding is that `templates are documents` used to enforce the structure and validate data of documents.

    In SQL terms:         templates are database schemas
    In XML terms:         templates are XML schemas
    In Programming terms: templates are data classes, types, structs (definitions)

What we're trying to do make here is to make schemas independent of databases.

With the assumption that

> Assumption: Putting data schemas out of database makes the system more flexible

But how do schemas enforce and validate structure?

In a relational databases, the database engine _uses_ the schema to enforce and validate data which includes relationship data.

So lets clarify that enforcing structure is a different than validating data.

How are they different?

Maybe what they are is two different types of validation: Validation of the structure and validation of the contents of the data.

For example, to validate a structure we can say that a Document has a valid structure if it has such and such fields.

Let's try a more concrete example. A Person entity.

We previously defined the structure of a person like as a key/value pair document that has the keys:

        id:
        document_type:
        entity_type:
        name:

But we also had these constraints, or rather made these assumptions:

- Must have keys: `id`, `document_type`, `entity_type` and `name`
- `id` must be unique
- `document_type` must be Entity
- `entity_type` must be Person

We didn't specify constraints about the value of the `name` key.

So we could say that the main difference between `enforcing structure` and  `validating data` is that

`Enforcing structure` means making sure that the `keys` are present

and

`Validating data` menas making sure that the `values` conform to some rules.

Two questions are bugging me right now:

1. Is enforcing structure and validating data concerns of the template?
2. What about validating relationships?

I'm starting to think that the role of the template is the `specification` of a `document`


It provides:

- Rules about keys
- Rules about values
- Rules about relationships

So if the template provides the rules/constraints who does the actual validation?

Is that a concern of GovCore? do we need a validation engine?

Yes, because GovCore is concerned about data quality.

If we need a validation engine then do we make our own? do we use some sort of standard?

We can flip the question around and ask:

Should we provide it's our validation engine? or should we provide a mechanism to hook any validation engine?

Providing a mechanism for validation seems more flexible than having one way to validate things. However it could get real messy.

We could for instance provide a minimal interface to validate things like, setting validation engines within the template. For example in the case of the `id` we know that this key must be unique and that it must be unique within our database, so we could say validate the `id` using out `IdValidator` which knows how to ensure that an id complies with the systems rules.

Alright let's bring this back to earth. State your assumption and move forward.

> Assumption: The role of the template is to provide a specification of documents

Now how could we represent the documents we already have?

Person Template

    { 
        id: 87657654,
        type: "person"
        fields: {
            id: {
                type: "GovCoreId"
            },
            type: {
                type: "JSONString"
                value: "person"
            },
            name: {
                type: "JSONString"
            }
        }
    }

At the moment we've assuming that the validation of values happens within our system. Meaning if we say that a field has type of "GovCoreId" there would be some part of the system that would know how to validate/generate that. Another example is the JSONString. Because we're going to be sharing information with disparate systems we want to be able to say this is a String as stated by the JSON Standard. 

And we're also thinking about the option to validate/generate fields from API. Let's say if a person has an address we could model that like so:

    { 
        id: 74565234,
        type: "person"
        fields: {
            ...
            address: {
                type: {
                    name: "ComAddress",
                    API: "address.api.cityofmelbourne.gov.au/search"
                }
            }
        }
    }

With the idea that fields of entities could be validated by common apis. Similarly (or exactly) like `RDF` or `XML` schemas work, where within an element of the document there is a link to the specification of the document itself. In fact we could use these standards rather than inventing out own.

An example of how `HTML` (which is XML) does it:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                                                                            👆
                                                                      Specification URL

Of course we're making the huge assumption that these common apis would be available.

Ok, what would a `graph_edge` like:
    
    {"id":5627,"type":"business_person","a":10,"b":1},

Would look like?

    { 
        id: 12872967345,
        type: "business_person"
        .
    }

I just realised that the type of the template doesn't give us enough information to know that it is a graph edge. By looking the doc above, I can't tell:

- Is that a template?
- Is it a graph_edge?

It seems like we need something like a type/class/category hierarchy

To make the those facts obvious we could me more explicit about by including the whole lot in the type:

    type: "template.graph_edge.business_person"

By reading that I can tell that this thing is a:

- template
- graph_edge
- business_person

or

`template` for a `graph_edge` that represent the business_person `relationship`

or we could be more explicit on the type of document like so:


    {"id":5627,"type":"business_person_graph_edge","a":10,"b":1},

In either case the information needs to live somewhere and it needs to be explicit. So that external systems can make sense of it.

Ok I'm going to wrap this up now because I'm getting very creative and might be thinking of unreal scenarios.

Conclusion:

The real problem doesn't seems to be how to represent the templates. But instead, how to use them in the real world. And for that we need code and a real application like GovAuth.

So let's get cracking making something and come back to this later.
