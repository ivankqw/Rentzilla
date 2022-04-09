<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="@/assets/hdb.jpg" class="img-fluid some" alt="..." />
      </div>
      <div class="col">
        <br /><br /><br />
        <br /><br /><br />
        <div class="row" id="feedbackForm">
          <div class="row align-items-center">
            <div class="card">
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
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />

        <div class="row" id="socialMedias">
          <div class="row align-items-center">
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <div id="social-test">
              <h3>Or find us here</h3>
              <ul class="social">
                <a href="https://www.facebook.com/profile.php?id=100080138387981" class="facebook">
                  <li><i class="fa fa-facebook" aria-hidden="true"></i></li>
                </a>
                <a href="https://twitter.com/rentzillaa" class="twitter">
                  <li><i class="fa fa-twitter" aria-hidden="true"></i></li>
                </a>
                <a href="https://www.instagram.com/rentzillaa/" class="instagram">
                  <li><i class="fa fa-instagram" aria-hidden="true"></i></li>
                </a>
              </ul>
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
  },
};
</script>

<style>
#feedbackForm,
#socialMedias {
  margin-left: 80px;
}

#social-test {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-size: 30px;

  /* color: #fff; */
  font-family: Futura, "Trebuchet MS", Arial, sans-serif;
  font-weight: 100;
}

.social {
  margin-right: 40px;
} 

.social li {
  color: #184994;
  list-style-type: none;
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  padding: 1%;
  border: 1px solid rgba(167, 146, 129, 0.4);
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 20px;
  transition: ease 0.3s;
}

.social li:hover {
  color: rgba(167, 146, 129, 1);
  border: 1px solid rgba(167, 146, 129, 1);
}

.social:hover > li {
  opacity: 0.5;
}

.social:hover > li:hover {
  opacity: 1;
}

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

</style>
