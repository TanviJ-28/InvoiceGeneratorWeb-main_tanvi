function uniqueId() {
  var today = new Date();
  document.getElementById("unique_id").value =
    "IN" +
    today.getDate() +
    String(today.getMonth() + 1) +
    today.getMilliseconds() +
    Math.floor(Math.random() * 100);
  // Date.now().toString(36) + Math.random().toString(36)
}

var rowCount = 1; // Counter to keep track of the number of rows

function addNewLine() {
  var tbl = document.getElementById("tbl");
  var newRow = document.createElement("div");
  newRow.className = "table-row";
  newRow.style.marginBottom = "10px";

  rowCount++; // Increment the counter

  newRow.innerHTML = `
        <div class="description_div">
            <input id="description${rowCount}" type="Description" name="Description" class="form-control input" placeholder="Item Name" style="text-align: left;">
        </div>
        <div class="calculation_div">
            <div style="width: 30%; padding: 0px 2px 0px 2px;">
                <input id="quantity${rowCount}" type="number" name="number" class="form-control input" min="1" placeholder="Quantity" style="text-align: left;" onkeypress="return /[0-9]/i.test(event.key)">
            </div>
            <div style="width: 30%; padding: 0px 2px 0px 2px;">
                <input id="amount${rowCount}" type="number" name="Amount" class="form-control" min="1" placeholder="Price" style="text-align: left;" onkeypress="return /[0-9.]/i.test(event.key)">
            </div>
            <div style="width: 32%; padding: 0px 2px 0px 2px;">
                <input id="txtResult${rowCount}" type="text" class="form-control" style="text-align: left;" name="TextBox3" onkeypress="return /[]/i.test(event.key)" disabled>
            </div>
            <div style="width: 8%; display: flex; justify-content: center; ">
                 <button type="button" class="btn-close add-tax" style=" text-align: center;margin: 6px ;" aria-label="Close" onclick="removeRow(this)"></button>
            </div>
        </div>`;

  tbl.appendChild(newRow);
  var quantityInput = document.getElementById(`quantity${rowCount}`);
  var amountInput = document.getElementById(`amount${rowCount}`);
  quantityInput.addEventListener("input", function () {
    calculateAmount(rowCount);
  });
  amountInput.addEventListener("input", function () {
    calculateAmount(rowCount);
  });
}

function removeRow(button) {
  var rowToRemove = button.closest(".table-row");
  var tbl = document.getElementById("tbl");

  if (tbl.contains(rowToRemove) && tbl.childElementCount > 1) {
    tbl.removeChild(rowToRemove);
    adjustIDs(); // Call adjustIDs to readjust the IDs
  } else {
    alert("Cannot remove the last row.");
  }
}

function adjustIDs() {
  var rows = document.querySelectorAll(".table-row");
  rowCount = 0; // Reset the rowCount
  rows.forEach(function (row) {
    rowCount++;
    var inputs = row.querySelectorAll("input");
    inputs.forEach(function (input) {
      var id = input.id;
      if (
        id.includes("quantity") ||
        id.includes("amount") ||
        id.includes("description") ||
        id.includes("txtResult")
      ) {
        input.id = id.substring(0, id.length - 1) + rowCount;
      }
    });
    calculateAmount(rowCount);
  });
}

function calculateAmount(rowNum) {
  var quantityInput = document.getElementById(`quantity${rowNum}`);
  var amountInput = document.getElementById(`amount${rowNum}`);
  var txtResultInput = document.getElementById(`txtResult${rowNum}`);

  var quantityValue = parseFloat(quantityInput.value) || 0;
  var amountValue = parseFloat(amountInput.value) || 0;

  var result = quantityValue * amountValue;

  txtResultInput.value = result.toFixed(2);

  calculateSubtotal();
}

function calculateSubtotal() {
  var allTxtResultInputs = document.querySelectorAll('[id^="txtResult"]');
  subtotal = 0;

  allTxtResultInputs.forEach(function (txtResultInput) {
    subtotal += parseFloat(txtResultInput.value) || 0;
  });

  var subTotalInput = document.getElementById("subTotal");
  subTotalInput.value = subtotal.toFixed(2);

  calculateTax(); // After subtotal is calculated, recalculate tax and grand total
}

function calculateTax() {
  var taxRate = parseFloat(document.getElementById("tax").value) || 0;
  var subTotal = parseFloat(document.getElementById("subTotal").value) || 0;

  var taxes = (taxRate / 100) * subTotal;
  var grandTotal = subTotal + taxes;

  document.getElementById("grandTotal").value = grandTotal.toFixed(2);

  // Update the amount in words
  getAmountInWords();
}

