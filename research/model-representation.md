# Represent Model in JSON

https://trello.com/c/OLv4F5aI/31-govcore-represent-model-in-json

More specifically

## Entities

- Person (a.k.a People, User)
- Service
- Business
- IdentityProvider
- ServiceAccessLevel

## Relationships (GraphEdge)

- Person <-> Service
- Person <-> Business (employee/employer)
- Person <-> IdentityProvider
- Person <-> ServiceAccessLevel
- Service <-> Business
- Service <-> IdentityProvider
- Service <-> ServiceAccessLevel
- Business <-> IdentityProvider
- Business <-> ServiceAccessLevel
- IdentityProvider <-> ServiceAccessLevel

## Events (LogEntry)

Events that we ware about

## The whole lot

Put everything together

---

2018-10-10

We've agreed that we're going to be representing everything as a Document (key/value pairs).

A key value pair can be a Hash, Map, AssociativeArray, JSON Object, Tree...

The key/value pair DataStructure is the most important concept. We call this the Document.

JSON is just a convenient way to represent/serialise data.

We're going to start with JSON because it seems like the obvious choice, however GovCore should work regardless of the serialisation format.

> Assumption: GovCore is agnostic of serialisation formats.

We've modeled the system so far using a few `document types`:

- Template
- Document
- GraphEdge
- Event

What does the minimal document looks like?

Let's start with the Template, because we need the template to create a new doc

    Template(id, type...)

## Entities

Wait, let's start with a concrete example. So far we've identified these things:

- Person
- Service
- Business
- IdentityProvider
- ServiceAccessLevel

What are the attributes of a Person?

A Person and as all identities have an uniq `id` so that we can refer them to.

> Assumption: Documents have an unique id

We don't know the shape of the id yet. But lets assume for now that they are numbers

> Assumption: document ids are numbers

A Person should have a `name`. Because people have names like "Marcus Aurelius" so that they turn around when we call them.

Also a Person should have a `type` so that we can tell that a document contains the main information about them. The person `type` should exist somewhere before we can create a Person.

Why?

So that we can keep track of the kinds of things that are in our system. For example, a library can contain different types of objects: Books, CDs,  DVDs, NewsPapers...So when we do a search in a library website the search result should tell us thing this is a book and that thing is a CD from the same author.

Can a document be more than one kind?

Dunno. Let's see. Could a Person be:

a Service? No

a Business? No. it is part of a Business

a IdentityProvider? No.

a ServiceAccessLevel? no

It doesn't look like in our case a thing could be another thing. So let's assume that things can only be themselves.

> Assumption: Documents have only one type

What else should a person have?

Not sure yet, so let's go with what we have. if a person needed an `id`, `type` and `name` it could look like this in JSON:

    {
      id: 1,
      type: person
      name: "Frank Pecorino"
    }

Aright that's looking nice and simple.

Let's do another example: Business.

We know that to all documents have at least an `id` and a `type` so if we were to create a Business we would start with the `basic structure`:

    {
      id: 2
      type: Business
    }

Cool. That else makes a Business a Business? Businesses have a `name` they also have an `abn`...

    {
      id: 2
      type: "Business"
      name: "Frank's Cafe"
      abn: 123456789
    }

We also know that a Businesses have `employees`.

Employees are usually People. Businesses hire Robots too but robots are not accountable anything yet. So let's focus on People. So a Businesses have Employees which are People which we also refer to as Person.

How can we tell who is an employee of a business? Let's say that `Frank's Cafe` has two employees, `Frank` And `Elena`. Our world looks like this:

    {
      id: 1
      type: person
      name: "Frank Pecorino"
    }

    {
      id: 3
      type: person
      name: "Elena Pecorino"
    }

    {
      id: 2
      type: "Business"
      name: "Frank's Cafe"
      abn: 123456789
    }


How do we make `Frank` and `Elena` employees of `Frank's Cafe`

