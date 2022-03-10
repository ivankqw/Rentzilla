<template>
  <h1 class="header">My Rental Properties</h1>

  <button
    type="button"
    class="btn btn-warning"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    + New Rental
  </button>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Postal Code</th>
        <th scope="col">Address</th>
        <th scope="col">Unit Number</th>
        <th scope="col">Purchase Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>123456</td>
        <td>Blk 123 Road A</td>
        <td>12-23</td>
        <td>850000</td>
      </tr>
    </tbody>
  </table>
  <h1 class="header">Rent</h1>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Tenant</th>
        <th scope="col">Monthly Rent</th>
        <th scope="col">Months Overdue</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Aditya</td>
        <td>2000</td>
        <td>2</td>
      </tr>
    </tbody>
  </table>
  <!-- Modal -->
  <div
    class="modal"
    id="exampleModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" data-bs-backdrop="static">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add new rental</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="postalCode" class="form-label"
                >Postal Code</label
              >
              <input
                type="number"
                class="form-control"
                id="postalCode"
                placeholder="e.g. 123456"
              />

              <label for="address" class="form-label"
                >Address</label
              >
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="e.g. Blk 123 Road A"
              />

              <label for="unitNumber" class="form-label"
                >Unit Number</label
              >
              <input
                type="text"
                class="form-control"
                id="unitNumber"
                placeholder="e.g. 01-01"
              />

              <label for="purchasePrice" class="form-label"
                >Purchase Price</label
              >
              <input
                type="number"
                class="form-control"
                id="purchasePrice"
                placeholder="e.g. 123456"
              />
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 1:</label>
              <input type="text" class="form-control" id="firstName1" placeholder="First Name"/>
              <input type="text" class="form-control" id="lastName1" placeholder="Last Name"/>
              <label for="contractStartDate" class="form-label">Contract Start Date:</label>
              <input type="date" id="contractStartDate1" name="contractStartDate"><br>
              <label for="contractEndDate" class="form-label">Contract End Date:</label>
              <input type="date" id="contractEndDate1" name="contractEndDate">
              <input type="number" class="form-control" id="monthlyRent1" placeholder="Monthly Rent"/>
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 2:</label>
              <input type="text" class="form-control" id="firstName2" placeholder="First Name"/>
              <input type="text" class="form-control" id="lastName2" placeholder="Last Name"/>
              <label for="contractStartDate" class="form-label">Contract Start Date:</label>
              <input type="date" id="contractStartDate2" name="contractStartDate"><br>
              <label for="contractEndDate" class="form-label">Contract End Date:</label>
              <input type="date" id="contractEndDate2" name="contractEndDate">
              <input type="number" class="form-control" id="monthlyRent2" placeholder="Monthly Rent"/>
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 3:</label>
              <input type="text" class="form-control" id="firstName3" placeholder="First Name"/>
              <input type="text" class="form-control" id="lastName3" placeholder="Last Name"/>
              <label for="contractStartDate" class="form-label">Contract Start Date:</label>
              <input type="date" id="contractStartDate3" name="contractStartDate"><br>
              <label for="contractEndDate" class="form-label">Contract End Date:</label>
              <input type="date" id="contractEndDate3" name="contractEndDate">
              <input type="number" class="form-control" id="monthlyRent3" placeholder="Monthly Rent"/>
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 4:</label>
              <input type="text" class="form-control" id="firstName4" placeholder="First Name"/>
              <input type="text" class="form-control" id="lastName4" placeholder="Last Name"/>
              <label for="contractStartDate" class="form-label">Contract Start Date:</label>
              <input type="date" id="contractStartDate4" name="contractStartDate"><br>
              <label for="contractEndDate" class="form-label">Contract End Date:</label>
              <input type="date" id="contractEndDate4" name="contractEndDate">
              <input type="number" class="form-control" id="monthlyRent4" placeholder="Monthly Rent"/>
            </div>

            <div class="singleTenantDetails">
              <label class="form-label">Tenant 5:</label>
              <input type="text" class="form-control" id="firstName5" placeholder="First Name"/>
              <input type="text" class="form-control" id="lastName5" placeholder="Last Name"/>
              <label for="contractStartDate" class="form-label">Contract Start Date:</label>
              <input type="date" id="contractStartDate5" name="contractStartDate"><br>
              <label for="contractEndDate" class="form-label">Contract End Date:</label>
              <input type="date" id="contractEndDate5" name="contractEndDate">
              <input type="number" class="form-control" id="monthlyRent5" placeholder="Monthly Rent"/>
            </div>

            <div class="footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="margin-right: 10px">Cancel</button>
              <button type="submit" class="btn btn-success">+ Add Rental</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style scoped>
h1 {
  /* My Rental Properties */

  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 50px;

  color: #000000;
}

.singleTenantDetails{
  width: 200px;
  float: left;
  margin: 5px;
}

.footer{
  float: right;
  margin-top: 10px;
}

label{
  float: left
}
</style>