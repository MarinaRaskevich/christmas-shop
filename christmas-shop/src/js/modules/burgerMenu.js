export const handleBurgerMenu = () => {
  const hamburger = document.querySelector(".hamburger");
  const navigation = document.querySelector(".header__navigation");
  const links = document.querySelectorAll(".navigation__link");

  hamburger.addEventListener("click", () => {
    navigation.classList.toggle("active");
    hamburger.classList.toggle("active");
    document.body.classList.toggle("scroll-off");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.classList.remove("scroll-off");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navigation.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.classList.remove("scroll-off");
    }
  });
};
