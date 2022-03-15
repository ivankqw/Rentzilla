<template>
  <h1 class="header">Ths is the My Rental Properties Page</h1>
  <h3>Welcome back, {{ $store.state.name }}</h3>
  <h3>Your email is {{ $store.state.email }}</h3>

  <button
    type="button"
    id="newRentalBtn"
    class="btn btn-warning"
    data-bs-toggle="modal"
    data-bs-target="#newRentalModal"
  >
    + New Rental
  </button>
  <br />

  <!---
  <h1 class="header">My Rental Properties</h1>
  <table id="rentalTable" class="auto-index">
    <tr id="rentalTableHeader">
      <th>#</th>
      <th>Postal Code</th>
      <th>Address</th>
      <th>Unit Number</th>
      <th>Purchase Price</th>
      <th>View Tenant Details</th>
      <th>Edit Rental Details</th>
    </tr>
  </table>
  -->

  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
        <th>#</th>
      <th>Postal Code</th>
      <th>Address</th>
      <th>Unit Number</th>
      <th>Purchase Price</th>
      <th>View Tenant Details</th>
      <th>Edit Rental Details</th>
        </tr>
        </thead>
        <tbody> 
          <tr v-for="(rental, i) in rentals" :key="i">
            <td> {{i + 1}} </td>
            <td> {{rental.postalCode}} </td>
            <td> {{rental.address}} </td>
            <td> {{rental.unitNumber}} </td>
            <td> {{rental.purchasePrice}} </td>
            <td> <button type="button" class="btn btn-primary" @click="this.showTenantDetails(i)">View</button> </td>
            <td> <button type="button" class="btn btn-primary" @click="this.editRentalDetails(i)">Edit</button> </td>
          </tr>
        </tbody>
    </table>
  </div>

  <h1 class="header">Rent</h1>
  <table id="outstandingRentTable" class="auto-index">
    <tr id="outstandingRentTableHeader">
      <th>#</th>
      <th>Tenant Name</th>
      <th>Monthly Rent</th>
      <th>Months Overdue</th>
    </tr>
  </table>

  <!-- Modal -->
  <div class="modal" id="newRentalModal" aria-hidden="true">
    <div class="modal-dialog modal-xl" data-bs-backdrop="static">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add new rental</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="addRentalForm">
            <div class="mb-3">
              <label for="postalCode" class="form-label">Postal Code</label>
              <input
                type="number"
                class="form-control"
                id="postalCode"
                placeholder="e.g. 123456"
                v-model="postalCode"
              />

              <label for="address" class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="e.g. Blk 123 Road A"
                v-model="address"
              />

              <label for="unitNumber" class="form-label">Unit Number</label>
              <input
                type="text"
                class="form-control"
                id="unitNumber"
                placeholder="e.g. 01-01"
                v-model="unitNumber"
              />

              <label for="purchasePrice" class="form-label"
                >Purchase Price</label
              >
              <input
                type="number"
                class="form-control"
                id="purchasePrice"
                placeholder="e.g. 123456"
                v-model="purchasePrice"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 1:</label>
              <input
                type="text"
                class="form-control"
                id="firstName1"
                placeholder="First Name"
                v-model="firstName1"
              />
              <input
                type="text"
                class="form-control"
                id="lastName1"
                placeholder="Last Name"
                v-model="lastName1"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate1"
                name="contractStartDate"
                v-model="contractStartDate1"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate1"
                name="contractEndDate"
                v-model="contractEndDate1"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent1"
                placeholder="Monthly Rent"
                v-model="monthlyRent1"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 2:</label>
              <input
                type="text"
                class="form-control"
                id="firstName2"
                placeholder="First Name"
                v-model="firstName2"
              />
              <input
                type="text"
                class="form-control"
                id="lastName2"
                placeholder="Last Name"
                v-model="lastName2"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate2"
                name="contractStartDate"
                v-model="contractStartDate2"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate2"
                name="contractEndDate"
                v-model="contractEndDate2"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent2"
                placeholder="Monthly Rent"
                v-model="monthlyRent2"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 3:</label>
              <input
                type="text"
                class="form-control"
                id="firstName3"
                placeholder="First Name"
                v-model="firstName3"
              />
              <input
                type="text"
                class="form-control"
                id="lastName3"
                placeholder="Last Name"
                v-model="lastName3"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate3"
                name="contractStartDate"
                v-model="contractStartDate3"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate3"
                name="contractEndDate"
                v-model="contractEndDate3"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent3"
                placeholder="Monthly Rent"
                v-model="monthlyRent3"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 4:</label>
              <input
                type="text"
                class="form-control"
                id="firstName4"
                placeholder="First Name"
                v-model="firstName4"
              />
              <input
                type="text"
                class="form-control"
                id="lastName4"
                placeholder="Last Name"
                v-model="lastName4"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate4"
                name="contractStartDate"
                v-model="contractStartDate4"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate4"
                name="contractEndDate"
                v-model="contractEndDate4"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent4"
                placeholder="Monthly Rent"
                v-model="monthlyRent4"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 5:</label>
              <input
                type="text"
                class="form-control"
                id="firstName5"
                placeholder="First Name"
                v-model="firstName5"
              />
              <input
                type="text"
                class="form-control"
                id="lastName5"
                placeholder="Last Name"
                v-model="lastName5"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate5"
                name="contractStartDate"
                v-model="contractStartDate5"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate5"
                name="contractEndDate"
                v-model="contractEndDate5"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent5"
                placeholder="Monthly Rent"
                v-model="monthlyRent5"
              />
            </div>

            <div class="footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                style="margin-right: 10px"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-success"
                v-on:click="saveRental()"
                data-bs-dismiss="modal"
              >
                + Add Rental
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, setDoc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import moment from "moment";

