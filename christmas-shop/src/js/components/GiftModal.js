import { Modal } from "./Modal";
import giftForWork from "../../img/gifts/gift-for-work.png";
import giftForHealth from "../../img/gifts/gift-for-health.png";
import giftForHarmony from "../../img/gifts/gift-for-harmony.png";

const images = {
  work: giftForWork,
  harmony: giftForHarmony,
  health: giftForHealth,
};

const categoryTags = {
  "For Work": "work",
  "For Health": "health",
  "For Harmony": "harmony",
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
    const categoryTag = categoryTags[this.category];

    giftModalContent += `<div class="gift-modal__image"><img src="${images[categoryTag]}" alt="gift for ${categoryTag}"></div>`;

    if (this.name || this.category || this.description || this.superpowers) {
      giftModalContent += `<div class="gift-modal__content">`;
      giftModalContent += `<div class="gift-modal__information">`;

      this.category &&
        (giftModalContent += `<h4 class="gift__category gift__category--work">${this.category}</h4>`);

      this.name &&
        (giftModalContent += `<h3 class="gift__name">${this.name}</h3>`);

      this.description &&
        (giftModalContent += `<p class="gift__description">${this.description}</p>`);

      giftModalContent += `</div> <div class="gift-modal__superpowers"><h4>Adds superpowers to:</h4>`;

      if (this.superpowers) {
        giftModalContent += `<div class="superpowers-container">`;

        for (const key in this.superpowers) {
          if (this.superpowers.hasOwnProperty(key)) {
            const points = parseInt(this.superpowers[key], 10);

            giftModalContent += `<div class="superpower">
                            <p class="superpower__name">${this.capitalizeFirstLetter(
                              key
                            )}</p>
                            <p class="superpower__points">${points}</p>
                            <div class="superpower__showflakes">
                                ${"<span class='ico-modal ico_snowflake'></span>".repeat(
                                  points / 100
                                )}
                                ${"<span class='ico-modal ico_snowflake-transparent'></span>".repeat(
                                  5 - points / 100
                                )}
                            </div>
                        </div>`;
          }
        }

        giftModalContent += `</div>`;
      }
      giftModalContent += `</div>
      </div>`;
    }

    return giftModalContent;
  }

  renderModal() {
    let content = this.generateContent();
    super.buildModal(content);
  }

  capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
