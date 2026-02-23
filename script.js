// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");
var atom = document.getElementById("atom_logo_navbar");
var topLink = document.getElementById("logoToTop");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove  "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    atom.classList.add("fade-in");
    atom.classList.remove("fade-out");
    topLink.classList.remove("disabledLink");
  } else {
    navbar.classList.remove("sticky");
    atom.classList.add("fade-out");
    atom.classList.remove("fade-in");
    topLink.classList.add("disabledLink");
  }
}

// gallery slide
document.querySelectorAll('.slideshow-container').forEach(container => {
  let slides = container.querySelectorAll('.slide');
  let dotsContainer = container.querySelector('.dots');
  let index = 0;

  // Create dots
  slides.forEach((_, i) => {
    let dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
      index = i;
      showSlide();
    });
    dotsContainer.appendChild(dot);
  });

  let dots = dotsContainer.querySelectorAll('.dot');

  function showSlide() {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  showSlide();

  // Arrow controls
  container.querySelector('.prev').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide();
  };

  container.querySelector('.next').onclick = () => {
    index = (index + 1) % slides.length;
    showSlide();
  };

  // Touch swipe support
  let startX = 0;

  container.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next
        index = (index + 1) % slides.length;
      } else {
        // Swipe right → prev
        index = (index - 1 + slides.length) % slides.length;
      }
      showSlide();
    }
  });
});