We could reference of the business on each person and a reference of the employees on the business:


    {
      id: 1
      type: person
      name: "Frank Pecorino"
      employee_of: [2]
    }

    {
      id: 3
      type: person
      name: "Elena Pecorino"
      employee_of: [2]
    }

    {
      id: 2
      type: "Business"
      name: "Frank's Cafe"
      abn: 123456789
      employees: [1, 3]
    }

or embed the whole thing on each side:

    {
      id: 1
      type: person
      name: "Frank Pecorino"
      employee_of: [{
        id: 2
        type: "Business"
        name: "Frank's Cafe"
        abn: 123456789
        employees: [1, 3] <- redundant
      }]
    }

    {
      id: 3
      type: person
      name: "Elena Pecorino"
      employee_of: [{
        id: 2
        type: "Business"
        name: "Frank's Cafe"
        abn: 123456789
        employees: [1, 3] <- redundant
      }]
    }

    {
      id: 2
      type: "Business"
      name: "Frank's Cafe"
      abn: 123456789
      employees: [{
        id: 1
        type: person
        name: "Frank Pecorino"
        employee_of: [2]
      }, {
        id: 3
        type: person
        name: "Elena Pecorino"
        employee_of: [2]
      }]
    }

Things are getting messy.

What do we care about?

From the GovCore doc:

> Document: Unlimited flexibility

> Graph: Unlimited relationships

So if we want to to have many relationships. But putting the relationship information on the entity itself seems like a bad idea.

Why?

Because as the relationships grow, the size of entities grows to the power of n relationships. Or something like that.

What does that even mean?

It means that size of the entity grows like crazy because for each connection between two entity types you need to store information on both sides.

Notation:

    b = business
    e = employee
    s = service
    n = number of docuements to make a bidirectinal connection

On a senario like this:

    to connect b1 with e1 e2        n = 4
    to connect b2 with e3 e4 e5     n = 8
    to connect b3 with e6 e7 e8 e9  n = 10

    total n = 22

Actually, this statement:

    to connect b1 with e1 e2  n = 4

Is wrong.

Why?

Because storing the information so that:

    b1 references e1 e2
    e1 references b1
    e1 references b1

Would mean that:

    to connect b1 with e1 e2  n = 3

So, actually is not a question of the number of connections growing, this will happen no matter what. Is more about where do you put the information about the connection. Does the connection information belong to the entity?

Intuition says no. I'm not entirely sure why but a feel unnatural to put it in the entity. Let's go with gut feeling for now.

> Assumption: Putting relationship data out of entities makes querying easier.

So another argument is that it could be easy to update relationships if they were outsite.

For example if there is a business connected to a service and to people. And you want to disconnect them. You would have to remove the connection data from in three places: service, business and people. Where as if you have the connection information in a different place like graph `edge` you would need to remove info from at most two things `service <-> business` and `service <-> people` but depending on how you structure the graph it could be from a single place/edge.

Sounds good. So lets figure out how to put relationships out of entities in a `graph_edge`.

2018-10-11

## Relationships


    Notation:
    <-> = are connected/related

On a scenario like this:

     b1 <-> e1 e2
     b2 <-> e3 e4 e5
     b3 <-> e6 e7 e8 e9
     s1 <-> b1 b2
     s2 <-> b1 b2 b3
     s1 <-> e1 e2 e3 e4 e5
     s2 <-> e1 e2 e3 e4 e5 e6 e7 e8 e9

Would yield these individual connections:

    b1 <-> e1
    b1 <-> e2
    b2 <-> e3
    b2 <-> e4
    b2 <-> e5
    b3 <-> e6
    b3 <-> e7
    b3 <-> e8
    b3 <-> e9
    s1 <-> b1
    s1 <-> b2
    s2 <-> b1
    s2 <-> b2
    s2 <-> b3
    s1 <-> e1
    s1 <-> e2
    s1 <-> e3
    s1 <-> e4
    s1 <-> e5
    s2 <-> e1
    s2 <-> e2
    s2 <-> e3
    s2 <-> e4
    s2 <-> e5
    s2 <-> e6
    s2 <-> e7
    s2 <-> e8
    s2 <-> e9

