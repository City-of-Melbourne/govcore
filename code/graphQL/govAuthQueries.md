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
	query{
	  Person(id:"4279314197"){
		name
		id
		email
	  }
	  Persons{
	  name
		id
		email
	  }
	}

}



> Mutating entities


mutation{	
    
    createPerson(input:{name:"test",email:"test@hotmail.com"}){
        id
        name
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

            
