<template>
  <h1>Sign Up</h1>
  <form @submit.prevent="signup">
    <div class="form-group">
      <input
        type="text"
        v-model="name"
        placeholder="Your Full Name"
        class="form-control form-control-lg"
      />
    </div>
    <br />
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
    <button type="submit" class="btn btn-dark btn-lg btn-block">Sign Up</button>
    <p class="forgot-password text-right mt-2 mb-4">
      Already have an account? <router-link to="/login">Log In</router-link>
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
export default {
  name: "Signup",
  setup() {
    const email = ref("");
    const password = ref("");

    const signup = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((data) => console.log(data))
        .catch((err) => alert(err.message));
    };

    return {
      signup,
      name,
      email,
      password,
    };
  },
};
</script>

<style>
</style>