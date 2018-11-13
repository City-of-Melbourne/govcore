<template>
    <div>
        <section>
            <h1 class="title">Join Service</h1>
            <div class="columns is-desktop">

                <div class="column is-four-fifths">

                    <b-autocomplete rounded v-model="name" :data="filteredDataArray" field="name" placeholder="e.g. Handsbills"
                        icon="magnify" @select="option => selected = option">
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
        <b-table :data="serviceData" paginated per-page="10" :opened-detailed="defaultOpenedDetails" detailed
            detail-key="id" >

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
                                <div class="column is-one-fifth">
                                    <p class="control">
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
    import coreApiGraphql from '../../services/coreApiGraphql';
    const apicore = new coreApiGraphql();
    let serviceData = [];
    
    export default {

        async created() {
            this.BUSINESS=this.$root.$data.business;
            this.serviceData = await apicore.getBusinessServices({ business: this.BUSINESS });
            this.services = await apicore.getServices();
        },
        data() {
            return {
                BUSINESS:null,
                services: [],
                serviceData,
                defaultOpenedDetails: [0],
                name: '',
                selected: null
            }
        },
        computed: {
            filteredDataArray() {
                if (this.services != undefined) {
                    
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
                    this.$toast.open({
                        duration: 3000,
                        message: `Please select a service!`,
                        position: 'is-top',
                        type: 'is-danger'
                    });
                    return
                }

                // create a relationship between business and service
                let relationship = {
                    businessId: this.BUSINESS.id,
                    serviceId: this.selected.id
                }
                // eslint-disable-next-line 
                apicore.linkBusinessAndService(relationship).then((result) => {
                    this.$toast.open({
                        message: 'You have joined the service!',
                        type: 'is-success'
                    });

                    // TODO: find a better way to pass context
                    let ctx = this;
                    apicore.getBusinessServices({ business: this.BUSINESS })
                        .then((serviceData) => ctx.serviceData = serviceData)

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
            leaveService(graphEdgeId) {
                // eslint-disable-next-line 
                apicore.deleteGraphEdge(graphEdgeId).then((result) => {
                    // TODO: find a better way to pass context
                    this.$toast.open({
                        message: 'You have left the service!',
                        type: 'is-success'
                    });
                    let ctx = this;
                    apicore.getBusinessServices({ business: this.BUSINESS })
                        .then((serviceData) => ctx.serviceData = serviceData)
                });
            }
        }
    }

</script>