What's a benefit of doing it like this?

That if we want to add/remove/update a connection between two entities we just need a single `edge` in the graph.

> Assumption: Putting relationship data out of entities management easier

And how could we represet a single `edge` like `b1 <-> e1`?

We start with the premise that everything in our system is represented as a document.

    {
      id: 4
      type: graph_edge
    }

This gives us enough information to tell what kind of thing this document is.

Now what else do we need to actually represent a connection between b1 and e1 or more concretely how do we represent the fact that `Frank's Cafe` employs `Frank` and `Elena`. Here are the entities again:

    {
      id: 1
      type: person
      name: Frank Pecorino
    }

    {
      id: 3
      type: person
      name: Elena Pecorino
    }

    {
      id: 2
      type: Business
      name: Frank's Cafe
    }

To make this connections we need two edges, one to say that Frank works at Frank's Cafe

    {
      id: 4
      type: graph_edge
      a: 2 (Frank's Cafe)
      b: 1 (Frank)
    }

And another one to say that Elena works at Frank's Cafe

    {
      id: 5
      type: graph_edge
      a: 2 (Frank's Cafe)
      b: 3 (Frank)
    }

I'm noticing there's a couple of things that need attention:

1. The type attribute is mixing two different things: entity types like Business, Person with document types like entity and graph_node

2. Do we need be more specific about the type of edge? like this business_employee

Let's address point 1

I can think of two ways to clarify this. But first lets start with facts and assumptions:

> Fact: GovCore stores its data in buckets (Documents, Graph, Log)

> Assumption: data Buckets are logical not physical therefore how they are stored is irrelevant

> Assumption: GovCore is agnostic of databases

Keep the structure flat by adding a `document_type` and an `entity_type` to the document itself like so:

    { id: 1, document_type: entity, entity_type: person, name: Frank Pecorino }
    { id: 3, document_type: entity, entity_type: person, name: Elena Pecorino }
    { id: 2, document_type: entity, entity_type: business, name: Frank's Cafe }
    { id: 4, document_type: graph_edge, from: 2, to: 1 }
    { id: 5, document_type: graph_edge, from: 2, to: 3 }

alternatively, we could represent buckets as keys like so:

    entities: [
        { id: 1, type: "person",   name: "Frank Pecorino" },
        { id: 3, type: "person",   name: "Elena Pecorino" },
        { id: 2, type: "business", name: "Frank's Cafe"   }
    }],
    graph_edges: [
        { id: 4, a: 2, b: 1 },
        { id: 5, a: 2, b: 3 }
    }]

or keep each `bucket` in a separate file or a separate database.

The flat option seems more flexible, because it's literally a single key/value store. Almost like a big array where the index is the id. It could work very well in single-column databases. It could potentially be more painful to manage.

On the other hand the more structured version makes the buckets more visible and slightly smaller because we don't need to add the extra `document_type` key to each record.

Let's go with the structured approach for now.

Do we have enough information to go from business to person and from person to business?

In theory yes, however I just noticed that graph edges don't include the entity type only the id. To get an entity from its id we would need to know in which bucket to look or look on all buckets. That doesn't seem idea.

Why?

Because we need to look in different places for different things.

So what? Are we concerned about efficiency?

Not at this stage.

So what't the problem then? what's important now?

Simplicity.

Wait, let me think about this...if documents have uniq ids this is not a big deal. Search here, search there done.

But we have different buckets, a natural thing to do would be to have uniq ids within buckets.

Why?

Because that's how SQL databases usually do it.

But we don't care about SQL. So forget about that. The sky is the limit. What do you desire?

Ok, let's talk code. What would a `find` function would look like on each scenario?

Assuming our db is a big hash...

With the flat structure it would look something like:

    def find
      db[id]
    end

and with the other more structured structure:

    def find
      db.entities[id] || db.graph_edges[id] || db.log[id]
    end

But do we need to search on `graph_edges`, yes because the find should be available for anything.

This seems to complicates things. But it is too soon to optimize so. Lets carry on.

Let's address point 2

> Do we need be more specific about the type of edge? like `business_employee`

Let's see. If we had only one type of relationship like `business <-> person` probably not. However, is we had many different relationships which we do:

- Person <-> Service
- Person <-> Business
- Person <-> IdentityProvider
- Person <-> ServiceAccessLevel
- Service <-> Business
- Service <-> IdentityProvider
- Service <-> ServiceAccessLevel
- Business <-> IdentityProvider
- Business <-> ServiceAccessLevel
- IdentityProvider <-> ServiceAccessLevel

Probably yes.

But why?

Let's see...we already have `Person <-> Business`

    entities: [
        { id: 1, type: "person",   name: "Frank Pecorino" },
        { id: 3, type: "person",   name: "Elena Pecorino" },
        { id: 2, type: "business", name: "Frank's Cafe"   }
    }],
    graph_edges: [
        { id: 4, a: 2, b: 1 },
        { id: 5, a: 2, b: 3 }
    ]

