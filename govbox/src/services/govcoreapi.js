const axios = require("axios");

export default class govcoreapi {

    constructor() {
        
    }
    get apiURL() {
        return "http://ec2-3-16-136-94.us-east-2.compute.amazonaws.com:3000/";
    }
    getTemplates() {
        return axios.get(this.apiURL + `find/${JSON.stringify({ bucket: 'templates' })}`);
    }
    getDocument(param) {
        return axios.get(this.apiURL + `doc/${param}`);
    }
    getDocuments(template) {
        return axios.get(this.apiURL + `find/${JSON.stringify({ type: template })}`);
    }
    updateTemplate(document){
        return axios.put(this.apiURL + `doc`,document);
    }
    createTemplate(document){
        return axios.post(this.apiURL + `doc`,document);
    }
    deleteTemplate(param){
        return axios.delete(this.apiURL + `doc/${param}`);
    }
    
}
