
document.querySelectorAll(".select-group").forEach((dropdownWrapper) => {
    const dropdownButton = dropdownWrapper.querySelector(".select-button");
    const rotateButton = dropdownWrapper.querySelector(".select-button");
     const dropdownList = dropdownWrapper.querySelector(".select-options");
    const dropdownInput = dropdownWrapper.querySelector(".dropdown-input");
    const dropdownListItem = dropdownWrapper.querySelectorAll(
      ".select-option-item" 
    );
    const selectorBlock = dropdownWrapper.querySelector(".select-block");
  
    function closeSelect() {
        dropdownList.classList.remove("select-options-visible");
        selectorBlock.classList.remove("select-block-highlighted");
        dropdownList.classList.remove("select-options-highlighted");
          rotateButton.classList.remove("rotate");  
  }
    // клик по кнопке открывает и закрывает дропдаун
    dropdownButton.addEventListener("click", function () {
     
      dropdownList.classList.toggle("select-options-visible");
      dropdownList.classList.toggle("select-options-highlighted");
      selectorBlock.classList.toggle("select-block-highlighted");
    rotateButton.classList.toggle("rotate");  
       
       
    });
   
    // выбирает значение дропдауна для инпута и закрывает дропдаун
    dropdownListItem.forEach((listItem) => {
      listItem.addEventListener("click", function () {
        dropdownInput.value = this.innerText;
         closeSelect();
         
      });
    });
    //   Клик снаружи дропдауна закрывает его
    document.addEventListener("click", (e) => {
      if (e.target !== dropdownButton) {
           closeSelect();
       
      }
    });
    // Клик на Tab или Escape закрывает дропдаун
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab" || e.key === "Escape") {
        closeSelect();
           }
    });
  });
  
  