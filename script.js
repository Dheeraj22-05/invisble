// Define keyboard layout (3 rows)
const keys = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M']
];

const keyboard = document.getElementById('keyboard');
const output = document.getElementById('output');
const resetBtn = document.getElementById('resetBtn');

let typedText = "";

// Calculate key sizes and positions dynamically
function renderKeyboard() {
  keyboard.innerHTML = ''; // invisible keys - no text shown

  // Keyboard width and height
  const width = keyboard.clientWidth;
  const height = keyboard.clientHeight;

  const rowCount = keys.length;
  const rowHeight = height / rowCount;

  keys.forEach((row, rowIndex) => {
    const keyCount = row.length;
    const keyWidth = width / 10; // fixed 10 keys width for alignment

    row.forEach((key, keyIndex) => {
      // Create invisible key area
      const keyDiv = document.createElement('div');
      keyDiv.style.position = 'absolute';
      keyDiv.style.top = (rowIndex * rowHeight) + 'px';
      keyDiv.style.left = (keyIndex * keyWidth) + 'px';
      keyDiv.style.width = keyWidth + 'px';
      keyDiv.style.height = rowHeight + 'px';

      keyDiv.dataset.key = key;

      // Optional: Remove visibility (fully transparent)
      keyDiv.style.backgroundColor = 'transparent';

      // For debugging: Uncomment to see key outlines:
      // keyDiv.style.border = '1px solid rgba(255,255,255,0.1)';

      keyboard.appendChild(keyDiv);
    });
  });
}

// Detect clicked key on keyboard div
keyboard.addEventListener('click', (e) => {
  const rect = keyboard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const width = keyboard.clientWidth;
  const height = keyboard.clientHeight;

  const rowCount = keys.length;
  const rowHeight = height / rowCount;

  // Determine which row
  const rowIndex = Math.floor(y / rowHeight);
  if (rowIndex < 0 || rowIndex >= rowCount) return;

  const row = keys[rowIndex];
  const keyWidth = width / 10;

  // Determine which key in the row (use nearest key box)
  const keyIndex = Math.floor(x / keyWidth);
  if (keyIndex < 0 || keyIndex >= row.length) return;

  const key = row[keyIndex];

  // Add to typed text and display
  typedText += key;
  output.textContent = typedText;
});

// Reset button
resetBtn.addEventListener('click', () => {
  typedText = "";
  output.textContent = "";
});

// Render keyboard on load & resize
window.addEventListener('load', renderKeyboard);
window.addEventListener('resize', renderKeyboard);
