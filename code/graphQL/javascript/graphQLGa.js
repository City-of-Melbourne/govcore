var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


// SCHEMA 
var schema = buildSchema(`       

    type Idp {  
        id: ID,        
        name: String
    },     
    type Member {  
        id: ID,        
        email:String        
    },         
    type Service {  
        id: ID,        
        name: String        
    },
    type Business {  
        id: ID,
        abn: String,
        name: String   
    },
    type Event {  
        id: ID!,
        type: String,
        name: String,  
        document_id: String,
        date: String 
    },
    
    type ServiceBusiness {  
        id: ID,             
        date: String,        
        a: Business
        b: Service
    },

    type MemberBusiness {  
        id: ID,              
        date: String,          
        a: Business,
        b: Member
    },

    type ServiceMember {  
        id: ID,             
        date: String,         
        a: Member,
        b: Service
    },

    input IdpInput {  
        id: ID,        
        name: String
    }, 
    input ServiceInput {  
        id: ID,        
        name: String     
    }, 
    input MemberInput {  
        id: ID,        
        email:String 
    }, 
    input BusinessInput {  
        id: ID,        
        abn: String,
        name: String  
    },     
    input EventInput {  
        id: ID,
        type: String,
        name: String,  
        document_id: String,
        date: String 
    },     

    
    input ServiceBusinessInput {  
        id: ID,              
        date: String,          
        a: BusinessInput,
        b: ServiceInput 
    },
    input MemberBusinessInput {  
        id: ID,               
        date: String,          
        a: BusinessInput,
        b: MemberInput 
    },
    input ServiceMemberInput {  
        id: ID,              
        date: String,  
        a: MemberInput,
        b: ServiceInput 
    },
    type Query{

        idp(input:IdpInput): [Idp],
        service(input:ServiceInput): [Service],
        business(input:BusinessInput): [Business],
        member(input:MemberInput): [Member],
        event(input:EventInput): [Event],
        serviceBusiness(input:ServiceBusinessInput): [ServiceBusiness],
        memberBusiness(input:MemberBusinessInput): [MemberBusiness],
        serviceMember(input:ServiceMemberInput): [ServiceMember]
      
    },

    type Mutation{
        setmember(input: MemberInput):Member
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
        serviceBusiness: ({input}) => {              
            return new GovCore().get(input); 
        },
        memberBusiness: ({input}) => {              
            return new GovCore().get(input); 
        },
        serviceMember: ({input}) => {              
            return new GovCore().get(input); 
        },    
        //MUTATIONS   
        setmember: ({input}) => {              
            return new GovCore().create(input); 
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