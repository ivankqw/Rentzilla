<template>
  <div class="container">
    <!-- <h1 class="header">My Rentals</h1> -->
    <!-- <h3>Welcome back, {{ $store.state.name }}</h3> -->
    <!-- <h3>Your email is {{ $store.state.email }}</h3> -->
  <br />
    <h2 class="header">My Rental Properties</h2>
    <br />
    <v-tour name="myTourMyRentals" :steps="steps"></v-tour>
    <button class="helpButton" @click="clickTour">Help!</button>
    <br /><br />

    <button
      type="button"
      id="newRentalBtn"
      class="btn btn-warning"
      data-bs-toggle="modal"
      data-bs-target="#newRentalModal"
    >
      <strong>+ New Rental</strong>
    </button>

    <br />

    <RentalAddModal ref="rentalModal" />

    <div class="table-responsive">
      <table class="table table-striped" id="myRentalTable">
        <thead>
          <tr class="table-light">
            <th>#</th>
            <th>Postal Code</th>
            <th>Address</th>
            <th>Unit Number</th>
            <th>Purchase Price</th>
            <th id="viewTenantDetailsCol">Tenant Details</th>
            <th id="manageRentalPropertyCol">Manage Rental Property</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rental, i) in rentals" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ rental.postalCode }}</td>
            <td>{{ rental.address }}</td>
            <td v-if="!isUnitNumLanded(rental.unitNumber)">#{{ rental.unitNumber }}</td>
            <td v-else> - </td>
            
            <td>${{ rental.purchasePrice }}</td>
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
                Manage
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for view tenant details -->
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
              <table class="table">
                <thead>
                  <tr class="table-light">
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contract Start Date</th>
                    <th>Contract End Date</th>
                    <th>Monthly Rent</th>
                    <th>Next Payment Date</th>
                    <th>Outstanding rental (months)</th>
                    <th>Tenant's Payment History</th>
                  </tr>
                </thead>

                <tbody>
                  <template
                    v-for="(tenant, i) in this.currTenantsArrayClean"
                    :key="i"
                  >
                    <tr>
                      <td>{{ tenant.firstName }}</td>
                      <td>{{ tenant.lastName }}</td>
                      <td>{{ tenant.contractStartDate }}</td>
                      <td>{{ tenant.contractEndDate }}</td>
                      <td>{{ "$" + tenant.monthlyRent }}</td>
                      <td>{{ tenant.nextPaymentDate }}</td>
                      <td>{{ tenant.numberOfMonthsRentalUnpaid }}</td>
                      <td>
                        <div class="col text-center">
                          <input
                            type="checkbox"
                            class="btn-check"
                            v-bind:id="'btn-check-outlined' + i"
                            autocomplete="off"
                          />
                          <label
                            class="btn btn-primary btn-sm"
                            v-bind:for="'btn-check-outlined' + i"
                            @click="toggleTenantHistory(i)"
                            >View</label
                          >
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-if="tenant.revenues.length > 0 && tenantHistoryShow[i]"
                    >
                      <td colspan="7">
                        <div id="tenantPaymentsHistoryTable">
                          <div class="table-responsive">
                            <table style="width: 100%" class="table">
                              <thead>
                                <tr class="table-active">
                                  <th scope="col">Date</th>
                                  <th scope="col">Amount Paid</th>
                                </tr>
                              </thead>
                              <tr
                                v-for="(revenue, i) in tenant.revenues"
                                :key="i"
                                scope="row"
                                class="table-primary"
                              >
                                <td>{{ revenue.paymentDate }}</td>
                                <td>${{ revenue.paymentAmount }}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <div
                      v-if="tenant.revenues.length == 0 && tenantHistoryShow[i]"
                    >
                      <strong> No payment history </strong>
                    </div>
                  </template>
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
      :numTenants="this.numTenantsForCurrentEditRental"
    />

    <RentEditModal
      ref="rentEditModal"
      :tenantId="this.tenantId"
      :monthsPaid="this.monthsPaid"
      :paymentDate="this.paymentDate"
    />
    <br>
    <h2 class="header">Outstanding Rent</h2>
    <br /><br />
    <div class="table-responsive">
      <table class="table table-striped" id="outstandingRentTable">
        <tr id="outstandingRentTableHeader" class="table-light">
          <th>#</th>
          <th>Tenant Name</th>
          <th>Monthly Rent</th>
          <th id="monthsOverdueCol">Months Overdue</th>
          <th id="manageRentCol">Manage Rent</th>
        </tr>
        <tbody>
          <tr v-for="(tenant, i) in this.outstandingTenants" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ tenant.firstName + " " + tenant.lastName }}</td>
            <td>{{ "$" + tenant.monthlyRent }}</td>
            <td>{{ tenant.numberOfMonthsRentalUnpaid }}</td>
            <td>
              <button
                id="editPaymentBtn"
                type="button"
                class="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#rentEditModal"
                v-on:click="setCurrentTenantId(tenant.tenantID)"
              >
                Manage
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import RentalEditModal from "../components/RentalEditModal.vue";
import RentalAddModal from "../components/RentalAddModal.vue";
import RentEditModal from "../components/RentEditModal";
import { ref } from "vue";
import rentalMixin from "../mixins/rentalMixin";

