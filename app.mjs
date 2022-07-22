function startApp() {
  // Your entire app should not necessarily be coded inside this
  // single function (though there's no penalty for that),
  // so create and use/call additional functions from here

  // pls remove the below and make some magic in here!

  const labels = document.querySelectorAll(".form-control label");
  const firstnameEl = document.getElementById("firstname");
  const lastnameEl = document.getElementById("lastname");
  const emailEl = document.getElementById("email");
  const phoneEl = document.getElementById("phone");
  const imageEl = document.querySelector(".number-logo");
  const form = document.querySelector(".form");
  const custom = document.querySelector(".custom-select");
  const customOptions = document.querySelector(".custom-options");
  let options = document.querySelectorAll(".option");

  const nameRegex = /^[a-zA-Z]+$/g;
  const mtnRegex =
    /^(\+234)?(0)?[789]0[36]\d{7}|^(\+234)?(0)?[8]1[0346]\d{7}/gm;
  const airtelRegex =
    /^(\+234)?(0)?[789]0[12]\d{7}|^(\+234)?(0)?[78]0[8]\d{7}|^(\+234)?(0)?907\d{7}|^(\+234)?(0)?812\d{7}/gm;
  const gloRegex =
    /^(\+234)?(0)?[789]05\d{7}|^(\+234)?(0)?815\d{7}|^(\+234)?(0)?811\d{7}|^(\+234)?(0)?807\d{7}/gm;

  const [mtn, airtel, glo] = [
    "./assets/mtn-logo.png",
    "./assets/airtel-logo.png",
    "./assets/glo-logo.png",
  ];

  // Animating the labels
  labels.forEach((label) => {
    label.innerHTML = label.textContent
      .split("")
      .map(
        (letter, i) =>
          `<span style="transition-delay:${i * 50}ms">${letter}</span>`
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
  });

  // add event listener to each option;

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      document.getElementById("phone").value = e.target.textContent;
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
    if (firstname === "") {
      setError(firstnameEl, "firstname is required");
    } else if (!firstname.match(nameRegex)) {
      setError(firstnameEl, "enter valid name");
    } else {
      setSuccess(firstnameEl);
    }
  };

  const validateLastname = () => {
    const lastname = lastnameEl.value.trim();
    if (lastname === "") {
      setError(lastnameEl, "lastname is required");
    } else if (!lastname.match(nameRegex)) {
      setError(lastnameEl, "enter valid name");
    } else {
      setSuccess(lastnameEl);
      console.log("successLast");
    }
  };

  const validateEmail = () => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = emailEl.value.trim();
    if (email === "") {
      setError(emailEl, "email is required");
    } else if (!emailRegex.test(email)) {
      setError(emailEl, "enter valid email");
    } else {
      setSuccess(emailEl);
    }
  };
  const displayImage = (opacity) => {
    const logo = document.querySelector(".logo");
    if (opacity) {
      logo.style.opacity = 1;
    } else {
      logo.style.opacity = 0;
    }
  };

  const validatePhonenumber = () => {
    const phone = phoneEl.value.trim();
    let imageOpacity = false;
    if (phone === "") {
      setError(phoneEl, "phone number is required");
    } else if (mtnRegex.test(phone)) {
      imageEl.src = mtn;
      setSuccess(phoneEl);
      imageOpacity = true;
    } else if (airtelRegex.test(phone)) {
      imageEl.src = airtel;
      setError(phoneEl, "This is not a valid mtn number");
      imageOpacity = true;
    } else if (gloRegex.test(phone)) {
      setError(phoneEl, "This is not a valid mtn number");
      imageEl.src = glo;
      imageOpacity = true;
    } else {
      setError(phoneEl, "This is not a nigerian number");
      imageEl.src = "";
      imageOpacity = false;
    }

    displayImage(imageOpacity);
  };

  // validate all inputs onSubmit
  function valdateInputs() {
    validateFirstname();
    validateLastname();
    validateEmail();
    validatePhonenumber();
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
    valdateInputs();
  });
}

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //
