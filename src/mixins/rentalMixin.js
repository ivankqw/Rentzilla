import { getAuth } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import moment from "moment";

export default {
  methods: {
    updateUnpaid: async function () {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      const docSnap = await getDoc(ref);
      const rentals = docSnap.data().rentals;

      for (let rental of rentals) {
        // console.log(rental);
        for (let tenant of rental.tenants) {
          // console.log(tenant);
          while (moment(tenant.nextPaymentDate).isBefore(moment())) {
            // console.log("owe money");
            tenant.numberOfMonthsRentalUnpaid += 1;
            tenant.nextPaymentDate = this.addMonths(tenant.nextPaymentDate, 1);
          }
        }
      }
      await updateDoc(ref, { rentals: rentals });
      console.log("updated number of months rental unpaid!");
    },
    addMonths: function (date, m) {
        return moment(date).add(m, "months").format("YYYY-MM-DD");
      },
  },
};
