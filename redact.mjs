

// initialize 
const sectionOne = document.querySelector('#section-one');
const sectionTwo = document.querySelector('#section-two');
const sectionThree = document.querySelector('#section-three');
const sectionFour = document.querySelector('#section-four');
const textNext = document.querySelector('#text-next');
const scrambleNext = document.querySelector('.scramble-next');
const textArea = document.querySelector('.text');
const tobeScrambled = document.querySelector('.tobeScrambled');
const textPrev = document.querySelector('.prev');
const scramblePrev = document.querySelector('.scramble-prev');
const replacement = document.querySelector('.replacement');
const redact = document.querySelector('.redact');
const scrambled = document.querySelector('#scrambled');
const restart = document.querySelector('.restart');
const noScanned = document.getElementById('noOfWordsScanned');
const noOfWordMatches = document.getElementById('noOfWordsMatched');
const noScrambled = document.getElementById('noOfCharScrambled');




// click event for section one to show section two
textNext.addEventListener('click', function(e){
    e.preventDefault();
    if(textArea.value.length > 0){
        sectionOne.style.display = 'none';
        sectionTwo.style.display = 'block';
    }
});

// click event for section two to show section one
textPrev.addEventListener('click', function(e){
    e.preventDefault();
    sectionTwo.style.display = 'none';
    sectionOne.style.display = 'block';
});

// click event for section two to show section three
scrambleNext.addEventListener('click', function(e){
    e.preventDefault();
    sectionTwo.style.display = 'none';
    sectionThree.style.display = 'block';
});

scramblePrev.addEventListener('click', function(e){
    e.preventDefault();
    sectionTwo.style.display = 'block';
    sectionThree.style.display = 'none';
});

// click event for section two to show section three
redact.addEventListener('click', function(e){

    scramble();

    e.preventDefault();
    sectionThree.style.display = 'none';
    sectionFour.style.display = 'block';
});

// click event for section three to show section one
restart.addEventListener('click', function(e){
    textArea.value ='';
    tobeScrambled.value = '';
    scrambled.value = '';
    replacement.value = '';
   location.reload();
})



// function to scramble text
function scramble(){
    let startTime = new Date().getTime();
    let Array = textArea.value.split(' ');
    let wordsToScramble = tobeScrambled.value.split(' ');
    let textArray = [];
    let wordsToScrambleArray = [];
    let scrambledWords =''
    let noOfWordsScanned 
    let noOfMatches = 0;
    let charScrambled = ''
    let noOfCharScrambled;
    let timeTaken



    wordsToScramble.map((word) => {
        if(word.length <1) return false
       wordsToScrambleArray.push(word);
    })
    Array.map((word) => {
        if(word.length < 1) return false
       textArray.push(word);
    })
    noOfWordsScanned = textArray.length;
    noScanned.innerHTML = 'NO OF WORDS SCANNED: ' + noOfWordsScanned;
//    console.log(noOfWordsScanned);
 

    if(wordsToScrambleArray.length > 0){
        wordsToScrambleArray.map((word) => {
            textArray.map((text) => {
                if(text === word){
                    noOfMatches++
                    noOfWordMatches.innerHTML = 'NO OF WORDS MATCHED: ' + noOfMatches;
                    // console.log(noOfMatches);
                    charScrambled += word
                   noOfCharScrambled = charScrambled.length;
                     noScrambled.innerHTML = 'NO OF CHARACTERS SCRAMBLED: ' + noOfCharScrambled;
                    let index =textArray.indexOf(word);
                    if (index !== -1) {
                      if(replacement.value.length>0){
                        textArray[index] = replacement.value.repeat(text.length);
                      } else{
                        textArray[index] = '#'.repeat(text.length)
                      }
                      }
                      scrambledWords = textArray.join(' ');
                    //   console.log(scrambledWords);
                      scrambled.value = scrambledWords;
                } 

            })
        }
        )
    }
    let endTime = new Date().getTime();
     timeTaken = endTime - startTime;
     console.log(timeTaken);
}

