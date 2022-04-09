<template>
  <div class="container" v-if="noData">
    <br>
    <h1>Welcome to Rentzilla!</h1>
    <br />
    <h2 style="float: none">We are glad to have you here, landlord!</h2>
    <br />
    <img src="../assets/party_dino.png" />
    <br />
    <br />

    <h3>To get you started, let us start adding data in here!</h3>
    <br />
    <button type="button" class="btn btn-success">
      <router-link
        to="/my-rentals"
        style="color: white; text-decoration: none; color: inherit"
        >Add your Rental Properties</router-link
      >
    </button>
  </div>
  <div class="container" v-if="!noData">
    <div id="helpButton">
      <button class="helpButton" @click="clickTour">Help!</button>
    </div>
    <br />
    <h2 class="header" id="myRentalProperties">My Rental Properties</h2>
    <br /><br />
    <div id="mapid"></div>
    <v-tour name="myTour" :steps="steps"></v-tour>
    <div class="card">
      <div v-if="Object.keys(rentals).length === 0">
        <br />
        There seems to be no Rental Property data... 🤔
        <br />
        <br />
        <router-link to="/my-rentals">Add more Rental Properties</router-link>
      </div>
    </div>
    <br />

    <h2 class="header">Overview of Revenues and Expenses</h2>
    <br />
    <!-- Revenues and Expenses over Time, time series chart  -->
    <h4></h4>
    <br />

    <div>
      <div class="dropdown">
        <div class="text-right align-right row g-0">
          <div class="col-md-5 w-auto ms-auto">
            <div
              class="btn-group btn-group-sm"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                checked
                v-on:click="changeToMonths('3 Months')"
              />
              <label class="btn btn-outline-primary" for="btnradio1"
                >3 Months</label
              >

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
                v-on:click="changeToMonths('6 Months')"
              />
              <label class="btn btn-outline-primary" for="btnradio2"
                >6 Months</label
              >

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio3"
                autocomplete="off"
                v-on:click="changeToMonths('1 Year')"
              />
              <label class="btn btn-outline-primary" for="btnradio3"
                >1 Year
              </label>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div
        class="card revenueExpensesAgainstTime"
        id="revenueExpensesAgainstTime"
      >
        <br />
        <h5 class="card-title">Revenue and Expenses over Time</h5>
        <line-chart
          :data="revenueExpensesAgainstTimeDataDefault.slice(0, 2)"
          v-if="showDefault == true"
          :colors="['#006400', '#8b0000']"
          prefix="SGD$"
          thousands=","
          empty="No data"
          loading="Loading..."
          discrete="true"
        ></line-chart>

        <line-chart
          :data="revenueExpensesAgainstTimeData3Months"
          v-if="showThreeMonths == true"
          :colors="['	#006400', '#8b0000']"
          prefix="SGD$"
          thousands=","
          empty="No data"
          loading="Loading..."
          discrete="true"
        ></line-chart>

        <line-chart
          :data="revenueExpensesAgainstTimeData6Months"
          v-if="showSixMonths == true"
          :colors="['	#006400', '#8b0000']"
          prefix="SGD$"
          thousands=","
          empty="No data"
          loading="Loading..."
          discrete="true"
        ></line-chart>
        <br />
        <div v-if="revenueExpensesAgainstTimeDataDefault[2]">
          <br />
          There seems to be no Revenue and Expense data for this current date
          range... 🤔
          <br />
          <br />
          <router-link to="/my-rentals">Add more Rental Properties</router-link>
          |
          <router-link to="/my-expenses">Add Expenses</router-link>
        </div>
      </div>
    </div>
    <br />
    <div class="card revenueExpensesAgainstTime"></div>
    <br />
    <h2>Breakdown of Revenues and Expenses</h2>
    <br />
    <!-- filter -->
    <div class="text-right align-right row g-0">
      <div class="col-md-5 w-auto ms-auto">
        <div class="text-left">
          <br />
          <div
            class="filter"
            v-if="
              Object.keys(expensesByRentalData).length !== 0 ||
              Object.keys(expensesByCategoryData).length !== 0 ||
              !revenuesByRentalData[1] ||
              Object.keys(rentsCollectedAgainstTime).length !== 0
            "
          >
            <form id="filterForm" class="row">
              <div class="col align-self-center"></div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col">
                <label for="filterStart" class="form-label">Start Date:</label>
                <input
                  id="filterStart"
                  @input="onFilterStartInput"
                  type="date"
                  class="form-control"
                />
              </div>
              <div class="col">
                <label for="filterEnd" class="form-label">End Date:</label>
                <input
                  id="filterEnd"
                  @input="onFilterEndInput"
                  type="date"
                  class="form-control"
                />
              </div>
              <div class="col-md-3 align-self-center">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="clearFilter"
                >
                  Clear Filter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row row-cols-3"> -->
    <div class="row row-cols-1 row-cols-md-2 g-4 mt-2">
      <!-- expensesByCategory Pie Chart -->
      <div class="col">
        <div class="card expensesByCategory" id="expensesByCategory">
          <div class="card-body">
            <h5 class="card-title">Expenses by Category</h5>
            <div id="expensesByCatergoryPieChart">
              <pie-chart
                :data="expensesByCategoryData"
                :donut="true"
                prefix="SGD$"
                thousands=","
              ></pie-chart>
            </div>
            <div
              v-if="
                Object.keys(expensesByCategoryData).length === 0 ||
                Number.isNaN(Object.values(expensesByCategoryData)[0])
              "
            >
              <br />
              There seems to be no Expense data for this current date range...
              🤔
              <br />
              <br />
              <router-link to="/my-rentals"
                >Add more Rental Properties</router-link
              >
              |
              <router-link to="/my-expenses">Add Expenses</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- expensesByRentalProperty Column Chart -->
      <div class="col">
        <div class="card expensesByRentalProperty">
          <div class="card-body">
            <h5 class="card-title">Expenses by Rental Properties</h5>
            <div id="expensesByRentalBarChart">
              <column-chart
                :data="expensesByRentalData"
                :colors="[['#003f5c', '#58508d', '#bc5090', '#ffa600']]"
                prefix="SGD$"
                thousands=","
              ></column-chart>
            </div>
            <div
              v-if="
                Object.keys(expensesByRentalData).length === 0 ||
                Number.isNaN(Object.values(expensesByRentalData)[0])
              "
            >
              <br />
              There seems to be no Expense data for this current date range...
              🤔
              <br />
              <br />
              <router-link to="/my-rentals"
                >Add more Rental Properties</router-link
              >
              |
              <router-link to="/my-expenses">Add Expenses</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
      <!-- revenuesByRentalProperty Bar Chart -->
      <div class="col">
        <div class="card revenuesByRentalProperties">
          <div class="card-body">
            <h5 class="card-title">Revenues by Rental Properties</h5>
            <div id="revenuesByRentalPieChart">
              <bar-chart 
              :data="revenuesByRentalData[0]"
              prefix="SGD$"
              thousands=","
              ></bar-chart>
            </div>
            <div v-if="revenuesByRentalData[1]">
              <br />
              There seems to be no Revenue data for this current date range...
              🤔
              <br />
              <br />
              <router-link to="/my-rentals"
                >Collect Revenue from Outstanding Rents</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />

    <!-- <h4>cumulative revenue against time</h4>
    <line-chart :data="cumulativeRevenueAgainstTimeData">TIMESERIES</line-chart> -->
