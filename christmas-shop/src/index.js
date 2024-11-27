import { Gift } from "./js/Gift.js";
import { GiftModal } from "./js/GiftModal.js";
import data from "./json/gifts.json";

const bodyId = document.body.id;

window.onload = function () {
  renderGiftsToDom();

  if (bodyId === "gifts") {
    // Tabs
    addTabsClickHandler();

    if (window.innerWidth <= 768) {
      handleScrollBackToTop();
    }
  }

  if (bodyId === "home") {
    // updateTimer();
    initializeSlider();
    setInterval(updateTimer, 1000);
    window.addEventListener("resize", () => {
      resetSlider();
    });
  }
};

const addTabsClickHandler = () => {
  document.querySelector(".gifts__tabs").addEventListener("click", (e) => {
    if (e.target.classList.contains("tab")) {
      let clickedTab = e.target;
      removeSelectedTabs();
      selectClickedTab(clickedTab);
      if (clickedTab.classList.contains("tab--all")) {
        showAllGifts();
      } else {
        filterGiftsBySelectedTab(clickedTab.getAttribute("data-tab"));
      }
    }
  });
};

//Remove class "tab_selected" from tab
const removeSelectedTabs = () => {
  let tabs = document.querySelectorAll(".gifts__tabs .tab");
  tabs.forEach((tab) => {
    tab.classList.remove("tab_selected");
  });
};

//Add class "tab_selected" to tab
const selectClickedTab = (clickedTab) => {
  clickedTab.classList.add("tab_selected");
};

const showAllGifts = () => {
  let gifts = document.querySelectorAll(".gifts-container .gift");
  gifts.forEach((gifts) => {
    gifts.classList.remove("gift_hidden");
  });
};

const filterGiftsBySelectedTab = (selectedTab) => {
  let gifts = document.querySelectorAll(".gifts-container .gift");
  gifts.forEach((gift) => {
    gift.classList.add("gift_hidden");
    if (gift.getAttribute("data-tab") === selectedTab) {
      gift.classList.remove("gift_hidden");
    }
  });
};

const renderGiftsToDom = () => {
  let giftsContainer = getGiftsContainer();
  let shuffledData = shuffleCards(data);
  // If it's home page, we have only first 4 cards
  if (bodyId === "home") {
    shuffledData = shuffledData.slice(0, 4);
  }
  generateGifts(shuffledData).forEach((gift) => {
    giftsContainer.append(gift.generateGiftCard());
  });

  addGiftClickHandler();
};

const getGiftsContainer = () => {
  const giftsContainer = document.querySelector(".gifts-container");
  giftsContainer.innerHTML = "";
  return giftsContainer;
};

const generateGifts = (data) => {
  let gifts = [];
  data.forEach((gift) => {
    gifts.push(new Gift(gift));
  });
  return gifts;
};

const shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const addGiftClickHandler = () => {
  document.querySelector(".gifts-container").addEventListener("click", (e) => {
    if (e.target.closest(".gift")) {
      let clickedGiftName = e.target.closest(".gift").getAttribute("data-name");
      let clickedGiftData = getClickedData(clickedGiftName);

      renderGiftModal(clickedGiftData);
    }
  });
};

const getClickedData = (name) => {
  return data.find((gift) => gift.name == name);
};

const renderGiftModal = (giftData) => {
  let modal = new GiftModal("gift-modal", giftData);
  modal.renderModal();
};

// Back to top button
const handleScrollBackToTop = () => {
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
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

// Timer
const calculateTimeLeft = () => {
  const nowTs = new Date();
  let christmasTs = new Date(Date.UTC(nowTs.getUTCFullYear(), 11, 31, 0, 0, 0));

  if (nowTs > christmasTs) {
    christmasTs.setUTCFullYear(christmasTs.getUTCFullYear() + 1);
  }

  const timeDifference = christmasTs - nowTs;
  const totalSeconds = Math.floor(timeDifference / 1000);

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

const updateTimeNumbers = ({ days, hours, minutes, seconds }) => {
  document.querySelector(".timer__number--days").textContent = days;
  document.querySelector(".timer__number--hours").textContent = hours;
  document.querySelector(".timer__number--minutes").textContent = minutes;
  document.querySelector(".timer__number--seconds").textContent = seconds;
};

const updateTimer = () => {
  const timeLeft = calculateTimeLeft();
  updateTimeNumbers(timeLeft);
};

//slider
const updateClickNumbers = () => {
  return window.innerWidth > 768 ? 3 : 6;
};

const calculateClickLength = () => {
  const sliderRow = document.querySelector(".slider__row");
  const sliderTrack = document.querySelector(".slider__track");

  // Total width of the slider
  const totalWidth = sliderTrack.offsetWidth;

  // Visible area
  const visibleWidth = sliderRow.offsetWidth;

  //Click numbers
  const clickNumbers = updateClickNumbers();

  return (totalWidth - visibleWidth) / clickNumbers;
};

let currentIndex = 0;
let clickLength = calculateClickLength();

const initializeSlider = () => {
  const sliderTrack = slider.querySelector(".slider__track");
  const leftArrow = slider.querySelector(".slider-arrow__left");
  const rightArrow = slider.querySelector(".slider-arrow__right");

  updateArrowStates(currentIndex);

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

const moveSlider = (sliderTrack, clickLength, direction) => {
  if (direction === "left" && currentIndex > 0) {
    currentIndex--;
  } else if (direction === "right") {
    currentIndex++;
  }

  sliderTrack.style.transform = `translateX(-${currentIndex * clickLength}px)`;

  updateArrowStates(currentIndex);
};

const updateArrowStates = (currentIndex) => {
  const leftArrow = slider.querySelector(".slider-arrow__left");
  const rightArrow = slider.querySelector(".slider-arrow__right");
  const clickNumbers = updateClickNumbers();

  if (currentIndex < 1) {
    leftArrow.classList.add("slider-arrow_inactive");
  } else {
    leftArrow.classList.remove("slider-arrow_inactive");
  }

  if (currentIndex >= clickNumbers) {
    rightArrow.classList.add("slider-arrow_inactive");
  } else {
    rightArrow.classList.remove("slider-arrow_inactive");
  }
};

const resetSlider = () => {
  const sliderTrack = slider.querySelector(".slider__track");
  currentIndex = 0;
  sliderTrack.style.transform = `translateX(0px)`;
  clickLength = calculateClickLength();
  updateArrowStates(currentIndex);
};

//burger menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navigation = document.querySelector(".header__navigation");
  const links = document.querySelectorAll(".navigation a");

  // Toggle menu on hamburger click
  hamburger.addEventListener("click", () => {
    navigation.classList.toggle("active");
    hamburger.classList.toggle("active");
    document.body.classList.add("scroll-off");
  });

  // Close menu on link click
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
      hamburger.classList.remove("active");

      document.body.classList.remove("scroll-off");
    });
  });

  // Close menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navigation.classList.remove("active");
      hamburger.classList.remove("active");

      document.body.classList.remove("scroll-off");
    }
  });
});
