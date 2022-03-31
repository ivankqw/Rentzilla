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
          <h5 class="modal-title" id="exampleModalLabel">Edit Rent Payment</h5>
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
                >Enter the number of months of rent paid:</label
              >
              <input
                type="number"
                class="form-control"
                placeholder="e.g. 1"
                @change="onMonthsPaidChange"
                value="myMonthsPaid"
              />
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
                v-on:click="savePayment(this.tenantId)"
                data-bs-dismiss="modal fade"
                style="margin-right: 10px"
              >
                Confirm
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
  },

  data() {
    return {
      myMonthsPaid: this.monthsPaid,
      myPaymentDate: this.paymentDate,
    };
  },

//   computed: {
//       getPaymentAmount () {
//           const auth = getAuth();
//           const userEmail = auth.currentUser.email;
//           const rentalRef = doc(db, "Rentals", userEmail);
//           const tenantDocSnap = await getDoc(rentalRef, this.);
//       }
//   }

  methods: {
    resetEditRentForm() {
      document.getElementById("editRentForm").reset();
      this.myMonthsPaid = "";
      this.myPaymentDate = "";
      console.log("form resetted");
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

              if (this.myMonthsPaid > tenant.numberOfMonthsRentalUnpaid || this.myMonthsPaid <= 0) {
                  alert("Please enter a valid number of months");
                  return;
              }

              tenant.numberOfMonthsRentalUnpaid -= this.myMonthsPaid;
              let paymentAmount = tenant.monthlyRent * this.myMonthsPaid;

              tenant.revenues.push({paymentDate: this.myPaymentDate, paymentAmount: paymentAmount});
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
    },

    onMonthsPaidChange(event) {
      this.myMonthsPaid = event.target.value;
    },

    onPaymentDateChange(event) {
      this.myPaymentDate = event.target.value;
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
