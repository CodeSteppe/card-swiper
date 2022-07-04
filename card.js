class Card {
  constructor({
    imageUrl,
    onDismiss
  }) {
    this.imageUrl = imageUrl;
    this.onDismiss = onDismiss;
    this.#init();
  }

  // private properties
  #startPoint;
  #offsetX;
  #offsetY;

  #init = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = this.imageUrl;
    card.append(img);
    // event listeners
    // mouse events
    card.addEventListener('mousedown', (e) => {
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('mousemove', this.#handleMove);
      this.element.style.transition = '';
    });

    document.addEventListener('mouseup', this.#handleMoveEnd);

    card.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
    // touch events

    this.element = card;
  }

  #handleMove = (e) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#offsetX = clientX - this.#startPoint.x;
    this.#offsetY = clientY - this.#startPoint.y;
    const rotate = this.#offsetX * 0.1;
    this.element.style.transform = `translate(${this.#offsetX}px, ${this.#offsetY}px) rotate(${rotate}deg)`;
    // dismiss card
    if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    }
  }

  #handleMoveEnd = () => {
    this.#startPoint = null;
    document.removeEventListener('mousemove', this.#handleMove);
    this.element.style.transition = 'transform 0.5s';
    this.element.style.transform = '';
  }

  #dismiss = (direction) => {
    this.#startPoint = null;
    document.removeEventListener('mouseup', this.#handleMoveEnd);
    document.removeEventListener('mousemove', this.#handleMove);
    this.element.style.transition = 'transform 0.5s';
    this.element.style.transform = `translate(${direction * window.innerWidth}px, ${this.#offsetY}px) rotate(${45 * direction}deg)`;
    setTimeout(() => {
      this.element.remove();
      if (typeof this.onDismiss === 'function') {
        this.onDismiss();
      }
    }, 500);
  }
}