const axios = require("axios");

export default class govcoreapi {

    constructor() {
        
    }
    get apiURL() {
        return "http://localhost:8001/";
    }
    getTemplates() {
        return axios.get(this.apiURL + `find/${JSON.stringify({ bucket: 'templates' })}`);
    }
    getGraphEdges() {
        return axios.get(this.apiURL + `find/${JSON.stringify({ bucket: 'graph_edges' })}`);
    }
    getDocument(param) {
        return axios.get(this.apiURL + `doc/${param}`);
    }
    getDocuments(template,bucket) {
        return axios.get(this.apiURL + `find/${JSON.stringify({ type: template,bucket: bucket})}`);
    }
    updateDocument(document){
        return axios.put(this.apiURL + `doc`,document);
    }
    createDocument(document){
        return axios.post(this.apiURL + `doc`,document);
    }
    deleteTemplate(param){
        return axios.delete(this.apiURL + `doc/${param}`);
    }
    getEvents(documentId) {
        return axios.get(this.apiURL + `find/${JSON.stringify({ doc_id: documentId,bucket: "events"})}`);
    }
    
}