function addDiscount() {
  document.getElementById("discountInput").innerHTML =
    '<div class="input-group end mb-3" style="width: 100%">' +
    '<span class="input-group-text wosub" id="">Discount (%)</span>' +
    '<input  type="number" id="discount" class="form-control inputGroup wosub" min="0" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onkeypress="return /[0-9.]/i.test(event.key)" oninput="calculateGrandTotal()"' +
    "</div>";
  document.getElementById("crossButton").innerHTML =
    '<button type="button" class="btn-close add-tax" aria-label="Close" onclick="remove_input()"></button>';
}

function remove_input() {
  document.getElementById("discountInput").innerHTML = "";
  document.getElementById("crossButton").innerHTML =
    '<input type="submit" class="btn add-tax btn-light" value="+ Discount" onclick="addDiscount()" onkeypress="return /[0-9a-zA-Z.]/i.test(event.key)"/>';
  calculateSubtotal(); // Recalculate subtotal when removing discount
}

function calculateGrandTotal() {
  var taxRate = parseFloat(document.getElementById("tax").value) || 0;
  var subTotal = parseFloat(document.getElementById("subTotal").value) || 0;
  var discount = parseFloat(document.getElementById("discount").value) || 0;

  var taxes = (taxRate / 100) * subTotal;
  var totalBeforeDiscount = subTotal + taxes;
  var discountAmount = (discount / 100) * totalBeforeDiscount;
  var grandTotal = totalBeforeDiscount - discountAmount;

  document.getElementById("grandTotal").value = grandTotal.toFixed(2);

  // Update the amount in words
  getAmountInWords();
}

function amountToWord(amount) {
  var words = new Array();
  words[0] = "Zero";
  words[1] = "One";
  words[2] = "Two";
  words[3] = "Three";
  words[4] = "Four";
  words[5] = "Five";
  words[6] = "Six";
  words[7] = "Seven";
  words[8] = "Eight";
  words[9] = "Nine";
  words[10] = "Ten";
  words[11] = "Eleven";
  words[12] = "Twelve";
  words[13] = "Thirteen";
  words[14] = "Fourteen";
  words[15] = "Fifteen";
  words[16] = "Sixteen";
  words[17] = "Seventeen";
  words[18] = "Eighteen";
  words[19] = "Nineteen";
  words[20] = "Twenty";
  words[30] = "Thirty";
  words[40] = "Forty";
  words[50] = "Fifty";
  words[60] = "Sixty";
  words[70] = "Seventy";
  words[80] = "Eighty";
  words[90] = "Ninety";
  words[100] = "One Hundred";
  words[200] = "Two Hundred";
  words[300] = "Three Hundred";
  words[400] = "Four Hundred";
  words[500] = "Five Hundred";
  words[600] = "Six Hundred";
  words[700] = "Seven Hundred";
  words[800] = "Eight Hundred";
  words[900] = "Nine Hundred";
  var op;
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if (n_length <= 11) {
    var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var received_n_array = new Array();
    for (var i = 0; i < n_length; i++) {
      received_n_array[i] = number.substr(i, 1);
    }
    for (var i = 11 - n_length, j = 0; i < 11; i++, j++) {
      n_array[i] = received_n_array[j];
    }
    for (var i = 0, j = 1; i < 11; i++, j++) {
      if (i == 0 || i == 3 || i == 6 || i == 9) {
        if (n_array[i] == 1) {
          n_array[j] = 10 + parseInt(n_array[j]);
          n_array[i] = 0;
        }
      }
    }
    value = "";
    for (var i = 0; i < 11; i++) {
      if (i == 0 || i == 3 || i == 6 || i == 9) {
        value = n_array[i] * 10;
      } else if (i == 2 || i == 5 || i == 8) {
        value = n_array[i] * 100;
      } else {
        value = n_array[i];
      }

      if (value != 0) {
        words_string += words[value] + " ";
      }
      if (i == 1 && value != 0 && n_array[i - 1] > 0) {
        words_string += "Billion ";
      } else if (i == 1 && value != 0) {
        words_string += "Biillion ";
      }
      if (i == 4 && value == 0 && (n_array[i - 1] > 0 || n_array[i - 2] > 0)) {
        words_string += "Million ";
      } else if (i == 4 && value != 0) {
        words_string += "Million ";
      }
      if (i == 7 && value == 0 && (n_array[i - 1] > 0 || n_array[i - 2] > 0)) {
        words_string += "Thousand ";
      } else if (i == 7 && value != 0) {
        words_string += "Thousand ";
      }
    }
    words_string = words_string.split(" ").join(" ");
  }
  return words_string;
}

