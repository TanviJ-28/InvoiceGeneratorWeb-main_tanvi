var s_no = 1;

$('document').ready(function() {
  $('.add_another').click(function() {
    if (s_no <= 20) {
      s_no++;
    }
    $("#tbl").append('<tr><th>' + s_no + '.</th><td><input id="description' + s_no + '" type="Description" name="Description" class="form-control" placeholder="Item Name" autofocus></td><td><input id="quantity' + s_no + '"type="number" name="number"  class="form-control" placeholder="Enter Quantity"></td><td><input id="amount' + s_no + '" type="number" name="Amount" class="form-control" placeholder="Enter Amount"></td><td><input id="tax' + s_no + '" type="number" name="Taxes" class="form-control" placeholder="Enter Taxes"></td><td><input id="discount' + s_no + '" type="number" name="Discount" class="form-control" placeholder="Discount" oninput="add_number()"></td><td><input id="txtResult' + s_no + '" type="text" class="form-control" name="TextBox3"></td></tr>');
   
  });
})

// function add_another() {
//     document.getElementById("tbl").append('<tr><th>' + s_no + '.</th><td><input id="description' + s_no + '" type="Description" name="Description" class="form-control" placeholder="Item Name" autofocus></td><td><input id="quantity' + s_no + '"type="number" name="number"  class="form-control" placeholder="Enter Quantity"></td><td><input id="amount' + s_no + '" type="number" name="Amount" class="form-control" placeholder="Enter Amount"></td><td><input id="tax' + s_no + '" type="number" name="Taxes" class="form-control" placeholder="Enter Taxes"></td><td><input id="discount' + s_no + '" type="number" name="Discount" class="form-control" placeholder="Discount" oninput="add_number()"></td><td><input id="txtResult' + s_no + '" type="text" class="form-control" name="TextBox3"></td></tr>');
//   }