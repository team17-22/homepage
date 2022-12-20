// The debounce function receives our function as a parameter
const debounce = (fn) => {

  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      
      // Call our function and pass any params we received
      fn(...params);
    });

  } 
};

// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();

var notes = [
  {
    title:  'Zápisnica č. 1',
    date:   '11.10.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-10-11.pdf'
  },
  {
    title:  'Zápisnica č. 2',
    date:   '18.10.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-10-18.pdf'
  },
  {
    title:  'Zápisnica č. 3',
    date:   '25.10.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-10-25.pdf'
  },
  {
    title:  'Zápisnica č. 4',
    date:   '08.11.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-11-08.pdf'
  },
  {
    title:  'Zápisnica č. 5',
    date:   '15.11.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-11-15.pdf'
  },
  {
    title:  'Zápisnica č. 6',
    date:   '22.11.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-11-22.pdf'
  },
  {
    title:  'Zápisnica č. 7',
    date:   '29.11.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-11-29.pdf'
  },
  {
    title:  'Zápisnica č. 8',
    date:   '06.12.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-12-06.pdf'
  },
  {
    title:  'Zápisnica č. 9',
    date:   '13.12.2022',
    path:   './dokumenty/zapisnice/Zapisnica_22-12-13.pdf'
  }
];

var sprints = [
  {
    title:  'Retrospektíva č. 1',
    date:   '26.10.2022',
    path:   './dokumenty/sprinty/Retrospektiva_22-10-25.pdf'
  },
  {
    title:  'Retrospektíva č. 2',
    date:   '08.09.2022',
    path:   './dokumenty/sprinty/Retrospektiva_22-11-08.pdf'
  },
  {
    title:  'Retrospektíva č. 3',
    date:   '22.09.2022',
    path:   './dokumenty/sprinty/Retrospektiva_22-11-22.pdf' 
  },
  {
    title:  'Retrospektíva č. 4',
    date:   '06.10.2022',
    path:   './dokumenty/sprinty/Retrospektiva_22-12-06.pdf' 
  },
  {
    title:  'Retrospektíva č. 5',
    date:   '13.12.2022',
    path:   './dokumenty/sprinty/Retrospektiva_22-12-13.pdf' 
  }
];

var documents = [

];

var other = [
  {
    title:  'Príloha C - Otázky na externistov',
    date:   '',
    path:   './dokumenty/ostatne/Príloha C - Otázky na externistov.pdf'
  },
  {
    title:  'Príloha D - Úvodné pokyny',
    date:   '',
    path:   './dokumenty/ostatne/Príloha D - Úvodné pokyny.pdf'
  },
  {
    title:  'Motivačný dokument',
    date:   '',
    path:   './dokumenty/ostatne/tim17_tema11-15-13_2022.pdf'
  },
  {
    title:  'Prihláška do TP Cup 2023',
    date:   '',
    path:   './dokumenty/ostatne/tpcup_prihlaska.pdf'
  }
];

var dict = {
  'zapisnice' : notes,
  'sprinty'   : sprints,
  'dokumenty' : documents,
  'ostatne'   : other
};

var activeBtn = null;

function displayList(type, text)
{
  if (activeBtn)
  {
    activeBtn.classList.remove("clickable-svg-text-active")
  }
  
  activeBtn = document.getElementById(text);;
  activeBtn.classList.add("clickable-svg-text-active");

  var docuList = document.getElementById("documents-list");

  docuList.replaceChildren();

  dict[type].forEach((item) =>
  {
      var li = document.createElement("li");

      var docuTab = document.createElement("div");
      var infoTab = document.createElement("div");
      var actnTab = document.createElement("div");

      var title   = document.createElement("p");
      var date    = document.createElement("small");

      var vLink   = document.createElement("a");
      var dLink   = document.createElement("a");

      var vIcon   = document.createElement("img");
      var dIcon   = document.createElement("img");

      vLink.setAttribute("href", item.path);
      vLink.setAttribute("target", "_blank");

      dLink.setAttribute("href", item.path);
      dLink.setAttribute("download", "");

      vIcon.setAttribute("src", "./images/view-icon.png");
      vIcon.setAttribute("height", "30px");

      dIcon.setAttribute("src", "./images/download-icon.png");
      dIcon.setAttribute("height", "20px");

      // class definitions
      title.classList.add("doc-tab-title");
      date.classList.add("doc-tab-date");

      docuTab.classList.add("document-tab-container");
      infoTab.classList.add("document-tab-info");
      actnTab.classList.add("document-tab-actions");

      vIcon.classList.add("document-tab-view");
      dIcon.classList.add("document-tab-download");

      li.classList.add("document-tab");

      // info tab child linkage
      title.appendChild(document.createTextNode(item.title));
      date.appendChild(document.createTextNode(item.date));

      infoTab.appendChild(title);
      infoTab.appendChild(date);

      // actions tab child linkage
      vLink.appendChild(vIcon);
      dLink.appendChild(dIcon);

      actnTab.appendChild(vLink);
      actnTab.appendChild(dLink);

      // apend childs to document tab
      docuTab.appendChild(infoTab);
      docuTab.appendChild(actnTab);

      li.appendChild(docuTab);

      docuList.appendChild(li);
  });

  var scroll = document.getElementById("documents-scroll");
  var tabHeight = 54;
  var height = (tabHeight * dict[type].length);

  if (height)
    height += 2;

  scroll.style.height = height + "px";
}
