<template>
    <div>

        <section>
            <h1 class="title">My Workspace</h1>

            <b-tabs type="is-toggle" expanded v-model="activeTab">
                <b-tab-item label="Documents" icon="google-photos" @click="selectTab('documents')"></b-tab-item>
                <b-tab-item label="Graph" icon="library-music" @click="selectTab('graph')"></b-tab-item>

            </b-tabs>
        </section>

        <div v-if="activeTab === 0">
            <div class="columns is-mobile">

                <div class="column is-2">
                    
                    <a class="button is-info" @click="addDocument()">
                            <span class="icon is-small">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span>Document</span>
                        </a>
                </div>                
                <div class="column is-10">                      
                        <h1 class="title">{{stemplate}}</h1>  
                </div>
               
               
            </div>
            <div class="columns is-mobile">
                <div class="column is-2">
                    
                    <aside class="menu">
                        <ul class="menu-list">
                            <h1 class="subtitle">Templates</h1>
                            
                            
                            <li v-for="tem in templates" :value="tem.id" :key="tem.id">
                                <a @click="getDocuments(tem.type)">{{ tem.type}} </a>
                            </li>
                            <li>
                                    <a class="button is-success" @click="addTemplate()">
                                            <span class="icon is-small">
                                                <i class="fas fa-plus"></i>
                                            </span>
                                            <label>Add</label>
                                        </a>
                            </li>
                           <li>
                                <a class="button is-primary" @click="addTemplate()">
                                        <span class="icon is-small">
                                            <i class="fas fa-edit"></i>
                                        </span>
                                        <label>Edit</label>
                                    </a>
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

                                        <b-table :data="documents" detailed detail-key="id">

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

                                                <article class="media">

                                                    <div class="media-content">
                                                        <div class="content">
                                                            <div class="field is-grouped">
                                                                <div class="control">
                                                                    <a class="button is-primary" @click="aceptUserRequest(props.row)">
                                                                        <span class="icon is-small ">
                                                                            <i class="fas fa-edit"></i>
                                                                        </span>
                                                                        <label>Template</label>
                                                                    </a>
                                                                </div>
                                                                <div class="control">
                                                                    <a class="button is-danger" @click="ignoreUserRequest(props.row.id)">
                                                                        <span class="icon is-small">
                                                                            <i class="fas fa-minus"></i>
                                                                        </span>
                                                                        <label>Template</label>
                                                                    </a>
                                                                </div>
                                                            </div>


                                                            <pre contenteditable="true">{{ props.row}}</pre>

                                                        </div>
                                                    </div>
                                                </article>
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
    </div>
</template>

<script>
    import govcoreapi from '../services/govcoreapi';
    const apicore = new govcoreapi();

    export default {
        data() {
            return {
                templates: [],
                documents: [],
                stemplate: "",
                isLoading: false,
                activeTab: 0

            }
        },
        created() {
            this.getTemplates();
        },
        watch: {
            template() {
                if (this.stemplate)
                    this.getDocuments();

            }
        },

        methods: {

            addTemplate() {

            },
            async getDocuments(tem) {

                this.stemplate = tem;
                this.isLoading = true;
                await apicore.getDocuments(this.stemplate).then(response => {
                    this.documents = response.data
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
            async getTemplates() {
                this.isLoading = true;
                await apicore.getTemplates().then(response => {
                    this.templates = response.data;
                    this.isLoading = false;                    
                    this.stemplate=this.templates[0].type;
                    this.getDocuments(this.stemplate);
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