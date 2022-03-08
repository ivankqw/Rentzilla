<template>
  <h1>Log In</h1>
  <form @submit.prevent="login">
    <div class="form-group">
      <input
        type="email"
        v-model="loginForm.email"
        placeholder="Your Email"
        class="form-control form-control-lg"
      />
    </div>
    <br />
    <div class="form-group">
      <input
        type="password"
        v-model="loginForm.password"
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
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const loginForm = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", loginForm.value);
    };

    return {
      login,
      loginForm,
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