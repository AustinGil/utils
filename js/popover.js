const target = document.getElementById('target');
const popover = document.getElementById('popover');

const targetRect = target.getBoundingClientRect();
const popoverRect = popover.getBoundingClientRect();

const top = targetRect.top + targetRect.height;
const left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2;
