var { graphql, buildSchema } = require('graphql');

const schema = `
  type Person {  
     id: Int!,
     name: String     
    },
  type Business {  
     id: Int!,
     name: String,
     abn: String     
    },
  type Service {  
      id: Int!,
      name: String         
     },
  type GraphEdge {  
      id: Int!,
      type: String,
      a: String,
      b: String   
     },
  type Event {  
      id: Int,
      type: String,
      name: String,  
      document_id: Int,
      date: String 
     }
`;

var sch = buildSchema(schraw);

//ROOT OF GRAPHQL -- DATA
var bucket = {
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


graphql(sch, '{ person(id:1) {name}}', bucket).then((response) => {
  console.log(response);
});

graphql(sch, '{ personeee {id,name}}', bucket).then((response) => {
  console.log(response);
});


