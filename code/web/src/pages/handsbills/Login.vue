<template>
 
    <div>
        <link href="https://www3.melbourne.vic.gov.au/_cassette/stylesheetbundle/Content_87c8748ed01c5be4aa64535842e69390fb1aef99"
            type="text/css" rel="stylesheet">
        <link href="https://www3.melbourne.vic.gov.au/_cassette/stylesheetbundle/Content/themes/com_21f68ac9fed5e10b4a286c4e3ca1bdff1e141056"
            type="text/css" rel="stylesheet">
           

              <div id="wrapper">
                <div id="header-container">
                    <div id="banner">
                        <div id="logo">
                            <a href="http://www.melbourne.vic.gov.au/Pages/default.aspx" title="City Of Melbourne website"><span>&nbsp;</span></a>
                        </div>
                        <div id="user-information">
                            <div id="login-container">
                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                    <div id="breadcrumb-navigation-wrapper">
                        <div id="breadcrumb-navigation">
                            <ol class="breadcrumbs">
                                <li class="first last"><a>Log in</a></li>
                            </ol>
                        </div>
                    </div>
                    <div class="page-header">
                        <h1>Log in to apply for permits or update your registration</h1>
                    </div>
                    <div id="error-information">
                    </div>
                </div>
                <div id="body-container">
                    <div id="content-container">
                        <form action="/Account/LogOn" method="post">
                            <div class="rows">
                                <div class="row">
                                </div>
                                <div class="row paddingSpacerTop">
                                    <fieldset>
                                        <h2>Log in</h2>
                                        <br>
                                        <div class="field-container-wide">
                                            <label for="UserName">Username (email address)</label>
                                            <input class="textbox formTextNormal" data-val="true" data-val-required="Username is a required field."
                                                id="UserName" name="UserName" type="text" value="">
                                        </div>
                                        <div class="field-container-wide">
                                            <label for="Password">Password</label>
                                            <input class="textbox formTextNormal" data-val="true" data-val-required="Password is a required field."
                                                id="Password" name="Password" type="password">
                                        </div>
                                        <div class="field-container-wide">
                                            <label>&nbsp;</label>
                                            <a href="#">Forgot your password?</a>
                                        </div>
                                        <div class="actions-container">
                                              <a class="button is-large is-fullwidth" @click="selectGovAuth">
                                                    <span class="icon">
                                                        <i class="fab fa-gofore"></i>
                                                    </span>
                                                    <span>GovAuth</span>
                                                </a>
                                            <!-- <div class="controls">  
                                                <input type="button" value="Log in" class="action-button commonbutton">
                                            </div> -->
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="push"></div>
            </div>
            <div id="footer-container">
                <div id="footer-links">
                    <div class="contact-info">
                        <h4>Contact us</h4>
                        <p>
                            Phone: +61 3 9658 9658<br>
                            Email: <a href="http://www.melbourne.vic.gov.au/AboutCouncil/ContactUs/Pages/ContactUs.aspx">Contact
                                us online</a><br>
                            <br>
                            Town Hall<br>
                            90-120 Swanston Street<br>
                            Melbourne VIC 3000<br>
                            Fax: +61 3 9654 4854<br>
                            National Relay Service:<br>
                            133 677<br>
                            (ask for 03 9658 9658)
                        </p>
                    </div>
                </div>
                <nav><a href="http://www.melbourne.vic.gov.au/">City of Melbourne</a> <a href="http://www.melbourne.vic.gov.au/Pages/Privacy.aspx">Privacy
                        Statement</a> <a href="http://www.melbourne.vic.gov.au/Pages/Accessibility.aspx ">Accessibility</a>
                </nav>
            </div> 
             <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true">GovAuth Loading....</b-loading>
    </div>

</template>

<script>
import router from '../../router'
export default {
    data(){

        return {
                isLoading: false,
                
            }
    },    
    methods: {
            
            selectGovAuth() {
                this.isLoading = true               
                
                setTimeout(() => {
                    this.isLoading = false;
                    router.push({ name: "login" });
                }, 1 * 1000)
            }
        }     
}
</script>
