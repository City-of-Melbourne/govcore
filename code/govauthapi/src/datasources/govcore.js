const { RESTDataSource } = require('apollo-datasource-rest');

class GovCoreApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://ec2-3-16-136-94.us-east-2.compute.amazonaws.com:3000/';
  }  

  willSendRequest(request) {
    //request.params.set('token', "");
  }

  getDocument({ Id }) {  
    return this.get(`doc/${Id}`).catch(err => { return null; });  
  } 

  async updateDocument({ Id,Bucket,Type }) {      
    
    var doc=Object.assign(Input, { bucket: Bucket,type: Type});  
    const res = await this.put('doc', doc);    
    return res[0] && res.length ? res[0] : {};
    

  } 
   createDocument({ Input,Bucket }) {     

    var doc=Object.assign(Input, { bucket: Bucket}); 
    return this.post('doc', doc).catch(err => { return null; });   
    

  } 

  async findDocument( Input ) {       
   
    return this.get('find',{props: JSON.stringify(Input)});     

  } 

   deleteDocument({ Id }) {      

    return this.delete(`doc/${Id}`).catch(err => { return null; });  

  } 
 

}

module.exports = GovCoreApi;
