var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    : String,
    world: String
  }
`);

var root = { 

    hello: () => 'Hello world!' , 
    world:()=>'heeey' 

};

graphql(schema, '{ world }', root).then((response) => {


  console.log(response);


});