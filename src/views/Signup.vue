<template>
  <h1>Sign Up</h1>
  <form @submit.prevent="signup">
    <div class="form-group">
      <input
        type="text"
        v-model="signupForm.name"
        placeholder="Your Full Name"
        class="form-control form-control-lg"
      />
    </div>
    <br />
    <div class="form-group">
      <input
        type="email"
        v-model="signupForm.email"
        placeholder="Your Email"
        class="form-control form-control-lg"
      />
    </div>
    <br />
    <div class="form-group">
      <input
        type="password"
        v-model="signupForm.password"
        placeholder="Password"
        class="form-control form-control-lg"
      />
    </div>
    <br />
    <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
    <p class="text-right mt-2 mb-4">
      Already have an account? <router-link to="/login">Log In</router-link>
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Signup",
  setup() {
    const signupForm = ref({});
    const store = useStore();

    const signup = () => {
      store.dispatch("signup", signupForm.value);
    };

    return {
      signupForm,
      signup,
    };
  },
};
</script>

<style>
</style>