import { Gift } from "../components/Gift.js";
import { GiftModal } from "../components/GiftModal.js";
import { shuffleElementsInArray } from "./utils.js";

export const renderGiftsToDom = (data, bodyId) => {
  const giftsContainer = getGiftsContainer();
  let shuffledData = shuffleElementsInArray(data);

  if (bodyId === "home") {
    shuffledData = shuffledData.slice(0, 4);
  }

  generateGifts(shuffledData).forEach((gift) => {
    giftsContainer.append(gift.generateGiftCard());
  });

  addGiftClickHandler(data);
};

const getGiftsContainer = () => {
  const giftsContainer = document.querySelector(".gifts-container");
  giftsContainer.innerHTML = "";
  return giftsContainer;
};

const generateGifts = (data) => data.map((gift) => new Gift(gift));

const addGiftClickHandler = (data) => {
  document.querySelector(".gifts-container").addEventListener("click", (e) => {
    if (e.target.closest(".gift")) {
      const clickedGiftName = e.target
        .closest(".gift")
        .getAttribute("data-name");
      const clickedGiftData = data.find(
        (gift) => gift.name === clickedGiftName
      );
      renderGiftModal(clickedGiftData);
    }
  });
};

const renderGiftModal = (giftData) => {
  const modal = new GiftModal("gift-modal", giftData);
  modal.renderModal();
};
