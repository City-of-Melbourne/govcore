<template>
    <div>
        <section>
            <h1 class="title">Join Business</h1>
            <div class="columns is-desktop">

                <div class="column is-four-fifths">

                    <b-autocomplete rounded v-model="name" :data="filteredDataArray" placeholder="e.g. Company Name" icon="magnify"
                        @select="option => selected = option">
                        <template slot="empty">No businesses found</template>
                    </b-autocomplete>

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
            <b-tab-item label="Businesses" icon="book">
                <b-table :data="businessData" paginated per-page="5" :opened-detailed="defaultOpenedDetails" detailed
                    detail-key="id" @details-open="(row, index) => $toast.open(`Expanded ${row.user.name}`)">

                    <template slot-scope="props">

                        <b-table-column field="user.name" label="Company" sortable>
                            {{ props.row.name }}
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
                                            <strong>{{ props.row.name }}</strong>
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
            <b-tab-item label="Invites" icon="exclamation">
                <b-table :data="businessInvData" paginated per-page="5"  detail-key="id" >

                    <template slot-scope="props">

                        <b-table-column field="row.name" label="Company" sortable>
                            {{ props.row.name }}
                        </b-table-column>


                        <b-table-column field="row.role" label="Role" sortable>
                            {{ props.row.role }}
                        </b-table-column>                     
                        <b-table-column field="row.responsible" label="Responsible" sortable>
                            {{ props.row.responsible }}
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
                                <span>Join</span>
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
    const businessData = require('@/data/SampleBusinesses.json');
    const businessInvData = require('@/data/SampleBusinessesInv.json');
    export default {
        data() {
            return {
                data: [
                    'Company',
                    'Kartaway',
                    'Bingo',
                    'Bin & Bang',
                ],
                businessData,
                businessInvData,
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
        }
    }
</script>