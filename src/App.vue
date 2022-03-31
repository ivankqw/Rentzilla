<template>
  <nav
    class="navbar navbar-expand-lg navbar-light sticky-top"
    style="background-color: #123b79"
  >
    <div class="container-fluid">
      <a
        class="navbar-brand mb-0 h1"
        href="#"
        style="
          color: white;
        "
      >
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
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        class="navbar-toggler"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" style="border-color: white"> </span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNav"
        v-if="$store.state.email"
      >
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/" class="nav-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item active">
            <router-link to="/my-rentals" class="nav-link"
              >My Rentals</router-link
            >
          </li>
          <li class="nav-item active">
            <router-link to="/my-expenses" class="nav-link" 
              >My Expenses</router-link
            >
          </li>
          <li class="nav-item active">
            <router-link to="/news" class="nav-link" 
              >News</router-link
            >
          </li>
          <li class="nav-item active">
            <router-link to="/contact" class="nav-link"
              >Contact Us</router-link
            >
          </li>
          <li class="nav-item d-lg-none d-xl-none" v-if="$store.state.email">
            <button
              class="btn btn-outline-dark"
              style="color: white"
              @click="$store.dispatch('logout')"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ms-auto">
        <li
          class="nav-item mt-2 px-3"
          v-if="$store.state.email"
          style="color: white"
        >
          <font-awesome-icon icon="circle" style="color: green" />
          {{ $store.state.name }}
        </li>
        <li class="nav-item px-2" v-if="$store.state.email">
          <button
            class="btn btn-outline-dark"
            style="color: white"
            @click="$store.dispatch('logout')"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <div
    id="carouselExampleControls"
    class="carousel slide"
    data-bs-ride="carousel"
    v-if="!$store.state.email"
  >
    <div class="carousel-inner">
      <div class="carousel-item active img-fluid">
        <img src="./assets/gbtb.jpg" class="d-block w-100 h-100" alt="..." />
      </div>
      <div class="carousel-item img-fluid">
        <img src="./assets/mbs.jpg" class="d-block w-100 h-100" alt="..." />
      </div>
      <div class="carousel-item img-fluid">
        <img src="./assets/sgriver.jpg" class="d-block w-100 h-100" alt="..." />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <router-view />
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch("fetchUser");
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
  margin-top: 0px;
}

.carousel .carousel-item {
  height: 500px;
}

.carousel-item img {
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  min-height: 500px;
}

a.router-link-active.router-link-exact-active.nav-link {
   border-bottom-style: solid;
  border-bottom-color: white !important;
  }

a.nav-link {
  color: white !important
  }
</style>