So let's add `Service <-> Business`

The entity:

    { id: 6, type: "Service", name: "Cafe Permits" }

Then the graph_edge:

    { id: 7, a: 6, b: 2 }

The whole thing now looks like this:

    entities: [
        { id: 1, type: "person",   name: "Frank Pecorino" },
        { id: 3, type: "person",   name: "Elena Pecorino" },
        { id: 2, type: "business", name: "Frank's Cafe"   },
        { id: 6, type: "service",  name: "Cafe Permits"   }
    }],
    graph_edges: [
        { id: 4, a: 2, b: 1 },
        { id: 5, a: 2, b: 3 },
        { id: 7, a: 6, b: 2 }
    }]

From this, can we tell the difference between `Person <-> Business` and `Service <-> Business` we could if we get the entities then figure out what they are then infer it. But that seems too complicated.

Let's make the meaning of the connection explicit.

How?

By adding a `type` maybe.

    entities: [
        { id: 1, type: "person",   name: "Frank Pecorino" },
        { id: 3, type: "person",   name: "Elena Pecorino" },
        { id: 2, type: "business", name: "Frank's Cafe"   },
        { id: 6, type: "service",  name: "Cafe Permits"   }
    }],
    graph_edges: [
        { id: 4, type: "business_employee", a: 2, b: 1 },
        { id: 5, type: "business_employee", a: 2, b: 3 },
        { id: 7, type: "service_business",  a: 6, b: 2 }
    }]

`graph_edges` could have other attributes like `timestamps` or anything related to the connection relationship itself but at least it should have a type.

Looks good to me. Let's move on.

Let's represent this whole scenario:

    b1 <-> e1 e2
    b2 <-> e3 e4 e5
    b3 <-> e6 e7 e8 e9
    s1 <-> b1 b2
    s2 <-> b1 b2 b3
    s1 <-> e1 e2 e3 e4 e5
    s2 <-> e1 e2 e3 e4 e5 e6 e7 e8 e9


2018-10-12


