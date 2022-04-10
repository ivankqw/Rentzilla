<template>
  <div class="container">
    <br />
    <h2 class="header">My Expenses</h2>
    <v-tour name="myTourMyExpenses" :steps="steps"></v-tour>
    <button class="helpButton" @click="clickTour">Help!</button>
    <!-- <h3> Welcome back, {{$store.state.name}} </h3>
  <h3> Your email is {{$store.state.email}} </h3> -->
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
          <div class="col"> </div>
          <div class="col"> </div>
          <div class="col"> 
            <!-- <div class="filterGroup"> -->
            <label for="filterStart" class="form-label">Start Date:</label>
            <input id="filterStart" class="form-control" @input="onFilterStartInput" type="date" />
          </div>
          <div class="col">
            <label for="filterEnd" class="form-label">End Date:</label>
            <input id="filterEnd" class="form-control" @input="onFilterEndInput" type="date" />
          </div>
          <div class="col align-self-center">
            <button id="clearFilterButton" type="button" class="btn btn-outline-secondary " @click="clearFilter" style="margin-top: 22px">
              Clear Filter
            </button>
          </div>
          <!-- </div> -->
        </form>
      </div>
    </div>
    <br />

    <div class="table-responsive" id="expensestable">
      <table class="table table-striped">
        <thead>
          <tr class="table-light">
            <th>#</th>
            <th>Postal Code</th>
            <th>Address</th>

            <th>Unit Number</th>

            <th>Type of Expense</th>
            <th>Cost</th>
            <th>Date of Expense</th>

            <th id="manageExpenseCol">Manage Expense</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(expense, i) in this.filteredExpenses" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ expense.postalCode }}</td>
            <td>{{ expense.address }}</td>
            <td v-if="!isUnitNumLanded(expense.unitNumber)">#{{ expense.unitNumber }}</td>
            <td v-else> - </td>
            <td>{{ expense.expenseType }}</td>
            <td>${{ expense.expenseCost }}</td>
            <td>{{ expense.expenseDate }}</td>
            <td>
              <button
                id="manageExpenseButton"
                type="button"
                class="btn btn-primary btn-sm"
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
    const steps = ref([]);
    steps.value = [
      {
        target: "#newExpenseBtn",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Add New Expense",
        },
        content: `Add your expenses for your rental properties here!`,
        params: {
          placement: "auto", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      {
        target: "#filterStart",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Filter Expenses",
        },
        content: `Filter your expenses by entering the start date here!`,
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      {
        target: "#filterEnd",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Filter Expenses",
        },
        content: `Filter your expenses by entering the end date here!`,
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      {
        target: "#expensestable",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "View and Manage Expenses",
        },
        content: `View and manage your expenses in this table`,
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      {
        target: "#manageExpenseCol",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Edit Expenses",
        },
        content: `Edit your expenses here`,
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      
    ]
    const clickTour = () => {
      console.log("hi");
      console.log(window.tours);
      try {
        window.tours["myTourMyExpenses"].start();
      } catch (e) {
        console.log("error here click tour", e);
      }
    };
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
    }

    return {
      expenseEditModal,
      ExpenseAddModal,
      showExpenseEditModal,
      showExpenseAddModal,
      editExpenseDetails,
      clickTour,
      steps
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
    isUnitNumLanded(unitNumber) {
      return unitNumber === 'x';
    },
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
}

#newExpenseBtn {
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1px 12px;

  position: relative;
  height: 37px;
  width: 200px;

  background: #ffb300;
  border-radius: 42px;
  font-weight: bold;
  float: left;
}
#newExpenseBtn:hover{
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
}

/* .filter {
  display: flex;
  justify-content: right;
} */

#cancelbtn {
  flex: none;
}

#confirmaddexpensebtn {
  background: #187a22;
}

/* #expensestable {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  left: 58px;
  top: 170px;
} */

#tableheader {
  background: #e9ecef;
}

/* #manageExpenseButton{
  background-color: #2C3E50 !important;
} */

.btn-primary {
    background-color: #184994 !important;
    border-color: #184994 !important;
    box-shadow: none !important;
    outline-color: #184994 !important;
}

.btn-primary:hover, .btn-primary:active, .btn-primary:visited {
  background-color: #0b2c5e !important;
  border-color: #0b2c5e !important;
  outline-color: #0b2c5e !important;
}

/* #manageExpenseButton:hover{
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
}  */

.btn-outline-secondary {
  border-color: #A9A9A9 !important;
  color: #36454F !important;  
  white-space: nowrap;
  text-align: center;
  /* float: right; */
}


/* #clearFilterButton:hover {
  background-color: green;
  color: white;
} */
.btn-outline-secondary:hover {
  background-color: #A9A9A9 !important;
  color: black !important;
}

form {
  align-content: left;
  text-align: left;
}

.helpButton {
  background-color: #184994;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border-color: #5b7192;
  position: fixed;
  bottom: -4px;
  right: 10px;
}
</style>