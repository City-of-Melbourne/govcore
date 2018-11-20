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

   updateDocument({ bucket,type }) {   

    var doc=Object.assign(Input, { bucket,type}); 
    return this.put('doc', doc).catch(err => { return null; });  

  } 
   createDocument({ Input,Bucket,Type }) {     

    var doc=Object.assign(Input, {bucket:Bucket,type:Type}); 
    return this.post('doc', doc).catch(err => { return null; });       

  } 
   findDocument( input ) {         
    
    return this.get(`find/${JSON.stringify(input)}`).catch(err => { return null; });    

  } 

   deleteDocument({ id }) {      

    return this.delete(`doc/${id}`).catch(err => { return null; });  

  } 
 

}

module.exports = GovCoreApi;
