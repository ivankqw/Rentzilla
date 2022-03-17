<template>
  <!-- Edit Expense Modal -->
  <div class="modal" id="expenseEditModal" aria-hidden="true" ref="modalEle">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit expense</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="editExpenseForm">
            <div class="mb-3">
              <label for="postalCode" class="form-label">Postal Code</label>
              <input
                type="number"
                class="form-control"
                id="postalCode"
                :value="postalCode"
                @input="onPostalCodeChange"
              />


              <label for="expenseType" class="form-label">Type of Expense</label> 
              <select class="form-control" id="expenseType" :value="expenseType">
                <option value="loan">Loan</option>
                <option value="maintenance">Maintenance</option>
                <option value="furnishing">Furnishing</option>
                <option value="utilities">Utilities</option>
                <option value="tax">Tax</option>
                <option value="others">Others</option>
                
              </select>

              <label for="expenseCost" class="form-label">Cost</label>
              <input
                type="number"
                class="form-control"
                id="expenseCost"
                :value="expenseCost"
              />

              <label for="expenseDate" class="form-label"
                >Date of Expense</label
              >
              <input
                type="date"
                id="expenseDate"
                :value="purchasePrice"
              />
            </div>


            <div class="footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                @click="deleteExpense(this.index)"
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
                v-on:click="saveExpense(this.index)"
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
// import { getAuth } from "firebase/auth";
// import { doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
// import { db } from "../firebase.js";
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

export default {
  name: "ExpenseEditModal",
  props: [
    "index",
    "postalCode",
    "expenseType",
    "expenseCost",
    "expenseDate",
  ],

  data() {
    return {
      myIndex: this.index,
      myPostalCode: this.postalCode,
      myExpenseType: this.expenseType,
      myExpenseCost: this.expenseCost,
      myExpenseDate: this.expenseDate,
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

    async saveExpense(index) {
      alert(index)
      console.log(this.myIndex);
      console.log(this.myPostalCode);
      
      // console.log(String(this.postalCode).length);
      // if (String(this.postalCode).length !== 6) {
      //   alert("Please enter a valid postal code");
      //   return;
      // } else if (!this.expenseType) {
      //   alert("Please choose a valid type of expense");
      //   return;
      // } else if (!this.expenseCost) {
      //   alert("Please enter a valid cost");
      //   return;
      // } else if (!this.expenseDate) {
      //   alert("Please enter a valid date");
      //   return;
      // }

      // const auth = getAuth();
      // const userEmail = auth.currentUser.email;
      // const ref = doc(db, "Expenses", userEmail);

      // const docData = {
      //   postalCode: this.postalCode,
      //   expenseType: this.expenseType,
      //   expenseCost: this.expenseCost,
      //   expenseDate: this.expenseDate,

      // };

      // try {
      //   await updateDoc(ref, {
      //     expenses: arrayUnion(docData),
      //   });
      // } catch (error) {
      //   await setDoc(ref, {
      //     expenses: arrayUnion(docData),
      //   });
      // }

      // document.getElementById("addExpenseForm").reset();
      // //this.updateUnpaid();
    },

    deleteExpense(index) {
      alert(index)
    }
  }
};
</script>

<style>

</style>