<template>
  <div>
    <br /><br />
    <div>
      <div class="row row-eq-height">
        <Welcome />
        <div class="col align-self-end m-3">
          <div class="card p-5 ">
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
              <div class="justify-content-center text-center">
              <button type="submit" class="btn btn-dark btn-lg btn-block">
                Sign Up
              </button>
              </div>
              <p class="justify-content-center text-center mt-2 mb-4">
                Already have an account?
                <router-link to="/login">Log In</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Welcome from "../components/Welcome";

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
  components: {
    Welcome,
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