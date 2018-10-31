const axios = require("axios");

export default class coreApiGraphql {   

    constructor() {
             
      }
      async postData(query) {

        return axios({
             url: 'http://localhost:4000/graphql',
             method: 'post',
             data: { query }
         }
         ).then((result) => { return result.data.data} )
             .catch(err => {
                 /* eslint-disable */
                 console.log('graphql error:', err);                
             });
     }

    createBusiness(model) {
      // Use vue-resource or any other http library to send your request
      var query=` mutation{
                createBusiness(input:{id:"${model.id}",abn:"${model.abn}",name:"${model.name}"}){
                    id                                            
                    abn
                    name
                }
            }`;        
        /* eslint-disable */
        return this.postData(query).then((business) => {
                this.createPerson(model).then((person)=>{                     
                        this.createGraphEdge({  type:"business_person",
                                                a:business.createBusiness.id,
                                                b:person.createPerson.id
                                              })

                })
            }); 
    }
    createPerson(model) {
        // Use vue-resource or any other http library to send your request
        var query=` mutation{
                  createPerson(input:{email:"${model.email}",name:"${model.name}"}){
                      id                                            
                      email
                      name
                  }
              }`;          
          /* eslint-disable */
         return this.postData(query);  
      }  
      createGraphEdge(obj){
        
        // createGraphEdge(input:${JSON.stringify(obj)})
        var query=` mutation{
            createGraphEdge(input:{type:"${obj.type}",a:"${obj.a}",b:"${obj.b}"})
                            {
                                type
                                id
                                a
                                b
                            } 
        }`;        
        
        return this.postData(query); 
      }
 }