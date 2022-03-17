<template>
  <h1>Ths is the News page</h1>
  <h3>Welcome back, {{ $store.state.name }}</h3>
  <h3>Your email is {{ $store.state.email }}</h3>
  <div class="container">
 
  <div class="row row-cols-1 row-cols-md-3 g-4">
  <div v-for="(article, index) in articles" :key="index" class="col">
    <div class="card h-100">
      <img :src="article.urlToImage" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";

export default {
  name: "News",
  data() {
    return {
      articles: [],
    };
  },
  async created() {
    var newsApiKey;
    try {
      newsApiKey = await getDoc(doc(db, "Admin", "NewsApi"));
      newsApiKey = newsApiKey.data().key;
      var url =
        "https://newsapi.org/v2/everything?" +
        "q=Apple&" +
        "from=2022-03-17&" +
        "sortBy=popularity&" +
        `apiKey=${newsApiKey}`;

      fetch(url)
      .then((response) => response.json())
      .then((json) => json.articles)
      .then((articles) => this.articles = articles)
     
    } catch (error) {
      console.log(error);
    }
  },
};
</script>


<style>
</style>