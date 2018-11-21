<template>
    <div>
        <section>
            <h1 class="title">User</h1>
            <div class="columns is-mobile">

                
                <div class="column is-8">
                   
                    
                    <b-autocomplete rounded :data="filteredDataArray" field="email" placeholder="e.g. Email@email.com" 
                        icon="magnify"  @select="option => selected = option">
                        <template slot="empty">No users found</template>
                    </b-autocomplete>

                </div>
                <div class="column is-4">

                    <div class="field is-grouped">
                        <div class="control">
                            <b-select v-model="model.role" placeholder="Select a role">
                                <option
                                v-for="option in roles"
                                :value="option.id"
                                :key="option.id">
                                {{ option.name }}
                                </option>
                            </b-select>
                        </div>
                        <div class="control">
                            <a class="button is-success" @click="addUser()">
                                <span class="icon is-small">
                                    <i class="fas fa-plus"></i>
                                </span>
                                <span>Add</span>
                            </a>
                        </div>
                    </div>  

                </div>
                

            </div>
        </section>
        <br>
        <b-tabs type="is-toggle" expanded>
            <b-tab-item label="Users" icon="book">
                <b-table :data="usersData" paginated per-page="5" :opened-detailed="defaultOpenedDetails" detailed
                    detail-key="id" @details-open="(row, index) => $toast.open(`Expanded ${row.person.name}`)">

                    <template slot-scope="props">

                        <b-table-column field="person.name" label="User" sortable>
                            {{ props.row.person.name }}
                        </b-table-column>

                        <b-table-column field="person.email" label="Email" sortable>
                            {{ props.row.person.email }}
                        </b-table-column>
                        <b-table-column field="role.name" label="Role" sortable>
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
                                            <strong>{{ props.row.person.email }} ({{ props.row.person.name }})</strong>
                                            <small> -> {{ props.row.role.name }}</small>
                                            <br>
                                        </div>
                                        <div class="column is-one-fifth">
                                            <p class="control">
                                                <a class="button is-danger" @click="deleteUser(props.row.id)">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-minus"></i>
                                                    </span>
                                                    <span>Delete</span>
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
                <b-table :data="usersReqData" paginated per-page="5" detail-key="id">

                    <template slot-scope="props">

                            <b-table-column field="user.name" label="User" sortable>
                                    {{ props.row.person.name }}
                                </b-table-column>
                                <b-table-column field="user.email" label="Email" sortable>
                                        {{ props.row.person.email }}
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
                            <a class="button is-success" @click="aceptUserRequest(props.row)">
                                <span class="icon is-small">
                                    <i class="fas fa-plus"></i>
                                </span>
                                <span>Accept</span>
                            </a>
                            <a class="button is-danger" @click="ignoreUserRequest(props.row.id)" >
                                <span class="icon is-small">
                                    <i class="fas fa-minus"></i>
                                </span>
                                <span>Ignore</span>
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

    const usersData = [];
    const usersReqData = [];   

    export default {
        async created() {
            this.BUSINESS =JSON.parse(localStorage.getItem('objsession')).business,
            this.usersData = await apicore.getBusinessPersons({ business: this.BUSINESS });
            this.usersReqData = await apicore.getBusinessPersonRequests({ business: this.BUSINESS });            
            this.roles = await apicore.getRoles();
            this.persons = await apicore.getPersons();
        },
        data() {
            return {
                BUSINESS:null,
                roles: [],
                persons: [],
                usersData,
                usersReqData,
                defaultOpenedDetails: [0],
                name: '',
                selected: null,
                model: { email: "", role: "5676081265" }
            }
        },
        computed: {
            filteredDataArray() {
                  if (this.persons != undefined) {
                    
                    return this.persons.filter((option) => {

                        return option.name
                            .toString()
                            .toLowerCase()
                            .indexOf(this.name.toLowerCase()) >= 0
                    })
                }
            }

          
        },
        methods: {            
            addUser() {               
                if (this.selected == null) {
                    this.$toast.open({
                        duration: 3000,
                        message: `Please select a user!`,
                        position: 'is-top',
                        type: 'is-danger'
                    });
                    return
                }
                // create a relationship between business and person
                let relationship = {
                    businessId: this.BUSINESS.id,
                    roleId: this.model.role,
                    personId: this.selected.id
                }                 
                 // eslint-disable-next-line 
                apicore.linkPersonToBusiness(relationship).then((result) => {
                    this.$toast.open({
                        message: 'You have added an user to your business!',
                        type: 'is-success'
                    });
                    // TODO: find a better way to pass context
                    let ctx = this;                   
                    

                    apicore.getBusinessPersons({ business: this.BUSINESS })               
                        .then((usersData) => ctx.usersData = usersData)


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
            deleteUser(graphEdgeId) {
                // eslint-disable-next-line 
                apicore.deleteGraphEdge(graphEdgeId).then((result) => {
                    // TODO: find a better way to pass context
                    this.$toast.open({
                        message: 'You have deleted the user!',
                        type: 'is-success'
                    });
                    let ctx = this;
                    apicore.getBusinessPersons({ business: this.BUSINESS })
                        .then((usersData) => ctx.usersData = usersData)
                });
            },
            aceptUserRequest(row) {
                // eslint-disable-next-line 
                  // create a relationship between business and service
                  let relationship = {
                    businessId: row.business.id,
                    personId: row.person.id,
                    roleId: row.role.id
                }
                // eslint-disable-next-line 
                apicore.linkPersonToBusiness(relationship).then((result) => {
                    this.$toast.open({
                        message: 'You have accepted the user request!',
                        type: 'is-success'
                    });
                    // TODO: find a better way to pass context
                    let ctx = this;                    
                    // eslint-disable-next-line 
                        apicore.deleteGraphEdge(row.id).then((result) => {
                            // TODO: find a better way to pass context                            
                            let ctx = this;
                            apicore.getBusinessPersonRequests({ business: this.BUSINESS })                  
                                .then((usersReqData) => ctx.usersReqData= usersReqData)
                        });

                    apicore.getBusinessPersons({ business: this.BUSINESS })               
                        .then((usersData) => ctx.usersData = usersData)

                    

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
            ignoreUserRequest(graphEdgeId) {
                // eslint-disable-next-line 
                apicore.deleteGraphEdge(graphEdgeId).then((result) => {
                    // TODO: find a better way to pass context
                    this.$toast.open({
                        message: 'You have ignored the user request!',
                        type: 'is-success'
                    });
                    let ctx = this;
                    
                   

                    apicore.getBusinessPersonRequests({ business: this.BUSINESS })                  
                                .then((usersReqData) => ctx.usersReqData= usersReqData)
                });
            }
        }
    }
</script>