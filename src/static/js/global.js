if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/serviceworker.js', {
    scope: '/'
  }).then(function(reg) {
  }).catch(function(err) {
  });
}


var yPos = 0;
var didScroll = false;

var triggerScroll = function scrollTriggers() {
    didScroll = true;
}

var moveHeader = function moveHeader() {
  var headerEl = document.getElementById('titleheader');

  if (window.scrollY >= headerEl.offsetHeight && window.scrollY >= yPos) {
    headerEl.className = 'the-header fixed';
	} else {
    headerEl.className = 'the-header';
	}
	yPos = window.scrollY;
};

window.onscroll = triggerScroll;

setInterval(function() {
  if(didScroll) {
    didScroll = false;
    moveHeader();
  }
}, 100);
