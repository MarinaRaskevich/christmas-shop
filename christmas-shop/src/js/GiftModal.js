import { Modal } from "./Modal";
import giftForWork from "../img/gifts/gift-for-work.png";
import giftForHealth from "../img/gifts/gift-for-health.png";
import giftForHarmony from "../img/gifts/gift-for-harmony.png";

const images = {
  work: giftForWork,
  harmony: giftForHarmony,
  health: giftForHealth,
};

export class GiftModal extends Modal {
  constructor(classes, { name, description, category, superpowers }) {
    super(classes);
    this.name = name;
    this.category = category;
    this.description = description;
    this.superpowers = superpowers;
  }

  generateContent() {
    let giftModalContent = "";
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

    giftModalContent += `<div class="gift-modal__image"><img src="${images[categoryTag]}" alt="gift for ${categoryTag}"></div>`;

    if (this.name || this.category || this.description || this.superpowers) {
      giftModalContent += `<div class="gift-modal__content">`;
      giftModalContent += `<div class="gift__content">`;

      this.category &&
        (giftModalContent += `<h4 class="gift__category gift__category--work">${this.category}</h4>`);

      this.name &&
        (giftModalContent += `<h3 class="gift__name">${this.name}</h3>`);

      this.description &&
        (giftModalContent += `<p class="gift__description">${this.description}</p>`);

      giftModalContent += `</div>`;
      giftModalContent += `<div class="gift__superpowers"><h4>Adds superpowers to:</h4>`;

      if (this.superpowers) {
        giftModalContent += `<div class="superpowers-container">`;

        for (const key in this.superpowers) {
          if (this.superpowers.hasOwnProperty(key)) {
            giftModalContent += `<div class="superpower">`;
            giftModalContent += `<p class="superpower__name">${this.capitalizeFirstLetter(
              key
            )}</p>`;
            giftModalContent += `<p class="superpower__points">${this.superpowers[key]}</p>`;
            giftModalContent += `<div class="superpower__showflakes">`;
            const points = parseInt(this.superpowers[key], 10);
            for (let index = 0; index < 500; index += 100) {
              if (points - index > 0) {
                giftModalContent += `<span class="ico-modal ico-snowflake"></span>`;
              } else {
                giftModalContent += `<span class="ico-modal ico_snowflake-transparent"></span>`;
              }
            }
            giftModalContent += `</div>`;
            giftModalContent += `</div>`;
          }
        }

        giftModalContent += `</div>`;
      }
      giftModalContent += `</div>`;
      giftModalContent += `</div>`;
    }

    return giftModalContent;
  }

  renderModal() {
    let content = this.generateContent();
    console.log(content);
    super.buildModal(content);
  }

  capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
