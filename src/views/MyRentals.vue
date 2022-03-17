<template>
<div class="container">
  <h1 class="header">My Rentals</h1>
  <!-- <h3>Welcome back, {{ $store.state.name }}</h3> -->
  <!-- <h3>Your email is {{ $store.state.email }}</h3> -->

  <h2 class="header">Rental Properties</h2>
  <br /><br />

  <button
    type="button"
    id="newRentalBtn"
    class="btn btn-warning"
    data-bs-toggle="modal"
    data-bs-target="#newRentalModal"
  >
    + New Rental
  </button>
  <br />

  <RentalAddModal ref="rentalModal" />

  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr class="table-light">
          <th>#</th>
          <th>Postal Code</th>
          <th>Address</th>
          <th>Unit Number</th>
          <th>Purchase Price</th>
          <th>View Tenant Details</th>
          <th>Edit Rental Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rental, i) in rentals" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ rental.postalCode }}</td>
          <td>{{ rental.address }}</td>
          <td>{{ rental.unitNumber }}</td>
          <td>{{ rental.purchasePrice }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#tenantsModal"
              @click="this.showTenantDetails(i)"
            >
              View
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="this.editRentalDetails(i)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="tenantsModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tenants</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">          
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr class="table-light">
                  
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Contract Start Date</th>
                  <th>Contract End Date</th>
                  <th>Monthly Rent</th>
                  <th>Next Payment Date</th>
                  <th>Outstanding rental (months)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tenant, i) in this.currTenantsArrayClean" :key="i">
          
                  <td>{{ tenant.firstName }}</td>
                  <td>{{ tenant.lastName }}</td>
                  <td>{{ tenant.contractStartDate }}</td>
                  <td>{{ tenant.contractEndDate }}</td>
                  <td>{{ "$" +  tenant.monthlyRent }}</td>
                  <td>{{ tenant.nextPaymentDate }}</td>
                  <td>{{ tenant.numberOfMonthsRentalUnpaid }}</td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <RentalEditModal
    @edited="change"
    :key="refreshEdit"
    ref="rentalEditModal"
    :postalCode="this.postalCode"
    :address="this.address"
    :unitNumber="this.unitNumber"
    :purchasePrice="this.purchasePrice"
    :firstName1="this.firstName1"
    :lastName1="this.lastName1"
    :contractStartDate1="this.contractStartDate1"
    :contractEndDate1="this.contractEndDate1"
    :monthlyRent1="this.monthlyRent1"
    :firstName2="this.firstName2"
    :lastName2="this.lastName2"
    :contractStartDate2="this.contractStartDate2"
    :contractEndDate2="this.contractEndDate2"
    :monthlyRent2="this.monthlyRent2"
    :firstName3="this.firstName3"
    :lastName3="this.lastName3"
    :contractStartDate3="this.contractStartDate3"
    :contractEndDate3="this.contractEndDate3"
    :monthlyRent3="this.monthlyRent3"
    :firstName4="this.firstName4"
    :lastName4="this.lastName4"
    :contractStartDate4="this.contractStartDate4"
    :contractEndDate4="this.contractEndDate4"
    :monthlyRent4="this.monthlyRent4"
    :firstName5="this.firstName5"
    :lastName5="this.lastName5"
    :contractStartDate5="this.contractStartDate5"
    :contractEndDate5="this.contractEndDate5"
    :monthlyRent5="this.monthlyRent5"
    :index="this.index"
  />

  <h2 class="header">Rent</h2>
  <br /><br />
  <table id="outstandingRentTable" class="auto-index">
    <tr id="outstandingRentTableHeader">
      <th>#</th>
      <th>Tenant Name</th>
      <th>Monthly Rent</th>
      <th>Months Overdue</th>
    </tr>
  </table>
  </div>
</template>

<script>
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import RentalEditModal from "../components/RentalEditModal.vue";
import RentalAddModal from "../components/RentalAddModal.vue";
import { ref } from "vue";
import rentalMixin from "../mixins/rentalMixin";

