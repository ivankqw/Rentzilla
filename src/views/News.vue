<template>
  <div class="container" style="margin-top: 20px">
    <button
      class="btn btn-outline-warning"
      type="button"
      id="generalNews"
      v-on:click="getGeneralNews()"
    >
      General
    </button>

    <button
      class="btn btn-outline-success"
      type="button"
      id="bizNews"
      v-on:click="getBizNews()"
    >
      Business
    </button>
    <button
      class="btn btn-outline-danger"
      type="button"
      id="healthNews"
      v-on:click="getHealthNews()"
    >
      Health
    </button>

    <br />
    <h2 id="firstHeader" style="text-align: left">Top General News</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4" id="top-content">
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
    <br />
    <h2 id="secondHeader" style="text-align: left">Other News</h2>
    <div
      class="row row-cols-1 row-cols-md-1 g-4 align-items-stretch"
      id="bottom-content"
    >
      <div
        v-for="(article, index) in articlesBottom"
        :key="index"
        class="card h-100"
      >
        <a :href="article.url" target="_blank">
          <div class="row g-0">
            <div class="col-md-3">
              <img
                :src="article.urlToImage"
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <p class="card-text">
                  {{ article.description }}
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
      var url = `https://newsapi.org/v2/top-headlines?country=sg&category=general&apiKey=${newsApiKey}`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => json.articles)
        .then((articles) => {
          this.articlesTop = Array.from(articles).slice(0, 3);
          this.articlesBottom = Array.from(articles).slice(3);
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

    async getGeneralNews() {
      document.getElementById("firstHeader").innerHTML = "Top General News";
      document.getElementById("secondHeader").innerHTML = "More General News";

      var newsApiKey;
      try {
        newsApiKey = await getDoc(doc(db, "Admin", "NewsApi"));
        newsApiKey = newsApiKey.data().key;
        var url = `https://newsapi.org/v2/top-headlines?country=sg&category=general&apiKey=${newsApiKey}`;

        fetch(url)
          .then((response) => response.json())
          .then((json) => json.articles)
          .then((articles) => {
            this.articlesTop = Array.from(articles).slice(0, 3);

            this.articlesBottom = Array.from(articles).slice(3);
            console.log(articles);
          });
      } catch (error) {
        console.log(error);
      }
    },

    async getBizNews() {
      document.getElementById("firstHeader").innerHTML = "Top Business News";
      document.getElementById("secondHeader").innerHTML = "More Business News";

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

            this.articlesBottom = Array.from(articles).slice(3);
            console.log(articles);
          });
      } catch (error) {
        console.log(error);
      }
    },

    async getHealthNews() {
      document.getElementById("firstHeader").innerHTML = "Top Health News";
      document.getElementById("secondHeader").innerHTML = "More Health News";

      var newsApiKey;
      try {
        newsApiKey = await getDoc(doc(db, "Admin", "NewsApi"));
        newsApiKey = newsApiKey.data().key;
        var url = `https://newsapi.org/v2/top-headlines?country=sg&category=health&apiKey=${newsApiKey}`;

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
  },
};
</script>

<style scoped>
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

a {
  color: inherit;
  text-decoration: inherit;
}
</style>
