// aos animations
AOS.init();

// smooth scroll
let mainNavLinks = document.querySelectorAll("nav ul li a");

mainNavLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    let target = document.querySelector(event.target.hash);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

let i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;

// typewriter welcome section
let textArray = [
  "|WEB DEVELOPER",
  "|ARTIFICIAL INTELLIGENCE STUDENT",
  "|ANDROID DEVELOPMENT ENTHUSIAST",
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
        setTimeout(function() {
          typeWriter(id, ar);
        }, speedBetweenLines);

      } else {

        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function() {
          typeWriter(id, ar);
        }, speedForward);
      }

    } else if (i == aString.length) {

      isBackspacing = true;
      setTimeout(function() {
        typeWriter(id, ar);
      }, speedWait);

    }

  } else {

    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {

      if (eParagraph.text().length > 0) {
        eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("font-weight-light");
        eHeader.addClass("font-weight-light");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function() {
        typeWriter(id, ar);
      }, speedBackspace);


    } else {

      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length;
      setTimeout(function() {
        typeWriter(id, ar);
      }, 50);

    }
  }
}

// bubbles


// work section
function openWork(evt, works) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(works).style.display = "block";
  evt.currentTarget.className += " active";
  if (works === "Skills" && document.getElementById(works).style.display === "block") {
    $(".skillbar").each(function() {
      $(this)
        .find(".skillbar-bar")
        .animate({
            width: $(this).attr("data-percent")
          },
          2500)

    });

  }
}

// certifications section
function toggleFunction(evt, certifications) {
  let i, tabcontentc, tablinksc;
  tabcontentc = document.getElementsByClassName("tabcontent-c");
  for (i = 0; i < tabcontentc.length; i++) {
    tabcontentc[i].style.display = "none";
  }
  tablinksc = document.getElementsByClassName("tablinks-c");
  for (i = 0; i < tablinksc.length; i++) {
    tablinksc[i].className = tablinksc[i].className.replace(" active", "");
  }
  document.getElementById(certifications).style.display = "block";
  evt.currentTarget.className += " active";
  }
