(function(){
/*  var beautifulImage = document.createElement("img");
  beautifulImage.src = "images/Bromo.jpg";
  var src = document.getElementById("image-container");
  src.appendChild(beautifulImage);
  */

  const myQuestions = [
    {
      intro: "Bottles around the world",
      info: "During my world trip, I took pictures from bootles around the world. Can you guess where the photos are taken?",
      source:"images/world_bottle.svg",
      question: "",
      id: ""
    },
    {
      intro:"",
      info:"",
      source: "images/5.jpg",
      question: "Where is that place?",
      answers: {
        a: "Wharariki Beach, New Zealand",
        b: "Mana Island, Mananuka, Fiji",
        c: "Matira, Bora Bora, French Polynesia",
        d: "Waikiki Beach, Oahu, USA"
      },
      id: "1/11",
      correctAnswer: "b"
    },
    {
      intro:"",
      info:"",
      source: "images/11.jpg",
      question: "Where is that place?",
      answers: {
        a: "Matira, Bora Bora, French Polynesia",
        b: "Te Rua Manga, Cook Islands",
        c: "Cooktown, Australia",
        d: "Wharariki Beach, New Zealand"
      },
      id: "2/11",
      correctAnswer: "d"
    },
    {
      intro:"",
      info:"",
      source: "images/6.jpg",
      question: "Where is that place?",
      answers: {
        a: "Sydney, Australia",
        b: "Hollywood, USA",
        c: "Auckland, New Zealand",
        d: "Stirling Point, New Zealand"
      },
      id: "3/11",
      correctAnswer: "c"
    },
    {
      intro:"",
      info:"",
      source: "images/9.jpg",
      question: "Where is that place?",
      answers: {
        a: "Auckland, New Zealand",
        b: "Fox Glacier, New Zealand",
        c: "Stirling Point, New Zealand",
        d: "Wharariki Beach, New Zealand"
      },
      id: "4/11",
      correctAnswer: "b"
    },
    {
      intro:"",
      info:"",
      source: "images/15.jpg",
      question: "Where is that place?",
      answers: {
        a: "Waikiki Beach, Oahu, USA",
        b: "Matira, Bora Bora, French Polynesia",
        c: "Mana Island, Mananuka, Fiji",
        d: "Te Rua Manga, Cook Islands"
      },
      id: "5/11",
      correctAnswer: "b"
    },
    {
      intro:"",
      info:"",
      source: "images/21.jpg",
      question: "Where is that place?",
      answers: {
        a: "Sydney, Australia",
        b: "Auckland, New Zealand",
        c: "Hollywood, USA",
        d: "Cooktown, Australia"
      },
      id: "6/11",
      correctAnswer: "c"
    },
    {
      intro:"",
      info:"",
      source: "images/7.jpg",
      question: "Where is that place?",
      answers: {
        a: "Auckland, New Zealand",
        b: "Mana Island, Mananuka, Fiji",
        c: "Stirling Point, New Zealand",
        d: "Te Rua Manga, Cook Islands"
      },
      id: "7/11",
      correctAnswer: "c"
    },
    {
      intro:"",
      info:"",
      source: "images/14.jpg",
      question: "Where is that place?",
      answers: {
        a: "Fox Glacier, New Zealand",
        b: "Waikiki Beach, Oahu, USA",
        c: "Matira, Bora Bora, French Polynesia",
        d: "Te Rua Manga, Cook Islands"
      },
      id: "8/11",
      correctAnswer: "d"
    },
    {
      intro:"",
      info:"",
      source: "images/3.jpg",
      question: "Where is that place?",
      answers: {
        a: "Cooktown, Australia",
        b: "Stirling Point, New Zealand",
        c: "Matira, Bora Bora, French Polynesia",
        d: "Sydney, Australia"
      },
      id: "9/11",
      correctAnswer: "a"
    },
    {
      intro:"",
      info:"",
      source: "images/18.jpg",
      question: "Where is that place?",
      answers: {
        a: "Waikiki Beach, USA",
        b: "Sydney, Australia",
        c: "Hollywood, USA",
        d: "Auckland, New Zealand"
      },
      id: "10/11",
      correctAnswer: "a"
    },
    {
      intro:"",
      info:"",
      source: "images/2.jpg",
      question: "Where is that place?",
      answers: {
        a: "Stirling Point, New Zealand",
        b: "Hollywood, USA",
        c: "Sydney, Australia",
        d: "Auckland, New Zealand"
      },
      id: "11/11",
      correctAnswer: "c"
    }
  ];


  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];


      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label class="radiobutton">
             <input type="radio" name="question${questionNumber}" value="${letter}">
             <span class="checkmark">${currentQuestion.answers[letter]}</span>
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="intro"> ${currentQuestion.intro}</div>
           <div class="photo"> <img id="pic" src="${currentQuestion.source}"/> </div>
           <div class="info"> ${currentQuestion.info}</div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });


    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = -1;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "#44AF69";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "#D62246";
      }
    });

    // show number of correct answers out of total
    if (numCorrect < 5) {
      resultsContainer.innerHTML = `Oh well: ${numCorrect} out of ${myQuestions.length-1}`;
    }
    else if (numCorrect >= 5 && numCorrect < 8){
      resultsContainer.innerHTML = `Not bad: ${numCorrect} out of ${myQuestions.length-1}`;
    }
    else if (numCorrect >=8 && numCorrect < 11){
      resultsContainer.innerHTML = `Almost perfect: ${numCorrect} out of ${myQuestions.length-1}`;
    }
    else if (numCorrect == 11){
      resultsContainer.innerHTML = `Outstanding: ${numCorrect} out of ${myQuestions.length-1}`;
    }
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
  

    if (currentSlide === 0) {
      previousButton.style.display = "none";
      nextButton.style.display = "none";
      startButton.style.display = "inline-block";
    }
    else if (currentSlide == 1){
      previousButton.style.display = "none";
      nextButton.style.display = "inline-block";
      startButton.style.display = "none";
    }
    else {
      previousButton.style.display = "inline-block";
      nextButton.style.display = "inline-block";
    }

    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } 
    else {
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
    document.getElementById("progress").style.backgroundColor = "#227799FF";
    document.getElementById("bar").style.backgroundColor = "#F1F1F1FF";
    
    if (currentSlide >= 1){
      var elem = document.getElementById("bar");
      elem.style.width = currentSlide/11*100 + '%';
    }

    /*function frame() {
      if (width < currentSlide*10) {
        width = width+1;
        elem.style.width = width + '%';
      }
    }*/
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
    var elem = document.getElementById("bar");
    elem.style.width = currentSlide/11*100 + '%';

  
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const startButton = document.getElementById("start");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  startButton.addEventListener("click", showNextSlide);
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

