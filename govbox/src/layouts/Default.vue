<script>
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import FooterBar from "@/components/FooterBar";
export default {
  components: {
    NavBar,
    SideBar,
    FooterBar
  }
};
</script>

<template>
  <div>
    <nav-bar />
    <div class="container section">
      <div class="columns is-mobile">       
        <div class="column is-12">
          <slot />          
        </div>
      </div>
    </div>
    <footer-bar />
  </div>
</template>