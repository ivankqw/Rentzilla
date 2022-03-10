<template>
  <h1>Ths is the home page</h1>
  <h3> Welcome back, {{$store.state.name}} </h3>
  <h3> Your email is {{$store.state.email}} </h3>
</template>

<script>

export default {
  name: "Home"
}
</script>


<style>
</style>