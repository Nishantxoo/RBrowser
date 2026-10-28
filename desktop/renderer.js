
const address = document.getElementById('address');
const form = document.getElementById('address-form');
const back = document.getElementById('back');
const forward = document.getElementById('forward');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  window.rbrowser.navigate(address.value);
});

back.addEventListener('click', () => window.rbrowser.back());
forward.addEventListener('click', () => window.rbrowser.forward());
document.getElementById('reload').addEventListener('click', () => {
  window.rbrowser.reload();
});
document.getElementById('home').addEventListener('click', () => {
  window.rbrowser.home();
});

window.rbrowser.onUrl((url) => {
  if (url) address.value = url;
});

window.rbrowser.onState((state) => {
  back.disabled = !state.canGoBack;
  forward.disabled = !state.canGoForward;
});

address.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') address.blur();
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
    event.preventDefault();
    address.focus();
    address.select();
  }
});
