<template>
    <div>
        <!--SELECTING IDP -->
        <section class="section" v-if="isStep==1">
            <div class="container">
                <div class="columns  is-desktop">
                    <div class="column ">
                        <h1 class="title">Welcome to GovAuth</h1>
                        <h2 class="subtitle">Please select your identity provider:</h2>
                    </div>
                </div>
                <div class="columns  is-desktop">
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="selectIdp">
                            <span class="icon">
                                <i class="fab fa-github"></i>
                            </span>
                            <span>GitHub</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="selectIdp">
                            <span class="icon">
                                <i class="fab fa-google"></i>
                            </span>
                            <span>Google</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="selectIdp">
                            <span class="icon">
                                <i class="fab fa-facebook"></i>
                            </span>
                            <span>Facebook</span>
                        </a>
                    </div>

                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="selectIdp">
                            <span class="icon">
                                <i class="fab fa-microsoft"></i>
                            </span>
                            <span>Outlook</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="selectIdp">
                            <span class="icon">
                                <i class="fab fa-github"></i>
                            </span>
                            <span>MyGov</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="selectIdp">
                            <span class="icon">
                                <i class="fab fa-microsoft"></i>
                            </span>
                            <span>CoM</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" v-if="isStep==2">
            <div class="container">
                <h1 class="title">GovAuth wants to use your account</h1>
                <div class="columns is-desktop">
                    <div class="column ">
                        <figure class="image is-5by4">
                            <img class="is-rounded" src="../assets/img/ConsentGoogle.png">
                        </figure>
                    </div>
                </div>

                <div class="columns  is-desktop">
                    <div class="column is-3">
                        <a class="button is-large is-fullwidth" @click="selectValidateIdp">
                            <span>Continue</span>
                        </a>
                    </div>
                    <div class="column is-3">
                        <a class="button is-large is-fullwidth" @click="start">
                            <span>Cancel</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <!-- CONFIRMING WETHER BUSINESS ACCOUNT OR NOT -->
        <section class="section" v-if="isStep==3">
            <div class="container">
                <div class="columns  is-desktop">
                    <div class="column ">
                        <h1 class="title">Are you a business?</h1>

                        <div class="field">
                            <label class="label">Name</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="" v-model="model.name">
                            </div>
                            <p class="help">Fill out if you are a business</p>
                        </div>

                        <div class="field">
                            <label class="label">ABN</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="" v-model="model.abn">
                            </div>
                            <p class="help">Fill out if you are a business</p>
                        </div>

                        <div class="columns  is-desktop">

                            <div class="column">
                                <a class="button is-large is-fullwidth" @click="createBusiness()">
                                    <span>Yes</span>
                                </a>
                            </div>
                            <div class="column">
                                <a class="button is-large is-fullwidth" @click="createPerson()">
                                    <span>No</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- FINAL STEP EITHER REDIRECTING TO  DASHBOARD OR TO PARENT  -->
        <section class="section" v-if="isStep==4">
            <div class="container">
                <div class="columns  is-desktop">
                    <div class="column ">
                        <h1 class="title">Thanks for your registration!</h1>
                        <h2 class="subtitle">Where do you wanna go?</h2>
                    </div>
                </div>
                <div class="columns  is-desktop">
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="myDashboard">
                            <span>My DashBoard</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="goToParent">
                            <span>HandsBills</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
    </div>
</template>
<script>

    import { Toast } from 'buefy/dist/components/toast';
    import coreApiGraphql from '../services/coreApiGraphql';
    const apicore = new coreApiGraphql();

    export default {      

        data() {
            return {
                isLoading: false,
                isStep: 1,
                model: { id: "", name: "", email: "email@email.com", abn: ""}
                
            }
        },
        methods: {           
            start() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    this.isStep = 1;
                }, 1 * 1000)
            },
            selectIdp() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    this.isStep = 2;
                }, 1 * 1000)
            },
            selectValidateIdp() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    this.isStep = 3;
                }, 1 * 1000)
            },        
            myDashboard() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    //router.push({ name: "dash" });
                    opener.location.href = "/login";
                    window.close();

                }, 1 * 1000)
            },
            goToParent() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    opener.location.href = "/handsbills/success";
                    window.close();
                }, 1 * 1000)
            },                   
            // AXIOS HTTP CALLS - REQUESTING DATA FROM  GRAPHQL
             createBusiness() {  
                 // eslint-disable-next-line 
                apicore.createBusiness(this.model).then((result) => {
                        Toast.open({
                            message: 'Registration happened correctly!',
                            type: 'is-success'
                        });
                        this.isStep=4;  
                        }).catch(// eslint-disable-next-line  
                            err => {
                            Toast.open({
                                duration: 3000,
                                message: `Something's not good, try again`,
                                position: 'is-top',
                                type: 'is-danger'
                            });    
                     });
                //this.isStep=4;                
            }
            ,createPerson(){
                // eslint-disable-next-line 
                apicore.createPerson(this.model).then((result) => {
                        Toast.open({
                            message: 'Registration happened correctly!',
                            type: 'is-success'
                        });
                        this.isStep=4;  
                        }).catch(
                            // eslint-disable-next-line 
                            err => {
                                Toast.open({
                                    duration: 3000,
                                    message: `Something's not good, try again`,
                                    position: 'is-top',
                                    type: 'is-danger'
                                });    
                     });  
            }
                     

            }
        }
    
</script>