</template>

<script>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
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
    const steps = ref([]);

    steps.value = [
      {
        target: "#mapid",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Welcome to your Home page!",
        },
        content: `You will be able to see your Rental Properties in this map here`,
      },
      {
        header: {
          title: "Welcome to your Home page!",
        },
        target: ".revenueExpensesAgainstTime",
        content:
          "You will be able to see your Revenue and Expenses over time here, displayed in a line graph!",
      },
      {
        header: {
          title: "Welcome to your Home page!",
        },
        target: ".expensesByCategory",
        content:
          "You will be able to see your Expenses by Category here! Use the date filters to filter by date!",
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
      },
      {
        header: {
          title: "Welcome to your Home page!",
        },
        target: ".expensesByRentalProperty",
        content:
          "You will be able to see your Expenses by Rental here! Use the date filters to filter by date!",
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
      },
      {
        header: {
          title: "Welcome to your Home page!",
        },
        target: ".revenuesByRentalProperties",
        content:
          "You will be able to see your Revenues by Rental Properties here! Use the date filters to filter by date!",
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
      },
    ];

    const clickTour = () => {
      try {
        window.tours["myTour"].start();
      } catch (e) {
        console.log("error here click tour", e);
      }
    };

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
          //var isEmpty = true;
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
          for (let [postalCode, values] of Object.entries(resultObj)) {
            console.log(postalCode);
            //isEmpty = fl
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
    });
    return {
      clickTour,
      steps,
    };
  },

  data() {
    return {
      currLatLong: {},
      expenses: [],
      rentals: [],
      filterStartDate: "",
      filterEndDate: "",
      // foo: true,
      showThreeMonths: false,
      showSixMonths: false,
      showDefault: true,
      options: ["1 Year", "6 Months", "3 Months"],
      value: "1 Year",
    };
  },

  computed: {
    noData() {
      return (
        Object.keys(this.rentals).length === 0 &&
        Object.keys(this.expenses).length === 0
      );
    },

    expensesByCategoryData() {
      let expenses = this.expenses;
      if (this.filterStartDate && this.filterEndDate) {
        console.log("hi");
        expenses = this.expenses.filter(
          (exp) =>
            moment(exp.expenseDate).isSameOrAfter(
              moment(this.filterStartDate)
            ) &&
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
      console.log("expenses by category", result);
      return result;
    },

    expensesByRentalData() {
      let expenses = this.expenses;
      if (this.filterStartDate && this.filterEndDate) {
        console.log("hi");
        expenses = this.expenses.filter(
          (exp) =>
            moment(exp.expenseDate).isSameOrAfter(
              moment(this.filterStartDate)
            ) &&
            moment(exp.expenseDate).isSameOrBefore(moment(this.filterEndDate))
        );
      }
      var result = {};
      //get all unique rentals
      let addressSet = new Set(
        expenses.map((arrElement) => arrElement.address + "#" + arrElement.unitNumber)
      );
      // console.log(addressSet);
      //initialize obj
      for (let address of addressSet) {
        result[address] = 0;
      }
      for (let expense of this.expenses) {
        let fullAddress = expense.address + "#" + expense.unitNumber;
        result[fullAddress] += expense.expenseCost;
      }
      // console.log("result from expenses by rental data", result);
      console.log("expenses by rental properties", result);
      console.log("ddd", Number.isNaN(Object.values(result)[0]));
      return result;
    },

    revenuesByRentalData() {
      var result = {};
      //get all unique rentals
      let addressSet = new Set(
        this.rentals.map((arrElement) => arrElement.address + "#"+ arrElement.unitNumber)
      );
      console.log(addressSet);
      //initialize obj
      for (let address of addressSet) {
        result[address] = 0;
      }
      console.log(result);
      // for (let rental of this.rentals) {
      //   for (let tenant of rental.tenants) {
      //     for (let tenantRevenues of tenant.revenues) {
      //       console.log(rental.address + rental.unitNumber + "tenant paid: " + tenantRevenues.paymentAmount);
      //       let fullAddress = rental.address + rental.unitNumber;
      //       result[fullAddress] = 0;
      //       console.log(result);
      //     }
      //   }
      // }
      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            let fullAddress = rental.address + "#"+ rental.unitNumber;
            if (
              this.filterStartDate &&
              this.filterEndDate &&
              moment(tenantRevenues.paymentDate).isSameOrAfter(
                moment(this.filterStartDate)
              ) &&
              moment(tenantRevenues.paymentDate).isSameOrBefore(
                moment(this.filterEndDate)
              )
            ) {
              console.log(tenantRevenues.paymentDate);
              let tenantRevenuesPaymentAmount = JSON.parse(
                JSON.stringify(tenantRevenues.paymentAmount)
              );
              if (tenantRevenuesPaymentAmount) {
                console.log(rental.address + rental.unitNumber);
                result[fullAddress] += parseInt(tenantRevenuesPaymentAmount);
              }
            } else if (this.filterStartDate && this.filterEndDate) {
              continue;
            } else {
              let tenantRevenuesPaymentAmount = JSON.parse(
                JSON.stringify(tenantRevenues.paymentAmount)
              );
              result[fullAddress] += parseInt(tenantRevenuesPaymentAmount);
            }
          }
        }
      }
      var empty = true;
      for (const [key, value] of Object.entries(result)) {
        console.log(key + "revnue:" + value);
      }

      // filter out those with 0 revenues
      const resultAsArray = Object.entries(result);
      const filtered = resultAsArray.filter((x) => x[1] > 0);
      result = Object.fromEntries(filtered);

      for (const [key, value] of Object.entries(result)) {
        if (value !== 0 && key) {
          empty = false;
          break;
        }
      }

      console.log("re", [result, empty]);
      return [result, empty];
    },

    // method to get data for time series chart
    rentsCollectedAgainstTime() {
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

      // result.map((x) => moment(x).format("MMM YYYY"))

      // console.log("sorted initialised result:", result);

      // populate result from earliest payment date to latest payment date, set to 0
      var startDate = moment(Object.keys(result)[0]);
      var endDate = moment(Object.keys(result)[Object.keys(result).length - 1]);
      var currentDate = startDate;
      while (currentDate.isBefore(endDate)) {
        var nextDate = startDate.add(1, "days").format("YYYY-MM-DD");
        result[nextDate] = 0;
      }
      console.log(result);

      // those dates with payment, map date to amount
      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
            result[tenantRevenuePaymentDate] += tenantRevenues.paymentAmount;
          }
        }
      }

      // if date filter is activated
      if (this.filterStartDate && this.filterEndDate) {
        // filter by dates
        const resultAsArray = Object.entries(result);
        // console.log(resultAsArray);
        // nested array -> [['2022-03-30', 111221], ['2022-04-01', 115508], ...]

        const filteredResultsArray = resultAsArray.filter(
          ([paymentDate]) =>
            moment(paymentDate).isSameOrAfter(moment(this.filterStartDate)) &&
            moment(paymentDate).isSameOrBefore(moment(this.filterEndDate))
        );
        // Convert filteredResultsArray back to an object:
        const filteredResultsFinal = Object.fromEntries(filteredResultsArray);
        console.log(filteredResultsFinal);
        return filteredResultsFinal;
      }

      // else -> no filter applied
      return result;
    },

    revenueExpensesAgainstTimeDataDefault() {
      // REVENUES GRAPH
      // need settle the filtering for rentals - dont need anymore
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
      console.log("sorted initialised result:", revenueTemp);

      var startDate = moment(Object.keys(revenueTemp)[0]);
      var endDate = moment(
        Object.keys(revenueTemp)[Object.keys(revenueTemp).length - 1]
      );
      var currentDate = startDate;
      while (currentDate.isBefore(endDate)) {
        var nextDate = startDate.add(1, "days").format("YYYY-MM-DD");
        revenueTemp[nextDate] = 0;
      }

      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
            revenueTemp[tenantRevenuePaymentDate] +=
              tenantRevenues.paymentAmount;
          }
        }
      }

      let revenueFinal = {};
      let expensesFinal = {};

      // set all other months within minus 11 months of today's month to be 0
      var todaysMonth = moment(); // "2022-04"
      var lowerBoundMonth = moment().subtract(11, "months"); // "2021-05"
      console.log(todaysMonth, lowerBoundMonth);
      revenueFinal[lowerBoundMonth.format("MMM YYYY")] = 0;
      expensesFinal[lowerBoundMonth.format("MMM YYYY")] = 0;

      while (lowerBoundMonth.isBefore(todaysMonth)) {
        var addMonth = lowerBoundMonth.add(1, "month").format("MMM YYYY");
        revenueFinal[addMonth] = 0;
        expensesFinal[addMonth] = 0;
      }
      console.log(revenueFinal) // -> {2021-05: 0, 2021-06: 0, 2021-07: 0, 2021-08: 0, 2021-09: 0, ...}
      // console.log(expensesFinal) -> {2021-05: 0, 2021-06: 0, 2021-07: 0, 2021-08: 0, 2021-09: 0, ...}

      // populate revenueFinal with the months that have earned revenue
      for (const [key, value] of Object.entries(revenueTemp)) {
        if (!moment(key).isBefore(moment().subtract(11, 'months')) && !moment(key).isAfter(moment().add(1, 'month'))) {
          revenueFinal[moment(key).format("MMM YYYY")] += value;
        }
      }
      console.log("final revenues", revenueFinal);

      // EXPENSES GRAPH
      let expenses = this.expenses;
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

      // console.log("sorted initialised result:", revenueTemp);

      var startDate1 = moment(Object.keys(expensesTemp)[0]);
      var endDate1 = moment(
        Object.keys(expensesTemp)[Object.keys(expensesTemp).length - 1]
      );
      var currentDate1 = startDate1;
      while (currentDate1.isBefore(endDate1)) {
        var nextDate1 = startDate1.add(1, "days").format("YYYY-MM-DD");
        expensesTemp[nextDate1] = 0;
      }

      for (let expense of this.expenses) {
        expensesTemp[expense.expenseDate] += expense.expenseCost;
      }
      console.log(expensesTemp);

      // filter from 1 year ago till today, add to expensesFinal

      for (const [key, value] of Object.entries(expensesTemp)) {
        if (!moment(key).isBefore(moment().subtract(11, 'months')) && !moment(key).isAfter(moment())) {
          expensesFinal[moment(key).format("MMM YYYY")] += value;
        }
      }
      console.log("final expenses", expensesFinal);

      var empty = true;

      for (const [key, value] of Object.entries(expensesTemp)) {
        if (value !== 0 && key) {
          empty = false;
          break;
        }
      }

      for (const [key, value] of Object.entries(revenueFinal)) {
        if (value !== 0 && key) {
          empty = false;
          break;
        }
      }

      var data = [
        { name: "Revenue", data: revenueFinal },
        { name: "Expenses", data: expensesFinal },
        empty,
      ];
      console.log("foooo", data);
      return data;
    },

    // findLowerBound() {
    //   if (!this.filterStartDate) {
    //     // by default is to show data from half year ago
    //     return moment().subtract(11, "months").format("MMM YYYY"); // "2021-04"
    //   }
    //   console.log(moment(this.filterStartDate).format("MMM YYYY"));
    //   return moment(this.filterStartDate).format("MMM YYYY");
    // },

    // findUpperBound() {
    //   if (!this.filterEndDate) {
    //     // by default shows data until current+1 month
    //     return moment().add(2, "month").format("YYYY-MM");
    //   }
    //   console.log(moment(this.filterEndDate).format("MMM YYYY"));
    //   return moment(this.filterEndDate).format("MMM YYYY");
    // },

    revenueExpensesAgainstTimeData3Months() {
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
      console.log("sorted initialised result:", revenueTemp);

      var startDate = moment(Object.keys(revenueTemp)[0]);
      var endDate = moment(
        Object.keys(revenueTemp)[Object.keys(revenueTemp).length - 1]
      );
      var currentDate = startDate;
      while (currentDate.isBefore(endDate)) {
        var nextDate = startDate.add(1, "days").format("YYYY-MM-DD");
        revenueTemp[nextDate] = 0;
      }

      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
            revenueTemp[tenantRevenuePaymentDate] +=
              tenantRevenues.paymentAmount;
          }
        }
      }

      let revenueFinal = {};
      let expensesFinal = {};

      // set all other months within minus 11 months of today's month to be 0
      var todaysMonth = moment(); // "2022-04"
      var lowerBoundMonth = moment().subtract(3, "months"); // "2021-05"
      console.log(todaysMonth, lowerBoundMonth);
      revenueFinal[lowerBoundMonth.format("MMM YYYY")] = 0;
      expensesFinal[lowerBoundMonth.format("MMM YYYY")] = 0;
      console.log(revenueFinal);
      while (lowerBoundMonth.isBefore(todaysMonth)) {
        var addMonth = lowerBoundMonth.add(1, "month").format("MMM YYYY");
        revenueFinal[addMonth] = 0;
        expensesFinal[addMonth] = 0;
      }

      console.log(revenueFinal); // -> {2021-05: 0, 2021-06: 0, 2021-07: 0, 2021-08: 0, 2021-09: 0, ...}
      // console.log(expensesFinal) -> {2021-05: 0, 2021-06: 0, 2021-07: 0, 2021-08: 0, 2021-09: 0, ...}

      // populate revenueFinal with the months that have earned revenue
      for (const [key, value] of Object.entries(revenueTemp)) {
        if (!moment(key).isBefore(moment().subtract(3, 'months')) && !moment(key).isAfter(moment())) {
        revenueFinal[moment(key).format("MMM YYYY")] += value;
        }
      }
      console.log("final revenues", revenueFinal);

      // EXPENSES GRAPH
      let expenses = this.expenses;
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

      console.log(expensesTemp);
      var startDate1 = moment(Object.keys(expensesTemp)[0]);
      var endDate1 = moment(
        Object.keys(expensesTemp)[Object.keys(expensesTemp).length - 1]
      );
      var currentDate1 = startDate1;
      while (currentDate1.isBefore(endDate1)) {
        var nextDate1 = startDate1.add(1, "days").format("YYYY-MM-DD");
        expensesTemp[nextDate1] = 0;
      }

      for (let expense of this.expenses) {
        expensesTemp[expense.expenseDate] += expense.expenseCost;
      }

      for (const [key, value] of Object.entries(expensesTemp)) {
        if (!moment(key).isBefore(moment().subtract(3, 'months')) && !moment(key).isAfter(moment())) {
        expensesFinal[moment(key).format("MMM YYYY")] += value;
        }
      }
      console.log("final expenses", expensesFinal);

      var data = [
        { name: "Revenue", data: revenueFinal },
        { name: "Expenses", data: expensesFinal },
      ];
      return data;
    },

    revenueExpensesAgainstTimeData6Months() {
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

      console.log("sorted initialised result:", revenueTemp);

      var startDate = moment(Object.keys(revenueTemp)[0]);
      var endDate = moment(
        Object.keys(revenueTemp)[Object.keys(revenueTemp).length - 1]
      );
      var currentDate = startDate;
      while (currentDate.isBefore(endDate)) {
        var nextDate = startDate.add(1, "days").format("YYYY-MM-DD");
        revenueTemp[nextDate] = 0;
      }

      for (let rental of this.rentals) {
        for (let tenant of rental.tenants) {
          for (let tenantRevenues of tenant.revenues) {
            let tenantRevenuePaymentDate = tenantRevenues.paymentDate;
            revenueTemp[tenantRevenuePaymentDate] +=
              tenantRevenues.paymentAmount;
          }
        }
      }

      let revenueFinal = {};
      let expensesFinal = {};

      // set all other months within minus 11 months of today's month to be 0
      var todaysMonth = moment(); // "2022-04"
      var lowerBoundMonth = moment().subtract(6, "months"); // "2021-05"
      console.log(todaysMonth, lowerBoundMonth);
      revenueFinal[lowerBoundMonth.format("MMM YYYY")] = 0;
      expensesFinal[lowerBoundMonth.format("MMM YYYY")] = 0;

      while (lowerBoundMonth.isBefore(todaysMonth)) {
        var addMonth = lowerBoundMonth.add(1, "month").format("MMM YYYY");
        revenueFinal[addMonth] = 0;
        expensesFinal[addMonth] = 0;
      }
      // populate revenueFinal with the months that have earned revenue
      for (const [key, value] of Object.entries(revenueTemp)) {
        if (!moment(key).isBefore(moment().subtract(6, 'months')) && !moment(key).isAfter(moment())) {
        revenueFinal[moment(key).format("MMM YYYY")] += value;
        }
      }
      console.log("final revenues", revenueFinal);

      // EXPENSES GRAPH
      let expenses = this.expenses;
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
      console.log(expensesTemp);
      var startDate1 = moment(Object.keys(expensesTemp)[0]);
      var endDate1 = moment(
        Object.keys(expensesTemp)[Object.keys(expensesTemp).length - 1]
      );
      var currentDate1 = startDate1;
      while (currentDate1.isBefore(endDate1)) {
        var nextDate1 = startDate1.add(1, "days").format("YYYY-MM-DD");
        expensesTemp[nextDate1] = 0;
      }

      for (let expense of this.expenses) {
        expensesTemp[expense.expenseDate] += expense.expenseCost;
      }

      for (const [key, value] of Object.entries(expensesTemp)) {
        if (!moment(key).isBefore(moment().subtract(6, 'months')) && !moment(key).isAfter(moment())) {
        expensesFinal[moment(key).format("MMM YYYY")] += value;
        }
      }
      console.log("final expenses", expensesFinal);

      var data = [
        { name: "Revenue", data: revenueFinal },
        { name: "Expenses", data: expensesFinal },
      ];
      return data;
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
    },

    changeToMonths(option) {
      this.value = option;
      if (this.value === "1 Year") {
        this.showDefault = true;
        this.showThreeMonths = false;
        this.showSixMonths = false;
      } else if (this.value === "3 Months") {
        this.changeTo3Months();
      } else {
        this.changeTo6Months();
      }
    },

    changeTo3Months() {
      this.showThreeMonths = true;
      this.showDefault = false;
      this.showSixMonths = false;
    },

    changeTo6Months() {
      this.showSixMonths = true;
      this.showDefault = false;
      this.showThreeMonths = false;
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
          console.log("expensesss", this.expenses);
        }
      );
      onSnapshot(
        doc(db, "Rentals", userEmail),
        { includeMetadataChanges: true },
        (doc) => {
          this.rentals = doc.data().rentals;
          console.log("rentalsss", this.rentals);
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
  /* margin-left: 30px; */
}

.btn-outline-secondary {
  border-color: #a9a9a9 !important;
  color: #36454f !important;
}

/* #clearFilterButton:hover {
  background-color: green;
  color: white;
} */
.btn-outline-secondary:hover {
  background-color: #a9a9a9 !important;
  color: black !important;
}

.helpButton {
  background-color: #31b0d5;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border-color: #46b8da;
}

#helpButton {
  position: fixed;
  bottom: -4px;
  right: 10px;
}
</style>