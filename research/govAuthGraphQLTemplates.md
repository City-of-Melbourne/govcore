# Gov Auth Templates Using GraphQL Schema Definition Language + GovCore Template Definition 

After had played  few days with grapQL, we come up with the following templates that reflects the problem domain(GovAuth) 

## Member

  Member {        
            id: ID!,
            email:String,        
            Metadata{
                bucket:String,
                creator:String,
                modifier:String,
                created:Int,
                modified:Int,
            },
            input MemberInput {  
                id: ID,   
                email:String    
            },
            type Query {                
                member(id:ID):Member              
            },
            type Mutation {
                setmember(input: MemberInput):Member                
            }
    }

## Business

    Business {  
            id: ID!
            abn: String
            name: String
            metadata{
                bucket:String    
                creator:String    
                modifier:String      
                created:Int
                modified:Int
            }
            input BusinessInput {  
                id: ID
                abn: String
                name: String    
            }
            type Query {                
                business(id:ID):Business       
            }
            type Mutation {                
                setbusiness(input: BusinessInput):Business                
            }
    }