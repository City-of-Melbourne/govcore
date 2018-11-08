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
      a: Int,
      b: Int   
     },
  type Event  {  
      id: Int,
      type: String,
      name: String,  
      document_id: Int,
      date: String 
      
     }
`;

var sch = buildSchema(schema);

//ROOT
var bucket = {
};


graphql(sch, '{ person(id:1) {name}}', bucket).then((response) => {
  console.log(response);
});

// graphql(sch, '{ personeee {id,name}}', bucket).then((response) => {
//   console.log(response);
// });


