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
      const rentals = JSON.parse(JSON.stringify(docSnap.data().rentals));

      try {
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
      } catch (error) {
        console.log("updateUnpaid error", error)
      }

      await updateDoc(ref, { rentals: rentals });
      console.log("updated number of months rental unpaid!");
    },
    addMonths: function (date, m) {
      return moment(date).add(m, "months").format("YYYY-MM-DD");
    },

    fetchOutstanding: async function () {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      const docSnap = await getDoc(ref);
      const rentals = JSON.parse(JSON.stringify(docSnap.data().rentals));
      const allUnpaid = [];

      try {
        for (let rental of rentals) {
          // console.log(rental);
          for (let tenant of rental.tenants) {
            // console.log(tenant);
            if (tenant.numberOfMonthsRentalUnpaid > 0) {
              // console.log("owe money");
              allUnpaid.push(tenant);
            }
          }
        }
      } catch (error) {
        console.log("showOutstanding error", error);
      }

      // Sort array 
      //this.outstandingRents = allUnpaid.sort((a, b) => a.numberOfMonthsRentalUnpaid - b.numberOfMonthsRentalUnpaid);
      return allUnpaid.sort((a, b) => a.numberOfMonthsRentalUnpaid - b.numberOfMonthsRentalUnpaid);
    }
  },
};
