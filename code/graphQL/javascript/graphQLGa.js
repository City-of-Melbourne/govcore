var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


// SCHEMA 
var schema = buildSchema(`       

    type Idp {  
        id: String!,
        bucket: String!,
        name: String
    },     
    type Member {  
        id: String!,
        bucket: String!,
        email:String        
    },         
    type Service {  
        id: String!,
        bucket: String!,
        name: String        
    },
    type Business {  
        id: String!,
        bucket: String!,
        abn: String,
        name: String   
    },
    type Event {  
        id: Int,
        type: String,
        name: String,  
        document_id: String,
        date: String 
    },

    type ServiceBusiness {  
        id: String!,
        bucket: String!,
        type: String,
        date: String,
        business: Business,
        service: Service 
    },
    type MemberBusiness {  
        id: String!,
        bucket: String!,
        type: String,
        date: String,          
        business: Business,
        member: Member 
    },
    type ServiceMember {  
        id: String!,
        bucket: String!, 
        type: String,
        date: String,         
        member: Member,
        Service: Service 
    },

    input IdpInput {  
        id: String,
        bucket: String!,
        name: String
    }, 
    input ServiceInput {  
        id: String,
        bucket: String!,
        name: String     
    }, 
    input MemberInput {  
        id: String,
        bucket: String!,
        email:String 
    }, 
    input BusinessInput {  
        id: String,
        bucket: String!,
        abn: String,
        name: String  
    }, 
    input ServiceBusinessInput {  
        id: String!,
        bucket: String!,
        type: String,
        date: String,          
        business: BusinessInput,
        service: ServiceInput 
    },
    input MemberBusinessInput {  
        id: String!,
        bucket: String!,
        type: String,
        date: String,          
        business: BusinessInput,
        member: MemberInput 
    },
    input ServiceMemberInput {  
        id: String,
        bucket: String!,
        type: String,
        date: String,  
        member: MemberInput,
        Service: ServiceInput 
    },

    type Query{

        idp(input:IdpInput): [Idp],
        service(input:ServiceInput): [Service],
        business(input:BusinessInput): [Business],
        member(input:MemberInput): [Member],

        serviceBusiness(input:ServiceBusinessInput): [ServiceBusiness],
        memberBusiness(input:MemberBusinessInput): [MemberBusiness],
        serviceMember(input:ServiceMemberInput): [ServiceMember]
    }
   

`);
// This class implements the RandomDie GraphQL type
class GovCore {
    constructor() {
    
    } 
    get(input) {    

        var inputs = new Array(input, input,input);        
        return inputs;

    }
  }

// RESOLVERS
var root = {
    //QUERY    
    idp: ({input}) => {              
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
    }
    //MUTATIONS
    
};




var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');