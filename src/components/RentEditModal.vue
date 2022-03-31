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
              <label for="monthsPaid">Enter the number of months of rent paid:</label>
              <input 
              type="number" 
              class="form-control" 
              placeholder="1" 
              v-model="monthsPaid" />
              <br>
              <label for="paymentDate" >Date of Payment:</label> 
              <input id="paymentDate" class="form-control" type="date" v-model="paymentDate"/>
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
                v-on:click="savePayment()"
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
// import { doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

export default {
  name: "RentEditModal",

//   props: ["index", "fullAddress", "expenseType", "expenseCost", "expenseDate"],

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

  methods: {
      resetEditRentForm() {
          document.getElementById("editRentForm").reset();
      this.monthsPaid= ""
      this.paymentDate= ""
      console.log("form resetted");

      },

    async savePayment(tenantId) {
      console.log("CLICKED SAVE PAYMENT");

      if (!this.monthsPaid) {
          alert("Please enter a valid number of months");
          return;
      } else if (!this.paymentDate) {
          alert("Please enter a valid date");
          return;
      }

      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      const docSnap = await getDoc(ref);
      const rentals = JSON.parse(JSON.stringify(docSnap.data().rentals));

      try {
        for (let rental of rentals) {
          // console.log(rental);
          for (let tenant of rental.tenants) {
            // console.log(tenant);
            if (tenant.tenantID == tenantId) {
              // console.log("owe money");
              tenant.numberOfMonthsRentalUnpaid -= this.monthsPaid;
            }
          }
        }
      } catch (error) {
        console.log("savePayment error", error)
      }

      await updateDoc(ref, { rentals: rentals });
      console.log("updated number of months rental unpaid!");
      
      // close the modal
      var myModalEl = document.getElementById("rentEditModal");
      var modal = Modal.getInstance(myModalEl);
      modal.hide();
 
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