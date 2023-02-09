const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyEl: document.querySelector('body')
}

let timerId = null;

refs.startBtn.addEventListener("click", startColorChange);
refs.stopBtn.addEventListener("click", stopColorChange);

function startColorChange() {
    refs.stopBtn.disabled = false;
    refs.startBtn.disabled = true;
    timerId = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
    clearInterval(timerId);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}