var data = [];

function checkSelectOption() {
  var elementType = document.getElementById("element-type");
  var form = document.getElementById("dataForm");

  removeOptionFields();

  if (elementType.value === "select") {
    for (let i = 1; i <= 4; i++) {
      var optionInput = document.createElement("input");
      optionInput.type = "text";
      optionInput.id = "option" + i;

      var optionLabel = document.createElement("label");
      optionLabel.textContent = "Option " + i + ": ";
      optionLabel.id = "option" + i + "label";
      optionLabel.for = optionInput.id;

      form.insertBefore(
        optionLabel,
        document.getElementById("isRequiredLabel")
      );
      form.insertBefore(
        optionInput,
        document.getElementById("isRequiredLabel")
      );
      let brk = document.createElement("br");
      brk.id = "break" + i;
      form.insertBefore(brk, document.getElementById("isRequiredLabel"));
    }
  }
}

function removeOptionFields() {
  var form = document.getElementById("dataForm");
  for (let i = 1; i <= 4; i++) {
    var optionLabel = document.getElementById("option" + i + "label");
    var optionInput = document.getElementById("option" + i);
    var brk = document.getElementById("break" + i);
    if (optionLabel) {
      form.removeChild(optionLabel);
    }
    if (optionInput) {
      form.removeChild(optionInput);
    }
    if (brk) {
      form.removeChild(brk);
    }
  }
  document.getElementById("isRequiredLabel").style.marginTop = "10px";
}

let dataForm = document.getElementById("dataForm");
dataForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let elementName = document.getElementById("element-name").value;
  let elementType = document.getElementById("element-type").value;
  let isRequired = document.getElementById("isRequired");
  if (elementName == "") {
    alert("Ensure you input a value in Element Name!");
  } else {
    if (isRequired.checked) {
      isRequired = true;
    } else {
      isRequired = false;
    }
    let optionArray = [];
    if (elementType === "select") {
      for (let i = 1; i <= 4; i++) {
        optionArray.push(document.getElementById("option" + i).value);
      }
    }
    data.push({ elementName, elementType, optionArray, isRequired });
    // console.log(data);
    console.log("working");
  }
});

function generateForm() {
  console.log("Reaching Here");
  var form = document.getElementById("new-form");
  //   console.log(data);
  let submitButton = document.getElementById("dynamic-form-submit-button");
  if (data.length == 0) {
    alert("For preview you must include atleast one field");
  }
  for (let index = 0; index < data.length; index++) {
    let dataObject = data[index];
    let inputLabel = dataObject.elementName + " : ";
    let inputType = dataObject.elementType;
    let isReq = dataObject.isRequired;
    let input = document.createElement("input");
    input.type = inputType;
    if (inputType === "select") {
      console.log(data);
      let optionsArray = data[0].optionArray;
      console.log(optionsArray);
      for (let i = 0; i < optionsArray.length; i++) {
        var opt = document.createElement("option");
        opt.value = optionsArray[i];
        opt.innerHTML = optionsArray[i];
        select.appendChild(opt);
      }
    }
    input.id = "input" + index;
    input.name = inputLabel;
    input.class = "input-" + inputType;
    if (isReq) {
      input.setAttribute("required", true);
    }
    let label = document.createElement("label");
    label.textContent = inputLabel;
    label.for = input.id;

    form.insertBefore(label, submitButton);
    form.insertBefore(input, submitButton);
    form.insertBefore(document.createElement("br"), submitButton);
  }
  data = [];
}
