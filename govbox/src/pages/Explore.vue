<template>
    <div>

        <section>
            <h1 class="title">My Workspace</h1>

            <b-tabs type="is-toggle" expanded v-model="activeTab">
                <b-tab-item label="Documents"  @click="selectTab('documents')"></b-tab-item>
                <b-tab-item label="Graph"  @click="selectTab('graph')"></b-tab-item>

            </b-tabs>
        </section>

        <div v-if="activeTab === 0">
            <div class="columns is-mobile">

                <div class="column is-2">

                    <div class="field is-grouped">
                        <div class="control">
                        <a class="button is-info" @click="addDocument()">
                            <span class="icon is-small">
                                <i class="fas fa-plus"></i>
                            </span>                            
                        </a>
                        </div>
                        <div class="control">
                        <a class="button is-success" @click="refreshDocuments()">
                            <span class="icon is-small">
                                <i class="fas fa-sync"></i>
                            </span>
                            
                        </a>
                        </div>
                    </div>
                    
                </div>
                
                <div class="column is-10">                     
                    <h1 class="title">{{stemplate}}</h1>
                </div>


            </div>
            <div class="columns is-mobile">
                <div class="column is-2">

                    <aside class="menu">
                        <ul class="menu-list">
                  

                            <b-select placeholder="Bucket"  v-model="bucket">
                                <option value="entities">Entities</option>   
                                <option value="templates">Templates</option>
                            </b-select>
                 
                       
                            <li v-for="tem in templates" :value="tem.id" :key="tem.id">

                                <a @click="getContent(tem.type,tem.id)">{{ tem.type}} </a>
                            
                            </li>
                            
                           

                        </ul>


                    </aside>

                </div>
                <div class="column is-10">
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child">
                                <div class="content">

                                    <div class="content">

                                        <b-table :data="documents" detailed detail-key="id"  @details-open="(row, index) => getEvents(row.id)">

                                            <template slot-scope="props">

                                                <b-table-column field="id" label="ID" sortable>
                                                    {{ props.row.id }}
                                                </b-table-column>

                                                <b-table-column field="type" label="Type" sortable>
                                                    {{ props.row.type }}
                                                </b-table-column>

                                                <b-table-column field="bucket" label="Bucket" sortable>
                                                    {{ props.row.bucket }}
                                                </b-table-column>

                                            </template>

                                            <template slot="detail" slot-scope="props">

                                               
                                                <div class="columns is-mobile">
                                                    <div class="column is-6">
                                                        <div class="media-content">
                                                            <div class="content">
                                                                <div class="field is-grouped">
                                                                    <div class="control">
                                                                        <a class="button is-primary" @click="updateDocument(props.row)">
                                                                            <span class="icon is-small ">
                                                                                <i class="fas fa-edit"></i>
                                                                            </span>
                                                                            <span>Edit</span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="control">
                                                                        <a class="button is-danger" @click="deleteDocument(props.row.id)">
                                                                            <span class="icon is-small">
                                                                                <i class="fas fa-minus"></i>
                                                                            </span>
                                                                            <span>Delete</span>
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                <pretty-print :value="props.row"></pretty-print>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="column is-6">   
                                                        <h2 class="subtitle">Events</h2>                                                 
                                                        <b-table :data="events"  detail-key="human_time"  >
                                                            <template slot-scope="evs">
                                                                <b-table-column field="name" label="Event" sortable>
                                                                    {{ evs.row.name }}
                                                                </b-table-column>                                                               
                                                                <b-table-column field="human_time" label="Time" sortable>
                                                                    {{ evs.row.human_time }}
                                                                </b-table-column>
                                                            </template>
                                                        </b-table>
                                                    </div>
                                                </div>       
                                            </template>
                                        </b-table>


                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                 
                </div>
            </div>


        </div>
        <div v-if="activeTab === 1"></div>

        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep" >
            <div class="card">
               
                <div class="card-content">

                        <h1 class="title" v-if="creating"> Creating </h1>
                        <h1 class="title" v-if="!creating"> Editing </h1>
                        <h2 class="subtitle">{{this.stemplate}} </h2>

                        <vue-form-json-schema :model="model" :schema="schema" :ui-schema="uiSchema" v-on:change="onChange"
                            v-on:state-change="onChangeState" v-on:validated="onValidated">
                        </vue-form-json-schema>
                        <br>
                        
                        <h2 class="subtitle">Document</h2>
                        <pretty-print :value="model"></pretty-print>
                      

                        <div class="field is-grouped">
                            <div class="control">
                                <a class="button is-success" @click="save(model)">
                                    <span class="icon is-small ">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                    <span>Save</span>
                                </a>
                            </div>
                            
                        </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    // Import VueFormJsonSchema
    import VueFormJsonSchema from 'vue-form-json-schema';
    import PrettyPrint from '../components/pretty-print';
    import govcoreapi from '../services/govcoreapi';

    const apicore = new govcoreapi();


    export default {
        name: 'Explore-Component',
        components: {
            'vue-form-json-schema': VueFormJsonSchema,
            'pretty-print': PrettyPrint
        },
        data() {
            return {
                templates: [],
                documents: [],                
                events: [],
                stemplate: "",
                idtemplate: "",
                isLoading: false,
                valid: false,
                isCardModalActive:false,
                creating:false,
                activeTab: 0,                
                model: {},
                state: {},               
                schema: {},
                uiSchema: [],
                bucket:"entities"
            }
        },
       async created() {
            this.isLoading=true;
                await this.getTemplates();
                //LOADING THE FIRST TEMPLATE AS DEFAULT DURING THE INITIAL PHASE
                this.stemplate = this.templates[0].type;
                this.idtemplate = this.templates[0].id;
                this.getDocuments(this.stemplate, this.idtemplate);  
            this.isLoading=false;                  
        },
        watch:{
              bucket: function () {
                    this.refreshDocuments();
                }
        },
        methods: {

            onChange(value) {
              
                this.model = value;
            },
            onChangeState(value) {
                this.state = value;
            },
            onValidated(value) {
                this.valid = value;
            },
            async addDocument() {
                this.isCardModalActive=true;
                this.model={};
                this.creating=true;

            },
            async addTemplate() {
                this.isCardModalActive=true;

            },
            async editTemplate() {
                this.isCardModalActive=true;
                this.creating=false;

            },
            async refreshDocuments(){
              
               await this.getDocuments(this.stemplate, this.idtemplate);
               await this.getTemplates();
            },
            async save(docum){

            this.isLoading = true;

                    if(this.creating){

                        await apicore.createDocument(docum).then(response => {

                                        
                                        // eslint-disable-next-line 
                                        this.model=response.data;
                                        this.$toast.open({
                                            message: 'Document created succesfully!',
                                            type: 'is-success'
                                        });
                                        this.refreshDocuments();

                                        this.isLoading = false;
                                    })// eslint-disable-next-line 
                                        .catch(e => {
                                            this.isLoading = false;
                                            this.$toast.open({
                                                duration: 4000,
                                                message: "Something's not good." + e,
                                                position: 'is-top',
                                                type: 'is-danger'
                                            });
                                        });

                    }
                    else
                    {
                    await apicore.updateDocument(docum).then(response => {

                                        
                                        // eslint-disable-next-line 
                                        this.model=response.data;
                                        this.$toast.open({
                                            message: 'Document updated succesfully!',
                                            type: 'is-success'
                                        });
                                        this.isLoading = false;

                                        this.refreshDocuments();
                                        

                                    })// eslint-disable-next-line 
                                        .catch(e => {
                                            this.isLoading = false;
                                            this.$toast.open({
                                                duration: 4000,
                                                message: "Something's not good." + e,
                                                position: 'is-top',
                                                type: 'is-danger'
                                            });
                                        });
                    }
            },
            async updateDocument(docum) {
          
                this.isCardModalActive=true;
                this.model=docum;

            },
            async deleteDocument(docum) {


                    this.$dialog.confirm({
                    title: 'Deleting',
                    message: 'Are you sure you want to <b>delete</b> this document? ',
                    confirmText: 'Delete',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => {
                        this.isLoading = true;
                         apicore.deleteTemplate(docum).then(response => {
                            // eslint-disable-next-line 
                            var something = response;
                            this.isLoading = false;
                            this.getDocuments(this.stemplate, this.idtemplate);     
                        })// eslint-disable-next-line 
                        .catch(e => {
                        this.isLoading = false;
                            this.$toast.open({
                                duration: 4000,
                                message: "Something's not good." + e,
                                position: 'is-top',
                                type: 'is-danger'
                            });
                        });   
                                     
                    }
                })
            },
            async getContent(stemplate, idtemplate){  
                

                    this.getDocuments(stemplate,idtemplate)

            },
            async getDocuments(stemplate, idtemplate) {

                this.stemplate = stemplate;
                this.idtemplate = idtemplate;
                this.isLoading = true;
                
                await apicore.getDocuments(this.stemplate,this.bucket).then(response => {
                    this.documents = response.data;

                    //LOADING SCHEMA
                    apicore.getDocument(this.idtemplate).then(response => {                       
                     
                        this.schema = response.data.schema;          
                        
                        var fields =Object.keys(response.data.schema.properties);                        
                        this.uiSchema=[];
                        fields.forEach( field => {                    
                            this.uiSchema.push({
                                component:"b-input",
                                model:field,  
                                fieldOptions: { 
                                    on: ['input'] ,
                                    attrs: {
                                        placeholder: "Please enter -> "+field}, 
                                    }})
                        });    
                        
                        this.isLoading = false;

                    })// eslint-disable-next-line 
                        .catch(e => {
                            this.isLoading = false;
                            this.$toast.open({
                                duration: 3000,
                                message: "Something's not good, try again",
                                position: 'is-top',
                                type: 'is-danger'
                            });
                        });
                })// eslint-disable-next-line 
                    .catch(e => {
                        this.isLoading = false;
                        this.$toast.open({
                            duration: 3000,
                            message: "Something's not good, try again",
                            position: 'is-top',
                            type: 'is-danger'
                        });
                    });
                    
                  
            },
            async getGraphEdges(stemplate,idtemplate){

                this.isLoading = true;
                this.stemplate = stemplate;
                this.idtemplate = idtemplate;

                await apicore.getGraphEdges().then(response => {
                    
                    this.isLoading = false;
                    this.documents = response.data


                    //LOADING SCHEMA
                    apicore.getDocument(this.idtemplate).then(response => {                       
                     
                        this.schema = response.data.schema;           

                        var fields =Object.keys(response.data.schema.properties);                        
                        this.uiSchema=[];
                        fields.forEach( field => {                    
                            this.uiSchema.push({component:"input",model:field,  fieldOptions: { on: ['input']  }})
                        });    

                        this.isLoading = false;

                    })// eslint-disable-next-line 
                        .catch(e => {
                            this.isLoading = false;
                            this.$toast.open({
                                duration: 3000,
                                message: "Something's not good, try again",
                                position: 'is-top',
                                type: 'is-danger'
                            });
                        });

                    
                    

                })// eslint-disable-next-line 
                    .catch(e => {
                        this.isLoading = false;
                        this.$toast.open({
                            duration: 3000,
                            message: "Something's not good, try again",
                            position: 'is-top',
                            type: 'is-danger'
                        });
                    });
            },
            async getTemplates() {
                this.isLoading = true;
                await apicore.getTemplates().then(response => {
                    this.templates = response.data;
                    this.isLoading = false;
                    
                })// eslint-disable-next-line 
                    .catch(e => {
                        this.isLoading = false;
                        this.$toast.open({
                            duration: 3000,
                            message: "Something's not good, try again",
                            position: 'is-top',
                            type: 'is-danger'
                        });
                    });

            },
            async getEvents(documentId){

                this.isLoading = true;
                await apicore.getEvents(documentId).then(response => {
                    this.events = response.data;
                    this.isLoading = false;
                    
                })// eslint-disable-next-line 
                    .catch(e => {
                        this.isLoading = false;
                        this.$toast.open({
                            duration: 3000,
                            message: "Something's not good, try again",
                            position: 'is-top',
                            type: 'is-danger'
                        });
                    });
            }
        }

    }

</script>