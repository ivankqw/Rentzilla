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
import { getAuth } from "firebase/auth";

export default {
  name: "Home",

  setup() {
    const auth = getAuth();
    var accessToken;
    var rentals;

    (async () => {
      try {
        accessToken = await getDoc(doc(db, "Admin", "MapBoxToken"));
      } catch (error) {
        console.log(error);
      }
    })();
    let mymap;
    onMounted(() => {
      // TODO
      //get all user's rentals
      (async () => {
        try {
          rentals = await getDoc(
            doc(db, "Rentals", auth.currentUser.email)
          );
          rentals = rentals.data().rentals
          //console.log(rentals);
          //put all markers into the map
          for (let rental of rentals) {
            //console.log(rental);
            let currLat = parseFloat(rental.latitude);
            let currLong = parseFloat(rental.longtitude);
            let currMarker = leaflet
          .marker([currLat, currLong])
          .addTo(mymap);
          currMarker.bindPopup("<h5>" + rental.address + "</h5>" 
          +"<br>" + rental.unitNumber + "<br>" 
          + rental.purchasePrice).openPopup();
          }
        } catch (error) {
          console.log(error);
        }
      })();

      //instantiate leaflet map
      mymap = leaflet.map("mapid").setView([1.29027, 103.851959], 11.5);
      leaflet
        .tileLayer(
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
        )
        .addTo(mymap);
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