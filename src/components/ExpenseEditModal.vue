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
              <button type="button" @click="testbutton">test button</button>
              <!-- <h2 :v-text="postalCode">Postal code is {{postalCode}}</h2>
              <p :v-text="index">Index {{index}}</p>
              <p :v-text="expenseType">Exp type {{expenseType}}</p>
              <p :v-text="expenseCost">Exp cost {{expenseCost}}</p>
              <p :v-text="expenseDate">Exp date {{expenseDate}}</p> -->

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
                data-bs-dismiss="modal fade"
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

export default {
  name: "ExpenseEditModal",
  props: [
    "index",
    "postalCode",
    "expenseType",
    "expenseCost",
    "expenseDate",
  ],

  setup() {
    console.log("setup from ExpenseEditModal.vue");
    let modalEle = ref(null);
    let thisModalObj = null;
    onMounted(() => {
      thisModalObj = new Modal(modalEle.value);
    });
    function show() {
      thisModalObj.show();
    }

    // function hide() {
    //   this.$emit("edited");
    //   thisModalObj.hide();
    // }

    return {
      show,
      modalEle
    }
  },

  data() {
    return {
      myIndex: this.index,
      myPostalCode: this.postalCode, 
      myExpenseType: this.expenseType,
      myExpenseCost: this.expenseCost,
      myExpenseDate: this.expenseDate,
    }
  },


  methods: {
    testbutton() {
      console.log("myIndex=", this.myIndex); 
      console.log("myPostalCode=", this.myPostalCode);
      console.log("myExpenseType=", this.myExpenseType);
      console.log("myExpenseCost=", this.myExpenseCost);
      console.log("myExpenseDate=", this.myExpenseDate);
    },

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
      console.log("CLICKED SAVE EXPENSE")
      this.$emit("edited");

      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Expenses", userEmail);
      const docSnap = await getDoc(ref);
      const expenses = JSON.parse(JSON.stringify(docSnap.data().expenses));

      // console.log("myIndex is ''", this.index == ""); 
      // console.log("myPostalCode is ''", this.postalCode == "");
      // console.log("myExpenseType is ''", this.expenseType == "");
      // console.log("myExpenseCost is ''", this.myExpenseCost == "");
      // console.log("myExpenseDate is ''", this.myExpenseDate == "");

      console.log("parents\nindex is ", this.$parent.index); 
      console.log("postalCode is ", this.$parent.postalCode);
      console.log("expenseType is ", this.$parent.expenseType);
      console.log("expenseCost is ", this.$parent.myExpenseCost);
      console.log("expenseDate is ", this.$parent.myExpenseDate);

      if (this.myIndex == "") {
        this.myIndex = this.$parent.index;
        console.log("*");
      }
      if (this.myPostalCode == "") {
        this.myPostalCode = this.$parent.postalCode;
        console.log("**");
      }
      if (this.myExpenseType == "") {
        this.myExpenseType = this.$parent.expenseType;
        console.log("***");        
      }
      if (this.myExpenseCost == "") {
        this.myExpenseCost = this.$parent.expenseCost;
        console.log("****");        
      }
      if (this.myExpenseDate == "") {
        this.myExpenseDate = this.$parent.expenseDate;
        console.log("*****");        

      }
      console.log('before: expenses[index].postalCode=', expenses[index].postalCode);


      expenses[index].postalCode = this.myPostalCode;
      expenses[index].expenseType = this.myExpenseType;
      expenses[index].expenseCost = this.myExpenseCost;
      expenses[index].expenseDate = this.myExpenseDate;

      console.log('after: expenses[index].postalCode=', expenses[index].postalCode);
      await updateDoc(ref, { expenses: expenses });
      this.myPostalCode = "";
      this.myExpenseType = "";
      this.myExpenseCost = "";
      this.myExpenseDate = "";
      /* 
      // this.onPostalCodeChange(event);
      // this.onExpenseTypeChange(event);
      // this.onExpenseCostChange(event);
      // this.onExpenseDateChange(event); 

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

    },

    

    async deleteExpense(index) {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Expenses", userEmail);
      const docSnap = await getDoc(ref);
      const expenses = JSON.parse(JSON.stringify(docSnap.data().expenses));
      console.log("CLICKED DELETE BUTTON\nTo delete: ", expenses[index]);

      // var newExpenses;
      // await getDoc(ref)
      //   .then((x) => (newExpenses = x.data()))
      //   .catch((error) => console.log("get", error));
      // newExpenses = expenses;
      console.log("exp b4 = ", expenses);
      expenses.splice(index, 1)
      console.log("exp aft = ", expenses);
      // await updateDoc(ref, { expenses: newExpenses });
      await updateDoc(ref, { expenses: expenses });

      console.log("exp finally, ", expenses);

      // setDoc(ref, {
      //   expenses: newExpenses.expenses,
      // })
      //   .then(() => {
      //     console.log("updated!", newExpenses);
      //   })
      //   .catch((error) => {
      //     console.log("Error", error);
      //   });

    }

  },
}

</script>

<style>

</style>