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

  <h1 class="header">My Rental Properties</h1>
  <table id="rentalTable" class="auto-index">
    <tr id="rentalTableHeader">
      <th>#</th>
      <th>Postal Code</th>
      <th>Address</th>
      <th>Unit Number</th>
      <th>Purchase Price</th>
    </tr>
  </table>

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
              />
              <input
                type="text"
                class="form-control"
                id="lastName2"
                placeholder="Last Name"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate2"
                name="contractStartDate"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input type="date" id="contractEndDate2" name="contractEndDate" />
              <input
                type="number"
                class="form-control"
                id="monthlyRent2"
                placeholder="Monthly Rent"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 3:</label>
              <input
                type="text"
                class="form-control"
                id="firstName3"
                placeholder="First Name"
              />
              <input
                type="text"
                class="form-control"
                id="lastName3"
                placeholder="Last Name"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate3"
                name="contractStartDate"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input type="date" id="contractEndDate3" name="contractEndDate" />
              <input
                type="number"
                class="form-control"
                id="monthlyRent3"
                placeholder="Monthly Rent"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 4:</label>
              <input
                type="text"
                class="form-control"
                id="firstName4"
                placeholder="First Name"
              />
              <input
                type="text"
                class="form-control"
                id="lastName4"
                placeholder="Last Name"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate4"
                name="contractStartDate"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input type="date" id="contractEndDate4" name="contractEndDate" />
              <input
                type="number"
                class="form-control"
                id="monthlyRent4"
                placeholder="Monthly Rent"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 5:</label>
              <input
                type="text"
                class="form-control"
                id="firstName5"
                placeholder="First Name"
              />
              <input
                type="text"
                class="form-control"
                id="lastName5"
                placeholder="Last Name"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate5"
                name="contractStartDate"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input type="date" id="contractEndDate5" name="contractEndDate" />
              <input
                type="number"
                class="form-control"
                id="monthlyRent5"
                placeholder="Monthly Rent"
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
    };
  },
  async mounted() {
    const auth = getAuth();
    const userEmail = auth.currentUser.email;
    const ref = doc(db, "Rentals", userEmail);
    const docSnap = await getDoc(ref);
    const rentals = docSnap.data().rentals;

    for (let rental of rentals) {
      console.log(rental);
      for (let tenant of rental.tenants) {
        console.log(tenant);
        var nextPaymentDate = moment(tenant.nextPaymentDate);

        if (nextPaymentDate.isBefore(moment())) {
          console.log("owe money");
          tenant.numberOfMonthsRentalUnpaid += 1;
          tenant.nextPaymentDate = this.addMonths(nextPaymentDate, 1);
        }
      }
    }
    console.log(rentals);
    await updateDoc(ref, { rentals: rentals });
  },

  methods: {
    addMonths(date, m) {
      return moment(date).add(m, "months").format("YYYY-MM-DD");
    },

    async saveRental() {
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