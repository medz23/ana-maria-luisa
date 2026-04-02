// Init AOS animations
AOS.init();

// Smooth scroll
let mainNavLinks = document.querySelectorAll("nav ul li a");
mainNavLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    let target = document.querySelector(event.target.hash);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Typewriter Welcome Section
let i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;
let textArray = [
  "|SOFTWARE ENGINEER",
  "|PHD STUDENT IN COMPUTER SCIENCE",
  "|NLP & AI RESEARCHER",
];

let speedForward = 100,
  speedWait = 1000,
  speedBetweenLines = 1000,
  speedBackspace = 25;

typeWriter("lead", textArray);

function typeWriter(id, ar) {
  let element = $("#" + id),
    aString = ar[a],
    eHeader = element.children("h1"),
    eParagraph = element.children("p");

  if (!isBackspacing) {
    if (i < aString.length) {
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("font-weight-light");
        eParagraph.addClass("font-weight-light");
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedBetweenLines);
      } else {
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedForward);
      }
    } else if (i == aString.length) {
      isBackspacing = true;
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedWait);
    }
  } else {
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      if (eParagraph.text().length > 0) {
        eParagraph.text(
          eParagraph.text().substring(0, eParagraph.text().length - 1),
        );
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("font-weight-light");
        eHeader.addClass("font-weight-light");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedBackspace);
    } else {
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length;
      setTimeout(function () {
        typeWriter(id, ar);
      }, 50);
    }
  }
}

// Work Section Tabs
function openWork(evt, works) {
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (let j = 0; j < tabcontent.length; j++) {
    tabcontent[j].style.display = "none";
  }
  let tablinks = document.getElementsByClassName("tablinks");
  for (let j = 0; j < tablinks.length; j++) {
    tablinks[j].className = tablinks[j].className.replace(" active", "");
  }
  document.getElementById(works).style.display = "block";
  evt.currentTarget.className += " active";

  if (
    works === "Skills" &&
    document.getElementById(works).style.display === "block"
  ) {
    $(".skillbar").each(function () {
      $(this)
        .find(".skillbar-bar")
        .animate({ width: $(this).attr("data-percent") }, 2500);
    });
  }
}

// Certifications Section Tabs
function toggleFunction(evt, certifications) {
  let tabcontentc = document.getElementsByClassName("tabcontent-c");
  for (let j = 0; j < tabcontentc.length; j++) {
    tabcontentc[j].style.display = "none";
  }
  let tablinksc = document.getElementsByClassName("tablinks-c");
  for (let j = 0; j < tablinksc.length; j++) {
    tablinksc[j].className = tablinksc[j].className.replace(" active", "");
  }
  document.getElementById(certifications).style.display = "block";
  evt.currentTarget.className += " active";
}

// Generate Background Bubbles Dynamically to keep HTML clean
$(document).ready(function () {
  let container = document.getElementById("bubbles-container");
  for (let j = 0; j < 30; j++) {
    let bubble = document.createElement("div");
    bubble.className = "bubble";
    let size = Math.floor(Math.random() * 60) + 20 + "px"; // Random size 20px-80px
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.left = Math.floor(Math.random() * 100) + "%";
    bubble.style.animationDuration = Math.floor(Math.random() * 6) + 4 + "s";
    bubble.style.animationDelay = Math.floor(Math.random() * 5) + "s";
    container.appendChild(bubble);
  }
});
