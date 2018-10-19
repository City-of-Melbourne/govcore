<template>
    <div>
        <section>
            <h1 class="title">Join Business</h1>
            <div class="columns is-desktop">

                <div class="column is-four-fifths">

                    <b-autocomplete rounded v-model="name" :data="filteredDataArray" placeholder="e.g. Handsbills" icon="magnify"
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
        <b-table :data="serviceData" paginated per-page="5" :opened-detailed="defaultOpenedDetails" detailed detail-key="id"
            @details-open="(row, index) => $toast.open(`Expanded ${row.user.name}`)">

            <template slot-scope="props">

                <b-table-column field="user.name" label="Service" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="user.membership" label="Membership" sortable>
                    {{ props.row.membership }}
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
                                    <small>@{{ props.row.membership }}</small>                                    
                                    <br>
                                    <small>{{props.row.description}}</small>
                                    
                                </div>
                                 <div class="column is-one-fifth"><p class="control">                                       
                                        <a class="button is-danger">
                                            <span class="icon is-small">
                                                <i class="fas fa-minus"></i>
                                            </span>
                                            <span>Join</span>
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
    const serviceData = require('@/data/ServiceSample.json');
    console.log(serviceData);
    export default {

        data() {
            return {
                data: [
                    'Grants',
                    'Skip Bins',
                    'Handsbills'
                ],
                serviceData,
                defaultOpenedDetails: [1],
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