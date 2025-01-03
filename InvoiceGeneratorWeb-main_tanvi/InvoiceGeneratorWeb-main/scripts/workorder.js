function woUniqueId() {
  var today = new Date();
  document.getElementById("wo_unique_id").value = "WO" + today.getDate() + String(today.getMonth() + 1) + (today).getMilliseconds() + Math.floor(Math.random() * 100);
}

function handleDate() {
  var values = parseInt(document.getElementById("dayCount").value);
  if (values < 1) document.getElementById("dayCount").value = "";
  if (values > 365) document.getElementById("dayCount").value = 365;
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
      <input id="description${rowCount}" type="text" name="Description" class="form-control input" placeholder="Item Name" style="text-align: left;">
    </div>
    <div class="calculation_div">
      <div style="width: 30%; padding: 0px 2px 0px 2px;">
        <input id="quantity${rowCount}" type="number" name="number" class="form-control input" min="1" placeholder="Quantity" style="text-align: left;">
      </div>
      <div style="width: 30%; padding: 0px 2px 0px 2px;">
        <input id="amount${rowCount}" type="number" name="Amount" class="form-control" min="1" placeholder="Price" style="text-align: left;">
      </div>
      <div style="width: 32%; padding: 0px 2px 0px 2px;">
        <input id="txtResult${rowCount}" type="text" class="form-control" style="text-align: left;" name="TextBox3" disabled>
      </div>
      <div style="width: 8%; display: flex; justify-content: center;">
        <button type="button" class="btn-close" style="text-align: center;margin: 6px;" aria-label="Close" onclick="removeRow(this)">X</button>
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
  rows.forEach(function (row, index) {
    rowCount = index + 1; // Adjust the rowCount
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
  var subtotal = 0;

  allTxtResultInputs.forEach(function (txtResultInput) {
    subtotal += parseFloat(txtResultInput.value) || 0;
  });

  var subTotalInput = document.getElementById("subTotal");
  subTotalInput.value = subtotal.toFixed(2);
  getAmountInWords();
}

function getElement(id) {
  return document.getElementById(id);
}

function workOrderValidate() {
  var regexComName = /^[A-Z0-9]([a-zA-Z0-9]|[- @\.#&!])*$/;
  var regexName = /^[A-Z]([a-zA-Z0-9 ,.'-])+$/;
  var regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var regexID = /^[WO]{2}([a-zA-Z0-9 ,.'-])+$/; 
  var regexPhone = /^$|^\+?[1-9][0-9]{9,12}$/;

  getElement("msgID_err").innerHTML = "";
  getElement("wo_unique_id").style.outline = "none";
  getElement("wo_date").innerHTML = "";
  getElement("workorderDate").style.outline = "none";
  getElement("dayCount").style.outline = "none";
  getElement("msgSenderCompanyName").innerHTML = "";
  getElement("companyName").style.outline = "none";
  getElement("msgSenderContactName").innerHTML = "";
  getElement("contactName").style.outline = "none";
  getElement("msgSenderMail").innerHTML = "";
  getElement("sEmail").style.outline = "none";
  getElement("msgSenderPhone").innerHTML = "";
  getElement("phone").style.outline = "none";
  getElement("msgReceiverCompanyName").innerHTML = "";
  getElement("rCompanyName").style.outline = "none";
  getElement("msgReceiverContactName").innerHTML = "";
  getElement("rName").style.outline = "none";
  getElement("msgReceiverMail").innerHTML = "";
  getElement("rEmail").style.outline = "none";
  getElement("msgReceiverPhone").innerHTML = "";
  getElement("rPhone").style.outline = "none";
  getElement("error_filed").innerHTML = "";
  getElement("areaCode").style.outline = "none";
  getElement("areaCodeR").style.outline = "none";
  getElement("inv_item").innerHTML = "";
  getElement("description1").style.outline = "none";
  getElement("quantity1").style.outline = "none";

  if (getElement("wo_unique_id").value === "" || !regexID.test(getElement("wo_unique_id").value)) {
    getElement("msgID_err").innerHTML = "Please Enter valid ID";
    getElement("wo_unique_id").focus();
    getElement("wo_unique_id").style.outline = "3px solid red";
  } else if (getElement("workorderDate").value === "") {
    getElement("wo_date").innerHTML = "Select Date";
    getElement("workorderDate").focus();
    getElement("workorderDate").style.outline = "3px solid red";
  } else if (getElement("dayCount").value === "") {
    getElement("wo_date").innerHTML = "Select Days";
    getElement("dayCount").focus();
    getElement("dayCount").style.outline = "3px solid red";
  } else if (getElement("companyName").value === "" || !regexComName.test(getElement("companyName").value)) {
    getElement("msgSenderCompanyName").innerHTML = "Please enter valid Company Name";
    getElement("companyName").focus();
    getElement("companyName").style.outline = "3px solid red";
  } else if (getElement("contactName").value === "" || !regexName.test(getElement("contactName").value)) {
    getElement("msgSenderContactName").innerHTML = "Please enter valid Contact Name";
    getElement("contactName").focus();
    getElement("contactName").style.outline = "3px solid red";
  } else if (getElement("sEmail").value === "" || !regexEmail.test(getElement("sEmail").value)) {
    getElement("msgSenderMail").innerHTML = "Please enter valid Email";
    getElement("sEmail").focus();
    getElement("sEmail").style.outline = "3px solid red";
  } else if (!regexPhone.test(getElement("phone").value) ) {
    getElement("msgSenderPhone").innerHTML = "Please enter valid Phone Number";
    getElement("phone").focus();
    getElement("phone").style.outline = "3px solid red";
  } else if (getElement("rCompanyName").value === "" || !regexComName.test(getElement("rCompanyName").value)) {
    getElement("msgReceiverCompanyName").innerHTML = "Please enter valid Company Name";
    getElement("rCompanyName").focus();
    getElement("rCompanyName").style.outline = "3px solid red";
  } else if (getElement("rName").value === "" || !regexName.test(getElement("rName").value)) {
    getElement("msgReceiverContactName").innerHTML = "Please enter valid Contact Name";
    getElement("rName").focus();
    getElement("rName").style.outline = "3px solid red";
  } else if (getElement("rEmail").value === "" || !regexEmail.test(getElement("rEmail").value)) {
    getElement("msgReceiverMail").innerHTML = "Please enter valid Email";
    getElement("rEmail").focus();
    getElement("rEmail").style.outline = "3px solid red";
  } else if (!regexPhone.test(getElement("rPhone").value) ) {
    getElement("msgReceiverPhone").innerHTML = "Please enter valid Phone Number";
    getElement("rPhone").focus();
    getElement("rPhone").style.outline = "3px solid red";
  } else if (getElement("areaCode").value === "") {
    getElement("error_filed").innerHTML = "Please enter valid Area Code";
    getElement("areaCode").focus();
    getElement("areaCode").style.outline = "3px solid red";
  } else if (getElement("areaCodeR").value === "") {
    getElement("error_filed").innerHTML = "Please enter valid Area Code";
    getElement("areaCodeR").focus();
    getElement("areaCodeR").style.outline = "3px solid red";
  } else if (getElement("description1").value === "") {
    getElement("inv_item").innerHTML = "Please Enter Description";
    getElement("description1").focus();
    getElement("description1").style.outline = "3px solid red";
  }  else if (getElement("quantity1").value === "") {
    getElement("inv_item").innerHTML = "Please Enter Quantity";
    getElement("quantity1").focus();
    getElement("quantity1").style.outline = "3px solid red";
  }  else if (getElement("amount1").value === "") {
    getElement("inv_item").innerHTML = "Please Enter Amount";
    getElement("amount1").focus();
    getElement("amount1").style.outline = "3px solid red";
  }  else{
        if(localStorage.getItem("token") == null){
          previewWorkOrder();
          togg();
        } else {
          previewWorkOrderSecured();
          togg();
        }
      }
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
  var subtotal = parseFloat(document.getElementById("subTotal").value) || 0;
  var currency = document.getElementById("currencySelect").value;
  var words = amountToWord(subtotal);

  // Depending on the currency, you can customize the display
  var currencyName = currency === "IND" ? "Rupees" : "Dollars";
  var fractionName = currency === "IND" ? "Paise" : "Cents";

  var op = words + " " + currencyName;
  if (subtotal % 1 !== 0) {
    var fraction = amountToWord((subtotal % 1).toFixed(2).split('.')[1]);
    op += " and " + fraction + " " + fractionName;
  }

  document.getElementById("subTotalWord").value = op;
}
