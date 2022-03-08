<template>
  <div
    id="carouselExampleControls"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active img-fluid">
        <img src="../assets/gbtb.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item img-fluid">
        <img src="../assets/mbs.jpg" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item img-fluid">
        <img src="../assets/sgriver.jpg" class="d-block w-100" alt="..." />
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
  <h1>Log In</h1>
  <form @submit.prevent="login">
    <div class="form-group">
      <input
        type="email"
        v-model="email"
        placeholder="Your Email"
        class="form-control form-control-lg"
      />
    </div>
    <br />
    <div class="form-group">
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="form-control form-control-lg"
      />
    </div>
    <br />
    <button type="submit" value="Login" class="btn btn-dark btn-lg btn-block">
      Log In
    </button>
    <p class="forgot-password text-right mt-2 mb-4">
      Don't have an account? <router-link to="/signup">Sign Up</router-link>
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");

    const login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => console.log(data))
        .catch((err) => alert(err.message));
    };

    return {
      login,
      email,
      password,
    };
  },
};
</script>

<style>
.carousel .carousel-item {
  height: 500px;
}

.carousel-item img {
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>