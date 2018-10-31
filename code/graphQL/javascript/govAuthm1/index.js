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

const resolvers = {

    Query: {     

        Persons: () => db.list('person'),
        Person: (_, { id }) => db.list('person').find(e => e.id == id),

        Services: () => db.list('service'),
        Service: (_, { id }) => db.list('service').find(e => e.id == id),

        Businesses: () => db.list('business'),
        Business: (_, { id }) => db.list('business').find(e => e.id == id),
       
        Idps: () => db.list('idp'),
        Idp: (_, { id }) => db.list('idp').find(e => e.id == id),
     
        GraphEdge:(_, { type,a,b}) => db.list('graph_edge').filter(graph_edge => graph_edge.type == type && (  graph_edge.a==a || a==null) && (  graph_edge.b==b || b==null))
                
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
            var doc=Object.assign(input, { bucket: 'graph'});          
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