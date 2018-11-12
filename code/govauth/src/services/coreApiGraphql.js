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
         ).then((result) => { return (result.data.data) } )
             .catch(err => {
                 /* eslint-disable */
                 console.log('graphql error:', err);                
             });
    }
    createBusiness(model) {      
        var query=` mutation{
            createBusiness(input:{id:"${model.id}",abn:"${model.abn}",name:"${model.name}"}){
                id                                            
                abn
                name
            }
        }`;   
        return this.postData(query).then((business) => {
            this.createPerson(model).then((person)=>{                     
                    this.createGraphEdge({  type:"business_person",
                                            a:business.createBusiness.id,
                                            b:person.createPerson.id
                                            })
                    this.createGraphEdge({  type:"person_idp",
                                            a:person.createPerson.id,
                                            b:1})
            })
        }); 
    }
    createPerson(model) {        
        var query=` mutation{
                  createPerson(input:{email:"${model.email}",name:"${model.name}"}){
                      id                                            
                      email
                      name
                  }
              }`;  
        //TODO: We need  to use real Idp values , for now using a predefined '1'
         return this.postData(query).then((person)=>{

                this.createGraphEdge({  type:"person_idp",
                a:person.createPerson.id,
                b:1})
                return person;

         });
           
    }

    updatePerson(model) {
        console.log("updatePerson(model)")
        var query = `mutation {
            updatePerson(input:{id: ${model.id}, email:"${model.email}", name:"${model.name}"}){
                id email name
            }
        }`;
        return this.postData(query);
    }

    createGraphEdge(obj) {
        var query = `mutation{
            createGraphEdge(input: { type: "${obj.type}", a: "${obj.a}", b: "${obj.b}", date: "${obj.date}" }){
                type id a b date
            }
        }`;

        return this.postData(query);
    }

    deleteGraphEdge(id) {
        return this.postData(`mutation { deleteGraphEdge(id: "${id}") { id } }`);
    }

    async getServices(){    
        var data;
        
        var query=`{
                Services(limit:0){
                  id
                  name
                }
            }`;               
            await this.postData(query).then( (response) => {               
                 data=response; 
            });    
          return data.Services;
    }
    
    async getBusinessServices(obj){    
        var data;
        
        var query=`{
            BusinessServices(business:"${obj.business.id}"){
    
                id
                date
                    business{id,name}
                    service{id,name}
              }
            }`;               
            await this.postData(query).then( (response) => {               
                 data=response; 
            });    

            
        

          return data.BusinessServices;
    }

    linkBusinessAndService(obj) {
        return this.createGraphEdge({
            type: "business_service",
            a: obj.businessId,
            b: obj.serviceId,
            date: (new Date()).toISOString()
        });
    }

    async getRoles(){    
        var data;
        
        var query=`{
                Roles(limit:0){
                  id
                  name
                }
            }`;               
            await this.postData(query).then( (response) => {               
                 data=response; 
            });    
          return data.Roles;
    }
    async getBusinessPersons(obj){    
        var data;
        
        var query=`{
            BusinessPersons(business:"${obj.business.id}"){    
                id
                date
                    business{id,name}
                    person{id,name,email}
                    role{id,name}
              }
            }`;               
            await this.postData(query).then( (response) => {               
                 data=response; 
            });    
            
          return data.BusinessPersons;
    }
    async getBusinessPersonRequests(obj){    
        var data;
        
        var query=`{
            BusinessServices(business:"${obj.business.id}"){
    
                id
                date
                    business{id,name}
                    service{id,name}
              }
            }`;               
            await this.postData(query).then( (response) => {               
                 data=response; 
            });    

          return data.BusinessServices;
    }
}
