import { Gift } from "./js/Gift.js";
import { GiftModal } from "./js/GiftModal.js";
import data from "./json/gifts.json";

window.onload = function () {
  const bodyId = document.body.id;
  if (bodyId === "gifts") {
    // Render gifts
    renderGiftsToDom();
    // Tabs
    addTabsClickHandler();
  }

  if (bodyId === "home") {
    addArticles();
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
  const shuffledData = shuffleCards(data);
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
