<template>
  
  <div class="container">
   <img src="@/assets/hdb.jpg" alt="..." />

  <form> 
   <h2 class="header">Your Feedback Matters.</h2> <br>
     <textarea id="subject" name="subject" placeholder="Enter your feedback here" style="height:300px" cols="50"></textarea><br>
     <button class="btn btn-primary" margin="0"> Submit</button>
  </form>

  </div>

</template>

<script>

export default {
  name: "Contact",
  
};
</script>


<style>

img {
  height: auto;
  max-width: 40%;
  background-repeat: no-repeat;
  background-position: left left;
  background-size: cover;
  float: left;
}

</style>