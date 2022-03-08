<template>
  <nav
    class="navbar navbar-expand-lg navbar-light fixed-top"
    style="background-color: #123b79"
  >
    <div class="container-fluid">
      <a class="navbar-brand mb-0 h1" href="/" style="color: white">
        <img
          class="d-inline-block align-bottom"
          src="./assets/rentzilla_logo.png"
          width="30"
          height="30"
        />
        Rentzilla
      </a>
      <button 
        type="button"
        data-bs-toggle = "collapse"
        data-bs-target="#navbarNav"
        class="navbar-toggler"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      <span class="navbar-toggler-icon" style="border-color:white"> </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" style="color:white">Home</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/my-rentals" class="nav-link" style="color:white">My Rentals</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/my-expenses" class="nav-link" style="color:white">My Expenses</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/news" class="nav-link" style="color:white">News</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/contact" class="nav-link" style="color:white">Contact Us</router-link>
          </li>
          <li class="nav-item d-lg-none d-xl-none">
          <router-link to="/login" class="nav-link" style="color:white">Log Out</router-link>
        </li>
        </ul>
      </div>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link" style="color:white">Log Out</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase";

export default {
  name: "App",

  data() {
    return {
      user: 0,
    };
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        this.user = user;
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
  },

  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}

.navbar-light .navbar-toggler-icon {
     background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>