export default {
  name: "MyRentals",
  computed: {
    currTenantsArrayClean() {
      return this.currTenants.filter(
        function (tenant) {
          return tenant.firstName !== "";
        }
      )
    }
  },
  mixins: [rentalMixin],
  components: {
    RentalEditModal,
    RentalAddModal,
  },

  setup() {
    let rentalEditModal = ref(null);
    function showRentalEditModal() {
      rentalEditModal.value.show();
    }

    let rentalAddModal = ref(null);
    function showRentalAddModal() {
      rentalAddModal.value.show();
    }

    function editRentalDetails(id) {
      var vu = this;
      vu.index = id;
      var currRental = this.rentals[id];
      vu.address = currRental.address;
      vu.postalCode = currRental.postalCode;
      vu.unitNumber = currRental.unitNumber;
      vu.purchasePrice = currRental.purchasePrice;
      switch (currRental.tenants.length) {
        case 1:
          vu.firstName1 = currRental.tenants[0].firstName;
          vu.contractStartDate1 = currRental.tenants[0].contractStartDate;
          vu.contractEndDate1 = currRental.tenants[0].contractEndDate;
          vu.monthlyRent1 = currRental.tenants[0].monthlyRent;
          break;
        case 2:
          vu.firstName1 = currRental.tenants[0].firstName;
          vu.firstName2 = currRental.tenants[1].firstName;
          vu.lastName1 = currRental.tenants[0].lastName;
          vu.lastName2 = currRental.tenants[1].lastName;
          vu.contractStartDate1 = currRental.tenants[0].contractStartDate;
          vu.contractStartDate2 = currRental.tenants[1].contractStartDate;
          vu.contractEndDate1 = currRental.tenants[0].contractEndDate;
          vu.contractEndDate2 = currRental.tenants[1].contractEndDate;
          vu.monthlyRent1 = currRental.tenants[0].monthlyRent;
          vu.monthlyRent2 = currRental.tenants[1].monthlyRent;
          break;
        case 3:
          vu.firstName1 = currRental.tenants[0].firstName;
          vu.firstName2 = currRental.tenants[1].firstName;
          vu.firstName3 = currRental.tenants[2].firstName;
          vu.lastName1 = currRental.tenants[0].lastName;
          vu.lastName2 = currRental.tenants[1].lastName;
          vu.lastName3 = currRental.tenants[2].lastName;
          vu.contractStartDate1 = currRental.tenants[0].contractStartDate;
          vu.contractStartDate2 = currRental.tenants[1].contractStartDate;
          vu.contractStartDate3 = currRental.tenants[2].contractStartDate;
          break;
        case 4:
          vu.firstName1 = currRental.tenants[0].firstName;
          vu.firstName2 = currRental.tenants[1].firstName;
          vu.firstName3 = currRental.tenants[2].firstName;
          vu.firstName4 = currRental.tenants[3].firstName;
          vu.lastName1 = currRental.tenants[0].lastName;
          vu.lastName2 = currRental.tenants[1].lastName;
          vu.lastName3 = currRental.tenants[2].lastName;
          vu.lastName4 = currRental.tenants[3].lastName;
          vu.contractStartDate1 = currRental.tenants[0].contractStartDate;
          vu.contractStartDate2 = currRental.tenants[1].contractStartDate;
          vu.contractStartDate3 = currRental.tenants[2].contractStartDate;
          vu.contractStartDate4 = currRental.tenants[3].contractStartDate;
          vu.contractEndDate1 = currRental.tenants[0].contractEndDate;
          vu.contractEndDate2 = currRental.tenants[1].contractEndDate;
          vu.contractEndDate3 = currRental.tenants[2].contractEndDate;
          vu.contractEndDate4 = currRental.tenants[3].contractEndDate;
          vu.monthlyRent1 = currRental.tenants[0].monthlyRent;
          vu.monthlyRent2 = currRental.tenants[1].monthlyRent;
          vu.monthlyRent3 = currRental.tenants[2].monthlyRent;
          vu.monthlyRent4 = currRental.tenants[3].monthlyRent;
          break;
        case 5:
          vu.firstName1 = currRental.tenants[0].firstName;
          vu.firstName2 = currRental.tenants[1].firstName;
          vu.firstName3 = currRental.tenants[2].firstName;
          vu.firstName4 = currRental.tenants[3].firstName;
          vu.firstName5 = currRental.tenants[4].firstName;
          vu.lastName1 = currRental.tenants[0].lastName;
          vu.lastName2 = currRental.tenants[1].lastName;
          vu.lastName3 = currRental.tenants[2].lastName;
          vu.lastName4 = currRental.tenants[3].lastName;
          vu.lastName5 = currRental.tenants[4].lastName;
          vu.contractStartDate1 = currRental.tenants[0].contractStartDate;
          vu.contractStartDate2 = currRental.tenants[1].contractStartDate;
          vu.contractStartDate3 = currRental.tenants[2].contractStartDate;
          vu.contractStartDate4 = currRental.tenants[3].contractStartDate;
          vu.contractStartDate5 = currRental.tenants[4].contractStartDate;
          vu.contractEndDate1 = currRental.tenants[0].contractEndDate;
          vu.contractEndDate2 = currRental.tenants[1].contractEndDate;
          vu.contractEndDate3 = currRental.tenants[2].contractEndDate;
          vu.contractEndDate4 = currRental.tenants[3].contractEndDate;
          vu.contractEndDate5 = currRental.tenants[4].contractEndDate;
          vu.monthlyRent1 = currRental.tenants[0].monthlyRent;
          vu.monthlyRent2 = currRental.tenants[1].monthlyRent;
          vu.monthlyRent3 = currRental.tenants[2].monthlyRent;
          vu.monthlyRent4 = currRental.tenants[3].monthlyRent;
          vu.monthlyRent5 = currRental.tenants[4].monthlyRent;
          break;
      }
      showRentalEditModal();
    }

    return {
      rentalEditModal,
      rentalAddModal,
      showRentalEditModal,
      showRentalAddModal,
      editRentalDetails,
    };
  },

  data() {
    return {
      refreshEdit: 0,
      index: "",

      postalCode: "",
      address: "",
      unitNumber: "",
      purchasePrice: "",

      firstName1: "",
      lastName1: "",
      contractStartDate1: "",
      contractEndDate1: "",
      monthlyRent1: "",

      firstName2: "",
      lastName2: "",
      contractStartDate2: "",
      contractEndDate2: "",
      monthlyRent2: "",

      firstName3: "",
      lastName3: "",
      contractStartDate3: "",
      contractEndDate3: "",
      monthlyRent3: "",

      firstName4: "",
      lastName4: "",
      contractStartDate4: "",
      contractEndDate4: "",
      monthlyRent4: "",

      firstName5: "",
      lastName5: "",
      contractStartDate5: "",
      contractEndDate5: "",
      monthlyRent5: "",

      rentals: {},
      currTenants: [],
    };
  },
  async mounted() {
    await this.updateUnpaid();
  },

  created() {
    const auth = getAuth();
    const userEmail = auth.currentUser.email;
    onSnapshot(
      doc(db, "Rentals", userEmail),
      { includeMetadataChanges: true },
      (doc) => {
        this.rentals = doc.data().rentals;
      }
    );
  },

  methods: {
    async showTenantDetails(id) {
      const auth = getAuth();
      const userEmail = auth.currentUser.email;
      const ref = doc(db, "Rentals", userEmail);
      const docSnap = await getDoc(ref);
      const rentals = docSnap.data().rentals;
      console.log(rentals[id].tenants);
      this.currTenants = rentals[id].tenants;
    },
    change() {
      this.refreshEdit += 1;
    }
  },
};
</script>


<style scoped>
#newRentalBtn {
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

#rentalTable,
#outstandingRentTable {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  left: 58px;
  top: 170px;
}

#rentalTableHeader,
#outstandingRentTableHeader {
  background: #e9ecef;
}
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

.singleTenantDetails {
  width: 200px;
  float: left;
  margin: 5px;
}

.footer {
  float: right;
  margin-top: 10px;
}

label {
  float: left;
}
</style>