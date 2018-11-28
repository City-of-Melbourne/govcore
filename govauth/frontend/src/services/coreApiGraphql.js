const axios = require("axios");
export default class coreApiGraphql {   

    constructor() {             
      }
      async postData(query) {
        return axios({
             // url: 'https://govauthapi.herokuapp.com/graphql',
             // TODO: Grab from env
             url: 'http://localhost:8002',
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
            createBusiness(input:{id:"${model.id}",abn:"${model.abn}",name:"${model.name}",date:"${(new Date()).toISOString()}"}){
                id                                            
                abn
                name
            }
        }`;   
        return this.postData(query).then((business) => {
            this.createPerson(model).then((person)=>{                     
                    this.createGraphEdge({  type:"business_person",
                                            a:business.createBusiness.id,
                                            b:person.createPerson.id,
                                            date: (new Date()).toISOString()
                                            })
                    this.createGraphEdge({  type:"person_idp",
                                            a:person.createPerson.id,
                                            b:1,
                                            date: (new Date()).toISOString()})
            })
        }); 
    }
    updateBusiness(model) {
        
        var query = `mutation {
            updateBusiness(input:{id: ${model.id}, name:"${model.name}", abn:"${model.abn}"}){
                id name abn
            }
        }`;
        return this.postData(query);
    }
    createPerson(model) {        
        var query=` mutation{
                  createPerson(input:{email:"${model.email}",name:"${model.name}",date:"${(new Date()).toISOString()}"}){
                      id                                            
                      email
                      name
                  }
              }`;  
        //TODO: We need  to use real Idp values , for now using a predefined '1'
         return this.postData(query).then((person)=>{

                this.createGraphEdge({  type:"person_idp",
                a:person.createPerson.id,
                b:1,
                date: (new Date()).toISOString()})
                return person;

         });
           
    }

    updatePerson(model) {
        
        var query = `mutation {
            updatePerson(input:{id: ${model.id}, email:"${model.email}", name:"${model.name}", mobile:"${model.mobile}" }){
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
        return this.postData(`mutation { deleteGraphEdge(id: "${id}") { a b } }`);
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
    async getBusinesses(){    
        var data;
        
        var query=`{
            Businesses(limit:0){
                  id
                  name
                }
            }`;               
            await this.postData(query).then( (response) => {               
                 data=response; 
            });    
          return data.Businesses;
    }
    async getPersons(){    
        var data;        
        var query=`{
            Persons(limit:0){
                    id
                    name
                    email
                }
            }`;               
            await this.postData(query).then( (response) => {               
                 data=response; 
            });    
          return data.Persons;
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

        var query = `mutation{
            createBusinessService(input: { type: "business_service", business: "${obj.businessId}", service: "${obj.serviceId}", date: "${(new Date()).toISOString()}" }){
                 id 
            }
        }`;

        return this.postData(query);
    }
  

    linkPersonToBusiness(obj) {  

        var query = `mutation{
            createBusinessPerson(input: { type: "business_person", business: "${obj.businessId}", person: "${obj.personId}", role: "${obj.roleId}", date: "${(new Date()).toISOString()}" }){
                 id date
            }
        }`;
        return this.postData(query);
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
    async getPersonsBusinesses(obj){    
        var data;
        
        var query=`{
            BusinessPersons(person:"${obj.person.id}"){    
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
            BusinessPersonRequests(business:"${obj.business.id}",type:"person_business_request"){
   
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

          return data.BusinessPersonRequests;
    }   

    createPersonToBusinessRequest(obj) {

        var query = `mutation{
            createPersonBusinessRequest(input: { type: "person_business_request", business: "${obj.businessId}", person: "${obj.personId}", role: "${obj.roleId}", date: "${(new Date()).toISOString()}" }){
                 id 
            }
        }`;

        return this.postData(query);
    }
    async getPersonBusinessRequests(obj){    
        var data;
        
        var query=`{
            BusinessPersonRequests(person:"${obj.person.id}",type:"person_business_request"){
    
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

          return data.BusinessPersonRequests;
    }
}
