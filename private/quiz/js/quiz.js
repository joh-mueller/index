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
        correctAnswer: "b",
        mapId: 3
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
        correctAnswer: "d",
        mapId: 7
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
        correctAnswer: "c",
        mapId: 4
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
        correctAnswer: "b",
        mapId: 6
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
        correctAnswer: "b",
        mapId: 9
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
        correctAnswer: "c",
        mapId: 11
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
        correctAnswer: "c",
        mapId: 5
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
        correctAnswer: "d",
        mapId: 8
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
        correctAnswer: "a",
        mapId: 2
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
        correctAnswer: "a",
        mapId: 10
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
        correctAnswer: "c",
        mapId: 1
      }
    ];
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const startButton = document.getElementById("start");
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
  
    let currentSlide = 0;
    let numCorrect = 0;
  
    function buildQuiz() {
      const output = [];
  
      myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
  
        for (let letter in currentQuestion.answers) {
          answers.push(
            `<label class="radiobutton">
               <input type="radio" name="question${questionNumber}" value="${letter}" data-question="${questionNumber}">
               <span class="checkmark">${currentQuestion.answers[letter]}</span>
             </label>`
          );
        }
  
        output.push(
          `<div class="slide">
             <div class="intro"> ${currentQuestion.intro}</div>
             <div class="photo"> <img id="pic" src="${currentQuestion.source}"/> </div>
             <div class="info"> ${currentQuestion.info}</div>
             <div class="question">${currentQuestion.question}</div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      let message = "";
  
      if (numCorrect < 5) {
        message = `Oh well: ${numCorrect} out of ${myQuestions.length - 1} correct`;
      } else if (numCorrect < 8) {
        message = `Not bad: ${numCorrect} out of ${myQuestions.length - 1} correct`;
      } else if (numCorrect < 11) {
        message = `Almost perfect: ${numCorrect} out of ${myQuestions.length - 1} correct`;
      } else {
        message = `Outstanding: ${numCorrect} out of ${myQuestions.length - 1} correct`;
      }
  
      resultsContainer.innerHTML = message;
      resultsContainer.scrollIntoView({ behavior: "smooth" });
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
  
      if (currentSlide === 0) {
        previousButton.style.display = "none";
        nextButton.style.display = "none";
        startButton.style.display = "inline-block";
      } else if (currentSlide === 1) {
        previousButton.style.display = "none";
        nextButton.style.display = "inline-block";
        startButton.style.display = "none";
      } else if (currentSlide === 11) {
        nextButton.style.display = "none"; // Hide on final slide
        startButton.style.display = "none";
        // Optional: show results automatically on final slide
      } else {
        nextButton.style.display = "inline-block";
        startButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
        if (window.map) {
          map.flyTo({
            center: [137, -8],
            zoom: 2,
            speed: 0.5
          });
        }
        // Clear highlight layer when moving to next slide
        if (window.map && map.getSource('highlight')) {
          map.getSource('highlight').setData({
            type: "FeatureCollection",
            features: []
          });
        }
      }
  
      // Fortschrittsanzeige
      if (currentSlide >= 1) {
        const elem = document.getElementById("bar");
        elem.style.width = (currentSlide / 11) * 100 + '%';
      }
  
    }
  
    function showPreviousSlide() {
      if (currentSlide > 0) {
        showSlide(currentSlide - 1);
      }
  
      const elem = document.getElementById("bar");
      elem.style.width = (currentSlide / 11) * 100 + '%';
    }
  
    // Quiz anzeigen
    buildQuiz();
    const slides = document.querySelectorAll(".slide");
    showSlide(0);
  
    const answeredQuestions = new Set();
  
    quizContainer.addEventListener("change", function (e) {
      if (e.target.matches("input[type=radio]")) {
        const selected = e.target;
        const questionNumber = parseInt(selected.dataset.question);
        const currentQuestion = myQuestions[questionNumber];
        const answerContainers = quizContainer.querySelectorAll(".answers");
        const answerContainer = answerContainers[questionNumber];
        const allOptions = answerContainer.querySelectorAll("label");
    
        allOptions.forEach(label => {
          label.style.backgroundColor = "";
        });
    
        if (selected.value === currentQuestion.correctAnswer) {
          selected.parentElement.style.backgroundColor = "#DD6E42";
          if (!answeredQuestions.has(questionNumber)) {
            numCorrect++;
            answeredQuestions.add(questionNumber);
          }
        } else {
          selected.parentElement.style.backgroundColor = "#D62246";
          const correctOption = answerContainer.querySelector(`input[value="${currentQuestion.correctAnswer}"]`);
          if (correctOption) {
            correctOption.parentElement.style.backgroundColor = "#DD6E42";
          }
    
          if (!answeredQuestions.has(questionNumber)) {
            answeredQuestions.add(questionNumber);
          }
        }
    
        // ✅ Highlight correct location on the map
        if (currentQuestion.mapId && window.map && window.pointsSource) {
          fetch('./data/spots.geojson')
            .then(res => res.json())
            .then(data => {
              const feature = data.features.find(f => f.properties.id === currentQuestion.mapId);
              if (feature) {
                const [lng, lat] = feature.geometry.coordinates;
                map.flyTo({
                  center: [lng, lat],
                  zoom: 5,
                  speed: 0.8
                  });
                // ✅ Highlight the feature
                const highlightSource = map.getSource('highlight');
                if (highlightSource) {
                  highlightSource.setData({
                    type: "FeatureCollection",
                    features: [feature]
                  });
                }
              }
            });
        }
    
        // ✅ Show results on last slide
        if (questionNumber === myQuestions.length - 1) {
          showResults();
        }
      }
    });
    
  
    // Buttons aktivieren
    startButton.addEventListener("click", showNextSlide);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
