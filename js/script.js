document
  .getElementById("theme-toggle-icon")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");

    const isDark = document.body.classList.contains("dark-theme");
    document.getElementById("theme-toggle-icon").src = isDark
      ? "img/sun_icon.png"
      : "img/moon_icon.png";

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

window.addEventListener("DOMContentLoaded", (event) => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    document.body.classList.add(theme + "-theme");
    document.getElementById("theme-toggle-icon").src =
      theme === "dark" ? "img/sun_icon.png" : "img/moon_icon.png";
  } else {
    document.body.classList.add("light-theme");
    document.getElementById("theme-toggle-icon").src = "img/moon_icon.png";
  }

  $(".hobby-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
});

// Drag-and-drop functionality for skills and achievements
function handleDragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", e.target.innerHTML);
  e.target.classList.add("dragging");
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  const draggedElement = document.querySelector(".dragging");
  if (draggedElement !== e.target) {
    draggedElement.innerHTML = e.target.innerHTML;
    e.target.innerHTML = e.dataTransfer.getData("text/plain");
  }
  return false;
}

const items = document.querySelectorAll(
  "#skills-list li, #achievements-list li"
);
items.forEach((item) => {
  item.addEventListener("dragstart", handleDragStart, false);
  item.addEventListener("dragend", handleDragEnd, false);
  item.addEventListener("dragover", handleDragOver, false);
  item.addEventListener("drop", handleDrop, false);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const offset = 60; // Ajuste para el desplazamiento del navbar

    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: "smooth",
    });
  });
});
