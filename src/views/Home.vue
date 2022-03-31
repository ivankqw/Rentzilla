<template>
  <div class="container">
    <h1 class="header">Home Page</h1>
    <h3>Welcome back, {{ $store.state.name }}</h3>
    <h3>Your email is {{ $store.state.email }}</h3>
    <h2 class="header">My Rental Properties</h2><br><br>
    <div id="mapid"></div>

    <br><br>
    <h2 class="header">Overview of revenue and expense</h2><br><br>
    <div class="row row-cols-1 row-cols-md-2 g-4 mt-2">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Expenses by Category</h5>
            <div id="expensesByCatergoryPieChart">
              <pie-chart :data="expensesByCategoryData"></pie-chart>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Expenses by Rental</h5>

            <div id="expensesByRentalBarChart">
              <pie-chart :data="expensesByRentalData"></pie-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted } from "vue";
import { getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";

export default {
  name: "Home",

  setup() {
    const auth = getAuth();
    var accessToken;
    var rentals;
    var expenses;

    (async () => {
      try {
        accessToken = await getDoc(doc(db, "Admin", "MapBoxToken"));
      } catch (error) {
        console.log(error);
      }
    })();
    let mymap;

    onMounted(() => {
      //mainly to deal with the map generation. data getters are in created()
      (async () => {
        try {
          rentals = await getDoc(doc(db, "Rentals", auth.currentUser.email));
          expenses = await getDoc(doc(db, "Expenses", auth.currentUser.email));
          if (!rentals.exists()) {
            await setDoc(doc(db, "Rentals", auth.currentUser.email), {
              rentals: [],
            });
          }
          if (!expenses.exists()) {
            await setDoc(doc(db, "Expenses", auth.currentUser.email), {
              expenses: [],
            });
          }

          rentals = rentals.data().rentals;
          console.log("rentals", rentals);

          expenses = expenses.data().expenses;
          console.log("expenses", expenses);
          console.log("expenseType", expenses[0].expenseType);
          console.log(auth.currentUser.email, "is current user's email");
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
      expenses: [],
      rentals: [],
      expensesByCategoryChartData: {},
    };
  },

  computed: {
    expensesByCategoryData() {
      var result = {};
      //get all unique categories
      let catSet = new Set(
        this.expenses.map((arrElement) => arrElement.expenseType)
      );
      //initialize obj
      for (let cat of catSet) {
        result[cat] = 0;
      }
      for (let expense of this.expenses) {
        result[expense.expenseType] += expense.expenseCost;
      }
      return result;
    },

    expensesByRentalData() {
      var result = {};
      //get all unique rentals
      let addressSet = new Set(
        this.expenses.map((arrElement) => arrElement.fullAddress)
      );
      //initialize obj
      for (let address of addressSet) {
        result[address] = 0;
      }
      for (let expense of this.expenses) {
        result[expense.fullAddress] += expense.expenseCost;
      }
      return result;
    },
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
      return "hello world";
    },
  },

  created() {
    try {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      onSnapshot(
        doc(db, "Expenses", userEmail),
        { includeMetadataChanges: true },
        (doc) => {
          this.expenses = doc.data().expenses;
        }
      );
      onSnapshot(
        doc(db, "Rentals", userEmail),
        { includeMetadataChanges: true },
        (doc) => {
          this.rentals = doc.data().rentals;
        }
      );
    } catch (err) {
      console.log("created error", err);
    }
  },
};
</script>


<style>
#mapid {
  height: 610px;
}

h1 {
  /* My Rental Properties */

  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;

  color: #000000;
}

h2 {
  float: left;
  font-weight: bold;
  margin-left: 30px;
}
</style>