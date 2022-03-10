import { createStore } from "vuex";
import router from "../router";
import { auth } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found in system");
            break;
          case "auth/wrong-password":
            alert("Wrong password provided");
            break;
          default:
            alert("Something went wrong!");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);
      console.log(auth.currentUser.email)

      router.push("/");
    },

    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");

      router.push("/login");
    },

    async signup({ commit }, details) {
      const { email, password } = details;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/weak-password":
            alert("Please provide a stronger password with at least 6 characters");
            break;
          case "auth/invalid-email":
            alert("Invalid email format");
            break;
          case "auth/email-already-in-use":
            alert("Email already in use, please use another email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          default:
            alert("Something went wrong!");
        }

        return;
      }

      commit("SET_USER", auth.currentUser);
      console.log(auth.currentUser)
      router.push("/");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);

          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
});
