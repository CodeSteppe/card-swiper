class Card {
  constructor({ imageUrl }) {
    this.imageUrl = imageUrl;
    this.#init();
  }

  // private properties
  #startPoint;

  #init = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = this.imageUrl;
    card.append(img);
    // event listeners
    // mouse events
    card.addEventListener('mousedown', (e) => {
      console.log('mousedown');
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY }
      document.addEventListener('mousemove', this.#handleMove);
      this.element.style.transition = '';
    });

    document.addEventListener('mouseup', this.#handleMoveEnd);
    card.addEventListener('dragstart', (e) => {
      e.preventDefault();
    })
    // touch events

    this.element = card;
  }

  #handleMove = (e) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    const deltaX = clientX - this.#startPoint.x;
    const deltaY = clientY - this.#startPoint.y;
    const rotate = deltaX / window.innerWidth * 90;
    this.element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotate}deg)`;
  }

  #handleMoveEnd = (e) => {
    this.#startPoint = null;
    this.element.removeEventListener('mousemove', this.#handleMove);
    this.element.style.transition = 'transform 0.5s';
    this.element.style.transform = '';
  }
}