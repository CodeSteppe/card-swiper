document.addEventListener('touchstart', (e) => {
  console.log('touchstart', e);
  [...e.changedTouches].forEach(touch => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.top = `${touch.pageY}px`;
    dot.style.left = `${touch.pageX}px`;
    dot.id = touch.identifier;
    document.body.append(dot);
  });
});

document.addEventListener('touchmove', (e) => {
  [...e.changedTouches].forEach(touch => {
    const dot = document.getElementById(touch.identifier);
    if (dot) {
      dot.style.top = `${touch.pageY}px`;
      dot.style.left = `${touch.pageX}px`;
    }
  });
});

document.addEventListener('touchend', (e) => {
  [...e.changedTouches].forEach(touch => {
    const dot = document.getElementById(touch.identifier);
    if (dot) {
      dot.remove();
    }
  });
});

document.addEventListener('cancel', (e) => {
  [...e.changedTouches].forEach(touch => {
    const dot = document.getElementById(touch.identifier);
    if (dot) {
      dot.remove();
    }
  });
});