export default {
  name: "MyRentals",
  computed: {
    currTenantsArrayClean() {
      return this.currTenants.filter(function (tenant) {
        return tenant.firstName !== "";
      });
    },

    outstandingTenants() {
      const allUnpaid = [];
      try {
        for (let rental of this.rentals) {
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
      return allUnpaid.sort(
        (a, b) => b.numberOfMonthsRentalUnpaid - a.numberOfMonthsRentalUnpaid
      );
    },
  },
  mixins: [rentalMixin],
  components: {
    RentalEditModal,
    RentalAddModal,
    RentEditModal,
  },

  setup() {
    const steps = ref([]);
    steps.value = [
      {
        target: "#newRentalBtn",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Add New Rental",
        },
        content: `Add your rental properties here!`,
        params: {
          placement: "auto", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      {
        target: "#myRentalTable",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "My rental properties",
        },
        content: `View and manage your rental properties here`,
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      {
        target: "#viewTenantDetailsCol",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Tenant details",
        },
        content: `View tenant details, including past payments`,
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      {
        target: "#manageRentalPropertyCol",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Rental Property details",
        },
        content: `View and manage your rental property details here`,
        params: {
          placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          enableScrolling: false,
        },
      },
      {
        target: "#outstandingRentTable",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Outstanding and upcoming rent",
        },
        content: "View your upcoming and outstanding rents to be received here",
      },
      {
        target: "#monthsOverdueCol",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Months Overdue ",
        },
        content: "Number of months rent owed by tenant to you. <br/><br/> <strong>Calculation of number of months overdue</strong><br/> Let the contract start date be x months ago (x is rounded up to the nearest month), and as of today, only y months of rent was recorded as received via the 'Manage' function. Number of months overdue = (x - y) months. ",
        params: {
          placement: "top",
        },
      },
      {
        target: "#manageRentCol",
        step: {
          // offset: 100, // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        },
        header: {
          title: "Manage rent received",
        },
        content: "Record receipt of rents here",
        params: {
          placement: "top",
        },
      },
    ];

    const clickTour = () => {
      //console.log("hi");
      //console.log(window.tours);
      try {
        window.tours["myTourMyRentals"].start();
      } catch (e) {
        console.log("error here click tour", e);
      }
    };

    let rentalEditModal = ref(null);
    function showRentalEditModal() {
      rentalEditModal.value.show();
    }

    let rentalAddModal = ref(null);
    function showRentalAddModal() {
      rentalAddModal.value.show();
    }

    let rentEditModal = ref(null);
    function showRentEditModal() {
      rentEditModal.value.show();
    }

    function editRentalDetails(id) {
      var vu = this;
      vu.index = id;
      var currRental = this.rentals[id];
      vu.address = currRental.address;
      vu.postalCode = currRental.postalCode;
      vu.unitNumber = currRental.unitNumber;
      vu.purchasePrice = currRental.purchasePrice;

      this.numTenantsForCurrentEditRental = 0;
      for (let x of currRental.tenants) {
        if (x.firstName) {
          this.numTenantsForCurrentEditRental += 1;
        }
      }

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
      showRentEditModal,
      rentEditModal,

      clickTour,
      steps,
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

      numTenantsForCurrentEditRental: 0,

      tenantId: 0,
      monthsPaid: 0,
      paymentDate: "",

      tenantHistoryShow: [false, false, false, false, false],
    };
  },
  async mounted() {
    await this.updateUnpaid();
    await this.fetchOutstanding();
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
      //console.log(rentals[id].tenants);
      this.currTenants = rentals[id].tenants;
    },
    change() {
      this.refreshEdit += 1;
    },

    isUnitNumLanded(unitNumber) {
      return unitNumber === 'x';
    },

    setCurrentTenantId(id) {
      this.tenantId = id;
    },

    toggleTenantHistory(i) {
      this.tenantHistoryShow[i] = !this.tenantHistoryShow[i];
    },
  },
};
</script>

<style scoped>
#tenantPaymentsHistoryTable {
  overflow: hidden;
  overflow-y: scroll;
  /* height: 100px; */
  max-height: 100px;
}
#newRentalBtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;

  position: relative;
  height: 37px;
  width: 200px;

  background: #ffb300;
  border-radius: 42px;
}
#newRentalBtn:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
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
  margin-left: 1px;
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

.btn-primary, .btn-primary:hover, .btn-primary:active, .btn-primary:visited {
    background-color: #184994 !important;
    border-color: #184994 !important;
    box-shadow: none !important;
    outline-color: #000000 !important;

}

.btn-primary:hover {
  background-color: #0b2c5e !important;
}

.btn-primary {
  text-align: center;
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
