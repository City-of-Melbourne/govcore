var { graphql, buildSchema } = require('graphql');

const schraw = `
type Query {  
  persons: [Person]
  personeee: [Person]
  person(id: Int!): Person
},
  type Person {  
     id: Int!
     name: String,
     abn: String
    }  
`;

var schema = buildSchema(schraw);

//ROOT OF GRAPHQL -- DATA
var root = {
  persons: () => {

    return [
      { id: 1, name: 'Tom' },
      { id: 2, name: 'Sashko' },
      { id: 3, name: 'Mikhail' },
      { id: 4, name: 'Mikhail' },
    ]
  },
  personeee: () => {

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

graphql(schema, '{ person(id:1) {name}}', root).then((response) => {
  console.log(response);
});

graphql(schema, '{ personeee {id,name}}', root).then((response) => {
  console.log(response);
});


