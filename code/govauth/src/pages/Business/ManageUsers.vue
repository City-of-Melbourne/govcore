<template>
    <div>
        <section>
            <h1 class="title">Users</h1>
            <div class="columns is-desktop">

                <div class="column is-four-fifths">
                    <b-field>
                        <b-input placeholder="Email" type="email" icon="email">
                        </b-input>
                    </b-field>
                </div>
                <div class="column">
                    <b-dropdown>
                        <button class="button is-primary" slot="trigger">
                            <span>Role</span>
                            <b-icon icon="menu-down"></b-icon>
                        </button>
                        <b-dropdown-item>Admin</b-dropdown-item>
                        <b-dropdown-item>Login</b-dropdown-item>
                    </b-dropdown>
                </div>
                <div class="column">
                    <a class="button is-success">
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
            <b-tab-item label="Users" icon="book">
                <b-table :data="usersData" paginated per-page="5" :opened-detailed="defaultOpenedDetails" detailed
                    detail-key="id" @details-open="(row, index) => $toast.open(`Expanded ${row.user.name}`)">

                    <template slot-scope="props">

                        <b-table-column field="user.name" label="User" sortable>
                            {{ props.row.name }}
                        </b-table-column>

                        <b-table-column field="row.email" label="Email" sortable>
                            {{ props.row.email }}
                        </b-table-column>
                        <b-table-column field="user.role" label="Role" sortable>
                            {{ props.row.role }}
                        </b-table-column>

                        <b-table-column field="date" label="Joined date" sortable centered>
                            <span class="tag is-success">
                                {{ new Date(props.row.joined).toLocaleDateString() }}
                            </span>
                        </b-table-column>

                    </template>

                    <template slot="detail" slot-scope="props">
                        <article class="media">
                            <div class="media-content">
                                <div class="content">

                                    <div class="columns is-desktop">


                                        <div class="column">
                                            <strong>{{ props.row.email }} ({{ props.row.name }})</strong>
                                            <small> -> {{ props.row.role }}</small>
                                            <br>
                                            <small>{{props.row.description}}</small>

                                        </div>
                                        <div class="column is-one-fifth">
                                            <p class="control">
                                                <a class="button is-danger">
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
                <b-table :data="usersReqData" paginated per-page="5" detail-key="id">

                    <template slot-scope="props">

                        <b-table-column field="row.name" label="User" sortable>
                            {{ props.row.name }}
                        </b-table-column>
                        <b-table-column field="row.email" label="Email" sortable>
                            {{ props.row.email }}
                        </b-table-column>
                        <b-table-column field="row.role" label="Role" sortable>
                            {{ props.row.role }}
                        </b-table-column>



                        <b-table-column field="date" label="Invitation date" sortable centered>
                            <span class="tag is-success">
                                {{ new Date(props.row.invited).toLocaleDateString() }}
                            </span>
                        </b-table-column>
                        <b-table-column field="date" label="Action" sortable centered>
                            <a class="button is-success">
                                <span class="icon is-small">
                                    <i class="fas fa-plus"></i>
                                </span>
                                <span>Accept</span>
                            </a>
                            <a class="button is-danger">
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


    
    import  coreApiGraphql from '../../services/coreApiGraphql';
    const apicore = new coreApiGraphql();

    const usersData = [];
    const usersReqData = [];

    let BUSINESS  = { id: "3357665841" };

    export default {
         async created(){
            
                this.usersData= await apicore.getBusinessUsers({ business: BUSINESS });
                this.usersReqData= await apicore.getBusinessUserRequests({ business: BUSINESS });
                this.roles= await apicore.getRoles();
        },
        data() {
            return {
                roles: [], 
                usersData,
                usersReqData,
                defaultOpenedDetails: [0],
                name: '',
                selected: null
            }
        },
        computed: {
            filteredDataArray() {
                return this.data.filter((option) => {
                    return option
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                })
            }
        },
        methods:{
            // AXIOS HTTP CALLS - REQUESTING DATA FROM  GRAPHQL
            async getUsersBusiness () {                   
                
                        // axios({
                        //     url: 'https://1jzxrj179.lp.gql.zone/graphql',
                        //     method: 'post',
                        //     data: {
                        //         query: `
                        //                 query PostsForAuthor {
                        //                     author(id: 1) {
                        //                     firstName
                        //                         posts {
                        //                         title
                        //                         votes
                        //                         }
                        //                     }
                        //                     }
                        //         `
                        //     }
                        //     }).then((result) => {
                        //         //console.log(result.data)                                
                        //     });

                }
        }
    }
</script>