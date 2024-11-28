export const handleBurgerMenu = () => {
  const hamburger = document.querySelector(".hamburger");
  const navigation = document.querySelector(".header__navigation");
  const navigationLinks = document.querySelector(".navigation");

  hamburger.addEventListener("click", () => {
    navigation.classList.toggle("active");
    hamburger.classList.toggle("active");
    document.body.classList.toggle("scroll-off");
  });

  const hideNavigationPanel = (e) => {
    const link = e.target;
    if (link.closest(".navigation__link") || link.closest(".navigation")) {
      navigation.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.classList.remove("scroll-off");
    }
  };

  navigationLinks.addEventListener("click", hideNavigationPanel);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navigation.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.classList.remove("scroll-off");
    }
  });
};
