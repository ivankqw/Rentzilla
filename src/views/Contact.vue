<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="@/assets/hdb.jpg" class="img-fluid some" alt="..."/>
      </div>
      <div class="col" >
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <div class="row" id="feedbackForm">
          <div class="row align-items-center">
            <div class="card" >
              <div class="card-body">
                <div class="text-center">
                  <h2>Your Opinion Matters.</h2>
                  <form id="myForm">
                    <!-- Message input -->
                    <div class="form-outline mb-4">
                      <textarea
                        class="form-control"
                        id="feedback"
                        rows="4"
                        placeholder="Please enter your feedback here..."
                        v-model="feedback"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div class="text-right">
                  <button
                    type="button"
                    class="btn btn-primary float-end"
                    v-on:click="submitFeedback()"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";

export default {
  name: "Contact",

  data() {
    return {
      feedback: "",
    };
  },

  methods: {
    async submitFeedback() {

      if (String(this.feedback).length == 0) {
        alert("Please ensure you have written something before submitting");
        return false;
      }

      
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Feedbacks", userEmail);
      const docData = {
        feedback: this.feedback,
      };

      

      try {
        await updateDoc(ref, {
          feedbacks: arrayUnion(docData),
        });
      } catch (error) {
        await setDoc(ref, {
          feedbacks: arrayUnion(docData),
        });
      }
      alert("Feedback submitted successfully!");
      console.log(docData);
      document.getElementById("myForm").reset();
      this.feedback = "";
    },

    // async validateFeedbackForm() {
    //   if (String(this.feedback).length == 0) {
    //     alert("Please ensure you have written something before submitting");
    //     return false;
    //   }
    // },
  },
};
</script>

<style>
#feedbackForm {
  margin-left: 80px;
}
</style>
