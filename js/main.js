
/********** Navigation menu ****************/
(function(){
  const hamburgerButton = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const closeNavButton = document.querySelector('.close-nav-menu');

  hamburgerButton.addEventListener('click', () => {
    navMenu.classList.add('open');
    document.body.classList.add('hide-scrolling');
  });

  closeNavButton.addEventListener('click', () => {
    navMenu.classList.remove('open');
    document.body.classList.remove('hide-scrolling');
  });

  //atach an event handler to document
  document.addEventListener('click', (event) => {
    if(event.target.classList.contains('link-item')){
      // Make sure event.target.hash has a value before overwriting default
      if(event.target.hash !== ''){
        // prevent default anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;

        // disable existing active section
        document.querySelector('.section.active').classList.add('section-hide');
        document.querySelector('.section.active').classList.remove('active');

        // activate new section
        document.querySelector(hash).classList.add('active');
        document.querySelector(hash).classList.remove('section-hide');

        // disable any existing active nav
        navMenu.querySelector('.active').classList.add('outer-shadow', 'hover-in-shadow');
        navMenu.querySelector('.active').classList.remove('inner-shadow', 'active');

        // if clicked link-item is contained within nav menu
        if(navMenu.classList.contains('open')){
          // activate new nav
          event.target.classList.add('active', 'inner-shadow');
          event.target.classList.remove('hover-in-shadow', 'outer-shadow');
          // hide nav
          navMenu.classList.remove('open');
          document.body.classList.remove('hide-scrolling');
        } else {
          const navItems = navMenu.querySelectorAll('.link-item');
          navItems.forEach((item) => {
            if(hash === item.hash){
              // activate new nav
              item.classList.add('active', 'inner-shadow');
              item.classList.remove('hover-in-shadow', 'outer-shadow');
            }
          });
        }
        // add hash (#) to url
        window.location.hash = hash;
      }
    }
  });

})();


/********** About section ****************/

(function() {
  const aboutSection = document.querySelector('.about-section');
  const tabsContainer = document.querySelector('.about-tabs');
  
  tabsContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains('tab-item') && !event.target.classList.contains('active')){
      // element which is click
      const target = event.target.getAttribute('data-target');
      // disable the existing active tab item
      tabsContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
      // active new tab-item
      event.target.classList.add('active', 'outer-shadow');
      // disable existing active tab-content
      aboutSection.querySelector('.tab-content.active').classList.remove('active');
      // active new tab-content
      aboutSection.querySelector(target).classList.add('active');
    }
  });
})();

