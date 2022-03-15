import { createStore } from "vuex";
import router from "../router";
import { auth, db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, onSnapshot } from "firebase/firestore";

export default createStore({
  state: {
    email: null,
    name: null,
  },
  mutations: {
    SET_USER(state, userObj) {
      state.email = userObj.email;
      state.name = userObj.name;
    },

    CLEAR_USER(state) {
      state.email = null;
      state.name = null;
    },
  },
  actions: {
    async addNewFirebaseUser(name, email) {
      await setDoc(doc(db, "Users", email), {
        email: name,
      });
    },

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

      //get from firebase
      const docRef = doc(db, "Users", auth.currentUser.email);
      let name = null;
      onSnapshot(docRef, (doc) => {
        name = doc.data().name;
        commit("SET_USER", { email: email, name: name });
      });

      router.push("/");
    },

    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");

      router.push("/login");
    },

    async signup({ commit }, details) {
      const { name, email, password } = details;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/weak-password":
            alert(
              "Please provide a stronger password with at least 6 characters"
            );
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

      try {
        await setDoc(doc(db, "Users", email), {
          name: name,
        });
      } catch (error) {
        console.log(error);
      }

      const userObj = {
        email: auth.currentUser.email,
        name: name,
      };

      commit("SET_USER", userObj);
      console.log(auth.currentUser);
      router.push("/");
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          //commit("SET_USER", user);
          //get from firebase
          const docRef = doc(db, "Users", auth.currentUser.email);
          let name = null;
          onSnapshot(docRef, (doc) => {
            name = doc.data().name;
            commit("SET_USER", { email: auth.currentUser.email, name: name });
          });

          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
});
