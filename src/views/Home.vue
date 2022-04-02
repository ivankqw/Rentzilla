<template>
  <div class="container">
    <h1 class="header">Home Page</h1>
    <h3>Welcome back, {{ $store.state.name }}</h3>
    <h3>Your email is {{ $store.state.email }}</h3>
    <h2 class="header">My Rental Properties</h2>
    <br /><br />
    <div id="mapid"></div>
    <br /><br />
    <h2 class="header">Overview of revenues and expenses</h2>
    <br /><br />

    <!-- filter -->
    <div class="text-left">
      <br />
      <div class="filter">
        <form id="filterForm" class="row">
          <div class="col align-self-center"></div>
          <div class="col"></div>
          <div class="col"></div>
          <div class="col">
            <label for="filterStart" class="form-label">Start Date:</label>
            <input id="filterStart" @input="onFilterStartInput" type="date" class="form-control"/>
          </div>
          <div class="col">
            <label for="filterEnd" class="form-label">End Date:</label>
            <input id="filterEnd" @input="onFilterEndInput" type="date" class="form-control"/>
          </div>
          <div class="col-md-2 align-self-center">
            <button type="button" class="btn btn-warning" @click="clearFilter">
              Clear filter
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- expensesByCategory Pie Chart -->
    <!-- <div class="row row-cols-3"> -->
    <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Expenses by Category</h5>
            <div id="expensesByCatergoryPieChart">
              <pie-chart
                :data="expensesByCategoryData"
                :donut="true"
              ></pie-chart>
            </div>
          </div>
        </div>
      </div>
      <!-- expensesByRentalProperty Column Chart -->
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Expenses by Rental Properties</h5>
            <div id="expensesByRentalBarChart">
              <column-chart
                :data="expensesByRentalData"
                :colors="[['#003f5c', '#58508d', '#bc5090', '#ffa600']]"
              ></column-chart>
            </div>
          </div>
        </div>
      </div>
      <!-- revenuesByRentalProperty Pie Chart -->
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Revenues by Rental Properties</h5>
            <div id="revenuesByRentalPieChart">
              <pie-chart :data="revenuesByRentalData"></pie-chart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4>revenue against time (default)</h4>
    <br>
    <button v-on:click = "foobarbarblacksheep"> touch me </button>
    <br>
    <line-chart :data="revenueAgainstTimeDataDefault" v-if ="foo == true" >TIMESERIES</line-chart>
    <line-chart :data="revenueExpensesAgainstTimeDataByMonth" 
      :colors="['#b00', '#666']"
      xmin="findLowerBound" xmax="findUpperBound" 
      v-if ="foo == false"
      ytitle="in Singapore Dollars ($SGD)"></line-chart>

    <!-- <h4>cumulative revenue against time</h4>
    <line-chart :data="cumulativeRevenueAgainstTimeData">TIMESERIES</line-chart> -->
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted } from "vue";
import { getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import moment from "moment";

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
          // console.log("rentals", rentals);

          expenses = expenses.data().expenses;
          // console.log("expenses", expenses);
          // console.log(auth.currentUser.email, "is current user's email");
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
              currString += "" + "Unit Number: " + values.unitNumbers[counter];
              currString +=
                "<br>" +
                "Purchase Price: " +
                values.purchasePrices[counter] +
                "<br>";
              var currAllTenantsNames = "Tenants: ";
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
      filterStartDate: "",
      filterEndDate: "",
      foo: true,
    };
  },

  computed: {
    expensesByCategoryData() {
      let expenses = this.expenses;
      if (this.filterStartDate && this.filterEndDate) {
        console.log("hi");
        expenses = this.expenses.filter((exp) =>
          moment(exp.expenseDate).isSameOrAfter(moment(this.filterStartDate)) && 
          moment(exp.expenseDate).isSameOrBefore(moment(this.filterEndDate))
        );
      }
      var result = {};
      //get all unique categories
      let catSet = new Set(
        expenses.map((arrElement) => arrElement.expenseType)
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
      let expenses = this.expenses;
      if (this.filterStartDate && this.filterEndDate) {
        console.log("hi");
        expenses = this.expenses.filter((exp) =>
          moment(exp.expenseDate).isSameOrAfter(moment(this.filterStartDate)) && 
          moment(exp.expenseDate).isSameOrBefore(moment(this.filterEndDate))
        );
      }
      var result = {};
      //get all unique rentals
      let addressSet = new Set(
        expenses.map((arrElement) => arrElement.fullAddress)
      );
      // console.log(addressSet);
      //initialize obj
      for (let address of addressSet) {
        result[address] = 0;
      }
      for (let expense of this.expenses) {
        result[expense.fullAddress] += expense.expenseCost;
      }
      // console.log("result from expenses by rental data", result);
      return result;
    },

    revenuesByRentalData() {
      var result = {};
      //get all unique rentals
      let addressSet = new Set(
        this.rentals.map((arrElement) => arrElement.address)
      );
      //initialize obj
      for (let address of addressSet) {
        result[address] = 0;
      }
      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            if (
              this.filterStartDate &&
              this.filterEndDate &&
              (moment(tenantRevenues.paymentDate).isSameOrAfter(moment(this.filterStartDate)) &&
              moment(tenantRevenues.paymentDate).isSameOrBefore(moment(this.filterEndDate)))
            ) {
              console.log(tenantRevenues.paymentDate);
              let tenantRevenuesPaymentAmount = JSON.parse(
                JSON.stringify(tenantRevenues.paymentAmount)
              );
              if (tenantRevenuesPaymentAmount) {
                result[rental.address] += parseInt(tenantRevenuesPaymentAmount);
              }
            } else if (this.filterStartDate && this.filterEndDate) {
              continue;
            } else {
              let tenantRevenuesPaymentAmount = JSON.parse(
                JSON.stringify(tenantRevenues.paymentAmount)
              );
              result[rental.address] += parseInt(tenantRevenuesPaymentAmount);
            }
          }
        }
      }
      console.log(result);
      return result;
    },
    revenueAgainstTimeDataDefault() { // if the day dont have collect, put 0
      // {time, }
      var result = {};
      // initalise all dates to 0 payment amount
      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            // set all dates to 0
            let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
            result[tenantRevenuePaymentDate] = 0;
          }
        }
      }
      result = Object.keys(result)
        .sort()
        .reduce(function (acc, key) {
          acc[key] = result[key];
          return acc;
        }, {});

      // result.map((x) => moment(x).format("YYYY-MM"))

      console.log("sorted initialised result:", result);

      var startDate = moment(Object.keys(result)[0]);
      var endDate = moment(Object.keys(result)[Object.keys(result).length - 1]);
      var currentDate = startDate;
      while (currentDate.isBefore(endDate)) {
        var nextDate = startDate.add(1, 'days').format("YYYY-MM-DD");
        result[nextDate] = 0;
      }
      
      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
            result[tenantRevenuePaymentDate] += tenantRevenues.paymentAmount;
          }
        }
      }
      console.log("unsorted", result);
      return result;   
    },

    revenueExpensesAgainstTimeDataByMonth() { 
      
      // REVENUES GRAPH 
      // need settle the filtering for rentals
      // for (let rental of this.rentals) {
      //   for (let tenant of rental.tenants) {
      //     for (let tenantRevenues of tenant.revenues) {
      //       if (
      //         this.filterStartDate &&
      //         this.filterEndDate &&
      //         (moment(tenantRevenues.paymentDate).isSameOrAfter(moment(this.filterStartDate)) &&
      //         moment(tenantRevenues.paymentDate).isSameOrBefore(moment(this.filterEndDate)))
      //       ) {
      //         console.log(tenantRevenues.paymentDate);
      //         let tenantRevenuesPaymentAmount = JSON.parse(
      //           JSON.stringify(tenantRevenues.paymentAmount)
      //         );
      //         if (tenantRevenuesPaymentAmount) {
      //           result[rental.address] += parseInt(tenantRevenuesPaymentAmount);
      //         }
      //       } else if (this.filterStartDate && this.filterEndDate) {
      //         continue;
      //       } else {
      //         let tenantRevenuesPaymentAmount = JSON.parse(
      //           JSON.stringify(tenantRevenues.paymentAmount)
      //         );
      //         result[rental.address] += parseInt(tenantRevenuesPaymentAmount);
      //       }
      //     }
      //   }
      // }
      var revenueTemp = {};
      // initalise all dates to 0 payment amount
      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            // set all dates to 0
            let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
            revenueTemp[tenantRevenuePaymentDate] = 0;
          }
        }
      }
      revenueTemp = Object.keys(revenueTemp)
        .sort()
        .reduce(function (acc, key) {
          acc[key] = revenueTemp[key];
          return acc;
        }, {});

      // result.map((x) => moment(x).format("YYYY-MM"))

      console.log("sorted initialised result:", revenueTemp);

      var startDate = moment(Object.keys(revenueTemp)[0]);
      var endDate = moment(Object.keys(revenueTemp)[Object.keys(revenueTemp).length - 1]);
      var currentDate = startDate;
      while (currentDate.isBefore(endDate)) {
        var nextDate = startDate.add(1, 'days').format("YYYY-MM-DD");
        revenueTemp[nextDate] = 0;
      }
      
      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
            revenueTemp[tenantRevenuePaymentDate] += tenantRevenues.paymentAmount;
          }
        }
      }

      let revenueFinal = {}; 
      for (const [key] of Object.entries(revenueTemp)) {
        revenueFinal[moment(key).format('YYYY-MM')] = 0; 
      }

      for (const [key, value] of Object.entries(revenueTemp)) {
        revenueFinal[moment(key).format('YYYY-MM')] += value; 
      }
      console.log("final revenues",revenueFinal);

      // EXPENSES GRAPH
      let expenses = this.expenses;
      if (this.filterStartDate && this.filterEndDate) {
        console.log("hi");
        expenses = this.expenses.filter((exp) =>
          moment(exp.expenseDate).isSameOrAfter(moment(this.filterStartDate)) && 
          moment(exp.expenseDate).isSameOrBefore(moment(this.filterEndDate))
        );
      }
      var expensesTemp = {};
      // initalise all dates to 0 payment amount
      for (let expense of expenses) {
        expensesTemp[expense.expenseDate] = 0;
      }

      expensesTemp = Object.keys(expensesTemp)
        .sort()
        .reduce(function (acc, key) {
          acc[key] = expensesTemp[key];
          return acc;
        }, {});

      // result.map((x) => moment(x).format("YYYY-MM"))

      // console.log("sorted initialised result:", revenueTemp);
      console.log(expensesTemp);
      var startDate1 = moment(Object.keys(expensesTemp)[0]);
      var endDate1 = moment(Object.keys(expensesTemp)[Object.keys(expensesTemp).length - 1]);
      var currentDate1 = startDate1;
      while (currentDate1.isBefore(endDate1)) {
        var nextDate1 = startDate1.add(1, 'days').format("YYYY-MM-DD");
        expensesTemp[nextDate1] = 0;
      }
      
      for (let expense of this.expenses) {
        expensesTemp[expense.expenseDate]  += expense.expenseCost;
      }
      let expensesFinal = {}; 
      for (const [key] of Object.entries(expensesTemp)) {
        expensesFinal[moment(key).format('YYYY-MM')] = 0; 
      }

      for (const [key, value] of Object.entries(expensesTemp)) {
        expensesFinal[moment(key).format('YYYY-MM')] += value; 
      }
      console.log("final expenses",expensesFinal);

      var data = [{name: 'Revenue', data: revenueFinal},
                  {name: 'Expenses', data: expensesFinal},
                  ];
      return data;      
    },

    findLowerBound() {
      if (!this.filterStartDate) {
        return moment().subtract(1, 'year').format("YYYY-MM"); // "2021-04"
      }
      return this.filterStartDate;
    },

    findUpperBound() {
      if (!this.filterEndDate) {
        return moment().format("YYYY-MM");
      }
      return this.filterEndDate;
    }

    // cumulativeRevenueAgainstTimeData() {
    //   // {time, }
    //   var result = {};
    //   // initalise all dates to 0 payment amount
    //   for (let rental of this.rentals) {
    //     for (let tenant of rental.tenants) {
    //       for (let tenantRevenues of tenant.revenues) {
    //         let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
    //         result[tenantRevenuePaymentDate] = 0;
    //       }
    //     }
    //   }
    //   console.log("initalised result:", result);
    //   for (let rental of this.rentals) {
    //     for (let tenant of rental.tenants) {
    //       for (let tenantRevenues of tenant.revenues) {
    //         let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
    //         result[tenantRevenuePaymentDate] += tenantRevenues.paymentAmount;
    //       }
    //     }
    //   }
    //   console.log("unsorted", result);

    //   let sortedResult = Object.keys(result)
    //     .sort()
    //     .reduce(function (acc, key) {
    //       acc[key] = result[key];
    //       return acc;
    //     }, {});
      
    //   var cumulativeRevenue = 0;
    //   for (const [key, value] of Object.entries(sortedResult)) {
    //     console.log(`${key}: ${value}`);
    //     cumulativeRevenue += value;
    //     sortedResult[key] = cumulativeRevenue;
    //   }
    //   console.log(sortedResult);
    //   return sortedResult;      
    // },
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

    onFilterStartInput(e) {
      this.filterStartDate = e.target.value;
    },

    onFilterEndInput(e) {
      this.filterEndDate = e.target.value;
    },

    clearFilter() {
      this.filterStartDate = "";
      this.filterEndDate = "";
      document.getElementById("filterForm").reset();
    },

    foobarbarblacksheep() {
      this.foo = !this.foo;
    }
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


<style scoped>
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