/*************** portfolio filter and popup ****************/
(() => {
  const filterContainer = document.querySelector('.portfolio-filter');
  const portfolioItemsContainer = document.querySelector('.portfolio-items');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const popup = document.querySelector('.portfolio-popup')
  const prevButton = popup.querySelector('.pp-prev');
  const nextButton = popup.querySelector('.pp-next');
  const closeButton = popup.querySelector('.pp-close');
  const projectDetailsContainer = popup.querySelector('.pp-details');
  const projectDetailsButton = popup.querySelector('.pp-project-details-btn');
  let itemIndex, slideIndex, screenShots;
  const popupImg = popup.querySelector('.pp-img');
  const popupVideo = popup.querySelector('.pp-video');

  /*********** Filter portfolio items **********/
  filterContainer.addEventListener('click', (event) => {
    if(event.target.classList.contains('filter-item') && !event.target.classList.contains('active')){
      // disable existing active filter-item
      filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
      // activate new filter-item
      event.target.classList.add('active', 'outer-shadow');
      const target = event.target.getAttribute('data-target');
      portfolioItems.forEach( (item) => {
        if(item.getAttribute('data-category') === target || target === 'all'){
          item.classList.remove('hide');
          item.classList.add('show');
        }
        else {
          item.classList.remove('show');
          item.classList.add('hide');
        }
      });
    }
  });

  /*********** Filter portfolio items **********/
  portfolioItemsContainer.addEventListener('click', (event) => {
    const viewArea = event.target.closest('.portfolio-item-inner');

    if(viewArea){
      const portfolioItem = viewArea.parentElement;
      //get item index 
      itemIndex = [...portfolioItem.parentElement.children].indexOf(portfolioItem);

      screenShots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshots');
      // convert screenShots from str to array
      screenShots = screenShots.split(',');
      // if there is only one img do not display prev and next buttons
      if(screenShots.length === 1){
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
      } else {
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
      }
      // reset slide Inde to zero
      slideIndex = 0;
      popupAdd();
      popupSlideShow();
      popupDetails();
    }

  });

  closeButton.addEventListener('click', () => {
    // if a video is playing then stop it
    if(!popupVideo.paused){
      popupVideo.pause();
    }
    //if project details is open then close it
    if(projectDetailsContainer.classList.contains('active')){
      projectDetailsButton.querySelector('i').classList.remove('fa-minus');
      projectDetailsButton.querySelector('i').classList.add('fa-plus');
      projectDetailsContainer.classList.remove('active');
    }
    // remove open class and add hide-close from popup to stop displaying the project content
    popup.classList.remove('open');
    popup.classList.add('hide-close');
    // remove hide scrolling to be able to scroll outside project screen
    document.body.classList.remove('hide-scrolling');
  });

  function popupAdd() {
    // remove open class and add hide-close to popup the project screen
    popup.classList.remove('hide-close');
    popup.classList.add('open');
    document.body.classList.add('hide-scrolling');
  }
  
  function popupSlideShow(slideIndex = 0) {
    // show slideIndex at counter
    popup.querySelector('.pp-counter').innerHTML = `${(slideIndex+1)} of ${screenShots.length}`;
    // save the current screenshot in src
    const src = screenShots[slideIndex];
    // if src is a video then play it 
    if(src.endsWith('.mp4')){
      // video src must be equal to the current src
      popupVideo.src = src;
      // remove 'hide-img-video' from video to show that section
      popupVideo.classList.remove('hide-img-video');
      // add 'hide-img-video' to img to hide that section
      popupImg.classList.add('hide-img-video');
      // here play video with no volume
      if(popupVideo.paused) {
        popupVideo.volume = 0;
        popupVideo.play();
        return;
      }
    }
    // if it is not a video then remove 'hide-img-video'
    popupImg.classList.remove('hide-img-video');
    popupVideo.classList.add('hide-img-video');
    // activate loader until the popup loaded
    popup.querySelector('.pp-loader').classList.add('active');
    popupImg.src = src;
    popupImg.onload = () => {
      // disable loader after the popup loaded
      popup.querySelector('.pp-loader').classList.remove('active');
    };
  }

  // next slide
  nextButton.addEventListener('click', () => {
    // if a video is playing stop it
    if(!popupVideo.paused){
      popupVideo.pause();
    }
    // if slide Index is equal to last slide Index then change slideIndex to 0
    if(slideIndex === screenShots.length-1){
      slideIndex=0;
    }
    // otherwise just increment slideIndex by one
    else {
      slideIndex++;
    }
    // call popupSlideShow to show the screenShot in that index
    popupSlideShow(slideIndex);
  });

  prevButton.addEventListener('click', () => {
    // if a video is playing stop it
    if(!popupVideo.paused){
      popupVideo.pause();
    }
    // if slide Index is equal to 0 then change slideIndex to last index
    if(slideIndex === 0){
      slideIndex=screenShots.length-1;
    }
    // otherwise just decrement slideIndex by one
    else {
      slideIndex--;
    }
    // call popupSlideShow to show the screenShot in that index
    popupSlideShow(slideIndex);
  });

  popupVideo.addEventListener('click', () => {
    // if the video screen is click then pause or play the video
    if(popupVideo.paused) {
      popupVideo.volume = 0;
      popupVideo.play();
      return;
    }
    popupVideo.pause();
  })

  function popupDetails() {
    // get project details
    const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
    // write details into popup details section
    popup.querySelector('.pp-project-details').innerHTML = details;

    // get category 
    let category = portfolioItems[itemIndex].getAttribute('data-category');
    // remove '-' from category and uppercase the word
    category = category.split('-').join(' ').toUpperCase();
    // write category in popup category
    popup.querySelector('.pp-project-category').innerHTML = category;

    // get title from project
    const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
    //write the title project into popup title
    popup.querySelector('.pp-title h2').innerHTML = title;

  }

  projectDetailsButton.addEventListener('click', () => {
    // if project details container has class active
    if(projectDetailsContainer.classList.contains('active')){
      // remove minus symbol and add plus symbol
      projectDetailsButton.querySelector('i').classList.remove('fa-minus');
      projectDetailsButton.querySelector('i').classList.add('fa-plus');
      // then remove active class to hide project details
      projectDetailsContainer.classList.remove('active');
      return;
    }
    // otherwise remove plus symbol, add minus symbol
    projectDetailsButton.querySelector('i').classList.remove('fa-plus');
    projectDetailsButton.querySelector('i').classList.add('fa-minus');
    // add active class to show project details
    projectDetailsContainer.classList.add('active');
  })

})();

/**************** hide all sections except active ***************/
(function() {
  // list every element with class section
  const sections = document.querySelectorAll('.section');
  // map over sections to hide the ones that do not have active class
  sections.forEach((section) => {
    if(!section.classList.contains('active')){
      section.classList.add('section-hide');
    }
  })
})();









