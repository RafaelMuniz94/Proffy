let btnAddTime = document.getElementById("add-time");

btnAddTime.addEventListener("click", cloneField);

function cloneField() {
  let newFieldContainer = document
    .querySelector(".schedule-item")
    .cloneNode(true);
  cleanFields(newFieldContainer);
  let list = document.getElementById("shedule-items");
  if (list.childNodes.entries.length < 30) {
    list.appendChild(newFieldContainer);
  }
}

function cleanFields(newFieldContainer) {
  let fields = newFieldContainer.querySelectorAll("input");

  fields.forEach((field) => {
    field.value = "";
  });

}
