
let typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".input-field"),
    mistakeTag = document.querySelector(".mistake span"),
    timeTag = document.querySelector(".time span b"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    tryAgainBtn = document.querySelector("button"),
    taxi = document.querySelector(".taxi")


let timer, maxTime = 60 , timeleft = maxTime,
    currentIndex = mistakes = isTyping = 0;

   timeTag.innerHTML = maxTime; 


function randomParagraph() {
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(char => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus())

}

function initTyping() {
    let userInput = inpField.value.split("")
    const characters = typingText.querySelectorAll("span")

    if (timeleft > 0 && currentIndex < characters.length - 1) {
// ...................................


let taxiWidth = taxi.offsetWidth; 
let containerWidth = document.querySelector('.taxi-container').offsetWidth; 
let progress = (currentIndex / (characters.length - 1)) * (containerWidth - taxiWidth) / containerWidth * 100;
taxi.style.left = `${progress}%`;

// ..................................
        if (!isTyping) {
            timer = setInterval(initTimer, 1000)
            isTyping = true;
        }
        if (userInput[currentIndex] == null) {
            currentIndex--;

            if (characters[currentIndex].classList.contains("incorrect")) {
                mistakes--;
                mistakeTag.innerHTML = mistakes;
            }

            characters[currentIndex].classList.remove("correct", "incorrect");

        } else {
            if (characters[currentIndex].innerText === userInput[currentIndex]) {
                characters[currentIndex].classList.add("correct")
            }
            else {
                characters[currentIndex].classList.add("incorrect")
                mistakes++;
            }
            currentIndex++;
            mistakeTag.innerHTML = mistakes;
            characters.forEach(char => char.classList.remove("active"));
            characters[currentIndex].classList.add("active");
            // characters[characters.length - 1 - currentIndex].classList.add("active");
            let wpm = Math.round(((currentIndex - mistakes) / 5) / (maxTime - timeleft) * 60)
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            wpmTag.innerHTML = wpm;
            let cpm = currentIndex - mistakes;
            cpmTag.innerHTML = cpm;
        }

    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}


function initTimer() {
    if (timeleft > 0) {
        timeleft--;
        timeTag.innerHTML = timeleft;
    } else {
        clearInterval(timer);
    }
};

function resetGame(){
    randomParagraph();
    inpField.value = "";
    clearInterval(timer)
    timeleft = maxTime,
    currentIndex = mistakes = isTyping = 0;
    timeTag.innerHTML = timeleft;
    mistakeTag.innerHTML= mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    taxi.style.left = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping)
tryAgainBtn.addEventListener("click", resetGame)
// ###########