<template>
  <!-- Modal -->
  <div class="modal fade" id="newRentalModal" aria-hidden="true" ref="modalEle">
    <div
      class="modal-dialog modal-xl"
      id="newRentalModalDialog"
      data-bs-backdrop="static"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Rental</h5>

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
                @change="retrieveAddress()"
              />

              <label for="address" class="form-label">Address</label>
              <input
                disabled
                type="text"
                class="form-control"
                id="address"
                placeholder="-"
                v-model="address"
              />

              <label for="unitNumber" class="form-label"
                >Unit Number (Enter 'x' if not applicable)</label
              >
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
                class="form-control"
              />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate1"
                name="contractEndDate"
                v-model="contractEndDate1"
                class="form-control"
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
                class="form-control"
              />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate2"
                name="contractEndDate"
                v-model="contractEndDate2"
                class="form-control"
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
                class="form-control"
              />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate3"
                name="contractEndDate"
                v-model="contractEndDate3"
                class="form-control"
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
                class="form-control"
                v-model="contractStartDate4"
              />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate4"
                name="contractEndDate"
                class="form-control"
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
                class="form-control"
              />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate5"
                name="contractEndDate"
                v-model="contractEndDate5"
                class="form-control"
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
                @click="resetAddRentalForm()"
                type="button"
                class="btn btn-outline-secondary"
                style="margin-right: 10px"
              >
                Clear All
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
                v-on:click="saveRental()"
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
import { getAuth } from "firebase/auth";
import { doc, setDoc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import rentalMixin from "../mixins/rentalMixin";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

import moment from "moment";

export default {
  name: "RentalAddModal",
  mixins: [rentalMixin],
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
      modalEle,
    };
  },

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
  mounted() {
  },

  methods: {
    async generateTenantID() {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;

      const docRef = doc(db, "TenantCounterID", userEmail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let currentCounter = docSnap.data().counter;
        // console.log("Tenant ID:", currentCounter);
        await setDoc(docRef, {
          counter: currentCounter + 1,
        });
        return currentCounter;
      } else {
        
        // console.log("No such document!");
        await setDoc(docRef, {
          counter: 1,
        });
        return 0;
        
      }
    },

    async retrieveAddress() {
      var postalFind = this.postalCode;
      if (String(postalFind).length === 0) {
        return;
      } else if (String(postalFind).length === 6) {
        let result = await fetch(
          `https://developers.onemap.sg/commonapi/search?searchVal=${postalFind}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
        )
          .then((response) => response.text())
          .then((result) => {
            // console.log(result);
            if (JSON.parse(result).found == 0) {
              return "";
            }
            return JSON.parse(result).results[0];
          })
          .catch((error) => console.log("error", error));

        this.address = result
          ? result.BLK_NO + " " + result.ROAD_NAME + " "
          : "Invalid Postal Code";
      } else {
        this.address = "-";
      }
    },

    closeAddRentalModal() {
      this.resetAddRentalForm();
      var myModalEl = document.getElementById("newRentalModal");
      var modal = Modal.getInstance(myModalEl);
      modal.hide();
    },

    resetAddRentalForm() {
      function initialState() {
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
      }

      Object.assign(this.$data, initialState());
    },

    async validateRentalForm() {
      // Validation of inputs property details

      if (String(this.postalCode).length !== 6) {
        alert("Please enter a valid postal code");
        return false;
      }
      if (!this.address) {
        alert("Please enter a valid address");
        return false;
      }
      if (!this.unitNumber) {
        alert("Please enter a valid unit number");
        return false;
      } else if (this.unitNumber.toLowerCase() !== "x") {
        let unit = this.unitNumber;
        try {
          if (unit.split("-").length !== 2) {
            alert("Please enter a valid unit number e.g. 01-01");
            return false;
          } else if (
            !/^\d+$/.test(unit.split("-")[0]) ||
            !/^\d+$/.test(unit.split("-")[1])
          ) {
            alert("Please enter a valid unit number e.g. 01-01");
            return false;
          } else if ( // valid floor number and unit number
            parseInt(unit.split("-")[0]) > 50 ||
            parseInt(unit.split("-")[1]) > 999
          ) {
            alert("Please enter a valid unit/floor number e.g. 01-01")
            return false;
          }
        } catch (error) {
          alert("Please enter a valid unit number e.g. 01-01");
          //console.log(error);
          return false;
        }
      }

      if (!this.purchasePrice) {
        alert("Please enter a valid purchase price");
        return false;
      }

      // Validation of inputs for tenants
      let numOfTenants = 0;
      if (
        this.firstName1 ||
        this.lastName1 ||
        this.contractStartDate1 ||
        this.contractEndDate1 ||
        this.monthlyRent1
      ) {
        if (
          !(
            this.firstName1 &&
            this.lastName1 &&
            this.contractStartDate1 &&
            this.contractEndDate1 &&
            this.monthlyRent1
          )
        ) {
          alert(
            "Please ensure that all details for Tenant 1 are correctly filled up"
          );
          return false;
        }
        if (
          moment(this.contractStartDate1).isSameOrAfter(
            moment(this.contractEndDate1)
          )
        ) {
          alert(
            "Please ensure that contract end date is after contract start date for Tenant 1"
          );
          return false;
        }
        numOfTenants += 1;
      }

      if (
        this.firstName2 ||
        this.lastName2 ||
        this.contractStartDate2 ||
        this.contractEndDate2 ||
        this.monthlyRent2
      ) {
        if (
          !(
            this.firstName2 &&
            this.lastName2 &&
            this.contractStartDate2 &&
            this.contractEndDate2 &&
            this.monthlyRent2
          )
        ) {
          alert(
            "Please ensure that all details for Tenant 2 are correctly filled up"
          );
          return false;
        }
        if (
          moment(this.contractStartDate2).isSameOrAfter(
            moment(this.contractEndDate2)
          )
        ) {
          alert(
            "Please ensure that contract end date is after contract start date for Tenant 2"
          );
          return false;
        }
        numOfTenants += 1;
      }

      if (
        this.firstName3 ||
        this.lastName3 ||
        this.contractStartDate3 ||
        this.contractEndDate3 ||
        this.monthlyRent3
      ) {
        if (
          !(
            this.firstName3 &&
            this.lastName3 &&
            this.contractStartDate3 &&
            this.contractEndDate3 &&
            this.monthlyRent3
          )
        ) {
          alert(
            "Please ensure that all details for Tenant 3 are correctly filled up"
          );
          return false;
        }
        if (
          moment(this.contractStartDate3).isSameOrAfter(
            moment(this.contractEndDate3)
          )
        ) {
          alert(
            "Please ensure that contract end date is after contract start date for Tenant 3"
          );
          return false;
        }
        numOfTenants += 1;
      }

      if (
        this.firstName4 ||
        this.lastName4 ||
        this.contractStartDate4 ||
        this.contractEndDate4 ||
        this.monthlyRent4
      ) {
        if (
          !(
            this.firstName4 &&
            this.lastName4 &&
            this.contractStartDate4 &&
            this.contractEndDate4 &&
            this.monthlyRent4
          )
        ) {
          alert(
            "Please ensure that all details for Tenant 4 are correctly filled up"
          );
          return false;
        }
        if (
          moment(this.contractStartDate4).isSameOrAfter(
            moment(this.contractEndDate4)
          )
        ) {
          alert(
            "Please ensure that contract end date is after contract start date for Tenant 4"
          );
          return false;
        }
        numOfTenants += 1;
      }

      if (
        this.firstName5 ||
        this.lastName5 ||
        this.contractStartDate5 ||
        this.contractEndDate5 ||
        this.monthlyRent5
      ) {
        if (
          !(
            this.firstName5 &&
            this.lastName5 &&
            this.contractStartDate5 &&
            this.contractEndDate5 &&
            this.monthlyRent5
          )
        ) {
          alert(
            "Please ensure that all details for Tenant 5 are correctly filled up"
          );
          return false;
        }
        if (
          moment(this.contractStartDate5).isSameOrAfter(
            moment(this.contractEndDate5)
          )
        ) {
          alert(
            "Please ensure that contract end date is after contract start date for Tenant 5"
          );
          return false;
        }
        numOfTenants += 1;
      }

      if (numOfTenants === 0) {
        alert("Please ensure that there is at least one tenant");
        return false;
      }

      async function findDuplicateRentals(postalCode, unitNumber) {
        const auth = getAuth();
        const userEmail = auth.currentUser.email;
        const ref = doc(db, "Rentals", userEmail);
        const docSnap = await getDoc(ref);
        let rentals = docSnap.data().rentals;

        rentals = rentals.filter((rental) => rental.postalCode == postalCode);

        if (rentals.length == 0) {
          return false;
        } else if (rentals.length == 1) {
          if (rentals[0].unitNumber === "x") {
            // Landed
            return true;
          } else {
            // Not landed
            return rentals[0].unitNumber == unitNumber;
          }
        } else {
          // rentals now all same postal code
          rentals = rentals.filter((rental) => rental.unitNumber == unitNumber);
          if (rentals.length >= 1) {
            return true;
          } else {
            return false;
          }
        }
      }
      let duplicatesPresent = await findDuplicateRentals(
        this.postalCode,
        this.unitNumber
      );
      if (duplicatesPresent) {
        alert(
          "Duplicate rental found with postal code " +
            this.postalCode +
            " and unit number " +
            this.unitNumber
        );
        return false;
      }
      return true;
    },

    async saveRental() {
      let valid = await this.validateRentalForm();
      if (!valid) {
        return;
      }
      //console.log("saving rental");
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
          //console.log(result);
          if (JSON.parse(result).found == 0) {
            alert("Please enter a valid postal code");
          }
          return JSON.parse(result).results[0];
        })
        .catch((error) => alert("postal code error", error));
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
            tenantID: await this.generateTenantID(),
            revenues: [],
          },
          {
            firstName: this.firstName2,
            lastName: this.lastName2,
            contractStartDate: this.contractStartDate2,
            contractEndDate: this.contractEndDate2,
            monthlyRent: this.monthlyRent2,
            nextPaymentDate: this.addMonths(this.contractStartDate2, 1),
            numberOfMonthsRentalUnpaid: 0,
            tenantID: await this.generateTenantID(),
            revenues: [],
          },
          {
            firstName: this.firstName3,
            lastName: this.lastName3,
            contractStartDate: this.contractStartDate3,
            contractEndDate: this.contractEndDate3,
            monthlyRent: this.monthlyRent3,
            nextPaymentDate: this.addMonths(this.contractStartDate3, 1),
            numberOfMonthsRentalUnpaid: 0,
            tenantID: await this.generateTenantID(),
            revenues: [],
          },
          {
            firstName: this.firstName4,
            lastName: this.lastName4,
            contractStartDate: this.contractStartDate4,
            contractEndDate: this.contractEndDate4,
            monthlyRent: this.monthlyRent4,
            nextPaymentDate: this.addMonths(this.contractStartDate4, 1),
            numberOfMonthsRentalUnpaid: 0,
            tenantID: await this.generateTenantID(),
            revenues: [],
          },
          {
            firstName: this.firstName5,
            lastName: this.lastName5,
            contractStartDate: this.contractStartDate5,
            contractEndDate: this.contractEndDate5,
            monthlyRent: this.monthlyRent5,
            nextPaymentDate: this.addMonths(this.contractStartDate5, 1),
            numberOfMonthsRentalUnpaid: 0,
            tenantID: await this.generateTenantID(),
            revenues: [],
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
      this.closeAddRentalModal();

      this.updateUnpaid();
    },
  },
};
</script>

<style>
.form-control {
  margin-bottom: 10px;
  margin-top: 10px;
}

.btn {
  box-shadow: none !important;
}
</style>