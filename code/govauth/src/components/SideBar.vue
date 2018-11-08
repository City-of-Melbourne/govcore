<template>
  <aside class="menu">  
  <p class="menu-label">
    Dash-Business Owner
  </p>
  <ul class="menu-list">
    <li><a href="/joinservice">Join Service</a></li>
    <li><a href="/manageusers">Users</a></li>
    <li><a href="/mybusiness">Business</a></li>
    <li><a href="/myprofile">My Profile</a></li>
  </ul>
  <p class="menu-label">
    Dash-Business Staff
  </p>
  <ul class="menu-list">
    <li><a href="/joinbusiness">Join Business</a></li>
    <li><a href="/myprofile">My Profile</a></li>    
  </ul>
  <p class="menu-label" v-if="false">
    Dash-Com Admin
  </p>
  <ul class="menu-list" v-if="false">
    <li><a >Businesess</a></li>
    <li><a >Services</a></li>
    <li><a >Users</a></li>
    <li><a >IDP</a></li>
    <li><a >Logs</a></li>
  </ul>
</aside>
</template>