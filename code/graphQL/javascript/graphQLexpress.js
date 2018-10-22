var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {  
    persons: [Person]
    person(id: Int!): Person
  },
    type Person {  
       id: Int!
       name: String,
       abn: String
      }  
`);

// The root provides a resolver function for each API endpoint
var root = {
    persons: () => {

        return [
            { id: 1, name: 'Tom' },
            { id: 2, name: 'Sashko' },
            { id: 3, name: 'Mikhail' },
            { id: 4, name: 'Mikhail' },
        ]
    },
    person: () => {

        return ([
            { id: 1, name: 'Tom' },
            { id: 2, name: 'Sashko' },
            { id: 3, name: 'Mikhail' },
            { id: 4, name: 'Mikhail' },
        ])[2]

    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');