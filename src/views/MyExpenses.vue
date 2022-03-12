<template>

<h1>Ths is the My Expenses page </h1>
<h3> Welcome back, {{$store.state.name}} </h3>
<h3> Your email is {{$store.state.email}} </h3>

<!-- Modal trigger -->
<button id="newexpensebtn"
  type="button" 
  data-bs-toggle="modal" 
  data-bs-target="#addexpensemodal">
    + New Expense
</button>

<br>

<table id="expensestable">
  <tr id="tableheader">
    <th>#</th>
    <th>Postal Code</th>
    <th>Address</th>
    <th>Unit No.</th>
    <th>Type of Expense</th>
    <th>Cost</th>
    <th>Date of Expense</th>
  </tr>
</table>

<!-- Modal --> 
<div class="modal fade" id = "addexpensemodal" aria-labelledby="addexpensetitle" aria-hidden="true">
  <div class="modal-dialog modal-xl" data-bs-backdrop="static">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addexpensetitle">Add New Expense</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <form>    
        <div class="modal-body">

          <div>
            <label for="postalCode" class="form-label">Rental</label> <br>
            <input type="number" id="postalCode" placeholder="Select Rental"/>
          </div>
          <br>
          <div>
            <label for="expenseType" class="form-label">Type of Expense</label>
            <input type="text" class="form-control" placeholder="Furnishing"/>
          </div>
          <br>
          <div>
            <label for="expenseCost" class="form-label">Cost</label>
            <input type="number" class="form-control" placeholder="4000"/>
          </div>
          <br>
          <div>
            <label for="expenseDate" class="form-label">Date of Expense</label><br>
            <input type="date" id="expenseDate"/>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelbtn">Cancel</button>
          <button type="submit" class="btn btn-success" id="confirmaddexpensebtn">+ Add Expense</button>
        </div>
        <br>
      </form>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "MyExpenses"
};
</script>


<style scoped>
#newexpensebtn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;

  position: relative;
  height: 37px;
  width: 200px;
  left: 5%;

  background: #FFB300;
  border-radius: 42px;
}

#cancelbtn {
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 15px;
  position: relative;
  left: 75%;
}

#confirmaddexpensebtn {
  background: #187A22;
  border-radius: 4px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 15px;
  position: relative;
  left: 75%;
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
  background: #E9ECEF;
}

form {
  align-content: left;
  text-align: left;
}


</style>