# GraphQL

This document intends to explain the process that we followed to implement the current model in JSON and start to invoke more govCore elements into the battlefield; to be more precise we are aiming to link __(templates)__ with real data and finally enable queries through graphQL. The goal is more than clear, in order to take into account graphQL within next experiments related wiht goVcore in the near future , we want to have a  first real trial and reveal  its potential or simply deprecate it.


## JSON Model as Starting Point

As a main outcome of this modeling process [Model Representation](https://github.com/City-of-Melbourne/govAuth/blob/master/research/model-representation.md) undertaken previously, so we are going to use it regardless modeling considerations, now the priority is to jump from the readable model to something that enable  govAuth  __(use case)__ to interact with data under govCore concept.


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

# Hello! graphQL


![](https://trello-attachments.s3.amazonaws.com/5bac5270efa930417941b4fa/5bc6f4c5268f4267399b447d/ddcd6e3f54e703e14ade7cf2b4f2d0ac/image.png)



In order to reduce dependancies we have decided to use  graphQL but just using the __execution engine__ and __the query resolution process__; deleting wrappers or additional stuff, so the escenario will looks like:

- Node Js / express server for queries throught the browser
- graphQL for javascript installed via npm

# Step by step 
## Schema 
GraphQL has its own type language that’s used the write GraphQL schemas: The Schema Definition Language (SDL)

        type Entity {
            id: ID!
            name: String
        }

Instantly we noticed that the schema by itself is not available to be consumed so the next step is to enable it throught __Root Types__;the model under graphQL would looks like:

        type Entity {  
            id: Int!,
            name: String     
        },              
        type GraphEdge {  
            id: Int!,
            type: String,
            a: Int,
            b: Int   
            },
        type Event {  
            id: Int,
            type: String,
            name: String,  
            document_id: Int,
            date: String 
            }

At this moment your schema is ready to be used throught __Root Types__ and make it queryble and mutable.

## Root types

 These types define the entry points for a GraphQL  and determine the shape of the queries and mutations that will be accepted 

 A brief description of the types:

- Query: Allow users to get data or resources, basically is the same than GET in Rest Services
    - [https://graphql.org/learn/execution/](https://graphql.org/learn/execution/)


> __First Question__ that come up when we realized that graphQL let you get everything from itself, why do we need to send an template file attached with the document ??? graphQL let you have the same concept and addittional access it

> An answer could be __graphQL introspection__ to replace the fact of being sending the document  + template all the time

      






- Mutation: Allow users to manipulate data 
    - [Example](https://graphql.org/graphql-js/mutations-and-input-types/)
    - [Example - Level 2](https://hackernoon.com/mutations-in-graphql-9ac6a28202a2) 


            mutation{
                createEntity(name:"basic mutation"){
                    id,
                    name    
                }  
            }




- Suscription: Allow users to  observe specific events and receive updates

Just for now we want to enable the data and enable it throught root types(Query and mutate)

            type Query {  
                entities(id: Int!): [Entity],
                entity(id: Int!): Entity
            }


## Templates

After had been playing with graphQL using the first schema draft, would be advisable develop a template that is saved somehow withing govcore Buckets and would have the following structure:

### Entity
This is the basis for any template , either for entites or events or graphEdges

  Entity {  

            id: Int!,
            bucket:String,    
            ,queries[

            ],
            mutations[

            ]    
    }