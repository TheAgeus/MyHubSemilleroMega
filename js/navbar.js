const burgerIcon = document.getElementById("burgerIcon");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const menuWrapper = document.getElementById("navMenu");

// This is for open the menu in small devices
burgerIcon.addEventListener("click", (e) => {
  menuWrapper.classList.add("show");
  menuWrapper.classList.remove("hidde");
});

// This is for closing that menu
closeMenuBtn.addEventListener("click", (e) => {
  menuWrapper.classList.add("hidde");
  menuWrapper.classList.remove("show");
});