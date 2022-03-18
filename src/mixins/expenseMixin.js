import { getAuth } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
// import moment from "moment";

export default {
  methods: {
    updateExpense: async function () {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Expenses", userEmail);
      const docSnap = await getDoc(ref);
      const expenses = JSON.parse(JSON.stringify(docSnap.data().expenses));

      //   try{
      //     for (let expense of expenses) {
      //       // console.log(rental);
      //       for (let tenant of rental.tenants) {
      //         // console.log(tenant);
      //         while (moment(tenant.nextPaymentDate).isBefore(moment())) {
      //           // console.log("owe money");
      //           tenant.numberOfMonthsRentalUnpaid += 1;
      //           tenant.nextPaymentDate = this.addMonths(tenant.nextPaymentDate, 1);
      //         }
      //       }
      //     }
      //   } catch (error) {
      //     console.log("updateExpense error", error)
      //   }
      console.log("updateExpense mixin!");
      // console.log("e[0], ", expenses[0]);
      //   for (let e of expenses) {
      //     console.log("e, ", e);
      //     console.log("e.expenseCost, ", e.expenseCost);
      //     e.expenseCost += 37;
      //     console.log("e.expenseCost (after adding 37), ", e.expenseCost);
      //   }
      //   console.log("docSnap, ", expenses.expenseCost);

      await updateDoc(ref, { expenses: expenses });
      console.log("updated expenses!");
    },
  },
};
