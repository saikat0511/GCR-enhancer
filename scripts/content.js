const config = {
  attachmentElement: 'div > a[href*="drive.google.com/file"]:not(.downloadBtn)',
  mutations: { attributes: true, childList: true, subtree: true }
};


const isVisible = (elem) => {
  var style = window.getComputedStyle(elem);
  return !((style.display === 'none') || (style.visibility === 'hidden'))
};


const setupGCRBodyObserver = () => {
  // only create new MutationObserver if it doesn't exist
  if (window.GCRBodyObserverRunning) return;
  window.GCRBodyObserverRunning = true;

  const bodyObserver = new MutationObserver(() => {
    start();
  });

  // start observing mutations in document body
  bodyObserver.observe(document.body, config.mutations);
};


const createDownloadButton = (URL, fileName) => {
  let a = document.createElement('a');
  a.className = 'downloadBtn';
  a.href = URL;
  a.download = fileName;
  a.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="downloadBtnLogo" height="24" viewBox="0 -960 960 960" width="24">
      <path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-11-11-11-28t11-28q11-11 28.5-11.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q11-11 28.5-10.5T652-548q11 11 11 28t-11 28L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z"/>
    </svg>
  `;
  return a;
};


const insertDownloadButtons = (attachmentElements) => {
  // remove non-visible attachment elements from NodeList
  attachmentElements = [...attachmentElements].filter(elem => isVisible(elem));

  attachmentElements.forEach((elem) => {
    // return if download button is already inserted for this attachment
    if (elem.parentNode.querySelector('.downloadBtn') !== null) return;

    // get document ID and authuser parameter from drive file url
    let driveURL = elem.getAttribute('href').split('?');
    let URLParams = new URLSearchParams(driveURL[1]);
    let id = driveURL[0].split('/').reverse()[1];

    // construct the direct download URL
    let directDriveURL = `https://drive.google.com/uc?export=download&id=${id}`
    if (URLParams.has('authuser')) {
      directDriveURL = `${directDriveURL}&authuser=${URLParams.get('authuser')}`
    };

    // get the filename from children element
    let fileName = elem.children[1].children[0].textContent;

    // create the download button
    let downloadButton = createDownloadButton(directDriveURL, fileName);

    //minimise padding
    elem.children[0].style.height = '3rem';
    elem.children[0].style.width = '4rem';
    elem.parentNode.style.paddingRight = '0';
    elem.nextSibling.style.paddingLeft = '0';

    // insert the download button into the DOM
    elem.parentNode.appendChild(downloadButton);
  });
};


const start = () => {
  // setup mutationObserserver which calls this function again after body mutations
  setupGCRBodyObserver();

  // get attachment NodeList
  let attachmentElements = document.querySelectorAll(config.attachmentElement);
  // only insert download button if attachments exist on page
  if (attachmentElements.length === 0) return;
  insertDownloadButtons(attachmentElements);
};


// Entry point
start();
