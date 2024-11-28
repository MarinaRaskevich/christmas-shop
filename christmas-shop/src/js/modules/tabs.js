export const addTabsClickHandler = () => {
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
  tabs.forEach((tab) => tab.classList.remove("tab_selected"));
};

const selectClickedTab = (clickedTab) => {
  clickedTab.classList.add("tab_selected");
};

const showAllGifts = () => {
  document.querySelectorAll(".gifts-container .gift").forEach((gift) => {
    gift.classList.remove("gift_hidden");
  });
};

const filterGiftsBySelectedTab = (selectedTab) => {
  document.querySelectorAll(".gifts-container .gift").forEach((gift) => {
    gift.classList.add("gift_hidden");
    if (gift.getAttribute("data-tab") === selectedTab) {
      gift.classList.remove("gift_hidden");
    }
  });
};
