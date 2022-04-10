<template>
  <!-- Edit Rent Modal -->
  <div
    class="modal fade"
    id="rentEditModal"
    aria-hidden="true"
    ref="modalEle"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    aria-labelledby="staticBackdropLabel"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Record Tenant's Rent Payment
          </h5>
          <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="editRentForm">
            <div class="mb-3">
              <label for="monthsPaid"
                >Enter the Number of Months of Rent Paid by Tenant:</label
              >
              <input
                type="number"
                class="form-control"
                placeholder="e.g. 1"
                @change="onMonthsPaidChange"
                value="myMonthsPaid"
              />
              <div id="validationText" style="color: red">
                {{ this.validation }}
              </div>

              <br />
              <label for="paymentDate">Date of Payment:</label>
              <input
                id="paymentDate"
                class="form-control"
                type="date"
                @change="onPaymentDateChange"
                value="myPaymentDate"
              />
            </div>

            <!---
            <div id="confirmPaymentDetails">
              test
              {{paymentDetails}}
            </div>
            --->

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="resetEditRentForm()"
                style="margin-right: 10px"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                style="margin-right: 10px"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
                v-on:click="retrieveTenantInfo"
                :disabled="canConfirm"
              >
                Confirm
              </button>
              <!-- <button
                type="button"
                class="btn btn-success"
                v-on:click="savePayment(this.tenantId)"
                data-bs-dismiss="modal fade"
                style="margin-right: 10px"
              >
                Confirm
              </button> -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- ConfirmModal -->
  <div
    class="modal fade"
    id="exampleModal1"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirm?</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Verify that you have collected rent for the following tenant:
          <br />
          <br />
          <div style="text-align: center">
            <div style="display: inline-block; text-align: left">
              <strong> Tenant Name: </strong
              >{{ tenantInfo.firstName + " " + tenantInfo.lastName }}
              <br />
              <strong> Total Rent Collected: </strong> ${{
                tenantInfo.monthlyRent * this.myMonthsPaid
              }}
              <br />
              <strong> Tenant's Payment Date: </strong> {{ this.myPaymentDate }}
            </div>
          </div>
          <br />
          Once you have done so, click 'Confirm'.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="resetEditRentForm"
          >
            Close
          </button>
          <button
            type="button"
            @click="savePayment(this.tenantId)"
            class="btn btn-success"
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
import { getAuth } from "firebase/auth";
import { db } from "../firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "RentEditModal",

  props: ["tenantId", "monthsPaid", "paymentDate"],

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

  async mounted() {
    const auth = getAuth();
    const userEmail = auth.currentUser.email;

    const rentalRef = doc(db, "Rentals", userEmail);
    const rentalDocSnap = await getDoc(rentalRef);
    const rentals = rentalDocSnap.data().rentals;
    this.rentals = rentals;
    console.log("mounted rentals:", rentals);

    for (let rental of rentals) {
      // console.log(rental);
      for (let tenant of rental.tenants) {
        // console.log(tenant);
        if (tenant.tenantID == this.tenantId) {
          this.tenantInfo = {
            firstName: tenant.firstName,
            lastName: tenant.lastName,
            address: rental.address,
            postalCode: rental.postalCode,
            monthlyRent: tenant.monthlyRent,
          };
        }
      }
    }
    console.log(this.tenantInfo);
  },

  data() {
    return {
      myMonthsPaid: this.monthsPaid,
      myPaymentDate: this.paymentDate,
      paymentDetails: "",
      tenantInfo: "",
      confirm: "",
      checkMonthsPaid: false,
      checkPaymentDate: false,
      validation: " ",
    };
  },

  computed: {
    canConfirm() {
      if (this.checkMonthsPaid && this.checkPaymentDate) {
        return false;
      }
      return true;
    },
  },

  methods: {
    resetEditRentForm() {
      document.getElementById("editRentForm").reset();
      this.myMonthsPaid = "";
      this.myPaymentDate = "";
      this.checkMonthsPaid = false;
      this.checkPaymentDate = false;
      console.log("form resetted");
    },

    async retrieveTenantInfo() {
      if (!this.myMonthsPaid) {
        alert("Please enter a valid number of months");
        // var myModalEl = document.getElementById("exampleModal1");
        // var modal = Modal.getInstance(myModalEl);
        // modal.hide();
        // this.resetEditRentForm();
        return;
      } else if (!this.myPaymentDate) {
        alert("Please enter a valid date");
        var myModalEl2 = document.getElementById("exampleModal1");
        var modal2 = Modal.getInstance(myModalEl2);
        modal2.hide();
        this.resetEditRentForm();
        return;
      }
      const auth = getAuth();
      const userEmail = auth.currentUser.email;

      const rentalRef = doc(db, "Rentals", userEmail);
      const rentalDocSnap = await getDoc(rentalRef);
      const rentals = rentalDocSnap.data().rentals;
      this.rentals = rentals;
      // console.log("mounted rentals:", rentals);

      for (let rental of this.rentals) {
        // console.log(rental);
        for (let tenant of rental.tenants) {
          // console.log(tenant);
          if (tenant.tenantID == this.tenantId) {
            this.tenantInfo = {
              firstName: tenant.firstName,
              lastName: tenant.lastName,
              address: rental.address,
              postalCode: rental.postalCode,
              monthlyRent: tenant.monthlyRent,
            };
            return this.tenantInfo;
          }
        }
      }
    },

    async savePayment(tenantId) {
      console.log("CLICKED SAVE PAYMENT");
      console.log("tenantId is " + tenantId);

      if (!this.myMonthsPaid) {
        alert("Please enter a valid number of months");
        return;
      } else if (!this.myPaymentDate) {
        alert("Please enter a valid date");
        return;
      }

      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      const docSnap = await getDoc(ref);
      const rentals = JSON.parse(JSON.stringify(docSnap.data().rentals));
      console.log(rentals);

      try {
        for (let rental of rentals) {
          // console.log(rental);
          for (let tenant of rental.tenants) {
            // console.log(tenant);
            if (tenant.tenantID == tenantId) {
              // console.log("owe money");

              if (
                this.myMonthsPaid > tenant.numberOfMonthsRentalUnpaid ||
                this.myMonthsPaid <= 0
              ) {
                alert("Please enter a valid number of months");
                return;
              }

              tenant.numberOfMonthsRentalUnpaid -= this.myMonthsPaid;
              let paymentAmount =
                parseInt(tenant.monthlyRent) * this.myMonthsPaid;

              tenant.revenues.push({
                paymentDate: this.myPaymentDate,
                paymentAmount: paymentAmount,
              });
            }
          }
        }
      } catch (error) {
        console.log("savePayment error", error);
      }

      console.log(rentals);
      await updateDoc(ref, { rentals: rentals });
      console.log("updated outstanding rent!");

      // close the modal
      var myModalEl = document.getElementById("rentEditModal");
      var modal = Modal.getInstance(myModalEl);
      modal.hide();
      this.resetEditRentForm();
    },

    async onMonthsPaidChange(event) {
      this.myMonthsPaid = event.target.value;
      const auth = getAuth();
      const userEmail = auth.currentUser.email;

      const rentalRef = doc(db, "Rentals", userEmail);
      const rentalDocSnap = await getDoc(rentalRef);
      const rentals = rentalDocSnap.data().rentals;
      this.rentals = rentals;
      console.log(rentals);

      for (let rental of rentals) {
        // console.log(rental);
        for (let tenant of rental.tenants) {
          // console.log(tenant);
          if (tenant.tenantID == this.tenantId) {
            this.tenantInfo = {
              firstName: tenant.firstName,
              lastName: tenant.lastName,
              address: rental.address,
              postalCode: rental.postalCode,
              monthlyRent: tenant.monthlyRent,
              numberOfMonthsRentalUnpaid: tenant.numberOfMonthsRentalUnpaid,
            };
          }
        }
      }

      console.log(this.tenantInfo);
      if (this.myMonthsPaid > this.tenantInfo.numberOfMonthsRentalUnpaid) {
        this.validation =
          "Please enter a number less than or equal to " +
          this.tenantInfo.numberOfMonthsRentalUnpaid;
      } else if (this.myMonthsPaid <= 0) {
        this.validation = "Please enter a number greater than 0";
      } else {
        this.validation = " ";
      }
      this.checkMonthsPaid =
        this.myMonthsPaid <= this.tenantInfo.numberOfMonthsRentalUnpaid &&
        this.myMonthsPaid > 0;
    },

    onPaymentDateChange(event) {
      this.myPaymentDate = event.target.value;
      this.checkPaymentDate = true;
    },
  },
};
</script>

<style>
form {
  align-content: left;
  text-align: left;
}
</style>
