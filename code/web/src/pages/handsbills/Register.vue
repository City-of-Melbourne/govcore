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
                        </div>

                    </div>
                </div>
                <div id="breadcrumb-navigation-wrapper">
                    <div id="breadcrumb-navigation">
                        <ol class="breadcrumbs">
                            <li class="first">
                                <a href="/Account/LogOn/" title="">Log in</a>
                            </li>
                            <li class="last"><a>Create handbill user</a></li>
                        </ol>


                    </div>
                </div>

                <div class="page-header">
                    <h1>Create handbill user</h1>
                </div>
                <div id="error-information">
                </div>
            </div>
            <div id="body-container">
                <div id="content-container">

                    <form action="/Account/RegistrationHandbills" id="LogonForm" method="post">
                        <div class="rows">
                            <div class="row">

                            </div>
                            <div class="row paddingSpacerTop">
                                <div class="form-container920">
                                    <div class="form-container-Inner">
                                        <div class="column w-920px">
                                            <p>Before you can apply for permits, you must complete the following steps
                                                to register with the City of Melbourne:</p>
                                            <br>
                                            <p>Step 1: Create your username and password</p>
                                            <p>Step 2: Log in</p>
                                            <p>Step 3: Complete contact details, insurance and handbill distribution
                                                address details</p>
                                            <p>Step 4: Review privacy statement and conditions of issue</p>
                                            <p>Step 5: Receive confirmation of registration</p>
                                            <br>
                                            <p>Some important information about fundraising registrations:</p>
                                            <div style="padding: 15px;">
                                                <ul>
                                                    <li>Registration confirmation could take up to 10 working days</li>
                                                    <li>Once you have successfully registered, you may apply for
                                                        handbill permits</li>
                                                    <li>There is a non-refundable payment for each permit</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row paddingSpacerTop">
                                <fieldset>
                                    <h2>Create your username and password</h2>
                                    <br>
                                    <p>We recommend using a group email address to ensure that in the absence of key
                                        team members, important emails can be delivered to others (e.g.
                                        permits@melbourne.vic.gov.au)</p>
                                    <br>
                                    <div class="field-container-wide">
                                        <label for="Email">Username (email address)</label>
                                        <input class="textbox formTextNormal" data-val="true" data-val-email="The Username (email address) field is not a valid e-mail address."
                                            data-val-required="Username is a required field" id="Email" name="Email"
                                            type="text" value="">
                                        <span class="field-validation-valid" data-valmsg-for="Email"
                                            data-valmsg-replace="true"></span>
                                        <span class="field-validation-valid" data-valmsg-for="UserExists"
                                            data-valmsg-replace="true"></span>
                                    </div>
                                    <div class="field-container-wide">
                                        <label for="Password">Password</label>
                                        <input class="textbox formTextNormal" data-val="true" data-val-length="The Password must be at least 6 characters long."
                                            data-val-length-max="100" data-val-length-min="6" data-val-required="The Password field is required."
                                            id="Password" name="Password" type="password">
                                        <span class="field-validation-valid" data-valmsg-for="Password"
                                            data-valmsg-replace="true"></span>
                                    </div>
                                    <div class="field-container-wide">
                                        <label for="ConfirmPassword">Confirm password</label>
                                        <input class="textbox formTextNormal" data-val="true" data-val-equalto="The password and confirmation password do not match."
                                            data-val-equalto-other="*.Password" id="ConfirmPassword" name="ConfirmPassword"
                                            type="password">
                                        <span class="field-validation-valid" data-valmsg-for="ConfirmPassword"
                                            data-valmsg-replace="true"></span>
                                    </div>
                                    <div class="field-container-wide">
                                        <label>&nbsp;</label>
                                        <label><a href="/Account/LogOn">I have already created a username and password</a></label>
                                    </div>
                                    <div class="clear"></div>
                                    <br>
                                    <p>Please ensure your password includes at least six characters with a combination
                                        of upper and lower case characters and one number (e.g. Password123).</p>

                                    <input data-val="true" data-val-required="Registration Type is a manditory field."
                                        id="RegistrationType" name="RegistrationType" type="hidden" value="Handbills">

                                    <div class="actions-container">
                                    <a class="button is-large is-fullwidth" @click="selectGovAuth">
                                            <span class="icon">
                                                <i class="fab fa-gofore"></i>
                                            </span>
                                            <span>GovAuth</span>
                                        </a>
                                        <!-- <div class="controls">
                                            <input type="button" value="Create" class="action-button commonbutton">
                                        </div> -->
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </form>
                    <div id="please-wait"></div>
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
                    router.push({ name: "register" });
                }, 1 * 1000)
            }
        }     
}
</script>