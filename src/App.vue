<template>
  <HelloWorld msg="hello" />
  <div> 
    <router-link to="/Home"> Home </router-link>
  </div>
  <h1> hi </h1>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue'
import {useRouter, useRoute} from 'vue-router'
import firebase from 'firebase'
import HelloWorldVue from "./components/HelloWorld.vue"

export default {
  name: "App",
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login');
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace('/')
        }
      })
    })
  },
  
  components: {
    HelloWorld: HelloWorldVue,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