export default {
  name: "MyRentals",
  computed: {},
  data() {
    return {
      postalCode: "",
      address: "",
      unitNumber: "",
      purchasePrice: "",

      firstName1: "",
      lastName1: "",
      contractStartDate1: "",
      contractEndDate1: "",
      monthlyRent1: "",

      firstName2: "",
      lastName2: "",
      contractStartDate2: "",
      contractEndDate2: "",
      monthlyRent2: "",

      firstName3: "",
      lastName3: "",
      contractStartDate3: "",
      contractEndDate3: "",
      monthlyRent3: "",

      firstName4: "",
      lastName4: "",
      contractStartDate4: "",
      contractEndDate4: "",
      monthlyRent4: "",

      firstName5: "",
      lastName5: "",
      contractStartDate5: "",
      contractEndDate5: "",
      monthlyRent5: "",

      rentals: {},
    };
  },
  async mounted() {
    await this.updateUnpaid();
    //await this.displayRentals();
    const auth = getAuth();
    const userEmail = auth.currentUser.email;
    const ref = doc(db, "Rentals", userEmail);
    const docSnap = await getDoc(ref);
    const rentals = docSnap.data().rentals;
    console.log(rentals);
    this.rentals = rentals;
  },

  methods: {

    showTenantDetails(id) {
        alert(id)
      },

    editRentalDetails(id) {
        alert(id);
      },

    async displayRentals() {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      const docSnap = await getDoc(ref);
      const rentals = docSnap.data().rentals;
      //console.log(rentals);

      let ind = 1;
      var table = document.getElementById("rentalTable");
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      for (let rental of rentals) {
        var row = table.insertRow(ind);
        var postalCode = rental.postalCode;
        var address = rental.address;
        var unitNumber = rental.unitNumber;
        var purchasePrice = rental.purchasePrice;

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);

        cell1.innerHTML = ind;
        cell2.innerHTML = postalCode;
        cell3.innerHTML = address;
        cell4.innerHTML = unitNumber;
        cell5.innerHTML = purchasePrice;

        var viewTenantDetailsButton = document.createElement("button");
        viewTenantDetailsButton.className = "btn btn-primary";

        viewTenantDetailsButton.id = ind;
        viewTenantDetailsButton.innerHTML = "View Tenant Details";
        viewTenantDetailsButton.onclick = function () {
          showTenantDetails();
        };
        cell6.appendChild(viewTenantDetailsButton);

        var editRentalDetailsButton = document.createElement("button");
        editRentalDetailsButton.className = "btn btn-warning";
        editRentalDetailsButton.id = ind;
        editRentalDetailsButton.innerHTML = "Edit Rental Details";
        editRentalDetailsButton.onclick = function () {
          editRentalDetails(ind - 1);
        };
        cell7.appendChild(editRentalDetailsButton);

        ind += 1;
      }

      function showTenantDetails(id) {
        alert(id)
      }

      function editRentalDetails(id) {
        alert(id);
      }
    },
    addMonths(date, m) {
      return moment(date).add(m, "months").format("YYYY-MM-DD");
    },

    async updateUnpaid() {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      const docSnap = await getDoc(ref);
      const rentals = docSnap.data().rentals;

      for (let rental of rentals) {
        // console.log(rental);
        for (let tenant of rental.tenants) {
          // console.log(tenant);
          while (moment(tenant.nextPaymentDate).isBefore(moment())) {
            // console.log("owe money");
            tenant.numberOfMonthsRentalUnpaid += 1;
            tenant.nextPaymentDate = this.addMonths(tenant.nextPaymentDate, 1);
          }
        }
      }
      // console.log(rentals);
      await updateDoc(ref, { rentals: rentals });
      console.log("updated number of months rental unpaid!");
    },

    async saveRental() {
      // Validation of inputs property details
      console.log(String(this.postalCode).length);
      if (String(this.postalCode).length !== 6) {
        alert("Please enter a valid postal code");
        return;
      } else if (!this.address) {
        alert("Please enter a valid address");
        return;
      } else if (!this.unitNumber) {
        alert("Please enter a valid unit number");
        return;
      } else if (!this.purchasePrice) {
        alert("Please enter a valid purchase price");
        return;
      }

      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      var long;
      var lat;

      let result = await fetch(
        `https://developers.onemap.sg/commonapi/search?searchVal=${this.postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          return JSON.parse(result).results[0];
        })
        .catch((error) => console.log("error", error));
      lat = result.LATITUDE;
      long = result.LONGITUDE;

      // const docSnap = await getDoc(ref);

      const docData = {
        // rentalId: docSnap.data().rentals.length,
        postalCode: this.postalCode,
        address: this.address,
        unitNumber: this.unitNumber,
        purchasePrice: this.purchasePrice,
        longtitude: long,
        latitude: lat,

        tenants: [
          {
            firstName: this.firstName1,
            lastName: this.lastName1,
            contractStartDate: this.contractStartDate1,
            contractEndDate: this.contractEndDate1,
            monthlyRent: this.monthlyRent1,
            nextPaymentDate: this.addMonths(this.contractStartDate1, 1),
            numberOfMonthsRentalUnpaid: 0,
          },
          {
            firstName: this.firstName2,
            lastName: this.lastName2,
            contractStartDate: this.contractStartDate2,
            contractEndDate: this.contractEndDate2,
            monthlyRent: this.monthlyRent2,
            nextPaymentDate: this.addMonths(this.contractStartDate2, 1),
            numberOfMonthsRentalUnpaid: 0,
          },
          {
            firstName: this.firstName3,
            lastName: this.lastName3,
            contractStartDate: this.contractStartDate3,
            contractEndDate: this.contractEndDate3,
            monthlyRent: this.monthlyRent3,
            nextPaymentDate: this.addMonths(this.contractStartDate3, 1),
            numberOfMonthsRentalUnpaid: 0,
          },
          {
            firstName: this.firstName4,
            lastName: this.lastName4,
            contractStartDate: this.contractStartDate4,
            contractEndDate: this.contractEndDate4,
            monthlyRent: this.monthlyRent4,
            nextPaymentDate: this.addMonths(this.contractStartDate4, 1),
            numberOfMonthsRentalUnpaid: 0,
          },
          {
            firstName: this.firstName5,
            lastName: this.lastName5,
            contractStartDate: this.contractStartDate5,
            contractEndDate: this.contractEndDate5,
            monthlyRent: this.monthlyRent5,
            nextPaymentDate: this.addMonths(this.contractStartDate5, 1),
            numberOfMonthsRentalUnpaid: 0,
          },
        ],
      };

      try {
        await updateDoc(ref, {
          rentals: arrayUnion(docData),
        });
      } catch (error) {
        await setDoc(ref, {
          rentals: arrayUnion(docData),
        });
      }

      document.getElementById("addRentalForm").reset();
      this.updateUnpaid();
      await this.displayRentals();
    },
  },
};
</script>


<style scoped>
#newRentalBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;

  position: relative;
  height: 37px;
  width: 200px;
  left: 5%;

  background: #ffb300;
  border-radius: 42px;
}

#rentalTable,
#outstandingRentTable {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  left: 58px;
  top: 170px;
}

#rentalTableHeader,
#outstandingRentTableHeader {
  background: #e9ecef;
}
h1 {
  /* My Rental Properties */

  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 50px;

  color: #000000;
}

.singleTenantDetails {
  width: 200px;
  float: left;
  margin: 5px;
}

.footer {
  float: right;
  margin-top: 10px;
}

label {
  float: left;
}

.form-control {
  margin-bottom: 5px;
}
</style>