<template>
  <h1>Ths is the My Expenses page</h1>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from "firebase";
export default {
  name: "MyExpenses",
  setup() {
    const user = firebase.auth().currentUser;
    const name = ref("");
    onBeforeMount(() => {
      if (user) {
        name.value = "ivan";
      }
    });
  },
};
</script>


<style>

</style>