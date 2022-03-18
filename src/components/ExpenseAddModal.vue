<template>
<!-- Modal --> 
  <div class="modal fade" id = "newExpenseModal" aria-hidden="true" ref="modalEle">
    <div class="modal-dialog modal-xl" data-bs-backdrop="static">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addexpensetitle">Add New Expense</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="addExpenseForm">
            <div class="mb-3">
              <label for="postalCode" class="form-label">Rental</label> 
              <input 
              type="number" 
              class="form-control"
              id="postalCode" 
              placeholder="Select Rental"
              v-model="postalCode"/>
            
            <label for="expenseType" class="form-label">Type of Expense</label> 
            <select class="form-control" name="expenseType" id="expenseType" v-model="expenseType">
                <option value="loan">Loan</option>
                <option value="maintenance">Maintenance</option>
                <option value="furnishing">Furnishing</option>
                <option value="utilities">Utilities</option>
                <option value="tax">Tax</option>
                <option value="others">Others</option>
                
              </select>

            <!-- <input type="text" class="form-control" placeholder="Furnishing" v-model="expenseType"/> -->
            
            <label for="expenseCost" class="form-label">Cost</label>
            <input 
            type="number" 
            class="form-control" 
            placeholder="4000"
            v-model="expenseCost"/>


            <label for="expenseDate" class="form-label">Date of Expense</label>
            <input type="date" id="expenseDate" v-model="expenseDate"/>
          </div>


          <div class="modal-footer">
            <button 
            type="button" 
            class="btn btn-secondary" 
            data-bs-dismiss="modal" 
            style="margin-right: 10px"
            >
            Cancel
            </button>
            <button 
            type="submit" 
            class="btn btn-success" 
            v-on:click="saveExpense()"
            data-bs-dismiss="modal fade"
            >
            + Add Expense
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
import { doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

export default {
  name: "ExpenseAddModal",
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

  data() {
    return {
      postalCode: "",
      expenseType: "",
      expenseCost: "",
      expenseDate: "",

      expenses: {},
    };
  },
  methods: {
    async saveExpense() {
      // Validation of inputs property details
      console.log(String(this.postalCode).length);
      if (String(this.postalCode).length !== 6) {
        alert("Please enter a valid postal code");
        return;
      } else if (!this.expenseType) {
        alert("Please choose a valid type of expense");
        return;
      } else if (!this.expenseCost) {
        alert("Please enter a valid cost");
        return;
      } else if (!this.expenseDate) {
        alert("Please enter a valid date");
        return;
      }

      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Expenses", userEmail);

      const docData = {
        postalCode: this.postalCode,
        expenseType: this.expenseType,
        expenseCost: this.expenseCost,
        expenseDate: this.expenseDate,

      };

      try {
        await updateDoc(ref, {
          expenses: arrayUnion(docData),
        });
      } catch (error) {
        await setDoc(ref, {
          expenses: arrayUnion(docData),
        });
      }

      document.getElementById("addExpenseForm").reset();
      //this.updateUnpaid();
    },
  },
};
</script>

<style>
</style>