That would look something like this:

     {
         entities: [
             { id: 1,  type: "person",   name: "Person1"  },
             { id: 2,  type: "person",   name: "Person2"  },
             { id: 3,  type: "person",   name: "Person3"  },
             { id: 4,  type: "person",   name: "Person4"  },
             { id: 5,  type: "person",   name: "Person5"  },
             { id: 6,  type: "person",   name: "Person6"  },
             { id: 7,  type: "person",   name: "Person7"  },
             { id: 8,  type: "person",   name: "Person8"  },
             { id: 9,  type: "person",   name: "Person9"  },
             { id: 10, type: "business", name: "busines1" },
             { id: 11, type: "business", name: "busines2" },
             { id: 12, type: "business", name: "busines3" },
             { id: 13, type: "service",  name: "Wervice1" },
             { id: 14, type: "service",  name: "Service2" },
         ],
         graph_edges: [
             { id: 2219, type: "business_person", a: 10, b: 1 },
             { id: 6845, type: "business_person", a: 10, b: 2 },
             { id: 170,  type: "business_person", a: 11, b: 3 },
             { id: 4805, type: "business_person", a: 11, b: 4 },
             { id: 9854, type: "business_person", a: 11, b: 5 },
             { id: 9817, type: "business_person", a: 12, b: 6 },
             { id: 8954, type: "business_person", a: 12, b: 7 },
             { id: 2421, type: "business_person", a: 12, b: 8 },
             { id: 4465, type: "business_person", a: 12, b: 9 },
             { id: 7573, type: "service_business", a: 13, b: 10 },
             { id: 9281, type: "service_business", a: 13, b: 11 },
             { id: 8838, type: "service_business", a: 14, b: 10 },
             { id: 4888, type: "service_business", a: 14, b: 11 },
             { id: 3864, type: "service_business", a: 14, b: 12 },
             { id: 4798, type: "service_person", a: 13, b: 1 },
             { id: 720,  type: "service_person", a: 13, b: 2 },
             { id: 140,  type: "service_person", a: 13, b: 3 },
             { id: 7843, type: "service_person", a: 13, b: 4 },
             { id: 9523, type: "service_person", a: 13, b: 5 },
             { id: 956,  type: "service_person", a: 14, b: 1 },
             { id: 3994, type: "service_person", a: 14, b: 2 },
             { id: 7951, type: "service_person", a: 14, b: 3 },
             { id: 3108, type: "service_person", a: 14, b: 4 },
             { id: 685,  type: "service_person", a: 14, b: 5 },
             { id: 3165, type: "service_person", a: 14, b: 6 },
             { id: 7693, type: "service_person", a: 14, b: 7 },
             { id: 4966, type: "service_person", a: 14, b: 8 },
             { id: 3133, type: "service_person", a: 14, b: 9 },
         ]
     }

I'm happy with that.

Let's move on to events.

# Events

What are Events?

Events or LogEntries are documents that represent changes in the system that we care about. Like when documents are created, updated, deleted. These are the lowest level events. Events, like other document types, should have types that makes searching easier.

> Assumption: Every meaningful event in the system generates an event document

On real scenarios, events will contain information about `domain specific events` too. Not just base CRUD actions. For instance in GovAuth it would be useful to keep track of activities that users perform: Login, Registration, JoinService, ServiceApprovedIDP and things like that.

Ok, let's start with a basic type to represent low level crud activities.

    {
        id: 3473456
        type: document_actity
    }

What kind of activities are there? create, read, update, delete.

What could a `create` event look like?

    {
        id: 3473456
        type: document_actity
        name: create
    }

Ok this tells us a document was created. To make this more useful we need to know that was created and when. So we need a time stamp

    {
        id: 3473456
        type: document_actity
        name: create
        when: "Fri Oct 12 2018 13:20:04 GMT+1100 (AEDT)"
    }

Then we also need to know that was created. Let's see what a concrete example might look like when a Person is created in the system:

Before the event

    {
        entities: [],
        graph_edges: [],
        events: []
    }

After a Person is created

    { id: 1, type: "person", name: "Person1" }

Event:

    {
        id: 3473456
        type: document_actity
        name: created
        date: "Fri Oct 12 2018 13:20:04 GMT+1100 (AEDT)"
        document_id: 1
    }

That seems good for now.

We could argue wether or not to put the the type of document, or even the whole document in the log, but we don't have enough use cases yet to know what we need.

## The whole lot

Ok now that we know what `Entities`, `Relationships` and `Events` look like what does the whole thing look like?

