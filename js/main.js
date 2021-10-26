document.getElementsByTagName('label').onclick = function(){
  this.classList.toggle('fadeIn_animation');
}

document.addEventListener('DOMContentLoaded', function () {

  const cb = function (el, isIntersecting) {
      if(isIntersecting) {
          el.classList.add('fadeIn');
      }
  } 　

  const so = new ScrollObserver('.fadeIn_animation', cb);
});

const boxScrollBar = () => {
  let scroll = document.querySelectorAll('.frm_rules');
  scroll.forEach((el) => {
    boxScroll(el);
  });
  
  function boxScroll (el) {
    let scrollContainer = el.querySelector('.scrollable'),
      scrollContentWrapper = el.querySelector('.bx_rules'),
      contentPosition = 0,
      scrollerBeingDragged = false,
      scroller,
      topPosition,
      scrollerHeight;

    function calculateScrollerHeight() {
      let visibleRatio = scrollContainer.offsetHeight / scrollContentWrapper.scrollHeight;
      return visibleRatio * scrollContainer.offsetHeight;
    }

    function moveScroller(evt) {
      let scrollPercentage = evt.target.scrollTop / scrollContentWrapper.scrollHeight;
      topPosition = scrollPercentage * (scrollContainer.offsetHeight - 5);
      scroller.style.top = topPosition + 'px';
    }

    function startDrag(evt) {
      normalizedPosition = evt.pageY;      
      contentPosition = scrollContentWrapper.scrollTop;
      scrollerBeingDragged = true;
    }

    function stopDrag(evt) {
      scrollerBeingDragged = false;
    }

    function scrollBarScroll(evt) {
      if (scrollerBeingDragged === true) {
        let mouseDifferential = evt.pageY - normalizedPosition;
        var scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
        scrollContentWrapper.scrollTop = contentPosition + scrollEquivalent;
      }
    }

    function createScroller() {
      scroller = document.createElement("div");
      scroller.className = 'scroller';
      scrollerHeight = calculateScrollerHeight();
      if (scrollerHeight / scrollContainer.offsetHeight < 1) {
        scroller.style.height = scrollerHeight + 'px';
        scrollContainer.appendChild(scroller);
        scrollContainer.className += ' showScroll';
        scroller.addEventListener('mousedown', startDrag);
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('mousemove', scrollBarScroll)
      }
    }
    createScroller();
    scrollContentWrapper.addEventListener('scroll', moveScroller);
  }
}

boxScrollBar();