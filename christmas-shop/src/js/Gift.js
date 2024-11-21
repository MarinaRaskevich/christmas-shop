export class Gift {
  constructor({ name, description, category, superpowers, ...rest }) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.superpowers = superpowers;
  }

  // Article generator
  generateGift() {
    let template = "";
    let gift = document.createElement("div");
    gift.classList.add("gift");
    //gift.setAttribute("data-id", this.id);

    let categoryTag;
    switch (this.category) {
      case "For Work":
        template += `<div class="gift__image"><img src="src/img/gifts/gift-for-work.png" alt="gift for work"></div>`;
        categoryTag = "work";
        break;

      case "For Health":
        template += `<div class="gift__image"><img src="src/img/gifts/gift-for-health.png" alt="gift for health"></div>`;
        categoryTag = "health";
        break;

      case "For Harmony":
        template += `<div class="gift__image"><img src="src/img/gifts/gift-for-harmony.png" alt="gift for harmony"></div>`;
        categoryTag = "harmony";
        break;
    }

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
