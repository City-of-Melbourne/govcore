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
        <div class="column is-3">
          <side-bar />
        </div>
        <div class="column is-9">
          <slot />          
        </div>
      </div>
    </div>
    <footer-bar />
  </div>
</template>