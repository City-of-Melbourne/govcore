const { RESTDataSource } = require('apollo-datasource-rest');

class GovCoreApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }  

  willSendRequest(request) {
    request.params.set('token', "");
  }

  async getDocument({ Id }) {       
   
    const res = await this.get('doc', { id: Id });
    
    return res[0] && res.length ? res[0] : {};
    

  } 

  async updateDocument({ Id,Bucket,Type }) {      
    
    var doc=Object.assign(Input, { bucket: Bucket,type: Type});  
    const res = await this.put('doc', doc);    
    return res[0] && res.length ? res[0] : {};
    

  } 
  async createDocument({ Input,Bucket,Type }) {       

    var doc=Object.assign(Input, { bucket: Bucket,type: Type}); 
    const res = await this.post('doc', doc);    
    return res[0] && res.length ? res[0] : {};    

  } 

  async findDocument({ Input }) {       
   
    return [];
   

  } 

 

}

module.exports = GovCoreApi;
