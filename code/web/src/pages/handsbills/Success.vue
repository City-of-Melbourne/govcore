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
                         
                        </div>
                    </div>
                    <div class="page-header">
                        <h1> Welcome to  your dashboard @User</h1>
                    </div>
                    <div id="error-information">
                    </div>
                </div>
                <div id="body-container">
                    <div id="content-container">
                        From here user continue using Handsbills platform
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
                        var w=600;
                        var h=700;
                        var x;
                        var y;
                        x=(screen.width/2)-(w/2);
                        y=(screen.height/2)-(h/2);
                        window.open("/login", "", "width="+w+",height="+h+",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left="+x+",top="+y+"");
                       
                }, 1 * 1000)
            }
        }     
}
</script>
