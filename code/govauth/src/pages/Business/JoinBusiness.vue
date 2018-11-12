<template>
    <div>
        <section>
            <h1 class="title">Join Business</h1>
            <div class="columns is-desktop">

                <div class="column is-four-fifths">

                    <b-autocomplete rounded v-model="name" :data="filteredDataArray" field="name" placeholder="e.g. Business Name" 
                        icon="magnify"  @select="option => selected = option">
                        <template slot="empty">No businesses found</template>
                    </b-autocomplete>

                </div>
                
                <div class="column is-1">
                    <b-dropdown v-model="model.role">
                        <button class="button is-primary" slot="trigger">
                            <span>Role</span>
                            <b-icon icon="menu-down"></b-icon>
                        </button>
                        <b-dropdown-item v-for="option in roles" :key="option.id" :value="option.id"> {{option.name}}</b-dropdown-item>

                    </b-dropdown>

                </div>
                <div class="column is-1">
                    <a class="button is-success" @click="joinBusiness()">
                        <span class="icon is-small">
                            <i class="fas fa-plus"></i>
                        </span>
                        <span>Join</span>
                    </a>
                </div>

            </div>
        </section>
        <br>
        <b-tabs type="is-toggle" expanded>
            <b-tab-item label="Businesses" icon="book">
                <b-table :data="businessData" paginated per-page="5" :opened-detailed="defaultOpenedDetails" detailed
                    detail-key="id" >

                    <template slot-scope="props">

                        <b-table-column field="user.name" label="Company" sortable>
                            {{ props.row.business.name }}
                        </b-table-column>


                        <b-table-column field="user.role" label="Role" sortable>
                            {{ props.row.role.name }}
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
                                            <strong>{{ props.row.business.name }}</strong>
                                            <small> -> {{ props.row.role.name }}</small>
                                            <br>
                                        </div>
                                        <div class="column is-one-fifth">
                                            <p class="control">
                                                <a class="button is-danger" @click="leaveBusiness(props.row.id)">
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
            </b-tab-item>
            <b-tab-item label="Requests" icon="exclamation">
                <b-table :data="businessReqData" paginated per-page="5"  detail-key="id" >

                    <template slot-scope="props">

                        <b-table-column field="user.name" label="Company" sortable>
                            {{ props.row.business.name }}
                        </b-table-column>

                        <b-table-column field="user.role" label="Role" sortable>
                            {{ props.row.role.name }}
                        </b-table-column>

                        <b-table-column field="date" label="Joined date" sortable centered>
                            <span class="tag is-success">
                                {{ new Date(props.row.date).toLocaleDateString() }}
                            </span>
                        </b-table-column>

                        <b-table-column field="date" label="Action" sortable centered>
                            
                             <a class="button is-danger" @click="deletePersonToBusinessRequest(props.row.id)">
                                            <span class="icon is-small">
                                                <i class="fas fa-minus"></i>
                                            </span>
                                            <span>Delete</span>
                                        </a>
                        </b-table-column>
                      

                    </template>

                 
                </b-table>


            </b-tab-item>


           
           

        </b-tabs>

    </div>
</template>

