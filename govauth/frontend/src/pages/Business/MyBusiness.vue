<template>
    <section>
        <h1 class="title">My Business</h1>
        <b-field label="Name">
            <b-input v-model="business.name"></b-input>
        </b-field>       
        <b-field label="ABN">
            <b-input v-model="business.abn" ></b-input>
        </b-field>
        <a class="button is-success" @click="updateBusiness()">
            <span>Update</span>
        </a>
    </section>
</template>

<script>
    import  coreApiGraphql from '../../services/coreApiGraphql';
    const apicore = new coreApiGraphql();

    export default {    
        created(){
                this.business=JSON.parse(localStorage.getItem('objsession')).business;
        },
        data() {
            return {
                business: null
            }
        }, 
        methods: {
            updateBusiness() {
                apicore.updateBusiness(this.business).then(() => {
                    
                      this.$toast.open({
                        message: 'Business updated!',
                        type: 'is-success'
                    });
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
            }
        }
    }
</script>
