
document.querySelectorAll(".select-group").forEach((dropdownWrapper) => {
    const dropdownButton = dropdownWrapper.querySelector(".select-button");
    const rotateButton = dropdownWrapper.querySelector(".select-button");
    const dropdownList = dropdownWrapper.querySelector(".select-options");
    const dropdownInput = dropdownWrapper.querySelector(".dropdown-input");
    const dropdownListItem = dropdownWrapper.querySelectorAll(".select-option-item");
    const selectorBlock = dropdownWrapper.querySelector(".select-block");
  
    function closeSelect() {
        dropdownList.classList.remove("select-options-visible");
        selectorBlock.classList.remove("select-block-highlighted");
        dropdownList.classList.remove("select-options-highlighted");
        rotateButton.classList.remove("rotate");  
    }

    selectorBlock.addEventListener("click", function () {
     
        dropdownList.classList.toggle("select-options-visible");
        dropdownList.classList.toggle("select-options-highlighted");
        selectorBlock.classList.toggle("select-block-highlighted");
        rotateButton.classList.toggle("rotate");  
    });

    dropdownListItem.forEach((listItem) => {
        listItem.addEventListener("click", function () {
        dropdownInput.value = this.innerText;
        closeSelect();
       });
    });
    document.addEventListener("click", (e) => {
    // convertation from collection to html array
        const children = Array.from(selectorBlock.children);
        const elements = [...children, selectorBlock];
    //if don't have selectorBlock children 
        if(!elements.includes(e.target)) {
        closeSelect(); 
       }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab" || e.key === "Escape") {
        closeSelect();
           }
    });
  });
  
  