function getAmountInWords() {
  var num = parseFloat(document.getElementById("grandTotal").value);
  var n = Math.round(num * 100) / 100;

  if (document.getElementById("currencySelect").value == "IND") {
    var cur = "rupees";
    var frac = "paise";
  } else {
    var cur = "dollars";
    var frac = "cents";
  }

  nums = n.toString().split(".");
  var whole = amountToWord(nums[0]);
  if (nums[1] == null) nums[1] = 0;
  if (nums[1].length == 1) nums[1] = nums[1] + "0";
  if (nums[1].length > 2) {
    nums[1] = nums[1].substring(2, length - 1);
  }
  if (nums.length == 2) {
    if (nums[0] <= 12) {
      nums[0] = nums[0] * 10;
    } else {
      nums[0] = nums[0];
    }
    var fraction = amountToWord(nums[1]);
    if (whole == "" && fraction == "") {
      op = "Zero";
    }
    if (whole == "" && fraction != "") {
      op = fraction + frac;
    }
    if (whole != "" && fraction == "") {
      op = whole + cur;
    }
    if (whole != "" && fraction != "") {
      op = whole + cur + " and " + fraction + frac;
    }
    amt = num;
    if (amt > 99999999999.99) {
      op = "Oops!!! The amount is too big to convert";
    }
    if (isNaN(amt) == true) {
      op = "zero";
    }
    document.getElementById("subTotalWord").innerHTML = op;
  }
}

function validateInput() {
  if (
    !validateField(
      "unique_id",
      "msgID_err",
      /^[IN]{2}([a-zA-Z0-9 ,.'-])+$/,
      "Please Enter valid ID"
    ) ||
    !validateField(
      "companyName",
      "msgSenderCompanyName",
      /^[A-Z0-9]([a-zA-Z0-9]|[- @\.#&!])*$/,
      "Please enter valid Company Name"
    ) ||
    !validateField(
      "contactName",
      "msgSenderContactName",
      /^[A-Z][A-Za-z0-9 .@_%&]{1,80}$/,
      "Please enter valid Contact Name"
    ) ||
    !validateField(
      "sEmail",
      "msgSenderMail",
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter valid Email"
    ) ||
    !validateField(
      "phone",
      "msgSenderPhone",
      /^$|^\+?[1-9][0-9]{9,12}$/,
      "Please enter validsdsdsd Phone Number"
    ) ||
    !validateField(
      "rCompanyName",
      "msgReceiverCompanyName",
      /^[A-Z0-9]([a-zA-Z0-9]|[- @\.#&!])*$/,
      "Please enter valid Company Name"
    ) ||
    !validateField(
      "rName",
      "msgReceiverContactName",
      /^[A-Z][A-Za-z0-9 .@_%&]{1,80}$/,
      "Please enter valid Contact Name"
    ) ||
    !validateField(
      "rEmail",
      "msgReceiverMail",
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter valid Email"
    ) ||
    !validateField(
      "rPhone",
      "msgReceiverPhone",
      /^$|^\+?[1-9][0-9]{9,12}$/,
      "Please enter valid Pddwhone Number"
    ) ||
    !validateField(
      "areaCode",
      "lcompany_error",
      null,
      "Please choose Country Code"
    ) ||
    !validateField(
      "areaCodeR",
      "lcompany_error",
      null,
      "Please choose Country Code"
    ) ||
    !validateField(
      "description1",
      "inv_item",
      null,
      "Please Enter Description"
    ) ||
    !validateField("quantity1", "inv_item", null, "Please Enter Quantity") ||
    !validateField("amount1", "inv_item", null, "Please Enter Amount") ||
    !validateField("date", "inv_date", null, "Select Date")
  ) {
    return;
  }

  if (localStorage.getItem("token") !== null) {
    console.log("previewInvoiceSecured")
    previewInvoiceSecured();
    togg();
  } else {
    console.log("previewInvoice")
    previewInvoice();
    togg();
  }
}

function validateField(inputId, msgId, regex, errorMessage) {
  const element = document.getElementById(inputId);
  const msgElement = document.getElementById(msgId);
  const value = element.value.trim();

  if (!value || (regex && !regex.test(value))) {
    displayValidationError(element, msgElement, errorMessage);
    return false;
  }

  removeValidationError(msgElement, element);
  return true;
}

function displayValidationError(element, msgElement, message) {
  msgElement.innerHTML = message;
  element.focus();
  element.style.outline = "3px solid red";
}

function removeValidationError(msgElement, element) {
  msgElement.innerHTML = "";
  element.style.outline = "";
}
