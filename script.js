let data = [];

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
      optionLabel.htmlFor = optionInput.id;

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

function generateForm() {
  console.log("removed!");
  if (document.getElementById("new-form") !== null) {
    document.getElementById("new-form").remove();
  }

  var form = document.createElement("form");
  form.id = "new-form";
  form.class = "new-form";
  document.getElementById("dynamic-portion").appendChild(form);
  if (data.length == 0) {
    alert("For preview you must include atleast one field");
  }
  for (let index = 0; index < data.length; index++) {
    let dataObject = data[index];
    let inputLabel = dataObject.elementName + " : ";
    let inputType = dataObject.elementType;
    let isReq = dataObject.isRequired;
    let label = document.createElement("label");
    label.textContent = inputLabel;
    if (inputType === "select") {
      var selectInput = document.createElement("select");
      selectInput.id = "input" + index;
      selectInput.class = "input-select";
      label.htmlFor = selectInput.id;
      if (isReq) {
        selectInput.setAttribute("required", true);
      }
      let optionsArray = dataObject.optionArray;
      for (let i = 0; i < optionsArray.length; i++) {
        var opt = document.createElement("option");
        opt.value = optionsArray[i];
        opt.innerHTML = optionsArray[i];
        selectInput.appendChild(opt);
      }
    } else {
      var input = document.createElement("input");
      input.type = inputType;
      input.id = "input" + index;
      input.name = inputLabel;
      input.class = "input-" + inputType;
      if (isReq) {
        input.setAttribute("required", true);
      }
      label.htmlFor = input.id;
    }

    form.appendChild(label);
    if (inputType === "select") {
      form.appendChild(selectInput);
    } else {
      form.appendChild(input);
    }
    form.appendChild(document.createElement("br"));
  }
  let submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.className = "generate-form-button";
  submitButton.id = "dynamic-form-submit-button";
  form.appendChild(submitButton);
  data = [];
}
