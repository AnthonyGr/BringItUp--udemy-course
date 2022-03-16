import Slider from "./slider";

export default class SliderMini extends Slider {
  constructor(container, next, prev, activeClass, animate, autoPlay) {
    super(container, next, prev, activeClass, animate, autoPlay);
  }

  decorizeSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
      }
    });

    this.slides[0].classList.add(this.activeClass);

    if (this.animate) {
      console.log("e");
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  nextSlide() {
    this.container.appendChild(this.slides[0]);
    while (this.slides[0].tagName === "BUTTON") {
      this.container.appendChild(this.slides[0]);
    }
    this.decorizeSlides();
  }

  bindTriggers() {
    this.next.addEventListener("click", () => this.nextSlide());

    this.prev.addEventListener("click", () => {
      let active = this.slides[this.slides.length - 1];
      this.container.insertBefore(active, this.slides[0]);

      while (this.slides[0].tagName === "BUTTON") {
        active = this.slides[this.slides.length - 1];
        this.container.insertBefore(active, this.slides[0]);
      }
      this.decorizeSlides();
    });
  }

  init() {
    this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
    `;

    this.bindTriggers();
    this.decorizeSlides();

    if (this.autoPlay) {
      setInterval(() => this.nextSlide(), 2000);
    }
  }
}
