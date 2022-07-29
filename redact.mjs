 // initialize variables
const toRedact = document.querySelector('#toRedact');
const toScramble = document.querySelector('#toScramble');
const toReplace = document.querySelector('#replacement-field');
const redactBtn = document.querySelector('#redact-btn');
const copyBtn = document.querySelector('.copy');
const redactedField = document.querySelector('#redacted');
const toRedactErrorField = document.querySelector('.toRedactError');
const toScrambleErrorField = document.querySelector('.toScrambleError');
const toReplaceErrorField = document.querySelector('.toReplaceError');
const redactedContent = document.querySelector('#redacted-content');
const redactContent = document.querySelector('#redact-content');
let valid  = false;
let loading = false




// validate inputs and set error mesages
function setSuccess(input,errorField, message){
    input.style.outline = 'none';
    errorField.innerHTML = message;
    errorField.style.color = 'rgba(61, 161, 15, 0.925)';
}

function setError(input,errorField, message){
    input.style.outline = '2px solid red';
    errorField.innerHTML = message;
    errorField.style.color = 'red';
}


function validateToRedact(){
    if (toRedact.value.trim() === '') { 
      valid = false;
        setError(toRedact,toRedactErrorField,'Please enter text to redact*');
      } else {
        valid = true;
        setSuccess(toRedact,toRedactErrorField,'Text to redact' );
      }
      return valid;
}

function validateToScramble(){
    if (toScramble.value.trim() === '') { 
      valid = false;
        setError(toScramble,toScrambleErrorField,'Please enter word(s) to Scramble*');
      } else {
        valid = true;
        setSuccess(toScramble,toScrambleErrorField,'word(s) to Scramble' );
      }
      return valid;
}
function validateToReplace(){
    if (toReplace.value.trim() === '') { 
      valid = false;
        setError(toReplace,toReplaceErrorField,'Please enter replacement character(s)*');
      } else {
        valid = true;
        setSuccess(toReplace,toReplaceErrorField,'Replacement Character(s)' );
      }
      return valid;
}

function validateInputs() {
    toRedact.addEventListener('blur', ()=>{
        validateToRedact();
       
    });
    toRedact.addEventListener('keyup', ()=>{
        validateToRedact();
    });
    toScramble.addEventListener('blur', ()=>{
        validateToScramble();
       
    });
    toScramble.addEventListener('keyup', ()=>{
        validateToScramble();
    });
    toReplace.addEventListener('blur', ()=>{
        validateToReplace();
       
    });
    toReplace.addEventListener('keyup', ()=>{
        validateToReplace();
    });

}
validateInputs();


function showLoader(){
    setTimeout(() => {
        redactBtn.innerHTML='  <i class="fa fa-circle-o-notch fa-spin"></i>';
    }, 100);
   setTimeout(() => {
    redactContent.style.display = 'none';
    redactedContent.style.display = 'block';
   }, 1000);
   
}

// scramble onclick
function scrambleText (){
  
         redactBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            if(
                validateToRedact() &&
                validateToScramble() &&
                validateToReplace()
            ){
                
          // validateToScramble();
            // validateToRedact();
            // validateToReplace();
           showLoader()            
          scramble__words();
            }
          
    }) 
    
  
}


scrambleText();
 // function to scramble words
function scramble__words() {
    let startTime = new Date().getTime();
    let timeTaken;
//   spinner.style.display = "none";
  let totalChar = 0;

  // array of original text minus space
  let originalArr = toRedact.value
   .toLowerCase()
    .trim()
    .split(/(\s+)/)
    .filter((el) => el.trim().length > 0);

  // array of words to be scrambled  minus space
  let wordsToRedact = toScramble.value
    .toLowerCase()
    .trim()
    .split(/(\s+)/)
    .filter((el) => el.trim().length > 0);

  // Join words to redact to enable regex OR (|) method
  let regexOptions = wordsToRedact.join("|");

  // convert words to regex;
  let regex = new RegExp(regexOptions, "gi");

  let found;
  if (originalArr.length === 1) {
    found = originalArr[0].includes(wordsToRedact[0]);
  } else {
    found = originalArr.some((r) => wordsToRedact.includes(r));
  }

  let redacted = "";

  if (found) {
    redacted = toRedact.value.replace(regex, (match) => {
      return match
        .trim()
        .split("")
        .map((el) => (el ? toReplace.value : ""))
        .join("")
        .substr(0, match.length);
    });
    redactedField.value = redacted;
  } else {
    redactedField.value = "No Match Found!";
  }
//   noScanned.textContent = `No of Scanned Words: ${originalArr.length}`;
//   noOfWordMatches.textContent = `No Of Matches :${wordsToRedact.length}`;
  let stringed = wordsToRedact.join("");
  totalChar = stringed.length;
//   noScrambled.textContent = `No Of Scrambled Character: ${totalChar}`;
  let endTime = new Date().getTime();
    timeTaken = endTime - startTime;
    // document.querySelector(
    //     ".time-taken"
    //   ).textContent = `Time Taken: ${timeTaken}sec(s)`;
}