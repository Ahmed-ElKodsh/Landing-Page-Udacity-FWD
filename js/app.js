/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/******************* Global Variables *******************/

// Select section tags
const sections = document.querySelectorAll("section");
// select navbar class
const navbar = document.querySelector(".navbar__menu");
const navbarUl = document.getElementById("navbar__list");
// select hamburger menu
const hamburger = document.querySelector(".hamburger");
// select Navbar__list ids
const ul = document.querySelector("#navbar__list");
// select a elements
const a = document.getElementsByTagName("a");
// select scroll-to-the-top button
const mybutton = document.getElementById("myBtn");
// select collapsible
const collaps = document.getElementsByClassName("collapsible");

/******************* Add Responsive Navigation bar & Mobile Hamburger Menu *******************/

// listen to click on hamburger menu
hamburger.addEventListener("click", function () {
  // toggle the active class from the classlist
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
  navbarUl.classList.toggle("active");
});

/******************* Build Navigation bar dynamically using Javacsript  *******************/

// create fragment to enhance performance
const fragment = document.createDocumentFragment();

// loop through sections
for (let sect of sections) {
  // create li element
  let li = document.createElement("li");
  // Create anchor tag
  const a = document.createElement("a");

  // get the data-nav attribute of every section
  let dataNav = sect.dataset.nav;
  let dataId = sect.id;

  // add text, class to each a inside li
  a.setAttribute("href", "#" + dataId);
  a.classList.add(dataId);
  a.innerHTML = dataNav;
  li.appendChild(a);

  // append each li to the fragment
  fragment.appendChild(li);
}
// append the fragment to the ul
ul.appendChild(fragment);

/********** Add class 'active' to section & anchor when intersects with the current viewport *********/

// initiate IntersectionObserver
let observer = new IntersectionObserver(
  function (entries, observer) {
    // for each entry that could be intersecting with current viewport
    entries.forEach(entry => {
      // select the related anchor tag
      let a = document.querySelector(`a[href="#${entry.target.id}"]`);
      // if entry section is intersecting with the current viewport
      if (entry.isIntersecting) {
        // then add "your-active class" to entry section classlist
        entry.target.classList.add("your-active-class");
        // and add "your-active class" to anchor element classlist
        a.classList.add("your-active-class");
      } else {
        // else remove the "your-active-class" class from the classlists
        entry.target.classList.remove("your-active-class");
        a.classList.remove("your-active-class");
      }
    });
  },
  // happening when 30% of section is intersecting with the viewport
  { threshold: 0.1 }
);
// loop through the sections
for (sect of sections) {
  // and observe the action
  observer.observe(sect);
}

/******************* when tag anchor is clicked, then smooth scroll to the related section *******************/

// select all anchor elements with id # tags
document.querySelectorAll('a[href^="#"]').forEach(event => {
  // listen to click events
  event.addEventListener("click", e => {
    // prevent the default scroll action
    e.preventDefault();
    // select the section1 without the starting #
    const tagId = e.target.getAttribute("href").substr(1);
    // select element by the id
    const tagElm = document.getElementById(tagId);
    // scroll into the view smoothly
    tagElm.scrollIntoView({ behavior: "smooth" });
  });
});

/******************* Hide fixed navigation bar while not scrolling *******************/

function showNav() {
  navbar.style.display = "block";
}
function hideNav() {
  navbar.style.display = "none";
}

let timer;
// listen to scroll event
document.addEventListener("scroll", function () {
  // if timer is undefined
  if (timer !== "undefined") {
    // then stop the setTimeout
    clearTimeout(timer);
  }
  // else if timer is defined
  // show the navigation bar
  showNav();
  // set timer to setTimeout event
  timer = setTimeout(function () {
    // then hide the navigation bar
    hideNav();
    // for 3 seconds delay
  }, 3000);
});

/******************* Add button to scroll to the top of the page *******************/

// When the user scrolls down 300px from the top of the document
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    // show the button
    mybutton.style.display = "block";
  } else {
    // else hide the button
    mybutton.style.display = "none";
  }
};

// When the user clicks on the button
function toThetopFunction() {
  // smooth scroll to the top of the document
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/******************* Make sections collapsible *******************/

// for (i = 0; i < collaps.length; i++) {
//   // listen to click on collapsible bars
//   collaps[i].addEventListener("click", function () {
//     // toggle the active class
//     this.classList.toggle("active");
//     // select the content of the collapsible as the next sibling
//     let content = this.nextElementSibling;
//     // change display according to current one
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }
