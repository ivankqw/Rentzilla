<template>
  <div>
    <br /><br />
    <div>
      <div class="row row-eq-height">
        <Welcome/>
        <div class="col h-100 m-3">
          <div class="card p-5">
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
              <div class="justify-content-center text-center">
              <button
                type="submit"
                value="Login"
                class="btn btn-dark btn-lg btn-block"
              >
                Log In
              </button>
              </div>
              <p class="justify-content-center text-center mt-2 mb-4">
                Don't have an account?
                <router-link to="/signup">Sign Up</router-link>
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
import Welcome from "../components/Welcome"

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
  components :{
    Welcome
  }
};
</script>

<style scoped>

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