import giftForWork from "../img/gifts/gift-for-work.png";
import giftForHealth from "../img/gifts/gift-for-health.png";
import giftForHarmony from "../img/gifts/gift-for-harmony.png";

const images = {
  work: giftForWork,
  harmony: giftForHarmony,
  health: giftForHealth,
};

export class Gift {
  constructor({ name, description, category, ...rest }) {
    this.name = name;
    this.description = description;
    this.category = category;
  }

  // Article generator
  generateGiftCard() {
    let template = "";
    let gift = document.createElement("div");
    gift.classList.add("gift");
    gift.setAttribute("data-name", this.name);

    let categoryTag;
    switch (this.category) {
      case "For Work":
        categoryTag = "work";
        break;

      case "For Health":
        categoryTag = "health";
        break;

      case "For Harmony":
        categoryTag = "harmony";
        break;
    }

    gift.setAttribute("data-tab", categoryTag);

    template += `<div class="gift__image"><img src="${images[categoryTag]}" alt="gift for ${categoryTag}"></div>`;

    template += `<div class="gift__content">
                  <h4 class="gift__category gift__category--${categoryTag}">
                    ${this.category}
                  </h4>
                  <h3 class="gift__name">${this.name}</h3>
                </div>`;

    gift.innerHTML = template;
    return gift;
  }
}
