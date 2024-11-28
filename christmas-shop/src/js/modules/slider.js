let currentIndex = 0;
let clickLength = 0;

export const initializeSlider = () => {
  const sliderTrack = document.querySelector(".slider__track");
  const leftArrow = document.querySelector(".slider-arrow__left");
  const rightArrow = document.querySelector(".slider-arrow__right");

  updateArrowStates(currentIndex);
  clickLength = calculateClickLength();

  leftArrow.addEventListener("click", () => {
    if (!leftArrow.classList.contains("slider-arrow_inactive")) {
      moveSlider(sliderTrack, clickLength, "left");
    }
  });

  rightArrow.addEventListener("click", () => {
    if (!rightArrow.classList.contains("slider-arrow_inactive")) {
      moveSlider(sliderTrack, clickLength, "right");
    }
  });
};

const calculateClickLength = () => {
  const sliderRow = document.querySelector(".slider__row");
  const sliderTrack = document.querySelector(".slider__track");

  const totalWidth = sliderTrack.offsetWidth;
  const visibleWidth = sliderRow.offsetWidth;

  return (totalWidth - visibleWidth) / updateClickNumbers();
};

const moveSlider = (sliderTrack, clickLength, direction) => {
  if (direction === "left" && currentIndex > 0) currentIndex--;
  else if (direction === "right") currentIndex++;

  sliderTrack.style.transform = `translateX(-${currentIndex * clickLength}px)`;
  updateArrowStates(currentIndex);
};

const updateArrowStates = (currentIndex) => {
  const leftArrow = document.querySelector(".slider-arrow__left");
  const rightArrow = document.querySelector(".slider-arrow__right");

  const clickNumbers = updateClickNumbers();

  currentIndex < 1
    ? leftArrow.classList.add("slider-arrow_inactive")
    : leftArrow.classList.remove("slider-arrow_inactive");

  currentIndex >= clickNumbers
    ? rightArrow.classList.add("slider-arrow_inactive")
    : rightArrow.classList.remove("slider-arrow_inactive");
};

export const resetSlider = () => {
  currentIndex = 0;
  document.querySelector(".slider__track").style.transform = `translateX(0px)`;
  clickLength = calculateClickLength();
  updateArrowStates(currentIndex);
};

const updateClickNumbers = () => (window.innerWidth > 768 ? 3 : 6);
