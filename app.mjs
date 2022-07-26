function startApp() {
  // //////////////////////// INITIALIZING VARIABLES ////////////////////////////////////////////////////////
  const labels = document.querySelectorAll(".form-control label");
  const firstnameEl = document.getElementById("firstname");
  const lastnameEl = document.getElementById("lastname");
  const emailEl = document.getElementById("email");
  const phoneEl = document.getElementById("phone");
  const imageEl = document.querySelector(".number-logo");
  const form = document.querySelector(".form");
  const links = document.querySelectorAll(".link")
  const custom = document.querySelector(".custom-select");
  const customOptions = document.querySelector(".custom-options");
  const fixedOption = document.querySelector(".fixed-option");
  const footerSpan = document.querySelector("footer span");
  const nameRegex = /^[a-zA-Z]+$/g;
  const mtnLines = [
    "07025",
    "07026",
    "0703",
    "0704",
    "0706",
    "0803",
    "0806",
    "0810",
    "0813",
    "0814",
    "0816",
    "0903",
    "0906",
    "0913",
    "0916",
  ];
  const gloLines = ["0805", "0705", "0905", "0807", "0815", "0811", "0905"];
  const airtelLines = ["0708", "0802", "0902", "0701", "0808", "0812", "0907"];
  const etisalatLines = ["0809", "0909", "0817", "0818", "0908"];
  const allLines = [...mtnLines, ...gloLines, ...airtelLines, ...etisalatLines];
  const logos = [
    "./assets/airtel-logo.png",
    "./assets/etisalat-logo.png",
    "./assets/glo-logo.png",
    "./assets/mtn-logo.png",
  ];
  let options = document.querySelectorAll(".option");
  let mtnLogo = false;
  let isCodeNigerian = true;
  // ////////////////////////////////////////////////////////////////////////////////
  // //////////////////////// PART 1-INPUT VALIDATIONS, ANIMATIONS AND CUSTOM SELECT ////////////////////////////////////////////////////////
  // //////////////////////// PART 1-INPUT VALIDATIONS, ANIMATIONS AND CUSTOM SELECT ////////////////////////////////////////////////////////
  // Animating the labels
  labels.forEach((label) => {
    label.innerHTML = label.textContent
      .split("")
      .map(
        (letter, i) =>
          `<span style="transition-delay:${i * 40}ms">${letter}</span>`
      )
      .join("");
  });

  // animate number arrow and display custom-options
  custom.addEventListener("click", () => {
    custom.classList.toggle("rotate");
    if (custom.classList.contains("rotate")) {
      customOptions.classList.add("show");
    } else {
      customOptions.classList.remove("show");
    }

    // close the custom-options when clicked outside
    document.addEventListener("click", function (e) {
      if (e.target !== custom && !custom.contains(e.target)) {
        customOptions.classList.remove("show");
        custom.classList.remove("rotate");
      }
    });

    // add event listener to each option;
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        fixedOption.innerHTML = e.target.textContent;
        if (fixedOption.innerHTML != "+234")
         { 
          isCodeNigerian = false;
          setError(phoneEl, "Only +234 is allowed");
          }
        else{
          isCodeNigerian = true;
           setSuccess(phoneEl)};
        if (customOptions.classList.contains("show")) {
          customOptions.classList.remove("show");
          custom.classList.remove("rotate");
        }
      });
    });
  });

  // form validation
  const setError = (input, message) => {
    const formGroup = input.parentElement;

    formGroup.classList.remove("success");
    formGroup.classList.add("error");

    const error = formGroup.querySelector("small");
    error.textContent = message;
  };

  const setSuccess = (input) => {
    const formGroup = input.parentElement;

    formGroup.classList.remove("error");
    formGroup.classList.add("success");

    const error = formGroup.querySelector("small");
    error.textContent = "";
  };

  const validateFirstname = () => {
    const firstname = firstnameEl.value.trim();
    let valid = true;
    if (firstname === "") {
      setError(firstnameEl, "firstname is required");
      valid = false;
    } else if (!firstname.match(nameRegex)) {
      setError(firstnameEl, "enter valid name");
      valid = false;
    } else {
      setSuccess(firstnameEl);
      valid = true;
    }
    return valid;
  };

  const validateLastname = () => {
    const lastname = lastnameEl.value.trim();
    let valid = true;
    if (lastname === "") {
      setError(lastnameEl, "lastname is required");
      valid = false;
    } else if (!lastname.match(nameRegex)) {
      setError(lastnameEl, "enter valid name");
      valid = false;
    } else {
      setSuccess(lastnameEl);
      valid = true;
    }
    return valid;
  };

  const validateEmail = () => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let valid = true;
    const email = emailEl.value.trim();
    if (email === "") {
      setError(emailEl, "email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setError(emailEl, "enter valid email");
      valid = false;
    } else {
      setSuccess(emailEl);
      valid = true;
    }

    return valid;
  };

  const validatePhonenumber = () => {
    const phone = phoneEl.value.trim();
    let valid = false;
      if (phone === "") {
        setError(phoneEl, "Phone number is required");
        valid = false;
      } else if (
        mtnLogo === false
      ) {
        setError(phoneEl, "only MTN lines are required");
        valid = false;
      } else {
        setSuccess(phoneEl);
        valid = true;
      }

      while(isCodeNigerian === false) {
        setError(phoneEl, "Only +234 is allowed");
       valid = false;
      }

    return valid;

  
  };

  // validate all inputs onSubmit
  function valdateInputs() {
    let valid = false;

    if (
      validateFirstname() &&
      validateLastname() &&
      validateEmail() &&
      validatePhonenumber()
    ) {
      valid = true;
    }
    return valid;
    // validateFirstname();
    // validateLastname();
    // validateEmail();
    // validatePhonenumber();
  }

  // run function after one sec for optimization
  function debounceFn(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    };
  }

  // validate after typing
  firstnameEl.addEventListener(
    "keyup",
    debounceFn(() => {
      validateFirstname();
    })
  );

  lastnameEl.addEventListener(
    "keyup",
    debounceFn(() => {
      validateLastname();
    })
  );
  emailEl.addEventListener(
    "keyup",
    debounceFn(() => {
      validateEmail();
    })
  );

  phoneEl.addEventListener(
    "keyup",
    debounceFn(() => {
      validatePhonenumber();
    })
  );

  // remove non-numeric character from phone-input
  phoneEl.addEventListener("keypress", (e) => {
    e = e || window.event;
    let charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
    let charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
  });

  // validate on submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(valdateInputs());
    let validated = valdateInputs();
    if (validated && isCodeNigerian) {
      document.querySelector(".validated").textContent =
        "registration successful!";
      phoneEl.value = "";
      lastnameEl.value = "";
      emailEl.value = "";
      firstnameEl.value = "";

      setTimeout( () =>{
        window.location.href ="live.html";
      }, 2000)

    }
  });



  // disable links
  document.querySelector(".link1").addEventListener("click", function(e){
    if(e.target.name === "next"){
      e.preventDefault();
      document.querySelector(".transparent-box").style.display = "block"
    }
  })

  document.querySelector(".link2").addEventListener("click", function(e){
    if(e.target.name === "next"){
      e.preventDefault();
      document.querySelector(".transparent-box").style.display = "block"
    }
  })

  document.querySelector("#okay-btn").addEventListener("click", function(){
    document.querySelector(".transparent-box").style.display="none"
  })

  

  // Footer Date
  footerSpan.textContent = new Date().getFullYear();
  // ////////////////////////////////////////////////////////////////////////////////

  // //////////////////////// AUTO COMPLETE AND LOGO DISPLAY PART ////////////////////////////////////////////////////////
  // //////////////////////// AUTO COMPLETE AND LOGO DISPLAY PART ////////////////////////////////////////////////////////
  function displayMtn(mtn, val) {
    for (let i = 0; i < mtn.length; i++) {
      if (val.includes(mtn[i]) || val.includes(mtn[i].slice(1, 5))) {
        imageEl.src = logos[3];
        mtnLogo = true;
        imageEl.style.opacity = "1";
      }
    }
  }

  function displayEtisalat(etisalat, val) {
    for (let i = 0; i < etisalat.length; i++) {
      if (val.includes(etisalat[i]) || val.includes(etisalat[i].slice(1, 5))) {
        imageEl.src = logos[1];
        imageEl.style.opacity = "1";
        mtnLogo = false;
      }
    }
  }
  function displayGlo(glo, val) {
    for (let i = 0; i < glo.length; i++) {
      if (val.includes(glo[i]) || val.includes(glo[i].slice(1, 5))) {
        imageEl.src = logos[2];
        mtnLogo = false;
        imageEl.style.opacity = "1";
      }
    }
  }

  function displayAirtel(airtel, val) {
    for (let i = 0; i < airtel.length; i++) {
      if (val.includes(airtel[i]) || val.includes(airtel[i].slice(1, 5))) {
        imageEl.src = logos[0];
        mtnLogo = false;
        imageEl.style.opacity = "1";
      }
    }
  }

  //   this functions  displays the logo
  //   and also the auto complete whenever something is typed into the input
  function displayLogoAndAutoComplete(mtn, glo, airtel, etisalat, all) {
    phoneEl.addEventListener("input", (e) => {
      const val = e.target.value;
      autocomplete(e, all, val, mtn, airtel, glo, etisalat);
      if (val.startsWith("0")) {
        phoneEl.maxLength = 11;
      } else {
        phoneEl.maxLength = 10;
      }
      if (!val) {
        imageEl.style.opacity = "0";
      }
      for (let i = 0; i < allLines.length; i++) {
        if (!val.includes(allLines[i])) {
          imageEl.style.opacity = "0";
        }
      }
      displayMtn(mtn, val);
      displayEtisalat(etisalat, val);
      displayGlo(glo, val);
      displayAirtel(airtel, val);
    });
  }
  displayLogoAndAutoComplete(
    mtnLines,
    gloLines,
    airtelLines,
    etisalatLines,
    allLines
  );

  function autocomplete(e, all, val, mtn, airtel, glo, etisalat) {
    let currentFocus;
    let itemsCont, item;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    itemsCont = document.createElement("DIV");
    itemsCont.setAttribute("id", "autocomplete-list");
    itemsCont.setAttribute("class", "items");
    // autoCont.appendChild(itemsCont);
    phoneEl.parentElement.appendChild(itemsCont);
    for (let i = 0; i < all.length; i++) {
      if (all[i].substr(0, val.length) == val) {
        item = document.createElement("DIV");
        item.setAttribute("tabIndex", "-1");
        item.innerHTML =
          "<strong>" + all[i].substr(0, val.length) + "</strong>";
        item.innerHTML += all[i].substr(val.length);
        item.className = "auto-field";
        item.innerHTML += "<input  type='hidden' value='" + all[i] + "' >";
        item.addEventListener("click", function (e) {
          phoneEl.value = this.getElementsByTagName("input")[0].value.substr(1);
          displayMtn(mtn, phoneEl.value);
          displayEtisalat(etisalat, phoneEl.value);
          displayAirtel(airtel, phoneEl.value);
          displayGlo(glo, phoneEl.value);
          closeAllLists();
        });
        itemsCont.appendChild(item);
      }
      if (all[i].substr(1, val.length) == val) {
        item = document.createElement("DIV");
        item.innerHTML =
          "<strong>" + all[i].substr(1, val.length) + "</strong>";
        item.innerHTML += all[i].substr(val.length + 1);
        item.className = "auto-field";
        item.innerHTML += "<input type='hidden' value='" + all[i] + "'>";
        item.addEventListener("click", function (e) {
          phoneEl.value = this.getElementsByTagName("input")[0].value.substr(1);
          displayMtn(mtn, phoneEl.value);
          displayEtisalat(etisalat, phoneEl.value);
          displayAirtel(airtel, phoneEl.value);
          displayGlo(glo, phoneEl.value);
          closeAllLists();
        });
        itemsCont.appendChild(item);
      }
    }

    /*execute a function when one presses a key on the keyboard:*/
    phoneEl.addEventListener("keydown", function (e) {
      // let x = document.getElementById( "autocomplete-list");
      //   if (x) x = x.querySelectorAll(".auto-field");
      //   if (e.keyCode == 40  ) {
      //     currentFocus++;
      //    if(currentFocus > -1){
      //     e.stopPropagation();
      //     if(x[currentFocus]){
      //       x[currentFocus].scrollIntoView(true);
      //     }
      //    }
      //     addActive(x);
      //   }
      //    else if (e.keyCode == 38) {
      //     currentFocus--;
      //     if(currentFocus > 0){
      //       e.stopPropagation();
      //       if(x[currentFocus]){
      //         x[currentFocus].scrollIntoView(true)
      //       }
      //      }
      //     addActive(x);
      //   } else if (e.keyCode == 13) {
      //     e.preventDefault();
      //     if (x) {x[currentFocus].click(e);
      //     }
      //     if (currentFocus > 0) {
      //   if (x) {
      //     console.log(x);
      //     x[currentFocus].click(e);
      //   } else{
      //     return false
      //   }
      // }
      //   }
    });

    // function addActive(x) {
    //   if (!x) return false;
    //   removeActive(x);
    //   if (currentFocus >= x.length) currentFocus = 0;
    //   if (currentFocus < 0) currentFocus = (x.length - 1);
    //   /*add class "autocomplete-active":*/
    //   x[currentFocus].classList.add("autocomplete-active");
    // }
    // function removeActive(x) {
    //   for (var i = 0; i < x.length; i++) {
    //     x[i].classList.remove("autocomplete-active");
    //   }
    // }

    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != phoneEl) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  // ////////////////////////////////////////////////////////////////////////////////
}

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //
