<template>
    <div>
        <section class="section">
            <div class="container">
                <div class="columns  is-desktop">
                    <div class="column ">
                        <h1 class="title">GovAuth</h1>
                        <h2 class="subtitle">Samples how GovAuth would work across different CoM platforms </h2>
                    </div>
                </div>
                <div class="columns  is-desktop">
                    <div class="column">
                        <h2 class="title">Handsbills</h2>
                    </div>
                </div>
                <div class="columns  is-desktop">
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="goToHandsbillsLogin">
                            <span>Login</span>
                        </a>
                    </div>
                    <div class="column">
                        <a class="button is-large is-fullwidth" @click="goToHandsbillsRegister">
                            <span>Register</span>
                        </a>
                    </div>
                </div>
               

            </div>
        </section>
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
    </div>
</template>
<script>
    import router from '../router'
    export default {
        data() {
            return {
                isLoading: false
            }
        },
        methods: {
            goToHandsbillsLogin() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    router.push({ name: "hbLogin" });
                }, 1 * 1000)
            },
            goToHandsbillsRegister() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false;
                    router.push({ name: "hbRegister" });
                }, 1 * 1000)
            }
        }
    }




</script>