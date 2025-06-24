// Show popup message
function showMessage(message) {
  const messageDiv = document.createElement("div");

  Object.assign(messageDiv.style, {
    fontFamily: "MonaSansExpanded",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#080a0f52",
    backdropFilter: "blur(10px)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    zIndex: "1000",
    opacity: "0",
    transition: "opacity 0.5s ease-in-out"
  });

  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    messageDiv.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(messageDiv);
    }, 500);
  }, 3000);
}

// On page load
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-section");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-section li a");

  // Sticky header on scroll
  window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 100);
  });

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });

  // Close mobile menu on link click
  document.querySelectorAll(".nav-section a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      body.classList.remove("no-scroll");
    });
  });

  // Recheck sticky header on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      header.classList.remove("sticky");
    } else if (window.scrollY > 50) {
      header.classList.add("sticky");
    }
  });

  // Highlight active link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    document.querySelectorAll("section").forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
      if (current === "" && link.getAttribute("href") === "#") {
        link.classList.add("active");
      }
    });
  });

  // Spinning text animation
  const spinningText = document.getElementById("Spinning-Text");
  if (spinningText) {
    const words = [
      "Arpit Jadhao",
      "Data Analyst",
      "Aspiring Data Scientist",
      "Python Developer",
      "Web Developer",
      "Tech Learner",
      "AI/ML Explorer"
    ];
    let currentIndex = 0;
    spinningText.textContent = words[0];

    const animate = () => {
      spinningText.style.animation = "textFadeOut 0.5s forwards ease";
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        spinningText.textContent = words[currentIndex];
        spinningText.style.animation = "textFadeIn 0.5s forwards ease";
      }, 500);
    };

    setInterval(animate, 3000);
  }
});

// Footer/plasenta links — temporary notice
["plasenta-footer", "plasenta"].forEach(id => {
  document.getElementById(id).addEventListener("click", function (event) {
    event.preventDefault();
    showMessage("Plasenta.com is still under development.");
  });
});
