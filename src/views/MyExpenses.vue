<template>

  <h1 class="header">This is the My Expenses page </h1>
  <h3> Welcome back, {{$store.state.name}} </h3>
  <h3> Your email is {{$store.state.email}} </h3>

  <button
    type="button"
    id="newExpenseBtn"
    class="btn btn-warning"
    data-bs-toggle="modal"
    data-bs-target="#newExpenseModal"
  >
    + New Expense
  </button>
  <br />

  <div class="table-responsive">
    <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>Postal Code</th>
        
        <th>Type of Expense</th>
        <th>Cost</th>
        <th>Date of Expense</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="(expense, i) in expenses" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ expense.postalCode }}</td>

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
    :postalCode="this.postalCode"
    :expenseType="this.expenseType"
    :expenseCost="this.expenseCost"
    :expenseDate="this.expenseDate"
    />


</template>

<script>
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import ExpenseEditModal from "../components/ExpenseEditModal.vue";
import ExpenseAddModal from "../components/ExpenseAddModal.vue";
import { ref } from "vue";

export default {
  name: "MyExpenses",
  computed: {}, 
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
      var vu = this;
      var currExpense = this.expenses[id];
      vu.index = id; ///
      vu.postalCode = currExpense.postalCode;
      vu.expenseType = currExpense.expenseType;
      vu.expenseCost = currExpense.expenseCost;
      vu.expenseDate = currExpense.expenseDate;
      console.log("CLICKED ON MAHAGE:\nInside editExpenseDetails")
      console.log("id=", id);
      console.log("postalCode=", vu.postalCode);
      console.log("expenseType=", vu.expenseType);
      console.log("expenseCost=", vu.expenseCost);
      console.log("expenseDate=", vu.expenseDate);
      // switch (currRental.tenants.length) {
      //   case 1:
      //     vu.firstName1 = currRental.tenants[0].firstName;
      //     vu.contractStartDate1 = currRental.tenants[0].contractStartDate;
      //     vu.contractEndDate1 = currRental.tenants[0].contractEndDate;
      //     vu.monthlyRent1 = currRental.tenants[0].monthlyRent;
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
      index: "",
      postalCode: "",
      
      expenseType: "",
      expenseCost: "",
      expenseDate: "",

      expenses: {},
    };
  },
  async mounted() {
    //await this.updateExpense();
    //await this.displayExpenses();
    const auth = getAuth();
    const userEmail = auth.currentUser.email;

    const ref = doc(db, "Expenses", userEmail);
    const docSnap = await getDoc(ref);
    const expenses = docSnap.data().expenses;
    console.log(expenses);
    this.expenses = expenses;

    //wat is thissss
    onSnapshot(doc(db, "Expenses", userEmail)), (doc) => {
      console.log('hello')
      console.log(doc.data())
      this.expenses = doc.data().expenses;
      console.log(this.expenses);
    }
  },

  created() {
    const auth = getAuth();
    const userEmail = auth.currentUser.email;
    onSnapshot(doc(db, "Expenses", userEmail),
    { includeMetadataChanges: true },
      (doc) => {
        this.expenses = doc.data().expenses;
      });
  },

  
};
</script>


<style scoped>
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
  height: 50px;
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