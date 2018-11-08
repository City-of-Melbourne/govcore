<template>
    <div>
        <section>
            <h1 class="title">Join Service</h1>
            <div class="columns is-desktop">

                <div class="column is-four-fifths">

                    <b-autocomplete rounded v-model="name" :data="filteredDataArray" field="name" placeholder="e.g. Handsbills" icon="magnify"
                        @select="option => selected = option">
                        <template slot="empty">No services found</template>
                    </b-autocomplete> 
                </div>
                <div class="column">
                    <a class="button is-success" @click="joinService()">
                        <span class="icon is-small">
                            <i class="fas fa-plus"></i>
                        </span>
                        <span>Join</span>
                    </a>
                     
                </div>
            </div>
        </section>
        <br>
        <b-table :data="serviceData" paginated per-page="10" :opened-detailed="defaultOpenedDetails" detailed detail-key="id"
            @details-open="(row, index) => $toast.open(`Expanded ${row.service.name}`)">

            <template slot-scope="props">

                <b-table-column field="service.name" label="Service" sortable>
                    {{ props.row.service.name }}
                </b-table-column>               
                <b-table-column field="date" label="Joined date" sortable centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                </b-table-column>

            </template>

            <template slot="detail" slot-scope="props">
                <article class="media">                    
                    <div class="media-content">
                        <div class="content">      

                            <div class="columns is-desktop">

                                <div class="column">
                                    <strong>{{ props.row.service.name}}</strong>                                                                   
                                    <br>
                                    <small>{{props.row.date}}</small>                                    
                                </div>
                                 <div class="column is-one-fifth"><p class="control">                                       
                                        <a class="button is-danger" @click="leaveService(props.row.id)">
                                            <span class="icon is-small">
                                                <i class="fas fa-minus"></i>
                                            </span>
                                            <span>Leave</span>
                                        </a>
                                    </p> 
                                </div>
                            </div>                                        
                                             
                            
                        </div>
                    </div>
                </article>
            </template>
        </b-table>
    </div>
</template>

<script>
    

    import { Toast } from 'buefy/dist/components/toast';
    import  coreApiGraphql from '../../services/coreApiGraphql';
    const apicore = new coreApiGraphql();

    let serviceData =  [];

    // TODO: Replace with logged in business
    let BUSINESS  = { id: "0828152973" };

    export default {        
        
        async created(){

                this.serviceData= await apicore.getBusinessServices({ business: BUSINESS });
                this.services= await apicore.getServices();
        },
        data() {
            return {
                services: [],                
                serviceData,
                defaultOpenedDetails: [0],
                name: '',
                selected: null
            }
        },
        computed: {
            filteredDataArray() {
            if(this.services!= undefined)   {
                return this.services.filter((option) => {                    
                    
                    return option.name
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }

                
            }
        },
        methods: {
            joinService() {
                if (this.selected == null) {
                    Toast.open({
                        duration: 3000,
                        message: `Please select a service!`,
                        position: 'is-top',
                        type: 'is-danger'
                    });
                    return
                }

                // create a relationship between business and service
                let relationship = {
                    businessId: BUSINESS.id,
                    serviceId: this.selected.id
                }
                apicore.linkBusinessAndService(relationship).then((result) => {
                    Toast.open({
                        message: 'You have joined the service!',
                        type: 'is-success'
                    });

                    // TODO: find a better way to pass context
                    let ctx = this;
                    apicore.getBusinessServices({ business: BUSINESS })
                           .then((serviceData) => ctx.serviceData = serviceData)

                }).catch(err => {
                    // TODO extract into function
                    Toast.open({
                        duration: 3000,
                        message: "Something's not good, try again",
                        position: 'is-top',
                        type: 'is-danger'
                    });
                });
            },
            leaveService(graphEdgeId) {
                apicore.deleteGraphEdge(graphEdgeId).then((result) => {
                    // TODO: find a better way to pass context
                    let ctx = this;
                    apicore.getBusinessServices({ business: BUSINESS })
                           .then((serviceData) => ctx.serviceData = serviceData)
                });
            }
        }
    }

</script>