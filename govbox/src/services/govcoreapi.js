const axios = require("axios");

export default class govcoreapi {   
     
    constructor() {   
             ;
      }   
      get apiURL() {
        return "http://ec2-3-16-136-94.us-east-2.compute.amazonaws.com:3000/";
      }  
     getTemplates(){
              
        return axios.get(this.apiURL+`find/${JSON.stringify({bucket:'templates'})}`);
    }
    getDocuments(template){
              
        return axios.get(this.apiURL+`find/${JSON.stringify({type:template})}`);
    }
}
