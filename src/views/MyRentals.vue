<template>
  <h1 class="header">My Rental Properties</h1>

  <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add new rental</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {};
</script>


<style scoped>
h1{
  /* My Rental Properties */

font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 50px;

color: #000000;
}
</style>