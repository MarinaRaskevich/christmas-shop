export const handleScrollBackToTop = () => {
  const backToTopButton = document.querySelector(".back-to-top");

  const toggleBackToTopVisibility = () => {
    if (window.innerWidth <= 768) {
      if (window.scrollY <= 100) {
        backToTopButton.classList.add("back-to-top_hidden");
      }
    } else {
      backToTopButton.classList.add("back-to-top_hidden");
    }
  };

  toggleBackToTopVisibility();

  window.addEventListener("resize", toggleBackToTopVisibility);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100 && window.innerWidth <= 768) {
      backToTopButton.classList.remove("back-to-top_hidden");
    } else {
      backToTopButton.classList.add("back-to-top_hidden");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

export const shuffleElementsInArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
