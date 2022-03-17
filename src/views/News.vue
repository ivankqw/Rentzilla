<template>
  <h1>News</h1>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="(article, index) in articlesTop" :key="index" class="col">
        <a :href="article.url" target="_blank">
          <div class="card h-100">
            <img
              :src="article.urlToImage"
              class="card-img-top"
              @error="replaceByDefault(e)"
            />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text">{{ article.description }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <br>
    <div class="row row-cols-1 row-cols-md-1 g-4 align-items-stretch">
      <div v-for="(article,index) in articlesBottom" :key="index" class="card h-100">
        <a :href="article.url" target="_blank">
        <div class="row g-0">
          <div class="col-md-3">
            <img :src="article.urlToImage" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">{{article.title}}</h5>
              <p class="card-text">
                {{article.description}}
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
        </a>
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
      articlesTop: [],
      articlesBottom: [],
    };
  },
  async created() {
    var newsApiKey;
    try {
      newsApiKey = await getDoc(doc(db, "Admin", "NewsApi"));
      newsApiKey = newsApiKey.data().key;
      var url = `https://newsapi.org/v2/top-headlines?country=sg&category=business&apiKey=${newsApiKey}`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => json.articles)
        .then((articles) => {
          this.articlesTop = Array.from(articles).slice(0, 3);
          this.articlesBottom = Array.from(articles).slice(2);
          console.log(articles);
        });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = "../assets/rentzilla_logo.png";
    },
  },
};
</script>


<style>
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

a {
  color: inherit;
  text-decoration: inherit;
}
</style>