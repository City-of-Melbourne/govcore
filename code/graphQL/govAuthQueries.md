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
      
        __type(name: "GraphEdge") {
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

## Query using inputs

> Querying entities
        query{ 

            idp(input: {
            id: "a0c1f114-f138-426c-9c84-99f319613a52",
            bucket: "entity@aws.au",
            name: "479332973"    
            }){
            id,
            bucket,
            name
        },
            service(input: {
            id: "3b8611aa-23a0-49fc-95b2-ac33cbad0b2c",
            bucket: "entity@aws.au",
            name: "479332973"    
            }){
            id,
            bucket,
            name
        },  
            business(input: {
            id: "903f00dc-1c3a-49be-9e82-1a4f093a61c5",
            bucket: "entity@aws.au",
            name: "479332973",    
            abn: "479332973"    
            }){
            id,
            bucket,
            name
        }
            
        }