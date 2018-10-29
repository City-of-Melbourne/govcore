var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors')


// SCHEMA 
var schema = buildSchema(`   
type Business  {  
    id: ID!
    abn: String
    name: String
    members(       
          first: Int          
          ):BussinessMemberConnection!
    services(       
            first: Int          
            ):BussinessServiceConnection!  
}
type BussinessMemberConnection{    
    nodes:[Member]    
}
type BussinessServiceConnection{    
    nodes:[Service]    
}
type Member {  
    id: ID,        
    email:String       
    idps(
        first: Int   
        ):MemberIdpConnection!  
}

type MemberIdpConnection{    
    nodes:[Idp]    
},
type Idp {  
    id: ID,        
    name: String
    services(
        first: Int 
        ):IdpServiceConnection!  
}, 
type IdpServiceConnection{    
    nodes:[Service]    
},
type Service {  
    id: ID,        
    name: String        
}
type Role {  
    id: ID,        
    name: String        
}
type Event {  
    id: ID!,
    type: String
    name: String
    document_id: String
    date: String 
}

input MemberInput {  
    id: ID   
    email:String    
}
input BusinessInput {  
    id: ID
    abn: String
    name: String    
}


type Query {
    business(id:ID):Business
    service(id:ID):Service
    idp(id:ID):Idp
    member(id:ID):Member
    role(id:ID):Role
    event(id:ID):Event
}

type Mutation {
    setmember(input: MemberInput):Member
    setbusiness(input: BusinessInput):Business
}
`);
// This class implements the RandomDie GraphQL type

class GovCore {
    constructor() {
    
    } 
    //THIS ONE GOES TO THE ENTITY BUCKET TO FIND AN ANSWER
    get(input) {  
        var inputs = new Array(input);        
  
        return inputs;
    }  
    set(input){
        return input;
    }
    delete(input){
  
        return input;
  
    }
    create(input) {              
  
        return input;
    } 
    
  }

// RESOLVERS
var root = {
    
        //QUERY    
        idp: ({input}) => {              
            return new GovCore().get(input); 
        },
        member: ({input}) => {              
            return new GovCore().get(input); 
        },
        service: ({input}) => {       
            return new GovCore().get(input);  
        },
        business: ({input}) => {     
            return new GovCore().get(input);  
        },
        //MUTATIONS   
        setmember: ({input}) => {              
            return new GovCore().create(input); 
        },
        setbusiness: ({input}) => {              
            return new GovCore().create(input); 
        } 
};




var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');