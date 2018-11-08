<template>
    <div>       
        <!--SELECTING IDP -->
        <section class="section">
            <div class="container">
                <div class="columns  is-desktop">
                    <div class="column ">
                        <h1 class="title">Welcome to GovAuth</h1>  
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
    
    export default {
        data() {
            return {
                isLoading: false                
            }
        },
        methods: {
             closePopup() {
                 
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    window.close();
                    opener.location.href = "/handsbills/success";
                }, 1 * 1000)
                
            }
        }
    }

</script>