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
                @change="onPostalCodeChange"
              />

              <label for="address" class="form-label">Address</label>
              <input
                disabled
                type="text"
                class="form-control"
                id="address"
                placeholder="e.g. Blk 123 Road A"
                :value="address"
                @change="onAddressChange"
              />

              <label for="unitNumber" class="form-label"
                >Unit Number (Enter 'x' if no unit number)</label
              >
              <input
                type="text"
                class="form-control"
                id="unitNumber"
                placeholder="e.g. 01-01"
                :value="unitNumber"
                @change="onUnitNumberChange"
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
                @change="onPurchasePriceChange"
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
                @change="onFirstName1Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName1"
                placeholder="Last Name"
                :value="lastName1"
                @change="onLastName1Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate1"
                name="contractStartDate"
                :value="contractStartDate1"
                @change="onContractStart1Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate1"
                name="contractEndDate"
                :value="contractEndDate1"
                @change="onContractEnd1Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent1"
                placeholder="Monthly Rent"
                :value="monthlyRent1"
                @change="onMonthlyRent1Change"
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
                @change="onFirstName2Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName2"
                placeholder="Last Name"
                :value="lastName2"
                @change="onLastName2Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate2"
                name="contractStartDate"
                :value="contractStartDate2"
                @change="onContractStart2Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate2"
                name="contractEndDate"
                :value="contractEndDate2"
                @change="onContractEnd2Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent2"
                placeholder="Monthly Rent"
                :value="monthlyRent2"
                @change="onMonthlyRent2Change"
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
                @change="onFirstName3Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName3"
                placeholder="Last Name"
                :value="lastName3"
                @change="onLastName3Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate3"
                name="contractStartDate"
                :value="contractStartDate3"
                @change="onContractStart3Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate3"
                name="contractEndDate"
                :value="contractEndDate3"
                @change="onContractEnd3Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent3"
                placeholder="Monthly Rent"
                :value="monthlyRent3"
                @change="onMonthlyRent3Change"
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
                @change="onFirstName4Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName4"
                placeholder="Last Name"
                :value="lastName4"
                @change="onLastName4Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate4"
                name="contractStartDate"
                :value="contractStartDate4"
                @change="onContractStart4Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate4"
                name="contractEndDate"
                :value="contractEndDate4"
                @change="onContractEnd4Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent4"
                placeholder="Monthly Rent"
                :value="monthlyRent4"
                @change="onMonthlyRent4Change"
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
                @change="onFirstName5Change"
              />
              <input
                type="text"
                class="form-control"
                id="lastName5"
                placeholder="Last Name"
                :value="lastName5"
                @change="onLastName5Change"
              />
              <label for="contractStartDate" class="form-label"
                >Contract Start Date:</label
              >
              <input
                type="date"
                id="contractStartDate5"
                name="contractStartDate"
                :value="contractStartDate5"
                @change="onContractStart5Change"
              /><br />
              <label for="contractEndDate" class="form-label"
                >Contract End Date:</label
              >
              <input
                type="date"
                id="contractEndDate5"
                name="contractEndDate"
                :value="contractEndDate5"
                @change="onContractEnd5Change"
              />
              <input
                type="number"
                class="form-control"
                id="monthlyRent5"
                placeholder="Monthly Rent"
                :value="monthlyRent5"
                @change="onMonthlyRent5Change"
              />
            </div>

            <div class="footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                style="margin-right: 10px"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
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
                data-bs-toggle="modal"
                v-on:click="saveRental()"
              >
                Save Rental
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- ConfirmModal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this Rental Property? This will delete
          all Expenses related to it.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            @click="deleteRental(this.index)"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Confirm
          </button>
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
    "numTenants",
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
      myFirstName2: null,
      myLastName2: null,
      myContractStartDate2: null,
      myContractEndDate2: null,
      myMonthlyRent2: null,
      myFirstName3: null,
      myLastName3: null,
      myContractStartDate3: null,
      myContractEndDate3: null,
      myMonthlyRent3: null,
      myFirstName4: null,
      myLastName4: null,
      myContractStartDate4: null,
      myContractEndDate4: null,
      myMonthlyRent4: null,
      myFirstName5: null,
      myLastName5: null,
      myContractStartDate5: null,
      myContractEndDate5: null,
      myMonthlyRent5: null,
      tenants: {},
    };
  },

  created() {},

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
    async validateEditRentalForm() {
      let deletedTenants = [];
      // Validate property details
      let postalCodeChanged = false;
      if (this.myPostalCode !== null) {
        if (String(this.myPostalCode).length !== 6) {
          alert("Please enter a valid postal code");
          return false;
        } else if (String(this.myPostalCode) !== String(this.postalCode)) {
          postalCodeChanged = true;
        }
      }

      if (this.myAddress !== null) {
        if (!this.myAddress) {
          alert("Please enter a valid address");
          return false;
        }
      }

      let unitNumberChanged = false;
      if (this.myUnitNumber !== null) {
        if (!this.myUnitNumber) {
          alert("Please enter a valid unit number");
          return false;
        } else if (this.myUnitNumber.toLowerCase() !== "x") {
          let unit = this.myUnitNumber;
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
            }
          } catch (error) {
            alert("Please enter a valid unit number e.g. 01-01");
            console.log(error);
            return false;
          }
        }
        if (this.myUnitNumber !== this.unitNumber) {
          unitNumberChanged = true;
        }
      }

      console.log(
        "postal code / unit num changed:",
        postalCodeChanged ? "yes" : "no",
        unitNumberChanged ? "yes" : "no"
      );
      if (this.myPurchasePrice !== null) {
        if (!this.myPurchasePrice) {
          alert("Please enter a valid purchase price");
          return false;
        }
      }
      // Validate no duplicate property using postal code + unit num

      // Validate tenants' details
      let numTenantsRemaining = this.numTenants;
      console.log(numTenantsRemaining);

      if (
        this.myFirstName1 !== null ||
        this.myLastName1 !== null ||
        this.myContractStartDate1 != null ||
        this.myContractEndDate1 !== null ||
        this.myMonthlyRent1 !== null
      ) {
        // Modification to tenant details
        if (
          this.firstName1 &&
          this.myFirstName1 === "" &&
          this.myLastName1 === "" &&
          this.myContractStartDate1 === "" &&
          this.myContractEndDate1 === "" &&
          this.myMonthlyRent1 === ""
        ) {
          // tenant
          console.log("tenant 1 deleted");
          numTenantsRemaining--;
          deletedTenants.push(1);
        } else if (
          !this.firstName1 &&
          this.myFirstName1 &&
          this.myLastName1 &&
          this.myContractStartDate1 &&
          this.myContractEndDate1 &&
          this.myMonthlyRent1
        ) {
          console.log("tenant added");
          numTenantsRemaining++;
        } else if (
          !this.firstName1 &&
          !this.myFirstName1 &&
          !this.myLastName1 &&
          !this.myContractStartDate1 &&
          !this.myContractEndDate1 &&
          !this.myMonthlyRent1
        ) {
          console.log("");
        } else if (
          !this.firstName1 &&
          !(
            this.myFirstName1 &&
            this.myLastName1 &&
            this.myContractStartDate1 &&
            this.myContractEndDate1 &&
            this.myMonthlyRent1
          )
        ) {
          alert("Please ensure that all details for tenant 1 are filled up");
          return false;
        } else {
          // Not all tenant details for this tenant deleted,
          // need to check that no updated fields for this tenant are empty or invalid
          if (
            this.myFirstName1 === "" ||
            this.myLastName1 === "" ||
            this.myContractStartDate1 === "" ||
            this.myContractEndDate1 === "" ||
            this.myMonthlyRent1 === ""
          ) {
            alert("Please ensure that all details for tenant 1 are filled up");
            return false;
          }
          let contractStartDate1 =
            this.myContractStartDate1 === null
              ? this.contractStartDate1
              : this.myContractStartDate1;
          let contractEndDate1 =
            this.myContractEndDate1 === null
              ? this.contractEndDate1
              : this.myContractEndDate1;
          if (
            moment(contractStartDate1).isSameOrAfter(moment(contractEndDate1))
          ) {
            alert(
              "Please ensure that contract end date is after contract start date for Tenant 1"
            );
            return false;
          }
        }
      }
      if (
        this.myFirstName2 !== null ||
        this.myLastName2 !== null ||
        this.myContractStartDate2 != null ||
        this.myContractEndDate2 !== null ||
        this.myMonthlyRent2 !== null
      ) {
        // Modification to tenant details
        if (
          this.firstName2 &&
          this.myFirstName2 === "" &&
          this.myLastName2 === "" &&
          this.myContractStartDate2 === "" &&
          this.myContractEndDate2 === "" &&
          this.myMonthlyRent2 === ""
        ) {
          // tenant
          console.log("tenant 2 deleted");
          numTenantsRemaining--;
          deletedTenants.push(2);
        } else if (
          !this.firstName2 &&
          this.myFirstName2 &&
          this.myLastName2 &&
          this.myContractStartDate2 &&
          this.myContractEndDate2 &&
          this.myMonthlyRent2
        ) {
          console.log("tenant added");
          numTenantsRemaining++;
        } else if (
          !this.firstName2 &&
          !this.myFirstName2 &&
          !this.myLastName2 &&
          !this.myContractStartDate2 &&
          !this.myContractEndDate2 &&
          !this.myMonthlyRent2
        ) {
          console.log("");
        } else if (
          !this.firstName2 &&
          !(
            this.myFirstName2 &&
            this.myLastName2 &&
            this.myContractStartDate2 &&
            this.myContractEndDate2 &&
            this.myMonthlyRent2
          )
        ) {
          alert("Please ensure that all details for tenant 2 are filled up");
          return false;
        } else {
          // Not all tenant details for this tenant deleted,
          // need to check that no updated fields for this tenant are empty or invalid
          if (
            this.myFirstName2 === "" ||
            this.myLastName2 === "" ||
            this.myContractStartDate2 === "" ||
            this.myContractEndDate2 === "" ||
            this.myMonthlyRent2 === ""
          ) {
            alert("Please ensure that all details for tenant 2 are filled up");
            return false;
          }
          let contractStartDate2 =
            this.myContractStartDate2 === null
              ? this.contractStartDate2
              : this.myContractStartDate2;
          let contractEndDate2 =
            this.myContractEndDate2 === null
              ? this.contractEndDate2
              : this.myContractEndDate2;
          if (
            moment(contractStartDate2).isSameOrAfter(moment(contractEndDate2))
          ) {
            alert(
              "Please ensure that contract end date is after contract start date for Tenant 2"
            );
            return false;
          }
        }
      }
      if (
        this.myFirstName3 !== null ||
        this.myLastName3 !== null ||
        this.myContractStartDate3 != null ||
        this.myContractEndDate3 !== null ||
        this.myMonthlyRent3 !== null
      ) {
        // Modification to tenant details
        if (
          this.firstName3 &&
          this.myFirstName3 === "" &&
          this.myLastName3 === "" &&
          this.myContractStartDate3 === "" &&
          this.myContractEndDate3 === "" &&
          this.myMonthlyRent3 === ""
        ) {
          // tenant
          console.log("tenant 3 deleted");
          numTenantsRemaining--;
          deletedTenants.push(3);
        } else if (
          !this.firstName3 &&
          this.myFirstName3 &&
          this.myLastName3 &&
          this.myContractStartDate3 &&
          this.myContractEndDate3 &&
          this.myMonthlyRent3
        ) {
          console.log("tenant added");
          numTenantsRemaining++;
        } else if (
          !this.firstName3 &&
          !this.myFirstName3 &&
          !this.myLastName3 &&
          !this.myContractStartDate3 &&
          !this.myContractEndDate3 &&
          !this.myMonthlyRent3
        ) {
          console.log("");
        } else if (
          !this.firstName3 &&
          !(
            this.myFirstName3 &&
            this.myLastName3 &&
            this.myContractStartDate3 &&
            this.myContractEndDate3 &&
            this.myMonthlyRent3
          )
        ) {
          alert("Please ensure that all details for tenant 3 are filled up");
          return false;
        } else {
          // Not all tenant details for this tenant deleted,
          // need to check that no updated fields for this tenant are empty or invalid
          if (
            this.myFirstName3 === "" ||
            this.myLastName3 === "" ||
            this.myContractStartDate3 === "" ||
            this.myContractEndDate3 === "" ||
            this.myMonthlyRent3 === ""
          ) {
            alert("Please ensure that all details for tenant 3 are filled up");
            return false;
          }
          let contractStartDate3 =
            this.myContractStartDate3 === null
              ? this.contractStartDate3
              : this.myContractStartDate3;
          let contractEndDate3 =
            this.myContractEndDate3 === null
              ? this.contractEndDate3
              : this.myContractEndDate3;
          if (
            moment(contractStartDate3).isSameOrAfter(moment(contractEndDate3))
          ) {
            alert(
              "Please ensure that contract end date is after contract start date for Tenant 3"
            );
            return false;
          }
        }
      }
      if (
        this.myFirstName4 !== null ||
        this.myLastName4 !== null ||
        this.myContractStartDate4 != null ||
        this.myContractEndDate4 !== null ||
        this.myMonthlyRent4 !== null
      ) {
        // Modification to tenant details
        if (
          this.firstName4 &&
          this.myFirstName4 === "" &&
          this.myLastName4 === "" &&
          this.myContractStartDate4 === "" &&
          this.myContractEndDate4 === "" &&
          this.myMonthlyRent4 === ""
        ) {
          // tenant
          console.log("tenant 4 deleted");
          numTenantsRemaining--;
          deletedTenants.push(4);
        } else if (
          !this.firstName4 &&
          this.myFirstName4 &&
          this.myLastName4 &&
          this.myContractStartDate4 &&
          this.myContractEndDate4 &&
          this.myMonthlyRent4
        ) {
          console.log("tenant added");
          numTenantsRemaining++;
        } else if (
          !this.firstName4 &&
          !this.myFirstName4 &&
          !this.myLastName4 &&
          !this.myContractStartDate4 &&
          !this.myContractEndDate4 &&
          !this.myMonthlyRent4
        ) {
          console.log("");
        } else if (
          !this.firstName4 &&
          !(
            this.myFirstName4 &&
            this.myLastName4 &&
            this.myContractStartDate4 &&
            this.myContractEndDate4 &&
            this.myMonthlyRent4
          )
        ) {
          alert("Please ensure that all details for tenant 4 are filled up");
          return false;
        } else {
          // Not all tenant details for this tenant deleted,
          // need to check that no updated fields for this tenant are empty or invalid
          if (
            this.myFirstName4 === "" ||
            this.myLastName4 === "" ||
            this.myContractStartDate4 === "" ||
            this.myContractEndDate4 === "" ||
            this.myMonthlyRent4 === ""
          ) {
            alert("Please ensure that all details for tenant 4 are filled up");
            return false;
          }
          let contractStartDate4 =
            this.myContractStartDate4 === null
              ? this.contractStartDate4
              : this.myContractStartDate4;
          let contractEndDate4 =
            this.myContractEndDate4 === null
              ? this.contractEndDate4
              : this.myContractEndDate4;
          if (
            moment(contractStartDate4).isSameOrAfter(moment(contractEndDate4))
          ) {
            alert(
              "Please ensure that contract end date is after contract start date for Tenant 4"
            );
            return false;
          }
        }
      }
      if (
        this.myFirstName5 !== null ||
        this.myLastName5 !== null ||
        this.myContractStartDate5 != null ||
        this.myContractEndDate5 !== null ||
        this.myMonthlyRent5 !== null
      ) {
        // Modification to tenant details
        if (
          this.firstName5 &&
          this.myFirstName5 === "" &&
          this.myLastName5 === "" &&
          this.myContractStartDate5 === "" &&
          this.myContractEndDate5 === "" &&
          this.myMonthlyRent5 === ""
        ) {
          // tenant
          console.log("tenant 5 deleted");
          numTenantsRemaining--;
          deletedTenants.push(5);
        } else if (
          !this.firstName5 &&
          this.myFirstName5 &&
          this.myLastName5 &&
          this.myContractStartDate5 &&
          this.myContractEndDate5 &&
          this.myMonthlyRent5
        ) {
          console.log("tenant added");
          numTenantsRemaining++;
        } else if (
          !this.firstName5 &&
          !this.myFirstName5 &&
          !this.myLastName5 &&
          !this.myContractStartDate5 &&
          !this.myContractEndDate5 &&
          !this.myMonthlyRent5
        ) {
          console.log("");
        } else if (
          !this.firstName5 &&
          !(
            this.myFirstName5 &&
            this.myLastName5 &&
            this.myContractStartDate5 &&
            this.myContractEndDate5 &&
            this.myMonthlyRent5
          )
        ) {
          alert("Please ensure that all details for tenant 5 are filled up");
          return false;
        } else {
          // Not all tenant details for this tenant deleted,
          // need to check that no updated fields for this tenant are empty or invalid
          if (
            this.myFirstName5 === "" ||
            this.myLastName5 === "" ||
            this.myContractStartDate5 === "" ||
            this.myContractEndDate5 === "" ||
            this.myMonthlyRent5 === ""
          ) {
            alert("Please ensure that all details for tenant 5 are filled up");
            return false;
          }
          let contractStartDate5 =
            this.myContractStartDate5 === null
              ? this.contractStartDate5
              : this.myContractStartDate5;
          let contractEndDate5 =
            this.myContractEndDate5 === null
              ? this.contractEndDate5
              : this.myContractEndDate5;
          if (
            moment(contractStartDate5).isSameOrAfter(moment(contractEndDate5))
          ) {
            alert(
              "Please ensure that contract end date is after contract start date for Tenant 5"
            );
            return false;
          }
        }
      }
      // ensure that there is at least one tenant when rental form is saved
      if (numTenantsRemaining < 1) {
        alert("Please ensure that there is at least one tenant");
        return false;
      }

      // check no duplicate addresses using postal code and unit number
      async function findDuplicateRentals(
        originalPostalCode,
        originalUnitNumber,
        newPostalCode,
        newUnitNumber
      ) {
        console.log(
          originalPostalCode,
          originalUnitNumber,
          newPostalCode,
          newUnitNumber
        );
        const auth = getAuth();
        const userEmail = auth.currentUser.email;
        const ref = doc(db, "Rentals", userEmail);
        const docSnap = await getDoc(ref);
        let rentals = docSnap.data().rentals;

        // as of now no duplicates in rentals
        rentals = rentals.filter(
          (rental) =>
            !(
              rental.postalCode == originalPostalCode &&
              rental.unitNumber == originalUnitNumber
            )
        );
        // rentals filtered to no more current rental
        console.log(rentals);

        if (newPostalCode) {
          // postal code changed
          rentals = rentals.filter(
            (rental) => rental.postalCode == newPostalCode
          );
          if (rentals.length === 0) {
            return false;
          } else if (rentals.length === 1) {
            if (rentals[0].unitNumber === "x") {
              // Same postal code but already marked as landed
              return true;
            } else {
              // Same postal code, not landed, so check for duplicate unit num
              return rentals[0].unitNumber == newPostalCode;
            }
          }
        } else {
          // postal code not changed
          if (newUnitNumber) {
            rentals = rentals.filter(
              (rental) => rental.postalCode == originalPostalCode
            );
            if (newUnitNumber === "x") {
              if (rentals.length > 0) {
                return true;
              } else {
                return false;
              }
            } else {
              rentals = rentals.filter(
                (rental) => rental.unitNumber == newUnitNumber
              );
              if (rentals.length > 0) {
                return true;
              } else {
                return false;
              }
            }
          }
        }

        // if (postalCodeChanged) {
        //   if (this.myPostalCode === 'x')
        // }

        // // now rentals all same postal code
        // if (rentals.length == 0) {
        //   return false;
        // } else if (rentals.length == 1) {
        //   if (!postalCodeChanged) {
        //     if (
        //       (rentals[0].unitNumber === "x" && unitNumber !== 'x') ||
        //       (rentals[0].unitNumber !== "x" && unitNumber === 'x')
        //       ) {
        //       console.log("")
        //     } else {
        //       return rentals[0].unitNumber == unitNumber;
        //     }
        //   } else {
        //     return rentals[0].unitNumber == unitNumber;
        //   }

        // } else {
        //   // rentals now all same postal code
        //   // more than one rental with same postal code
        //   if (postalCode === 'x') {
        //     return true;
        //   }
        //   rentals = rentals.filter((rental) => rental.unitNumber == unitNumber);
        //   if (rentals.length >= 1) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }
      }

      let duplicatesPresent = await findDuplicateRentals(
        this.postalCode,
        this.unitNumber,
        postalCodeChanged ? this.myPostalCode : null,
        unitNumberChanged ? this.myUnitNumber : null
      );
      if (duplicatesPresent) {
        alert(
          "Duplicate rental found with postal code " +
            (postalCodeChanged ? this.myPostalCode : this.postalCode) +
            " and unit number " +
            (unitNumberChanged ? this.myUnitNumber : this.unitNumber)
        );
        return false;
      }

      return {
        validated: true,
        deletedTenants: deletedTenants
      };
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
      // Validate edit rental form
      let valid = await this.validateEditRentalForm();
      if (!valid) {
        alert(
          "Please re-enter valid details for rental ID " + (this.index + 1)
        );
        return;
      } else {
        var deletedTenants = valid.deletedTenants;
        
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
          if (JSON.parse(result).found == 0) {
            alert("Please enter a valid postal code");
          }
          return JSON.parse(result).results[0];
        })
        .catch((error) => console.log("error", error));
      lat = result.LATITUDE;
      long = result.LONGITUDE;
      var tenants = {};
      try {
        await getDoc(ref)
          .then((x) => {
            var rentals = [];
            rentals = x.data().rentals;
            rentals = rentals[this.index];
            tenants = rentals.tenants;
            console.log("tenants", tenants);
          })
          .catch((error) => console.log("get", error));
      } catch (e) {
        console.log("create err", e);
      }

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
            firstName:
              this.myFirstName1 !== null ? this.myFirstName1 : this.firstName1,
            lastName:
              this.myLastName1 !== null ? this.myLastName1 : this.lastName1,
            contractStartDate:
              this.myContractStartDate1 !== null
                ? this.myContractStartDate1
                : this.contractStartDate1,
            contractEndDate:
              this.myContractEndDate1 !== null
                ? this.myContractEndDate1
                : this.contractEndDate1,
            monthlyRent:
              this.myMonthlyRent1 !== null
                ? this.myMonthlyRent1
                : this.monthlyRent1,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate1 !== null
                ? this.myContractStartDate1
                : this.contractStartDate1,
              1
            ),
            tenantID: tenants[0].tenantID,
            numberOfMonthsRentalUnpaid: 0,
            revenues: deletedTenants.includes(1) ? [] : tenants[0].revenues,
          },
          {
            firstName:
              this.myFirstName2 !== null ? this.myFirstName2 : this.firstName2,
            lastName:
              this.myLastName2 !== null ? this.myLastName2 : this.lastName2,
            contractStartDate:
              this.myContractStartDate2 !== null
                ? this.myContractStartDate2
                : this.contractStartDate2,
            contractEndDate:
              this.myContractEndDate2 !== null
                ? this.myContractEndDate2
                : this.contractEndDate2,
            monthlyRent:
              this.myMonthlyRent2 !== null
                ? this.myMonthlyRent2
                : this.monthlyRent2,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate2 !== null
                ? this.myContractStartDate2
                : this.contractStartDate2,
              1
            ),
            tenantID: tenants[1].tenantID,
            numberOfMonthsRentalUnpaid: 0,
            revenues:  deletedTenants.includes(2) ? [] :tenants[1].revenues,
          },
          {
            firstName:
              this.myFirstName3 !== null ? this.myFirstName3 : this.firstName3,
            lastName:
              this.myLastName3 !== null ? this.myLastName3 : this.lastName3,
            contractStartDate:
              this.myContractStartDate3 !== null
                ? this.myContractStartDate3
                : this.contractStartDate3,
            contractEndDate:
              this.myContractEndDate3 !== null
                ? this.myContractEndDate3
                : this.contractEndDate3,
            monthlyRent:
              this.myMonthlyRent3 !== null
                ? this.myMonthlyRent3
                : this.monthlyRent3,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate3 !== null
                ? this.myContractStartDate3
                : this.contractStartDate3,
              1
            ),
            tenantID: tenants[2].tenantID,
            numberOfMonthsRentalUnpaid: 0,
            revenues: deletedTenants.includes(3) ? [] : tenants[2].revenues,
          },
          {
            firstName:
              this.myFirstName4 !== null ? this.myFirstName4 : this.firstName4,
            lastName:
              this.myLastName4 !== null ? this.myLastName4 : this.lastName4,
            contractStartDate:
              this.myContractStartDate4 !== null
                ? this.myContractStartDate4
                : this.contractStartDate4,
            contractEndDate:
              this.myContractEndDate4 !== null
                ? this.myContractEndDate4
                : this.contractEndDate4,
            monthlyRent:
              this.myMonthlyRent4 !== null
                ? this.myMonthlyRent4
                : this.monthlyRent4,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate4 !== null
                ? this.myContractStartDate4
                : this.contractStartDate4,
              1
            ),
            tenantID: tenants[3].tenantID,
            numberOfMonthsRentalUnpaid: 0,
            revenues: deletedTenants.includes(4) ? [] : tenants[3].revenues,
          },
          {
            firstName:
              this.myFirstName5 !== null ? this.myFirstName5 : this.firstName5,
            lastName:
              this.myLastName5 !== null ? this.myLastName5 : this.lastName5,
            contractStartDate:
              this.myContractStartDate5 !== null
                ? this.myContractStartDate5
                : this.contractStartDate5,
            contractEndDate:
              this.myContractEndDate5 !== null
                ? this.myContractEndDate5
                : this.contractEndDate5,
            monthlyRent:
              this.myMonthlyRent5 !== null
                ? this.myMonthlyRent5
                : this.monthlyRent5,
            nextPaymentDate: this.addMonths(
              this.myContractStartDate5 !== null
                ? this.myContractStartDate5
                : this.contractStartDate5,
              1
            ),
            tenantID: tenants[4].tenantID,
            numberOfMonthsRentalUnpaid: 0,
            revenues: deletedTenants.includes(5 ) ? [] :tenants[4].revenues,
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
      //alert("deleting");
      var newRentals;
      await getDoc(ref)
        .then((x) => (newRentals = x.data()))
        .catch((error) => console.log("get rental", error));
      newRentals.rentals.splice(index, 1);
      setDoc(ref, {
        rentals: newRentals.rentals,
      })
        .then(() => {
          console.log("updated rentals!", newRentals);
        })
        .catch((error) => {
          console.log("Error", error);
        });
      //delete all expenses related
      var newExp;
      await getDoc(doc(db, "Expenses", userEmail))
        .then((x) => {
          newExp = x.data();
          console.log(newExp);
        })
        .catch((err) => console.log("get expense", err));
      newExp = newExp.expenses.filter(
        (exp) => parseInt(exp.rentalIndex) !== index
      );
      //decrement the rentalIndex for all the other expenses
      for (let i = 0; i < newExp.length; i++) {
        if (newExp[i].rentalIndex > index) {
          newExp[i].rentalIndex = newExp[i].rentalIndex - 1;
        }
      }
      await setDoc(doc(db, "Expenses", userEmail), {
        expenses: newExp,
      })
        .then(() => {
          console.log("updated expenses!", newExp);
        })
        .catch((error) => {
          console.log("Error", error);
        });
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