<script>
    import coreApiGraphql from '../../services/coreApiGraphql';
    const apicore = new coreApiGraphql();

    let businessData  = [];
    let businessReqData=[];
    let businessInvData=[];

    // TODO: Replace with logged in business
    let PERSON = { id: "5676081261" };

    export default {

        async created() {

            this.businessData = await apicore.getPersonsBusinesses({ person: PERSON });            
            this.businessReqData = await apicore.getPersonBusinessRequests({ person: PERSON,business:"" });

            
            

            this.businesses = await apicore.getBusinesses();
            this.roles = await apicore.getRoles();
            
        },
        data() {
            return {
                businesses: [],
                roles: [],
                businessData,
                businessReqData,
                businessInvData,
                defaultOpenedDetails: [0],
                name: '',
                selected: null,                
                model: { email: null, role: null }
            }
        },
        computed: {
            filteredDataArray() {
                
                if (this.businesses != undefined) {
                    
                    return this.businesses.filter((option) => {

                        return option.name
                            .toString()
                            .toLowerCase()
                            .indexOf(this.name.toLowerCase()) >= 0
                    })
                }
            }
        },
        methods: {
            joinBusiness() {
                if (this.selected == null) {
                    this.$toast.open({
                        duration: 3000,
                        message: `Please select a business!`,
                        position: 'is-top',
                        type: 'is-danger'
                    });
                    return
                }
                
                if (this.model.role== null) {
                    this.$toast.open({
                        duration: 3000,
                        message: `Please select a role!`,
                        position: 'is-top',
                        type: 'is-danger'
                    });
                    return
                }

                // create a relationship between business and service
                let relationship = {
                    
                    businessId:  this.selected.id ,
                    personId: PERSON.id,
                    roleId: this.model.role,

                }
                // eslint-disable-next-line 
                apicore.createPersonToBusinessRequest(relationship).then((result) => {
                    this.$toast.open({
                        message: 'You have sent a request to join to the business!',
                        type: 'is-success'
                    });

                    // TODO: find a better way to pass context
                    let ctx = this;
                     
                    apicore.getPersonBusinessRequests({ person: PERSON })
                        .then((businessReqData) => ctx.businessReqData = businessReqData)

                }).catch(// eslint-disable-next-line 
                    err => {
                        // TODO extract into function
                        this.$toast.open({
                            duration: 3000,
                            message: "Something's not good, try again",
                            position: 'is-top',
                            type: 'is-danger'
                        });
                    });
            },
            leaveBusiness(graphEdgeId) {
                // eslint-disable-next-line 
                apicore.deleteGraphEdge(graphEdgeId).then((result) => {
                    // TODO: find a better way to pass context
                    this.$toast.open({
                        message: 'You have left the business!',
                        type: 'is-success'
                    });
                    let ctx = this;
                    apicore.getPersonsBusinesses({ person: PERSON })                  
                        .then((businessData) => ctx.businessData= businessData)
                });
            },     
            deletePersonToBusinessRequest(graphEdgeId) {
                // eslint-disable-next-line 
                apicore.deleteGraphEdge(graphEdgeId).then((result) => {
                    // TODO: find a better way to pass context
                    this.$toast.open({
                        message: 'You have deleted your request!',
                        type: 'is-success'
                    });
                    let ctx = this;
                    apicore.getPersonBusinessRequests({ person: PERSON })                  
                        .then((businessReqData) => ctx.businessReqData= businessReqData)
                });
            }, 
            
            acceptBusinessRequest(row) {
                
                
                // create a relationship between business and service
                let relationship = {
                    businessId: row.business.id,
                    persond: row.person.id,
                    roleId: row.role.id
                }
                // eslint-disable-next-line 
                apicore.linkPersonToBusiness(relationship).then((result) => {
                    this.$toast.open({
                        message: 'You have accepted the business request!',
                        type: 'is-success'
                    });
                    // TODO: find a better way to pass context
                    let ctx = this;                    
                    // eslint-disable-next-line 
                        apicore.deleteGraphEdge(row.id).then((result) => {
                            // TODO: find a better way to pass context                            
                            let ctx = this;
                            apicore.getBusinessPersonRequests({ person: PERSON })                  
                                .then((businessInvData) => ctx.businessInvData= businessInvData)
                        });

                    apicore.getPersonsBusinesses({ person: PERSON })                   
                        .then((businessData) => ctx.businessData = businessData)

                    

                }).catch(// eslint-disable-next-line 
                    err => {
                        // TODO extract into function
                        this.$toast.open({
                            duration: 3000,
                            message: "Something's not good, try again",
                            position: 'is-top',
                            type: 'is-danger'
                        });
                    });

                
            },
            ignoreBusinessRequest(graphEdgeId) {
                // eslint-disable-next-line 
                apicore.deleteGraphEdge(graphEdgeId).then((result) => {
                    // TODO: find a better way to pass context
                    this.$toast.open({
                        message: 'You have rejected the business request!',
                        type: 'is-success'
                    });
                    let ctx = this;
                    
                    apicore.getPersonBusinessRequests({ person: PERSON })                   
                        .then((businessReqData) => ctx.businessReqData = businessReqData)
                });
            }
        }
    }
</script>