function addElement() {
  const newDiv = document.createElement('div');
  newDiv.id = 'cursor';
  document.body.insertAdjacentElement('afterbegin', newDiv);
}

addElement();

const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX - 12.5}px`;
  cursor.style.top = `${e.clientY - 12.5}px`;
});
