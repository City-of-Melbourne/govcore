<template>
    <section>
        <h1 class="title">My Profile</h1>
        <b-field label="Name">
            <b-input v-model="person.name"></b-input>
        </b-field>
        <b-field label="Email">
            <b-input v-model="person.email" disabled></b-input>
        </b-field>
        <a class="button is-success" @click="updatePerson()">
            <span>Update</span>
        </a>
    </section>
</template>

<script>
    import  coreApiGraphql from '../services/coreApiGraphql';
    const apicore = new coreApiGraphql();

    export default {      
        data() {
            return {
                person: this.$root.$data.person
            }
        }, 
        methods: {
            updatePerson() {
                apicore.updatePerson(this.person).then(() => {
                    this.$toast.open({ message: 'Profile updated.' })
                })
            }
        }
    }
</script>
