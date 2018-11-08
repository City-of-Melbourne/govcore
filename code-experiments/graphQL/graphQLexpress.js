var express = require('express');
var graphqlHTTP = require('express-graphql');

var { buildSchema } = require('graphql');

var{ govCore }=require('govcore');



// SCHEMA + ROOT TYPES
var schema = buildSchema(`
   
    
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
    },



    type Query {  



        entities: [Entity],
        entity(id: Int!): Entity,



        events: [Event],
        event(id: Int!, type: String): Event
    },
    input EntityInput {
        id: Int,
        name: String
      }
    
    type Mutation{

        createEntity(name: String):Entity


        createEntity2(input: EntityInput):Entity



    }   
`);
console.log(schema);
console.log(schema._typeMap.Entity);
// RESOLVERS
var root = {
    //QUERY
    entities: () => {
        return [
            { id: 1, name: 'Tom' },
            { id: 2, name: 'Sashko' },
            { id: 3, name: 'Mikhail' },
            { id: 4, name: 'Mikhail' },


            
        ]
    },
    entity: (obj, args, context, info) => {
        return { id: 1, name: 'something' }
    },
    events: () => {
        return [
            { id: 1, name: 'something', type: '', document_id: '' }
        ]
    },
    event: (obj, args, context, info) => {

        return { id: 1, name: 'name' ,date:'01/08/2018', type: 'hello world', document_id: '124234' }
    },
    //MUTATION
    createEntity:({name}) =>{
       
        return govCore.create();
        //return {id:1,name:name};

    },
    createEntity2:({input}) =>{
       
        return{ id:input.id,
                name:input.name
              };

    }



};

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');