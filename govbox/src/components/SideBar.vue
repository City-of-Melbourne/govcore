<template>


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