// in src/index.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');
const GovCoreDB = require('../../../govcore-js/db.js');
const cors = require('cors')

let data_file = 'data.json';
let db = GovCoreDB(data_file);

// TODO: Does this belong to the db?
// Filtering functions

const resolvers = {

    Query: {     

        Persons: () => db.find({ type: 'person' }),
        Person: (_, { id }) => db.get(id),

        Services: () => db.find({ type: 'service' }),
        Service: (_, { id }) => db.get(id),

        Businesses: () => db.find({ type: 'business' }),
        Business: (_, { id }) => db.get(id),
       
        Idps: () => db.find({ type: "idp" }),
        Idp: (_, { id }) => db.get(id),

        GraphEdges: (_, { type, a, b }) => {
                                var edge=db.find({ bucket: "graph_edges", type: type, a: a, b: b })
                                var a =  db.get(edge.a);
                                var b =  db.get(edge.b);
                                return Object.assign(edge,{a:a,b:b});                                   
                                
                            },
        GraphEdge: (_, { id }) => db.get(id),
        
        BusinessServices: (_, {  business, service }) => {
            var edges=db.find({ bucket: "graph_edges", type: "business_service", a: business, b: service })
           
            return edges.map(function(edge){
                        return   Object.assign(edge,{business:db.get(edge.a),service:db.get(edge.b)}); 
               })

                                       
            
        },
        BusinessService: (_, { id }) =>  {

            var edge=db.get(id)
            return Object.assign(edge,{business:db.get(edge.a),service:db.get(edge.b)}); 

        }

        
    },

   
    Mutation:{

        createPerson: (_, { input }) => { 
            var doc=Object.assign(input, { bucket: 'entities',type: 'person'});          
            return db.create(doc);
        },
        updatePerson: (_, { input }) => {                    
            return db.update(input);
        },
        createService: (_, { input }) => { 
            var doc=Object.assign(input, { bucket: 'entities',type: 'service'});          
            return db.create(doc);
        },
        updateService: (_, { input }) => {                    
            return db.update(input);
        },
        createBusiness: (_, { input }) => { 
            var doc=Object.assign(input, { bucket: 'entities',type: 'business'});          
            return db.create(doc);
        },
        updateBusiness: (_, { input }) => {                    
            return db.update(input);
        },
        createIdp: (_, { input }) => { 
            var doc=Object.assign(input, { bucket: 'entities',type: 'idp'});          
            return db.create(doc);
        },
        updateIdp: (_, { input }) => {                    
            return db.update(input);
        },
        createGraphEdge: (_, { input }) => { 
            var doc=Object.assign(input, { bucket: 'graph_edges'});
            return db.create(doc);
        },
    }
};

// pass the resolver map as second argument
const schema = makeExecutableSchema({ typeDefs, resolvers });
// proceed with the express app setup
var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');