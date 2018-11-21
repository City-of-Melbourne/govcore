<script>
import NavBar from "@/components/NavBar";
import FooterBar from "@/components/FooterBar";
export default {
  components: {
    NavBar,    
    FooterBar
  }
};
</script>

<template>
  <div>
    <nav-bar />
    <div class="container section">
      <div class="columns">       
        <div class="column is-9">
          <slot />          
        </div>
      </div>
    </div>
    <footer-bar />
  </div>
</template>
