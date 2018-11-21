const { RESTDataSource } = require('apollo-datasource-rest');

class GovCoreApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://ec2-3-16-136-94.us-east-2.compute.amazonaws.com:3000/';
  }  

  willSendRequest(request) {
    //request.params.set('token', "");
  }

  getDocument({ id }) {  
    return this.get(`doc/${id}`).catch(err => { return null; });  
  } 

   updateDocument({ input,bucket }) {   

    var doc=Object.assign(input, {bucket:bucket}); 
   
    return this.put(
      `doc`, // path
      JSON.stringify(doc), // request body
    ); 

  } 
   createDocument({ input,bucket }) {     

    var doc=Object.assign(input, {bucket:bucket}); 
   
    return this.post(
      `doc`, // path
      JSON.stringify(doc), // request body
    );     
    
    

  } 
   findDocument( input ) {         
    
    return this.get(`find/${JSON.stringify(input)}`).catch(err => { return null; });    

  } 

   deleteDocument({ id }) {      

    return this.delete(`doc/${id}`).catch(err => { return null; });  

  } 
 

}

module.exports = GovCoreApi;
