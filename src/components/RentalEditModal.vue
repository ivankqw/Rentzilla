<template>
  <!-- Edit Rental Modal -->
  <div
    class="modal fade"
    id="editRentalModal"
    aria-hidden="true"
    ref="modalEle"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="staticBackdropLabel"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit rental</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('edited')"
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
                @input="onAddressChange"
              />

              <label for="unitNumber" class="form-label">Unit Number</label>
              <input
                type="text"
                class="form-control"
                id="unitNumber"
                placeholder="e.g. 01-01"
                :value="unitNumber"
                @input="onUnitNumberChange"
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
                @input="onPurchasePriceChange"
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
                @input="onFirstName1Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName1"
                placeholder="Last Name"
                :value="lastName1"
                @input="onLastName1Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate1"
                name="contractStartDate"
                :value="contractStartDate1"
                @input="onContractStart1Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate1"
                name="contractEndDate"
                :value="contractEndDate1"
                @input="onContractEnd1Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent1"
                placeholder="Monthly Rent"
                :value="monthlyRent1"
                @input="onMonthlyRent1Change"
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
                @input="onFirstName2Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName2"
                placeholder="Last Name"
                :value="lastName2"
                @input="onLastName2Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate2"
                name="contractStartDate"
                :value="contractStartDate2"
                @input="onContractStart2Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate2"
                name="contractEndDate"
                :value="contractEndDate2"
                @input="onContractEnd2Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent2"
                placeholder="Monthly Rent"
                :value="monthlyRent2"
                @input="onMonthlyRent2Change"
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
                @input="onFirstName3Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName3"
                placeholder="Last Name"
                :value="lastName3"
                @input="onLastName3Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate3"
                name="contractStartDate"
                :value="contractStartDate3"
                @input="onContractStart3Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate3"
                name="contractEndDate"
                :value="contractEndDate3"
                @input="onContractEnd3Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent3"
                placeholder="Monthly Rent"
                :value="monthlyRent3"
                @input="onMonthlyRent3Change"
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
                @input="onFirstName4Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName4"
                placeholder="Last Name"
                :value="lastName4"
                @input="onLastName4Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate4"
                name="contractStartDate"
                :value="contractStartDate4"
                @input="onContractStart4Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate4"
                name="contractEndDate"
                :value="contractEndDate4"
                @input="onContractEnd4Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent4"
                placeholder="Monthly Rent"
                :value="monthlyRent4"
                @input="onMonthlyRent4Change"
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
                @input="onFirstName5Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName5"
                placeholder="Last Name"
                :value="lastName5"
                @input="onLastName5Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate5"
                name="contractStartDate"
                :value="contractStartDate5"
                @input="onContractStart5Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate5"
                name="contractEndDate"
                :value="contractEndDate5"
                @input="onContractEnd5Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent5"
                placeholder="Monthly Rent"
                :value="monthlyRent5"
                @input="onMonthlyRent5Change"
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
                @click="$emit('edited')"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-success"
                v-on:click="saveRental()"
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
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import rentalMixin from "../mixins/rentalMixin";
import moment from "moment";


