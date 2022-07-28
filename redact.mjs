// initialize
const sectionOne = document.querySelector("#section-one");
const sectionTwo = document.querySelector("#section-two");
const sectionThree = document.querySelector("#section-three");
const sectionFour = document.querySelector("#section-four");
const textNext = document.querySelector("#text-next");
const scrambleNext = document.querySelector(".scramble-next");
const textArea = document.querySelector(".text");
const tobeScrambled = document.querySelector(".tobeScrambled");
const textPrev = document.querySelector(".prev");
const scramblePrev = document.querySelector(".scramble-prev");
const replacement = document.querySelector(".replacement");
const redact = document.querySelector(".redact");
const scrambled = document.querySelector("#scrambled");
const restart = document.querySelector(".restart");
const noScanned = document.getElementById("noOfWordsScanned");
const noOfWordMatches = document.getElementById("noOfWordsMatched");
const noScrambled = document.getElementById("noOfCharScrambled");

const spinner = document.querySelector(".spinner-cont");

// click event for section one to show section two
textNext.addEventListener("click", function (e) {
  e.preventDefault();
  if (textArea.value.length > 0) {
    sectionOne.style.display = "none";
    sectionTwo.style.display = "block";
    sectionOne.querySelector("small").textContent = "";
  } else {
    sectionOne.querySelector("small").textContent =
      "Text area cannot be empty!";
  }
});

// click event for section two to show section one
textPrev.addEventListener("click", function (e) {
  e.preventDefault();
  sectionTwo.style.display = "none";
  sectionOne.style.display = "block";
});

// click event for section two to show section three
scrambleNext.addEventListener("click", function (e) {
  e.preventDefault();
  if (tobeScrambled.value.length > 0) {
    sectionTwo.style.display = "none";
    sectionThree.style.display = "block";
    sectionTwo.querySelector("small").textContent = "";
  } else {
    sectionTwo.querySelector("small").textContent =
      "Please enter words to be scrambled";
  }
});

scramblePrev.addEventListener("click", function (e) {
  e.preventDefault();
  sectionTwo.style.display = "block";
  sectionThree.style.display = "none";
});

// click event for section two to show section three
redact.addEventListener("click", function (e) {
  e.preventDefault();
  if (replacement.value.length > 0 || replacement.value !== "") {
    sectionThree.style.display = "none";
    sectionFour.style.display = "block";
    sectionThree.querySelector("small").textContent = "";
    spinner.style.display = "flex";
    // setTimeout(scramble, 1000);
    setTimeout(scramble__words, 1500);
  } else {
    sectionThree.querySelector("small").textContent =
      "Please enter your replacer!";
  }
});

// click event for section three to show section one
restart.addEventListener("click", function (e) {
  textArea.value = "";
  tobeScrambled.value = "";
  scrambled.value = "";
  replacement.value = "";
  location.reload();
});

// function to scramble text
function scramble() {
  spinner.style.display = "none";
  let startTime = new Date().getTime();
  let Array = textArea.value.split(" ");
  let wordsToScramble = tobeScrambled.value.split(" ");
  let textArray = [];
  let wordsToScrambleArray = [];
  let scrambledWords = "";
  let noOfWordsScanned;
  let noOfMatches = 0;
  let charScrambled = "";
  let noOfCharScrambled;
  let timeTaken;

  wordsToScramble.map((word) => {
    if (word.length < 1) return false;
    wordsToScrambleArray.push(word);
  });
  Array.map((word) => {
    if (word.length < 1) return false;
    textArray.push(word);
  });
  noOfWordsScanned = textArray.length;
  noScanned.innerHTML = "NO OF WORDS SCANNED: " + noOfWordsScanned;
  //    console.log(noOfWordsScanned);

  if (wordsToScrambleArray.length > 0) {
    wordsToScrambleArray.map((word) => {
      textArray.map((text, index) => {
        if (text.includes(word)) {
          noOfMatches++;
          noOfWordMatches.innerHTML = "NO OF WORDS MATCHED: " + noOfMatches;
          // console.log(noOfMatches);
          charScrambled += word;
          noOfCharScrambled = charScrambled.length;
          noScrambled.innerHTML =
            "NO OF CHARACTERS SCRAMBLED: " + noOfCharScrambled;

          if (index !== -1) {
            if (replacement.value.length > 0) {
              replaced = replacement.value.repeat(text.length);
              replaced = replaced.substr(0, textArray[index].length);
              console.log(typeof replaced);

              textArray[index] = replaced;
            } else {
              textArray[index] = "#".repeat(text.length);
            }

          }
          scrambledWords = textArray.join(" ");
          //   console.log(scrambledWords);
          scrambled.value = scrambledWords;
        } else {
          scrambled.value = "No Match Found!";
        }
      });
    });
  }
  let endTime = new Date().getTime();
  timeTaken = endTime - startTime;
  console.log(timeTaken);
}





function scramble__words() {
    let startTime = new Date().getTime();
    let timeTaken;
  spinner.style.display = "none";
  let totalChar = 0;

  // array of original text minus space
  let originalArr = textArea.value
    .trim()
    .split(/(\s+)/)
    .filter((el) => el.trim().length > 0);

  // array of words to be scrambled  minus space
  let wordsToRedact = tobeScrambled.value
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
    redacted = textArea.value.replace(regex, (match) => {
      return match
        .trim()
        .split("")
        .map((el) => (el ? replacement.value : ""))
        .join("")
        .substr(0, match.length);
    });
    scrambled.value = redacted;
  } else {
    scrambled.value = "No Match Found!";
  }
  noScanned.textContent = `No of Scanned Words: ${originalArr.length}`;
  noOfWordMatches.textContent = `No Of Matches :${wordsToRedact.length}`;
  let stringed = wordsToRedact.join("");
  totalChar = stringed.length;
  noScrambled.textContent = `No Of Scrambled Character: ${totalChar}`;
  let endTime = new Date().getTime();
    timeTaken = endTime - startTime;
    document.querySelector(
        ".time-taken"
      ).textContent = `Time Taken: ${timeTaken}sec(s)`;
}
