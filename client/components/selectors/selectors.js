document.querySelectorAll(".selector-group").forEach((dropdownWrapper) => {
  const dropdownButton = dropdownWrapper.querySelector(".dropdown-button");
  const dropdownList = dropdownWrapper.querySelector(".dropdown-list");
  const dropdownInput = dropdownWrapper.querySelector(".dropdown-input");
  const dropdownListItem = dropdownWrapper.querySelectorAll(
    ".dropdown-list-item"
  );
  const selectorBlock = dropdownWrapper.querySelector(".selector-block");
  // клик по кнопке открывает и закрывает дропдаун
  dropdownButton.addEventListener("click", function () {
    dropdownList.classList.toggle("dropdown-list-visible");
    dropdownList.classList.toggle("dropdown-list-highlighted");
    selectorBlock.classList.toggle("selector-block-highlighted");
  });

  // выбирает значение дропдауна для инпута и закрывает дропдаун
  dropdownListItem.forEach((listItem) => {
    listItem.addEventListener("click", function () {
      dropdownInput.value = this.innerText;
      dropdownList.classList.remove("dropdown-list-visible");
      selectorBlock.classList.remove("selector-block-highlighted");
      dropdownList.classList.remove("dropdown-list-highlighted");
    });
  });
  //   Клик снаружи дропдауна закрывает его
  document.addEventListener("click", (e) => {
    if (e.target !== dropdownButton) {
      dropdownList.classList.remove("dropdown-list-visible");
      selectorBlock.classList.remove("selector-block-highlighted");
      dropdownList.classList.remove("dropdown-list-highlighted");
    }
  });
  // Клик на Tab или Escape закрывает дропдаун
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab" || e.key === "Escape") {
      dropdownList.classList.remove("dropdown-list-visible");
      selectorBlock.classList.remove("selector-block-highlighted");
      dropdownList.classList.remove("dropdown-list-highlighted");
    }
  });
});
