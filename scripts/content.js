const config = {
  attachmentElement: 'div > a[href*="drive.google.com/file"]:not(.downloadBtn)',
  downloadIconSVG: `
    <svg xmlns="http://www.w3.org/2000/svg" class="xSP5ic" height="24" viewBox="0 -960 960 960" width="24">
      <path d="M481-335q-10 0-19.45-3.409T444-350L278-516q-16-16-15.5-37.5T279-591q16-16 37.5-16t37.5 16l74 75v-268q0-22 15.5-37.5T481-837q22 0 37.5 15.5T534-784v268l75-75q16-16 37.5-16t37.5 16q16 16 16 37.5T684-516L518-350q-8.1 8.182-17.55 11.591Q491-335 481-335ZM236-129q-43.725 0-74.863-31.137Q130-191.275 130-235v-69q0-22 15.5-37.5T183-357q22 0 37.5 15.5T236-304v69h488v-69q0-22 15.5-37.5T777-357q22 0 37.5 15.5T830-304v69q0 43.725-31.138 74.863Q767.725-129 724-129H236Z"/>
    </svg>
  `,
  mutations: { attributes: true, childList: true, subtree: true }
};


const isVisible = (elem) => {
  var style = window.getComputedStyle(elem);
  return !((style.display === 'none') || (style.visibility === 'hidden'))
};


const createDownloadButton = (URL, fileName) => {
  let a = document.createElement('a');
  a.className = 'downloadBtn';
  a.href = URL;
  a.download = fileName;
  a.innerHTML = config.downloadIconSVG;
  return a;
};


const insertDownloadButtons = (attachmentElements) => {
  // remove non-visible attachment elements from NodeList
  attachmentElements = [...attachmentElements].filter(elem => isVisible(elem));

  attachmentElements.forEach((elem) => {
    // return if download button is already inserted for this attachment
    if (elem.parentNode.querySelector('.downloadBtn')) return;

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

    // insert the download button into the DOM
    elem.parentNode.appendChild(downloadButton);
  });
};


// check for attachments whenever DOM mutations occur
const bodyObserver = new MutationObserver(() => {
  let attachmentElements = document.querySelectorAll(config.attachmentElement);
  // only insert download button if attachments exist on page
  if (attachmentElements.length > 0)
    insertDownloadButtons(attachmentElements);
});


// start observing mutations in document body after page loads
window.onload = () => {
  bodyObserver.observe(document.body, config.mutations);
};
