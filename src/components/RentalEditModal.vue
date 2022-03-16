<template>
  <!-- Edit Rental Modal -->
  <div class="modal" id="editRentalModal" aria-hidden="true" ref="modalEle">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit rental</h5>
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
                :value="postalCode"
                @input="onPostalCodeChange"
              />

              <label for="address" class="form-label">Address</label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="e.g. Blk 123 Road A"
                :value="address"
              />

              <label for="unitNumber" class="form-label">Unit Number</label>
              <input
                type="text"
                class="form-control"
                id="unitNumber"
                placeholder="e.g. 01-01"
                :value="unitNumber"
              />

              <label for="purchasePrice" class="form-label"
                >Purchase Price</label
              >
              <input
                type="number"
                class="form-control"
                id="purchasePrice"
                placeholder="e.g. 123456"
                :value="purchasePrice"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 1:</label>
              <input
                type="text"
                class="form-control"
                id="firstName1"
                placeholder="First Name"
                :value="firstName1"
              />
              <input
                type="text"
                class="form-control"
                id="lastName1"
                placeholder="Last Name"
                :value="lastName1"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate1"
                name="contractStartDate"
                :value="contractStartDate1"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate1"
                name="contractEndDate"
                :value="contractEndDate1"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent1"
                placeholder="Monthly Rent"
                :value="monthlyRent1"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 2:</label>
              <input
                type="text"
                class="form-control"
                id="firstName2"
                placeholder="First Name"
                :value="firstName2"
              />
              <input
                type="text"
                class="form-control"
                id="lastName2"
                placeholder="Last Name"
                :value="lastName2"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate2"
                name="contractStartDate"
                :value="contractStartDate2"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate2"
                name="contractEndDate"
                :value="contractEndDate2"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent2"
                placeholder="Monthly Rent"
                :value="monthlyRent2"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 3:</label>
              <input
                type="text"
                class="form-control"
                id="firstName3"
                placeholder="First Name"
                :value="firstName3"
              />
              <input
                type="text"
                class="form-control"
                id="lastName3"
                placeholder="Last Name"
                :value="lastName3"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate3"
                name="contractStartDate"
                :value="contractStartDate3"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate3"
                name="contractEndDate"
                :value="contractEndDate3"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent3"
                placeholder="Monthly Rent"
                :value="monthlyRent3"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 4:</label>
              <input
                type="text"
                class="form-control"
                id="firstName4"
                placeholder="First Name"
                :value="firstName4"
              />
              <input
                type="text"
                class="form-control"
                id="lastName4"
                placeholder="Last Name"
                :value="lastName4"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate4"
                name="contractStartDate"
                :value="contractStartDate4"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate4"
                name="contractEndDate"
                :value="contractEndDate4"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent4"
                placeholder="Monthly Rent"
                :value="monthlyRent4"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 5:</label>
              <input
                type="text"
                class="form-control"
                id="firstName5"
                placeholder="First Name"
                :value="firstName5"
              />
              <input
                type="text"
                class="form-control"
                id="lastName5"
                placeholder="Last Name"
                :value="lastName5"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate5"
                name="contractStartDate"
                :value="contractStartDate5"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate5"
                name="contractEndDate"
                :value="contractEndDate5"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent5"
                placeholder="Monthly Rent"
                :value="monthlyRent5"
              />
            </div>

            <div class="footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="deleteRental(this.index)"
                style="margin-right: 10px"
              >
                Delete
              </button>
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
                v-on:click="saveRental(this.index)"
                data-bs-dismiss="modal"
              >
                Save Rental
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
//import {getAuth} from "firebase/auth"
//import {doc, arrayUnion, updateDoc, setDoc} from "firebase/firestore"
//import db from "../firebase.js"

export default {
  name: "EditModal",
  props: [
    "index",
    "postalCode",
    "address",
    "unitNumber",
    "purchasePrice",

    "firstName1",
    "lastName1",
    "contractStartDate1",
    "contractEndDate1",
    "monthlyRent1",

    "firstName2",
    "lastName2",
    "contractStartDate2",
    "contractEndDate2",
    "monthlyRent2",

    "firstName3",
    "lastName3",
    "contractStartDate3",
    "contractEndDate3",
    "monthlyRent3",

    "firstName4",
    "lastName4",
    "contractStartDate4",
    "contractEndDate4",
    "monthlyRent4",

    "firstName5",
    "lastName5",
    "contractStartDate5",
    "contractEndDate5",
    "monthlyRent5",
  ],

  data() {
    return {
      myIndex: this.index,
      myPostalCode: this.postalCode,
      myAddress: this.address,
      myUnitNumber: this.unitNumber,
      myPurchasePrice: this.purchasePrice,

      myFirstName1: this.firstName1,
      myLastName1: this.lastName1,
    }
  },

  setup() {
    let modalEle = ref(null);
    let thisModalObj = null;
    onMounted(() => {
      thisModalObj = new Modal(modalEle.value);
    });
    function show() {
      thisModalObj.show();
    }
    return {
      show,
      modalEle
    }
  },

  methods: {
    onPostalCodeChange(event) {
      this.myPostalCode = event.target.value;
    },
    async saveRental(index) {
      alert(index)
      console.log(this.myIndex);
      console.log(this.myPostalCode);
      console.log(this.myAddress);
      /*
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

      const docData = {
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
      */
    },

    deleteRental(index) {
      alert(index)
    }
  }
};
</script>

<style>
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