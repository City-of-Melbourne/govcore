# Gov Auth Templates Using GraphQL Schema Definition Language + GovCore Template Definition 

After had played  few days with grapQL, we come up with the following templates that reflects the problem domain(GovAuth) 

## Member

  Member {  
            id: ID!,
            email:String
            ,queries{ 
                member(input:MemberInput): [Member]
                    },
            mutations{
                setmember(input: MemberInput):Member            
                },
            metadata{
                bucket:String              
                created:Int
                modified:Int
            }
    }