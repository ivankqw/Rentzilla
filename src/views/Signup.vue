<template>
  <div>
    <br /><br />
    <div>
      <div class="row row-eq-height">
        <Welcome />
        <div class="col align-self-end m-3">
          <div class="card p-5">
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
                  @input="checkPassword"
                />
                <br>
                <ul>
                  <li v-bind:class="{ is_valid: contains_eight_characters }">
                    8 Characters
                  </li>
                  <li v-bind:class="{ is_valid: contains_number }">
                    Contains Number
                  </li>
                  <li v-bind:class="{ is_valid: contains_uppercase }">
                    Contains Uppercase
                  </li>
                  <li v-bind:class="{ is_valid: contains_special_character }">
                    Contains Special Character
                  </li>
                </ul>

                <div
                  class="checkmark_container"
                  v-bind:class="{ show_checkmark: valid_password }"
                >
                  <svg width="50%" height="50%" viewBox="0 0 140 100">
                    <path
                      class="checkmark"
                      v-bind:class="{ checked: valid_password }"
                      d="M10,50 l25,40 l95,-70"
                    />
                  </svg>
                </div>
              </div>
              <div class="form-group">
                <password
                  v-model="password"
                  :show-password="show"
                  :badge="false"
                  :toggle="true"
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
//import { ref } from "vue";
//import { useStore } from "vuex";
import Welcome from "../components/Welcome";

export default {
  name: "Signup",
  setup() {
    //const signupForm = ref({});
    //const store = useStore();

    /*
    const signup = () => {
      signupForm.value.valid = this.valid_password
      store.dispatch("signup", signupForm.value);
    };
    */

    return {
      //signupForm,
      //signup,
    };
  },

  data() {
    return {
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    checkPassword() {
      this.password_length = this.password.length;
      const format = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

      if (this.password_length > 8) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }

      this.contains_number = /\d/.test(this.password);
      this.contains_uppercase = /[A-Z]/.test(this.password);
      this.contains_special_character = format.test(this.password);

      if (
        this.contains_eight_characters === true &&
        this.contains_special_character === true &&
        this.contains_uppercase === true &&
        this.contains_number === true
      ) {
        this.valid_password = true;
      } else {
        this.valid_password = false;
      }
    },

    signup() {
      //console.log(this.signupForm)
      //this.signupForm = {...this.signupForm, valid: this.valid_password}
      //console.log(this.signupForm)
      this.$store.dispatch("signup", {name: this.name, email: this.email, password: this.password, valid: this.valid_password});
    }
  },

  components: {
    Welcome,
  },
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

ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

li {
  margin-bottom: 8px;
  color: #525f7f;
  position: relative;
}

li:before {
  content: "";
  width: 0%;
  height: 2px;
  background: #2ecc71;
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

input[type="password"] {
  line-height: 1.5;
  display: block;
  color: rgba(136, 152, 170, 1);
  font-weight: 300;
  width: 100%;
  height: calc(2.75rem + 2px);
  padding: 0.625rem 0.75rem;
  border-radius: 0.25rem;
  background-color: #fff;
  transition: border-color 0.4s ease;
  border: 1px solid #cad1d7;
  outline: 0;
}

input[type="password"]:focus {
  border-color: rgba(50, 151, 211, 0.45);
}

/* Checkmark & Strikethrough --------- */

.is_valid {
  color: rgba(136, 152, 170, 0.8);
}
.is_valid:before {
  width: 100%;
}

.checkmark_container {
  border-radius: 50%;
  position: absolute;
  top: -15px;
  right: -15px;
  background: #2ecc71;
  width: 50px;
  height: 50px;
  visibility: hidden;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.4s ease;
}

.show_checkmark {
  visibility: visible;
  opacity: 1;
}

.checkmark {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: white;
  stroke-width: 15;
  stroke-linecap: round;
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
}

.checked {
  animation: draw 0.5s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>