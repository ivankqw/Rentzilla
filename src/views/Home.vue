<template>
  <h1>Ths is the home page</h1>
  <h3>Welcome back, {{ $store.state.name }}</h3>
  <h3>Your email is {{ $store.state.email }}</h3>
  <div id="mapid"></div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted } from "vue";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";
var items = {};

async function getCoordinates(postalCode) {
  let result = await fetch(
    `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      return JSON.parse(result).results[0];
    })
    .catch((error) => {
      console.log("error", error);
      alert("This postal code could not be found. Try another");
    });
  items.lat = result.LATITUDE;
  items.long = result.LONGITUDE;
  console.log(items);

  //this.currLatLong.long = result.LONGITUDE
  return "hello world";
}

getCoordinates(119278);

export default {
  name: "Home",

  setup() {
    var accessToken;
    (async() => {
      try {
        accessToken = await getDoc(doc(db, "Admin", "MapBoxToken"))
      } catch (error) {
        console.log(error)
      }
    })()
    let mymap;
    onMounted(() => {   
      // TODO 
      //loop through current user's rentals and make markers

      mymap = leaflet.map("mapid").setView([1.290270, 103.851959], 11.5);
      var marker = leaflet.marker([1.29985122374074, 103.77375361287]).addTo(mymap);
      marker.bindPopup("<b>Hello world!</b><br>Welcome to NUS").openPopup();
      leaflet.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaXZhbmtxdyIsImEiOiJjbDBzMDR6MDAwOG5mM2NxYmJyMjQ4OGphIn0.8elCYEW3Ykk4W7oJ4AINbg",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: accessToken,
        }
      ).addTo(mymap);
    });
  },

  data() {
    return {
      currLatLong: {},
    };
  },

  components: {},

  methods: {
    async getCoordinates(postalCode) {
      var vm = this;
      let result = await fetch(
        `https://developers.onemap.sg/commonapi/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          return JSON.parse(result).results[0];
        })
        .catch((error) => console.log("error", error));
      vm.currLatLong = result.LATITUDE;
      //this.currLatLong.long = result.LONGITUDE
      return "hello world";
    },
  },
};
</script>


<style>
#mapid {
  height: 610px;
}
</style>