<template>
    <div>
        <!--SELECTING IDP -->
        <section class="section">
            <div class="container">

                <div class="columns  is-desktop">
                    <div class="column">
                        <h1 class="title">Welcome to GovAuth</h1>
                    </div>
                </div>
                <div class="columns  is-desktop" v-if="use === 'govauth'">
                    <div class="column">
                      


                        <div class="field is-grouped">

                        <div class="control">
                        <b-field label="Profile">
                                <b-select placeholder="Select a Profile" v-model="profile" icon="account">
                                    <option value="business">Business</option>
                                    <option value="user">User</option>
                                </b-select>
                            </b-field>
                        </div>


                        <div class="control" v-if="profile=='business'">
                            <b-field label="Business">
                            <b-select v-model="model.business" >
                                <option
                                v-for="option in businesses"
                                :value="option.id"
                                :key="option.id">
                                {{ option.name }}
                                </option>
                            </b-select>
                            </b-field>
                        </div>
                        <div class="control"  v-if="profile=='user'">
                            <b-field label="User">
                           <b-select v-model="model.person" >
                                <option
                                v-for="option in persons"
                                :value="option.id"
                                :key="option.id">
                                {{ option.name }}
                                </option>
                            </b-select>
                            </b-field>
                        </div>
                    </div>  



                    </div>
                </div>
                <div class="columns  is-desktop">

                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="closePopup">
                            <span class="icon">
                                <i class="fab fa-github"></i>
                            </span>
                            <span>GitHub</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="closePopup">
                            <span class="icon">
                                <i class="fab fa-google"></i>
                            </span>
                            <span>Google</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="closePopup">
                            <span class="icon">
                                <i class="fab fa-facebook"></i>
                            </span>
                            <span>Facebook</span>
                        </a>
                    </div>

                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="closePopup">
                            <span class="icon">
                                <i class="fab fa-microsoft"></i>
                            </span>
                            <span>Outlook</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="closePopup">
                            <span class="icon">
                                <i class="fab fa-github"></i>
                            </span>
                            <span>MyGov</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="closePopup">
                            <span class="icon">
                                <i class="fab fa-microsoft"></i>
                            </span>
                            <span>CoM</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
    </div>
</template>

<script>
    import coreApiGraphql from '../services/coreApiGraphql';
    const apicore = new coreApiGraphql();

    export default {
       async created() {

            if (opener != null) {
                this.use = "authenticator";
            }
            else {
                  this.isLoading = true;
                  this.use = "govauth";
                  this.businesses = await apicore.getBusinesses();
                  this.persons = await apicore.getPersons();                 
                  this.model.business=this.businesses[0].id;
                  this.model.person=this.persons[0].id;
                  this.isLoading = false;
            }
        },
        data() {
            return {
                isLoading: false,
                use: "",
                profile: "business",
                persons:[],
                businesses:[],
                model:{person:"",business:""}
            }
        },
        methods: {
            closePopup() {

                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    if (this.use == "authenticator") {
                        window.close();
                        opener.location.href = "/handsbills/success";
                    } else {



                        let objsession = {
                            person: {
                                id: this.model.person,
                                name: "User A",
                                email: "usera@email.com",
                                mobile: "665465",
                                type: "person"                                
                            },
                            business: {                                
                                id: this.model.business,
                                name: "Company A",
                                abn: "54654987",
                                bucket: "entities",
                                type: "business"
                            },
                            profile: this.profile,
                            logged: true
                        }

                        localStorage.setItem("objsession", JSON.stringify(objsession));
                        location.href = "/dash"

                    }
                }, 1 * 500)

            }
        }
    }

</script>