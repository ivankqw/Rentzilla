<template>
  <!-- Edit Expense Modal -->
  <div class="modal" id="expenseEditModal" aria-hidden="true" ref="modalEle">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Expense</h5>
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
              <select class="form-control" id="expenseType" :value="expenseType" @input="onExpenseTypeChange">
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
                @input="onExpenseCostChange"
              />

              <label for="expenseDate" class="form-label"
                >Date of Expense</label
              >
              <input
                type="date"
                id="expenseDate"
                :value="purchasePrice"
                @input="onExpenseDateChange"
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
                Save Expense
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
import { doc, getDoc, updateDoc} from "firebase/firestore";
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import expenseMixin from "../mixins/expenseMixin";

export default {
  name: "ExpenseEditModal",
  mixins: [expenseMixin],
  props: [
    // "expenseId",
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
    /////
    // function hide() {
    //   this.$emit("edited");
    //   thisModalObj.hide();
    // }
    /////
    return {
      show,
      modalEle
    }
  },

  methods: {
    // testbutton() {
    //   console.log("myIndex=", this.myIndex); // why do we need this index 
    //   console.log("myPostalCode=", this.myPostalCode);
    //   console.log("myExpenseType=", this.myExpenseType);
    //   console.log("myExpenseCost=", this.myExpenseCost);
    //   console.log("myExpenseDate=", this.myExpenseDate);
    // },

    onPostalCodeChange(event) {
      this.myPostalCode = event.target.value;
      console.log('onPostalCodeChange, event.target.value=', event.target.value);
      
    },
    onExpenseTypeChange(event) {
      this.myExpenseType = event.target.value;
      console.log('onExpenseTypeChange, event.target.value=', event.target.value);

    },
    onExpenseCostChange(event) {
      this.myExpenseCost = event.target.value;
      console.log('onExpenseCostChange, event.target.value=', event.target.value);

    },
    onExpenseDateChange(event) {
      this.myExpenseDate = event.target.value;
      console.log('onExpenseDateChange, event.target.value=', event.target.value);
    },

    async saveExpense(index) {
      // alert(index)
      console.log("CLICKED SAVE EXPENSE")
      this.$emit("edited");

      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Expenses", userEmail);
      const docSnap = await getDoc(ref);
      const expenses = JSON.parse(JSON.stringify(docSnap.data().expenses));

      console.log("myIndex=", this.myIndex); 
      console.log("myPostalCode=", this.myPostalCode);
      console.log("myExpenseType=", this.myExpenseType);
      console.log("myExpenseCost=", this.myExpenseCost);
      console.log("myExpenseDate=", this.myExpenseDate);

      console.log('before: expenses[index].postalCode=', expenses[index].postalCode);


      expenses[index].postalCode = this.myPostalCode;
      expenses[index].expenseType = this.myExpenseType;
      expenses[index].expenseCost = this.myExpenseCost;
      expenses[index].expenseDate = this.myExpenseDate;

      console.log('after: expenses[index].postalCode=', expenses[index].postalCode);
      await updateDoc(ref, { expenses: expenses });

      /** 
      const docData = {
        index: this.myIndex, ///
        postalCode: this.myPostalCode,
        expenseType: this.expenseType,
        expenseCost: this.expenseCost,
        expenseDate: this.expenseDate,
      };
      var newExpenses;
      await getDoc(ref)
        .then((x) => (newExpenses = x.data()))
        .catch((error) => console.log("get", error));
      newExpenses.expenses[this.index] = docData;
      
      setDoc(ref, {
        expenses: newExpenses.expenses,
      }).then(() => {
          console.log("updated!", newExpenses);
        }).catch((error) => {
          console.log("Error", error);
        });
      */

      // this.updateExpense(); // from mixin
    },

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
    

    deleteExpense(index) {
      alert(index)
    }
  }
};
</script>

<style>

</style>