<template>
  <h1>What's up land lord</h1>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase";
export default {
  name: "Home",
  setup() {
    const user = firebase.auth().currentUser;
    const name = ref("");
    onBeforeMount(() => {
      if (user) {
        name.value = "ivan";
      }
    });

    const logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("signing off sir"))
        .catch((err) => alert(err.message));
    };
    return {
      name,
      logout,
    };
  },
};
</script>


<style>
</style>