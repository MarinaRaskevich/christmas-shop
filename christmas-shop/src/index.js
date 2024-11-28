import { renderGiftsToDom } from "./js/modules/gifts.js";
import { addTabsClickHandler } from "./js/modules/tabs.js";
import { initializeSlider, resetSlider } from "./js/modules/slider.js";
import { updateTimer } from "./js/modules/timer.js";
import { handleBurgerMenu } from "./js/modules/burgerMenu.js";
import { handleScrollBackToTop } from "./js/modules/utils.js";
import data from "./json/gifts.json";

const bodyId = document.body.id;

window.onload = function () {
  renderGiftsToDom(data, bodyId);
  handleBurgerMenu();

  if (bodyId === "gifts") {
    addTabsClickHandler();
    handleScrollBackToTop();
  }

  if (bodyId === "home") {
    initializeSlider();
    setInterval(updateTimer, 1000);
    window.addEventListener("resize", resetSlider);
  }
};
