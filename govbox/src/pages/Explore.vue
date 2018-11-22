<template>
    <div>
        <div class="columns is-mobile ">
            <div class="column is-10">
                <div class="field is-grouped">
                    <div class="control">
                        <b-select placeholder="Select" >
                            <option v-for="template in templates" :value="template.id" :key="template.id" @input="getDocuments(template.id)">
                                {{ template.person}}
                            </option>
                        </b-select>
                    </div>
                    <div class="control">
                        <a class="button is-success">
                            <span class="icon is-small">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span>Template</span>
                        </a>
                    </div>
                    <div class="control">

                        <a class="button is-primary">
                            <span class="icon is-small">
                                <i class="fas fa-edit"></i>
                            </span>
                            <span>Template</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="column">    </div>
            <div class="column">    </div>
            <div class="column"> <a class="button is-secondary">

                    <span class="icon is-small">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span>Document</span>
                </a></div>
        </div>



        <div class="tile is-ancestor">


            <div class="tile is-parent">
                <article class="tile is-child notification is-success">
                    <div class="content">
                        <p class="title">Documents</p>                        
                        <div class="content">
                            <!-- Content -->
                        </div>
                    </div>
                </article>
            </div>


        </div>
    </div>
</template>

<script>
    import govcoreapi from '../services/govcoreapi';
    const apicore = new govcoreapi();

    export default {
        
        async created(){
             apicore.getTemplates().then(response => {                
                        this.templates = response.data
                    })
                    .catch(e => {
                        this.$toast.open({
                            duration: 3000,
                            message: "Something's not good, try again",
                            position: 'is-top',
                            type: 'is-danger'
                        });
                    });         
        },
        data() {
            return { templates:null,
                     documents:null 
                   }
        },
        methods:{
                addTemplate(){

                },
                getDocuments(template){
                    apicore.getDocuments(template).then(response => {                
                        this.documents = response.data
                    })
                    .catch(e => {
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