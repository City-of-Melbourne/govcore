var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


// SCHEMA 
var schema = buildSchema(`       

    type Entity {  
        id: Int!,
        type: String
    },              
    type GraphEdge {  
        id: Int!,
        type: String,
        a: Entity,
        b: Entity   
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
        graphEdge(type: String): GraphEdge,
        graphEdges: [GraphEdge],
    },

    input GraphEdgeInput {
        id: Int!,
        type: String,
        a: EntityInput,
        b: EntityInput  
      },

    input EntityInput {
        id: Int!,
        type: String,
        name: String     
      },

    type Mutation{
        createEntity(input: EntityInput):Entity,
        creatGraphEdge(input: GraphEdgeInput):GraphEdge
    }   

`);
// FUNCTIONS EMULATING BUCKETS QUERYS

function getEntities(){

    return  [
          { id: 1,  type: "person", bucket:"document",   field:[{key:"name", value: "Person1"} ] },
          { id: 2,  type: "person", bucket:"document",    field:[{key:"name",value: "Person2"}]  },
          { id: 3,  type: "person", bucket:"document",   field:[{key:"name",value: "Person3"}]  },
          { id: 4,  type: "person", bucket:"document",   field:[{key:"name",value: "Person4" }] },
          { id: 5,  type: "person", bucket:"document",   field:[{key:"name",value: "Person5" }] },
          { id: 6,  type: "person", bucket:"document",   field:[{key:"name",value: "Person6" }] },
          { id: 7,  type: "person", bucket:"document",   field:[{key:"name",value: "Person7" }] },
          { id: 8,  type: "person", bucket:"document",   field:[{key:"name",value: "Person8"}]  },
          { id: 9,  type: "person", bucket:"document",   field:[{key:"name",value: "Person9"}]  },
          { id: 10, type: "business", bucket:"document", field:[{key:"name",value: "busines1"}] },
          { id: 11, type: "business", bucket:"document", field:[{key:"name",value: "busines2"}] },
          { id: 12, type: "business", bucket:"document",  field:[{key:"name",value: "busines3"}] },
          { id: 13, type: "service", bucket:"document",  field:[ {key:"name",value: "Wervice1"}] },
          { id: 14, type: "service", bucket:"document",  field:[{value: "Service2"}] }          
      ];
  }

  function getGraphEdges(){

    return  [
        { id: 2219, type: "business_person", a: getEntity(10), b: getEntity(1) },
        { id: 6845, type: "business_person", a: getEntity(10), b: getEntity(2) },
        { id: 170,  type: "business_person", a: getEntity(11), b: getEntity(3) },
        { id: 4805, type: "business_person", a: getEntity(11), b: getEntity(4) },
        { id: 9854, type: "business_person", a: getEntity(11), b: getEntity(5) },
        { id: 9817, type: "business_person", a: getEntity(12), b: getEntity(6) },
        { id: 8954, type: "business_person", a: getEntity(12), b: getEntity(7) },
        { id: 2421, type: "business_person", a: getEntity(12), b: getEntity(8) },
        { id: 4465, type: "business_person", a: getEntity(12), b: getEntity(9)},
        { id: 7573, type: "service_business", a: getEntity(13), b: getEntity(10) },
        { id: 9281, type: "service_business", a: getEntity(13), b: getEntity(11) },
        { id: 8838, type: "service_business", a: getEntity(14), b: getEntity(10) },
        { id: 4888, type: "service_business", a: getEntity(14), b: getEntity(11) },
        { id: 3864, type: "service_business", a: getEntity(14), b: getEntity(12)},
        { id: 4798, type: "service_person", a: getEntity(13), b: getEntity(1) },
        { id: 720,  type: "service_person", a: getEntity(13), b: getEntity(2) },
        { id: 140,  type: "service_person", a: getEntity(13), b: getEntity(3) },
        { id: 7843, type: "service_person", a: getEntity(13), b: getEntity(4) },
        { id: 9523, type: "service_person", a: getEntity(13), b: getEntity(5) },
        { id: 956,  type: "service_person", a: getEntity(14), b: getEntity(1) },
        { id: 3994, type: "service_person", a: getEntity(14), b: getEntity(2) },
        { id: 7951, type: "service_person", a: getEntity(14), b: getEntity(3) },
        { id: 3108, type: "service_person", a: getEntity(14), b: getEntity(4) },
        { id: 685,  type: "service_person", a: getEntity(14), b: getEntity(5) },
        { id: 3165, type: "service_person", a: getEntity(14), b: getEntity(6) },
        { id: 7693, type: "service_person", a: getEntity(14), b: getEntity(7) },
        { id: 4966, type: "service_person", a: getEntity(14), b: getEntity(8) },
        { id: 3133, type: "service_person", a: getEntity(14), b: getEntity(9) }              
      ];
  }

  function getGraphEdgeByType(type){

    return getGraphEdges().find(function(element) {return element.type === type; });
  }
  function getGraphEdgeById(id){
    return getGraphEdges().find(function(element) {return element.id === id;});
  }
  function getEntity( id){
    return getEntities().find(function(element) { return element.id === id; });  
  }

// RESOLVERS
var root = {
    //QUERY
    entities: () => {
        return getEntities()
    },
    entity: (obj, args, context, info) => {       
       
        return getEntity(obj.id);
    },
    graphEdge: (obj, args, context, info) => {

        return getGraphEdgeByType(obj.type);
    },
    graphEdges: () => {        
        
        return getGraphEdges();       
    },
    //MUTATION
    createEntity:({input}) =>{       
        //return govCore.create();
        return {id:1,name:name};
    },
    creatGraphEdge:({input}) =>{       
        return{ id:input.id, name:input.name};
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