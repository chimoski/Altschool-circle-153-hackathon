   

   // 
    const [mtn, airtel, glo] = [
      "./assets/mtn-logo.png",
      "./assets/airtel-logo.png",
      "./assets/glo-logo.png",
    ];
   
    const labels = document.querySelectorAll(".form-control label");
    const firstnameEl = document.getElementById("firstname");
    const lastnameEl = document.getElementById("lastname");
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const imageEl = document.querySelector(".number-logo");
    const form = document.querySelector(".form");
   function startApp() {




  const nameRegex = /^[a-zA-Z]+$/g;
  const mtnRegex =
    /^(\+234)?(0)?[789]0[36]\d{7}|^(\+234)?(0)?[8]1[0346]\d{7}/gm;
  const airtelRegex =
    /^(\+234)?(0)?[789]0[12]\d{7}|^(\+234)?(0)?[78]0[8]\d{7}|^(\+234)?(0)?907\d{7}|^(\+234)?(0)?812\d{7}/gm;
  const gloRegex =
    /^(\+234)?(0)?[789]05\d{7}|^(\+234)?(0)?815\d{7}|^(\+234)?(0)?811\d{7}|^(\+234)?(0)?807\d{7}/gm;

 

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
    console.log(nameRegex.test(lastname));
    console.log(typeof lastname);
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

  const validatePhonenumber = () => {
    const phone = phoneEl.value.trim();
    if (phone === "") {
      setError(phoneEl, "phone number is required");
    } else if (mtnRegex.test(phone)) {
      imageEl.src = mtn;
      setSuccess(phoneEl);
    } else if (airtelRegex.test(phone)) {
      imageEl.src = airtel;
      setError(phoneEl, "This is not a valid mtn number");
    } else if (gloRegex.test(phone)) {
      setError(phoneEl, "This is not a valid mtn number");
      imageEl.src = glo;
    } else {
      setError(phoneEl, "This is not a nigerian number");
      imageEl.src = "";
    }
  };

  function valdateInputs() {
    validateFirstname();
    validateLastname();
    validateEmail();
    validatePhonenumber();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    valdateInputs();
  });
}

// ======= DO NOT EDIT ============== //
export default startApp;
// ======= EEND DO NOT EDIT ========= //
