# Queries related with the initial schema
> querying entities within the system   

        {        
                entities{
                    id,
                    type,
                    name
                },        
        }

> querying the whole lot of graph Edges
        
        
        query{
            graphEdges{
                    id,
                    type,
                    a{
                        name,
                        id,
                        type,
                        },
                    b{
                        name,
                        id,
                        type
                    }
                }
        }

# GovAuth Queries

## querying the schema

  {        
            __schema {
                types {
                name
                }
            },
      
        __type(name: "Member") {
                name
                kind,
                    fields {
                        name
                            type {
                                name
                                    kind
                                    ofType {
                                        name
                                        kind
                                    }
                            }
                        }
            }    

        __type(name: "Repository") {
                name
                kind,
                    fields {
                        name
                           
                    }
            }

## Query using inputs

> Querying entities

        {
        idp(input: {id: "a0c1f114-f138-426c-9c84-99f319613a52",  name: "479332973"}) {
            id            
            name
        }
        member(input: {id: "a0c1f114-f138-426c-9c84-99f319613a52",  email: "479332973"}) {
            id            
            email
        }
        service(input: {id: "3b8611aa-23a0-49fc-95b2-ac33cbad0b2c",  name: "479332973"}) {
            id            
            name
        }
        business(input: {id: "903f00dc-1c3a-49be-9e82-1a4f093a61c5",  name: "479332973", abn: "479332973"}) {
            id            
            name
        }
        serviceBusiness(input: {id: "49be-9e82-1a4f093a61c5", date: "01/01/1989", service: {id: "asd" }}) {
            id            
            service {
            id
            name            
            }
            business {
            id
            name            
            }
        }
        }



> Mutating entities


mutation{
  member(input:{id:"adsfasdf",bucket:"asdfasdf",email:"jonathan"}){
    id,
    bucket,
    email
  }
  
}


> Github Query 

query{
repository(owner:"jcodeforaustralia",name:"graphql"){
  name
  watchers(first:10){
    edges{      
      cursor      
      node{        
        email
      }          
    }
    nodes{
      id     
      name
      email
      followers(first:10){
        nodes{          
          name
        
        }
      }
    }
  }
}

}

            