Let's take the previous example of the `graph_edges` and add the log events that
represent the creation of everything.

    {
        "entities": [
            {"id":1,"type":"person","name":"Person1"},
            {"id":2,"type":"person","name":"Person2"},
            {"id":3,"type":"person","name":"Person3"},
            {"id":4,"type":"person","name":"Person4"},
            {"id":5,"type":"person","name":"Person5"},
            {"id":6,"type":"person","name":"Person6"},
            {"id":7,"type":"person","name":"Person7"},
            {"id":8,"type":"person","name":"Person8"},
            {"id":9,"type":"person","name":"Person9"},
            {"id":10,"type":"business","name":"busines1"},
            {"id":11,"type":"business","name":"busines2"},
            {"id":12,"type":"business","name":"busines3"},
            {"id":13,"type":"service","name":"Wervice1"},
            {"id":14,"type":"service","name":"Service2"}
        ],
        "graph_edges": [
            {"id":5627,"type":"business_person","a":10,"b":1},
            {"id":8846,"type":"business_person","a":10,"b":2},
            {"id":3168,"type":"business_person","a":11,"b":3},
            {"id":9292,"type":"business_person","a":11,"b":4},
            {"id":4426,"type":"business_person","a":11,"b":5},
            {"id":2105,"type":"business_person","a":12,"b":6},
            {"id":5922,"type":"business_person","a":12,"b":7},
            {"id":4897,"type":"business_person","a":12,"b":8},
            {"id":2332,"type":"business_person","a":12,"b":9},
            {"id":8133,"type":"service_business","a":13,"b":10},
            {"id":116,"type":"service_business","a":13,"b":11},
            {"id":2056,"type":"service_business","a":14,"b":10},
            {"id":5171,"type":"service_business","a":14,"b":11},
            {"id":5529,"type":"service_business","a":14,"b":12},
            {"id":3630,"type":"service_person","a":13,"b":1},
            {"id":622,"type":"service_person","a":13,"b":2},
            {"id":9980,"type":"service_person","a":13,"b":3},
            {"id":9804,"type":"service_person","a":13,"b":4},
            {"id":8551,"type":"service_person","a":13,"b":5},
            {"id":6292,"type":"service_person","a":14,"b":1},
            {"id":2225,"type":"service_person","a":14,"b":2},
            {"id":3750,"type":"service_person","a":14,"b":3},
            {"id":8855,"type":"service_person","a":14,"b":4},
            {"id":4288,"type":"service_person","a":14,"b":5},
            {"id":8253,"type":"service_person","a":14,"b":6},
            {"id":2921,"type":"service_person","a":14,"b":7},
            {"id":9336,"type":"service_person","a":14,"b":8},
            {"id":6858,"type":"service_person","a":14,"b":9}
        ],
        "events": [
            {"id":5081,"type":"document_actity","name":"created","document_id":1,"date":"2018-10-12 17:05:47 +1100"},
            {"id":2778,"type":"document_actity","name":"created","document_id":2,"date":"2018-10-12 17:05:47 +1100"},
            {"id":5266,"type":"document_actity","name":"created","document_id":3,"date":"2018-10-12 17:05:47 +1100"},
            {"id":7258,"type":"document_actity","name":"created","document_id":4,"date":"2018-10-12 17:05:47 +1100"},
            {"id":2543,"type":"document_actity","name":"created","document_id":5,"date":"2018-10-12 17:05:47 +1100"},
            {"id":4605,"type":"document_actity","name":"created","document_id":6,"date":"2018-10-12 17:05:47 +1100"},
            {"id":4152,"type":"document_actity","name":"created","document_id":7,"date":"2018-10-12 17:05:47 +1100"},
            {"id":5601,"type":"document_actity","name":"created","document_id":8,"date":"2018-10-12 17:05:47 +1100"},
            {"id":4227,"type":"document_actity","name":"created","document_id":9,"date":"2018-10-12 17:05:47 +1100"},
            {"id":7637,"type":"document_actity","name":"created","document_id":10,"date":"2018-10-12 17:05:47 +1100"},
            {"id":7927,"type":"document_actity","name":"created","document_id":11,"date":"2018-10-12 17:05:47 +1100"},
            {"id":2504,"type":"document_actity","name":"created","document_id":12,"date":"2018-10-12 17:05:47 +1100"},
            {"id":3338,"type":"document_actity","name":"created","document_id":13,"date":"2018-10-12 17:05:47 +1100"},
            {"id":3942,"type":"document_actity","name":"created","document_id":14,"date":"2018-10-12 17:05:47 +1100"},
            {"id":4934,"type":"document_actity","name":"created","document_id":7474,"date":"2018-10-12 17:05:47 +1100"},
            {"id":1475,"type":"document_actity","name":"created","document_id":491,"date":"2018-10-12 17:05:47 +1100"},
            {"id":5646,"type":"document_actity","name":"created","document_id":2623,"date":"2018-10-12 17:05:47 +1100"},
            {"id":9388,"type":"document_actity","name":"created","document_id":2980,"date":"2018-10-12 17:05:47 +1100"},
            {"id":4295,"type":"document_actity","name":"created","document_id":8513,"date":"2018-10-12 17:05:47 +1100"},
            {"id":2658,"type":"document_actity","name":"created","document_id":4901,"date":"2018-10-12 17:05:47 +1100"},
            {"id":864,"type":"document_actity","name":"created","document_id":4804,"date":"2018-10-12 17:05:47 +1100"},
            {"id":8184,"type":"document_actity","name":"created","document_id":3461,"date":"2018-10-12 17:05:47 +1100"},
            {"id":1177,"type":"document_actity","name":"created","document_id":8583,"date":"2018-10-12 17:05:47 +1100"},
            {"id":3452,"type":"document_actity","name":"created","document_id":9661,"date":"2018-10-12 17:05:47 +1100"},
            {"id":9021,"type":"document_actity","name":"created","document_id":9876,"date":"2018-10-12 17:05:47 +1100"},
            {"id":3333,"type":"document_actity","name":"created","document_id":4552,"date":"2018-10-12 17:05:47 +1100"},
            {"id":1455,"type":"document_actity","name":"created","document_id":1885,"date":"2018-10-12 17:05:47 +1100"},
            {"id":2911,"type":"document_actity","name":"created","document_id":9562,"date":"2018-10-12 17:05:47 +1100"},
            {"id":5076,"type":"document_actity","name":"created","document_id":3130,"date":"2018-10-12 17:05:47 +1100"},
            {"id":32,"type":"document_actity","name":"created","document_id":7895,"date":"2018-10-12 17:05:47 +1100"},
            {"id":9398,"type":"document_actity","name":"created","document_id":6601,"date":"2018-10-12 17:05:47 +1100"},
            {"id":4015,"type":"document_actity","name":"created","document_id":7407,"date":"2018-10-12 17:05:47 +1100"},
            {"id":8806,"type":"document_actity","name":"created","document_id":3467,"date":"2018-10-12 17:05:47 +1100"},
            {"id":4780,"type":"document_actity","name":"created","document_id":1677,"date":"2018-10-12 17:05:47 +1100"},
            {"id":3091,"type":"document_actity","name":"created","document_id":1672,"date":"2018-10-12 17:05:47 +1100"},
            {"id":9722,"type":"document_actity","name":"created","document_id":3500,"date":"2018-10-12 17:05:47 +1100"},
            {"id":8712,"type":"document_actity","name":"created","document_id":5149,"date":"2018-10-12 17:05:47 +1100"},
            {"id":1621,"type":"document_actity","name":"created","document_id":225,"date":"2018-10-12 17:05:47 +1100"},
            {"id":812,"type":"document_actity","name":"created","document_id":3270,"date":"2018-10-12 17:05:47 +1100"},
            {"id":9196,"type":"document_actity","name":"created","document_id":1454,"date":"2018-10-12 17:05:47 +1100"},
            {"id":2223,"type":"document_actity","name":"created","document_id":5785,"date":"2018-10-12 17:05:47 +1100"},
            {"id":4211,"type":"document_actity","name":"created","document_id":9189,"date":"2018-10-12 17:05:47 +1100"}
        ]
    }

End of chapter.

Next chapter: Templates...how to create and enforce structure of entities, graph_edges, events and templates themselves.