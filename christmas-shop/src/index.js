import { Gift } from "./js/Gift";

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

const removeSelectedTabs = () => {
  let tabs = document.querySelectorAll(".gifts__tabs .tab");
  tabs.forEach((tab) => {
    tab.classList.remove("tab_selected");
  });
};

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
  generateArticles(data).forEach((article) => {
    strategiesWrapper.append(article.generateArticle());
  });

  addStrategyClickHandler();
};

const getGiftsContainer = () => {
  const strategiesConstainer = document.querySelector(".strategy-wrapper");
  strategiesConstainer.innerHTML = "";
  return strategiesConstainer;
};
