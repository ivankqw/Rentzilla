<template>
  <div class="container">
    <h1>Ths is the home page</h1>
    <h3>Welcome back, {{ $store.state.name }}</h3>
    <h3>Your email is {{ $store.state.email }}</h3>
    <div id="mapid"></div>
  </div>
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
      //get all user's rentals
      (async () => {
        try {
          rentals = await getDoc(doc(db, "Rentals", auth.currentUser.email));
          rentals = rentals.data().rentals;
          console.log("rentals", rentals);

          //data preprocessing
          //get all unique postal codes
          let uniquePostalCodes = [];
          let resultObj = {};
          for (let rental of rentals) {
            if (!uniquePostalCodes.includes(rental.postalCode)) {
              uniquePostalCodes.push(rental.postalCode);
              resultObj[rental.postalCode] = {
                latitude: rental.latitude,
                longtitude: rental.longtitude,
                addresses: [rental.address],
                unitNumbers: [rental.unitNumber],
                purchasePrices: [rental.purchasePrice],
                tenants: [rental.tenants],
              };
            } else {
              resultObj[rental.postalCode].unitNumbers.push(rental.unitNumber);
              resultObj[rental.postalCode].purchasePrices.push(
                rental.purchasePrice
              );
              resultObj[rental.postalCode].tenants.push(rental.tenants);
              resultObj[rental.postalCode].addresses.push(rental.address);
            }
          }
          //console.log("unique", uniquePostalCodes);
          //console.log(resultObj)

          var counter = 0;
          for (let [postalCode, values] of Object.entries(resultObj)) {
            console.log(postalCode);
            let currLat = parseFloat(values.latitude);
            let currLong = parseFloat(values.longtitude);
            let currMarker = leaflet.marker([currLat, currLong]).addTo(mymap);
            let currString = "";
            while (counter < values.addresses.length) {
              currString += "<h5>" + values.addresses[counter] + "</h5>";
              currString +=
                "<br>" + "Unit Number: " + values.unitNumbers[counter];
              currString +=
                "<br>" +
                "Purchase Price: " +
                values.purchasePrices[counter] +
                "<br>";
              var currAllTenantsNames = "";
              for (let tenant of values.tenants[counter]) {
                currAllTenantsNames += tenant.firstName
                  ? tenant.firstName +
                    " " +
                    tenant.lastName +
                    " ($" +
                    tenant.monthlyRent +
                    ")" +
                    ", "
                  : "";
              }
              currString += currAllTenantsNames;
              currString += "<br><br>";
              counter++;
            }
            counter = 0;

            currMarker.bindPopup(currString).openPopup();
          }
        } catch (error) {
          console.log("home error", error);
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