<template>
  <div class="container">
    <br />
    <h2 class="header">My Expenses</h2>
    <!-- <h3> Welcome back, {{$store.state.name}} </h3>
  <h3> Your email is {{$store.state.email}} </h3> -->
    <br />
    <br />
    <div class="text-left">
      <br />
      <div class="filter">
        <form id="filterForm" class="row">
          <div class="col align-self-center">
            <button
              id="newExpenseBtn"
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#newExpenseModal"
            >
              + New Expense
            </button>
          </div>
          <div class="col"> </div>
          <div class="col"> </div>
          
          <div class="col"> 
            <label for="filterStart" class="form-label">Start Date:</label>
            <input id="filterStart" @input="onFilterStartInput" type="date" />
          </div>
          <div class="col">
            <label for="filterEnd" class="form-label">End Date:</label>
            <input id="filterEnd" @input="onFilterEndInput" type="date" />
          </div>
          <div class="col-md-2 align-self-center">
            <button type="button" class="btn btn-warning" @click="clearFilter">
              Clear filter
            </button>
          </div>
        </form>
      </div>
    </div>
    <br />

    <div class="table-responsive" id="expensestable">
      <table class="table table-striped table-hover">
        <thead>
          <tr class="table-light">
            <th>#</th>
            <th>Postal Code</th>
            <th>Address</th>

            <th>Unit Number</th>

            <th>Type of Expense</th>
            <th>Cost</th>
            <th>Date of Expense</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(expense, i) in this.filteredExpenses" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ expense.fullAddress.split(",")[2].substring(2) }}</td>
            <td>{{ expense.fullAddress.split(",")[0] }}</td>
            <td>{{ expense.fullAddress.split(",")[1].substring(1) }}</td>

            <td>{{ expense.expenseType }}</td>
            <td>{{ expense.expenseCost }}</td>
            <td>{{ expense.expenseDate }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="this.editExpenseDetails(i)"
              >
                Manage
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ExpenseAddModal ref="expenseModal" />

    <!-- need to add in address and unit num -->
    <ExpenseEditModal
      ref="expenseEditModal"
      :index="this.index"
      :fullAddress="this.fullAddress"
      :expenseType="this.expenseType"
      :expenseCost="this.expenseCost"
      :expenseDate="this.expenseDate"
    />
  </div>
</template>

<script>
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import ExpenseEditModal from "../components/ExpenseEditModal.vue";
import ExpenseAddModal from "../components/ExpenseAddModal.vue";
import { ref } from "vue";
import moment from "moment";

export default {
  name: "MyExpenses",
  components: {
    ExpenseEditModal,
    ExpenseAddModal,
  },

  setup() {
    let expenseEditModal = ref(null);
    function showExpenseEditModal() {
      expenseEditModal.value.show();
    }

    let expenseAddModal = ref(null);
    function showExpenseAddModal() {
      expenseAddModal.value.show();
    }

    function editExpenseDetails(id) {
      showExpenseEditModal();
      var currExpense = JSON.parse(JSON.stringify(this.expenses))[id];
      console.log("currExpense=", currExpense);
      this.index = id;
      this.fullAddress = currExpense.fullAddress;
      this.expenseType = currExpense.expenseType;
      this.expenseCost = currExpense.expenseCost;
      this.expenseDate = currExpense.expenseDate;
      console.log("CLICKED ON MANAGE:\nInside editExpenseDetails");
      console.log("id=", id);
      console.log("fullAddress=", this.fullAddress);
      console.log("expenseType=", this.expenseType);
      console.log("expenseCost=", this.expenseCost);
      console.log("expenseDate=", this.expenseDate);
      // switch (currRental.tenants.length) {
      //   case 1:
      //     this.firstName1 = currRental.tenants[0].firstName;
      //     this.contractStartDate1 = currRental.tenants[0].contractStartDate;
      //     this.contractEndDate1 = currRental.tenants[0].contractEndDate;
      //     this.monthlyRent1 = currRental.tenants[0].monthlyRent;
      //     break;
      // }
    }

    return {
      expenseEditModal,
      ExpenseAddModal,
      showExpenseEditModal,
      showExpenseAddModal,
      editExpenseDetails,
    };
  },

  data() {
    return {
      index: "", // numbering of expenses in expenses table
      // postalCode: "",
      fullAddress: "",

      expenseType: "",
      expenseCost: "",
      expenseDate: "",

      expenses: {},

      rentals: {},

      filterStartDate: "",
      filterEndDate: "",
    };
  },
  async mounted() {
    const auth = getAuth();
    const userEmail = auth.currentUser.email;

    const ref = doc(db, "Expenses", userEmail);
    const docSnap = await getDoc(ref);
    const expenses = docSnap.data().expenses;
    console.log(expenses);
    this.expenses = expenses;

    const rentalRef = doc(db, "Rentals", userEmail);
    const rentalDocSnap = await getDoc(rentalRef);
    const rentals = rentalDocSnap.data().rentals;
    this.rentals = rentals;

    //wat is thissss
    onSnapshot(doc(db, "Expenses", userEmail)),
      (doc) => {
        console.log("hello");
        console.log(doc.data());
        this.expenses = doc.data().expenses;
        console.log(this.expenses);
      };
  },

  created() {
    const auth = getAuth();
    const userEmail = auth.currentUser.email;
    onSnapshot(
      doc(db, "Expenses", userEmail),
      { includeMetadataChanges: true },
      (doc) => {
        this.expenses = doc.data().expenses;
      }
    );
  },

  computed: {
    filteredExpenses() {
      if (!this.filterStartDate || !this.filterEndDate) {
        return this.expenses;
      }
      return this.expenses.filter((exp) =>
        moment(exp.expenseDate).isBetween(
          moment(this.filterStartDate),
          moment(this.filterEndDate)
        )
      );
    },
  },

  methods: {
    onFilterStartInput(e) {
      this.filterStartDate = e.target.value;
    },

    onFilterEndInput(e) {
      this.filterEndDate = e.target.value;
    },

    clearFilter() {
      this.filterStartDate = "";
      this.filterEndDate = "";
      document.getElementById("filterForm").reset();
    },
  },
};
</script>

<style scoped>
h1 {
  /* My Rental Properties */

  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;

  color: #000000;
}

h2 {
  float: left;
  font-weight: bold;
  margin-left: 30px;
}

#newExpenseBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;

  position: relative;
  height: 37px;
  width: 200px;
  left: 5%;
  background: #ffb300;
  border-radius: 42px;
}

.filter {
  display: flex;
  justify-content: center;
}

#cancelbtn {
  flex: none;
}

#confirmaddexpensebtn {
  background: #187a22;
}

#expensestable {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  left: 58px;
  top: 170px;
}

#tableheader {
  background: #e9ecef;
}

form {
  align-content: left;
  text-align: left;
}
</style>