export default {
  name: "RentalEditModal",
  mixins: [rentalMixin],
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
      myPostalCode: null,
      myAddress: null,
      myUnitNumber: null,
      myPurchasePrice: null,
      myFirstName1: null,
      myLastName1: null,
      myContractStartDate1: null,
      myContractEndDate1: null,
      myMonthlyRent1: null,
      myFirstName2: "",
      myLastName2: "",
      myContractStartDate2: "",
      myContractEndDate2: "",
      myMonthlyRent2: "",
      myFirstName3: "",
      myLastName3: "",
      myContractStartDate3: "",
      myContractEndDate3: "",
      myMonthlyRent3: "",
      myFirstName4: "",
      myLastName4: "",
      myContractStartDate4: "",
      myContractEndDate4: "",
      myMonthlyRent4: "",
      myFirstName5: "",
      myLastName5: "",
      myContractStartDate5: "",
      myContractEndDate5: "",
      myMonthlyRent5: "",
    };
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
    function hide() {
      this.$emit("edited");
      this.ModalObj.hide();
    }
    return {
      show,
      modalEle,
      hide,
    };
  },

  methods: {
    validateEditRentalForm() {
      // Validate property details
      if (this.myPostalCode !== null) {
        if (String(this.myPostalCode).length !== 6) {
          alert("Please enter a valid postal code");
          return false;
        }
      }

      if (this.myAddress !== null) {
        if (!this.myAddress) {
          alert("Please enter a valid address");
          return false;
        }
      }

      if (this.myUnitNumber !== null) {
        if (!this.myUnitNumber) {
          alert("Please enter a valid unit number");
          return false;
        } else if (this.myUnitNumber.toLowerCase() !== "x") {
          let unit = this.myUnitNumber;
          try {
            if (unit.split("-").length !== 2) {
              alert("Please enter a valid unit number");
              return false;
            } else if (
              !/^\d+$/.test(unit.split("-")[0]) ||
              !/^\d+$/.test(unit.split("-")[1])
            ) {
              alert("Please enter a valid unit number");
              return false;
            }
          } catch (error) {
            alert("Please enter a valid unit number");
            console.log(error);
            return false;
          }
        }
      }

      if (this.myPurchasePrice !== null) {
        if (!this.myPurchasePrice) {
          alert("Please enter a valid purchase price");
          return false;
        }
      }

      // Validate tenants' details

      if (
        this.myFirstName1 !== null ||
        this.myLastName1 !== null ||
        this.myContractStartDate1 != null ||
        this.myContractEndDate1 !== null ||
        this.myMonthlyRent1 !== null
      ) {
        // Modification to tenant details
        if (
          this.myFirstName1 === "" &&
          this.myLastName1 === "" &&
          this.myContractStartDate1 === "" &&
          this.myContractEndDate1 === "" &&
          this.myMonthlyRent1 === ""
        ) {
          // All tenant details for this tenant deleted
          // Delete tenant
          alert("Tenant 1 details deleted");
        } else {
          // Not all tenant details for this tenant deleted,
          // need to check that no updated fields for this tenant are empty or invalid
          if (
            (this.myFirstName1 !== null && this.myFirstName1 === "") ||
            (this.myLastName1 !== null && this.myLastName1 === "") ||
            (this.myContractStartDate1 !== null && this.myContractStartDate1 === "") ||
            (this.myContractEndDate1 !== null && this.myContractEndDate1 === "") ||
            (this.myMonthlyRent1 !== null && this.myMonthlyRent1 === "") 
            ) {
            alert("Please ensure that all details for tenant 1 are filled up")
            return false;
          }
          let contractStartDate1 = this.myContractStartDate1 === null ? this.contractStartDate1 : this.myContractStartDate1;
          let contractEndDate1 = this.myContractEndDate1 === null ? this.contractEndDate1 : this.myContractEndDate1;
          if (
            moment(contractStartDate1).isSameOrAfter(moment(contractEndDate1))
          ) {
          alert("Please ensure that contract end date is after contract start date for Tenant 1");
          }
        }
      }

      return true;
    },

    onPostalCodeChange(event) {
      this.myPostalCode = event.target.value;
    },
    onAddressChange(event) {
      this.myAddress = event.target.value;
    },
    onUnitNumberChange(event) {
      this.myUnitNumber = event.target.value;
    },
    onPurchasePriceChange(event) {
      this.myPurchasePrice = event.target.value;
    },
    onFirstName1Change(event) {
      this.myFirstName1 = event.target.value;
    },
    onLastName1Change(event) {
      this.myLastName1 = event.target.value;
    },
    onContractStart1Change(event) {
      this.myContractStartDate1 = event.target.value;
    },
    onContractEnd1Change(event) {
      this.myContractEndDate1 = event.target.value;
    },
    onMonthlyRent1Change(event) {
      this.myMonthlyRent1 = event.target.value;
    },
    onFirstName2Change(event) {
      this.myFirstName2 = event.target.value;
    },
    onLastName2Change(event) {
      this.myLastName2 = event.target.value;
    },
    onContractStart2Change(event) {
      this.myContractStartDate2 = event.target.value;
    },
    onContractEnd2Change(event) {
      this.myContractEndDate2 = event.target.value;
    },
    onMonthlyRent2Change(event) {
      this.myMonthlyRent2 = event.target.value;
    },
    onFirstName3Change(event) {
      this.myFirstName3 = event.target.value;
    },
    onLastName3Change(event) {
      this.myLastName3 = event.target.value;
    },
    onContractStart3Change(event) {
      this.myContractStartDate3 = event.target.value;
    },
    onContractEnd3Change(event) {
      this.myContractEndDate3 = event.target.value;
    },
    onMonthlyRent3Change(event) {
      this.myMonthlyRent3 = event.target.value;
    },
    onFirstName4Change(event) {
      this.myFirstName4 = event.target.value;
    },
    onLastName4Change(event) {
      this.myLastName4 = event.target.value;
    },
    onContractStart4Change(event) {
      this.myContractStartDate4 = event.target.value;
    },
    onContractEnd4Change(event) {
      this.myContractEndDate4 = event.target.value;
    },
    onMonthlyRent4Change(event) {
      this.myMonthlyRent4 = event.target.value;
    },
    onFirstName5Change(event) {
      this.myFirstName5 = event.target.value;
    },
    onLastName5Change(event) {
      this.myLastName5 = event.target.value;
    },
    onContractStart5Change(event) {
      this.myContractStartDate5 = event.target.value;
    },
    onContractEnd5Change(event) {
      this.myContractEndDate5 = event.target.value;
    },
    onMonthlyRent5Change(event) {
      this.myMonthlyRent5 = event.target.value;
    },
    async saveRental() {
      let valid = await this.validateEditRentalForm();
      if (!valid) {
        alert(
          "Please re-enter valid details for rental ID " + (this.index + 1)
        );
        return;
      }

      this.$emit("edited");

      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      var long;
      var lat;
      var postalFind = this.myPostalCode ? this.myPostalCode : this.postalCode;
      console.log("postalFind", postalFind);

      let result = await fetch(
        `https://developers.onemap.sg/commonapi/search?searchVal=${postalFind}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
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
        postalCode: postalFind,
        address: this.myAddress ? this.myAddress : this.address,
        unitNumber: this.myUnitNumber ? this.myUnitNumber : this.unitNumber,
        purchasePrice: this.myPurchasePrice
          ? this.myPurchasePrice
          : this.purchasePrice,
        longtitude: long,
        latitude: lat,

        tenants: [
          {
            firstName: this.myFirstName1 ? this.myFirstName1 : this.firstName1,
            lastName: this.myLastName1 ? this.myLastName1 : this.lastName1,
            contractStartDate: this.myContractStartDate1
              ? this.myContractStartDate1
              : this.contractStartDate1,
            contractEndDate: this.myContractEndDate1
              ? this.myContractEndDate1
              : this.contractEndDate1,
            monthlyRent: this.myMonthlyRent1
              ? this.myMonthlyRent1
              : this.monthlyRent1,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate1
                ? this.myContractStartDate1
                : this.contractStartDate1,
              1
            ),
            numberOfMonthsRentalUnpaid: 0,
          },
          {
            firstName: this.myFirstName2 ? this.myFirstName2 : this.firstName2,
            lastName: this.myLastName2 ? this.myLastName2 : this.lastName2,
            contractStartDate: this.myContractStartDate2
              ? this.myContractStartDate2
              : this.contractStartDate2,
            contractEndDate: this.myContractEndDate2
              ? this.myContractEndDate2
              : this.contractEndDate2,
            monthlyRent: this.myMonthlyRent2
              ? this.myMonthlyRent2
              : this.monthlyRent2,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate2
                ? this.myContractStartDate2
                : this.contractStartDate2,
              1
            ),
            numberOfMonthsRentalUnpaid: 0,
          },
          {
            firstName: this.myFirstName3 ? this.myFirstName3 : this.firstName3,
            lastName: this.myLastName3 ? this.myLastName3 : this.lastName3,
            contractStartDate: this.myContractStartDate3
              ? this.myContractStartDate3
              : this.contractStartDate3,
            contractEndDate: this.myContractEndDate3
              ? this.myContractEndDate3
              : this.contractEndDate3,
            monthlyRent: this.myMonthlyRent3
              ? this.myMonthlyRent3
              : this.monthlyRent3,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate3
                ? this.myContractStartDate3
                : this.contractStartDate3,
              1
            ),
            numberOfMonthsRentalUnpaid: 0,
          },
          {
            firstName: this.myFirstName4 ? this.myFirstName4 : this.firstName4,
            lastName: this.myLastName4 ? this.myLastName4 : this.lastName4,
            contractStartDate: this.myContractStartDate4
              ? this.myContractStartDate4
              : this.contractStartDate4,
            contractEndDate: this.myContractEndDate4
              ? this.myContractEndDate4
              : this.contractEndDate4,
            monthlyRent: this.myMonthlyRent4
              ? this.myMonthlyRent4
              : this.monthlyRent4,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate4
                ? this.myContractStartDate4
                : this.contractStartDate4,
              1
            ),
            numberOfMonthsRentalUnpaid: 0,
          },
          {
            firstName: this.myFirstName5 ? this.myFirstName5 : this.firstName5,
            lastName: this.myLastName5 ? this.myLastName5 : this.lastName5,
            contractStartDate: this.myContractStartDate5
              ? this.myContractStartDate5
              : this.contractStartDate5,
            contractEndDate: this.myContractEndDate5
              ? this.myContractEndDate5
              : this.contractEndDate5,
            monthlyRent: this.myMonthlyRent5
              ? this.myMonthlyRent5
              : this.monthlyRent5,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate5
                ? this.myContractStartDate5
                : this.contractStartDate5,
              1
            ),
            numberOfMonthsRentalUnpaid: 0,
          },
        ],
      };

      var newRentals;
      await getDoc(ref)
        .then((x) => (newRentals = x.data()))
        .catch((error) => console.log("get", error));
      newRentals.rentals[this.index] = docData;

      setDoc(ref, {
        rentals: newRentals.rentals,
      })
        .then(() => {
          console.log("updated!", newRentals);
        })
        .catch((error) => {
          console.log("Error", error);
        });

      this.updateUnpaid();
    },

    async deleteRental(index) {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      alert("deleting");
      var newRentals;
      await getDoc(ref)
        .then((x) => (newRentals = x.data()))
        .catch((error) => console.log("get", error));
      newRentals.rentals.splice(index, 1);
      setDoc(ref, {
        rentals: newRentals.rentals,
      })
        .then(() => {
          console.log("updated!", newRentals);
        })
        .catch((error) => {
          console.log("Error", error);
        });

      this.updateUnpaid();
    },
  },
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