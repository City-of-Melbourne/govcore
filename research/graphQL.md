# GraphQL

This document intends to explain the process that we followed to implement the current model in JSON and start to invoke more govCore elements into the battlefield; to be more precise we are aiming to link __(templates)__ with real data and finally enable queries through graphQL. The goal is more than clear, in order to take into account graphQL within next experiments related wiht goVcore in the near , we want to have a real firts trial and unleahs its power or simply deprecate it.


## JSON Model as Starting Point

As a main outcome of this modeling process [Model Representation](https://github.com/City-of-Melbourne/govAuth/blob/master/research/model-representation.md) undertaken previously, so we are going to use it regardless modeling considerations, now the priority is to jump from the readable model to something that enable our govAuth  __(use case)__ to interact with data under govCore concept.


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

# Hello graphQL

In order to reduce dependancies we have decided to use  graphQL but just using the __execution engine__ and the query resolution process; deleting wrappers or additional stuff, so the escenario will looks like:

- Node Js 
- graphQL for javascript installed via npm
- Creating Schema
- Linking Data
- Playing  with queries

## Schema 

GraphQL has its own type language that’s used the write GraphQL schemas: The Schema Definition Language (SDL)


    type Person {
    id: ID!
    name: String
    }

Instantly we noticed that the schema by itself is not available to be consumed throught queries, so __Root Types__ are the answer

## Root Types


 These types define the entry points for a GraphQL API and
 determine the shape of the queries and mutations that will be accepted 

- Query
- Mutation
- Suscription