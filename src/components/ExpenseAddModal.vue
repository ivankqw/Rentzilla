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
            v-on:click="resetAddExpenseForm()"
          ></button>
        </div>
        <div class="modal-body">
          <form id="addExpenseForm" autocomplete="off">
            <!-- <button type="button" class="btn btn-primary" @click="testbutton">test button</button> -->

            <div class="mb-3">
              <label for="fullAddress" >Rental Address</label> 
              <select class="form-control" name="fullAddress" id="fullAddress" value="" v-model="fullAddress">
                  <option hidden>Click to select</option>
                  <option v-for="rental in rentals" :key="rental.address">{{rental.address}}, {{rental.unitNumber}}, S{{rental.postalCode}}</option>
              </select>
              <br>
              <label for="expenseType">Type of Expense</label> 
              <select class="form-control" name="expenseType" id="expenseType" v-model="expenseType">
                  <option disabled hidden selected>Click to select</option>
                  <option value="Loan">Loan</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Furnishing">Furnishing</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Tax">Tax</option>
                  <option value="Others">Others</option>
              </select>
              <br>
              <label for="expenseCost">Cost</label>
              <input 
              type="number" 
              class="form-control" 
              placeholder="e.g. 4000"
              v-model="expenseCost"/>
              <br>
              <label for="expenseDate" >Date of Expense</label> <!-- class = "form-label" -->
              <input id="expenseDate" class="form-control" type="date" v-model="expenseDate"/>
            </div>


          <div class="modal-footer">
            <button 
            type="button" 
            class="btn btn-secondary" 
            data-bs-dismiss="modal" 
            style="margin-right: 10px"
            v-on:click="resetAddExpenseForm()"
            >
            Cancel
            </button>
            <button 
            type="button" 
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
import { doc, getDoc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
// import { doc, getDoc} from "firebase/firestore";
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

  async mounted() {
    const auth = getAuth();
    const userEmail = auth.currentUser.email;
    const ref = doc(db, "Expenses", userEmail);
    const docSnap = await getDoc(ref);
    const expenses = docSnap.data().expenses; // JSON.parse(JSON.stringify(docSnap.data().expenses));
    this.expenses = expenses;
    // console.log("mounted expenses:", expenses);

    const rentalRef = doc(db, "Rentals", userEmail);
    const rentalDocSnap = await getDoc(rentalRef);
    const rentals = rentalDocSnap.data().rentals;
    this.rentals = rentals;
    // console.log("mounted rentals:", rentals);
  },

  data() {
    return {
      fullAddress: "",
      rentalIndex: "", 
      expenseType: "",
      expenseCost: "",
      expenseDate: "",
      address: "",
      unitNumber: "",
      postalCode: "",

      expenses: {},

      rentals: {},
    };
  },
  
  methods: {
    // testbutton() {
    //   console.log("Test button");
    //   console.log("expenses:\n", this.expenses);
    //   console.log("rentals:\n", this.rentals);
    // },

    getRentalIndex(fullAddress) {
      // console.log("fullAddress = ", fullAddress);
      let rentals = JSON.parse(JSON.stringify(this.rentals))
      // console.log("rentals = ", rentals);
      for (let rentalId in rentals) {
        let currRental = rentals[rentalId];
        let currFullAdd = currRental.address + ", " + currRental.unitNumber + ", S" + currRental.postalCode;
        // console.log("currRental = ", currRental);

        if (currFullAdd == fullAddress) {
          this.address = currRental.address
          this.unitNumber = currRental.unitNumber
          this.postalCode = currRental.postalCode
          return rentalId;
        }
      }
      console.log("Rental ID not found");
      return -1;
    },

    resetAddExpenseForm() {
      document.getElementById("addExpenseForm").reset();
      this.fullAddress= ""
      this.rentalIndex= ""
      this.expenseType= ""
      this.expenseCost= ""
      this.expenseDate= ""
      // console.log("form resetted");
    },


    async saveExpense() {
      // console.log("CLICKED + ADD EXPENSE")
      

      // Validation of inputs property details
      if (!this.fullAddress) {
        alert("Please choose a valid rental address");
        return;
      } if (!this.expenseType) {
        alert("Please choose a valid type of expense");
        return;
      } else if (!this.expenseCost || this.expenseCost <= 0) {
        alert("Please enter a valid cost");
        return;
      } else if (!this.expenseDate) {
        alert("Please enter a valid date");
        return;
      }

      // console.log("fullAddress = ", this.fullAddress);

      this.rentalIndex = this.getRentalIndex(this.fullAddress);

      
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Expenses", userEmail);
      const docData = {
        fullAddress: this.fullAddress,
        rentalIndex: this.rentalIndex,
        expenseType: this.expenseType,
        expenseCost: this.expenseCost,
        expenseDate: this.expenseDate,
        address: this.address,
        unitNumber: this.unitNumber,
        postalCode: this.postalCode,
      };
      
      // console.log("docData: ", docData);
      try {
        await updateDoc(ref, {
          expenses: arrayUnion(docData),
        });
      } catch (error) {
        await setDoc(ref, {
          expenses: arrayUnion(docData),
        });
      }

      // close the modal
      var myModalEl = document.getElementById("newExpenseModal");
      var modal = Modal.getInstance(myModalEl);
      modal.hide();
      this.resetAddExpenseForm();
    },
  },
};
</script>

<style>
</style>