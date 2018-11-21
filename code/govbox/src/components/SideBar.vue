<template>

  <aside class="menu">

    <section v-if="profile === 'business'">
      <p class="menu-label">
        Dash-Business Owner
      </p>
      <ul class="menu-list">
        <li><a href="/joinservice">Join Service</a></li>
        <li><a href="/manageusers">Users</a></li>
        <li><a href="/mybusiness">Business</a></li>
        <li><a href="/myprofile">My Profile</a></li>
      </ul>
    </section>

    <section v-if="profile === 'user'">

      <p class="menu-label">
        Dash-Business Staff
      </p>
      <ul class="menu-list">
        <li><a href="/joinbusiness">Join Business</a></li>
        <li><a href="/myprofile">My Profile</a></li>
      </ul>
    </section>
  </aside>

</template>

<script>

  export default {
    created() {  
        //ACA SE DEBE CONTROLAR LOS EMAILS ENVIADOS
        if(localStorage.getItem('objsession')==null){         
          location.href="/login"     
        }
        else{
          let model=JSON.parse(localStorage.getItem('objsession')); 
          this.profile=model.profile;
        }    
    },
    data() {
      return {
        profile: null
      }
    }
  }
</script>