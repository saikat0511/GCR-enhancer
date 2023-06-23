const config = {
  attachmentElement: 'div > a[href*="drive.google.com/file"]:not(.downloadBtn)',
  themeButtonTarget: '.Mtd4hb.QRiHXd',
  lightThemeIconSVG: `
    <svg xmlns="http://www.w3.org/2000/svg" class="xSP5ic" height="20" viewBox="0 -960 960 960" width="20">
      <path d="M480-373q45 0 76-31t31-76q0-45-31-76t-76-31q-45 0-76 31t-31 76q0 45 31 76t76 31Zm-.226 98Q394-275 334.5-334.726t-59.5-145.5Q275-566 334.726-625.5t145.5-59.5Q566-685 625.5-625.274t59.5 145.5Q685-394 625.274-334.5t-145.5 59.5ZM84-431q-20.3 0-34.65-14.289Q35-459.579 35-479.789 35-500 49.35-514.5T84-529h96q20.3 0 34.65 14.289 14.35 14.29 14.35 34.5Q229-460 214.65-445.5T180-431H84Zm696 0q-20.3 0-34.65-14.289-14.35-14.29-14.35-34.5Q731-500 745.35-514.5T780-529h96q20.3 0 34.65 14.289 14.35 14.29 14.35 34.5Q925-460 910.65-445.5T876-431h-96ZM480.211-731Q460-731 445.5-745.35T431-780v-96q0-20.3 14.289-34.65 14.29-14.35 34.5-14.35Q500-925 514.5-910.65T529-876v96q0 20.3-14.289 34.65-14.29 14.35-34.5 14.35Zm0 696Q460-35 445.5-49.35T431-84v-96q0-20.3 14.289-34.65 14.29-14.35 34.5-14.35Q500-229 514.5-214.65T529-180v96q0 20.3-14.289 34.65Q500.421-35 480.211-35ZM233-658l-50-51q-15-15-15-34t15-34q14.435-15 33.717-15Q236-792 251-777l51 50q15 14.941 15 34.529 0 19.589-15 34.53Q289-643 268.5-643T233-658Zm476 475-51-50q-15-14.667-14.5-33.833Q644-286 658-302q14-15 34-15t35 15l50 51q15 15 15 34t-14.522 34Q762-168 743.5-168T709-183Zm-51.059-475Q643-671 643-691.5t15-35.5l51-50q16-15 34.5-14.5t33.5 14.543Q792-762 792-743.5T777-709l-50 51q-14.941 15-34.529 15-19.589 0-34.53-15ZM183-183q-15-14.435-15-33.717Q168-236 183-251l50-51q14.667-14 33.833-13.5Q286-315 302-302q15 15 14.542 34.667Q316.083-247.667 302-233l-51 50q-15 15-34 15t-34-15Zm297-297Z"/>
    </svg>
  `,
  darkThemeIconSVG: `
    <svg xmlns="http://www.w3.org/2000/svg" class="xSP5ic" height="20" viewBox="0 -960 960 960" width="20">
      <path d="M480-107q-154 0-263.5-109.5T107-480q0-118 59.5-207T328-823q68-24 105.5 2.5T452-710q3 8 4 14.122T457-683q0 93 67.5 159.5T686-457q7 0 11.5 2t13.5 4q91-19 115 22t-2 106q-50 93-138 154.5T480-107Zm0-110q71 0 132-34t96-95q-4 0-10-.5t-11-.5q-141.284 0-240.642-98.189T347-683q0-10-.5-16t.5-9q-62 35-96 95.5T217-480q0 109.614 76.693 186.307Q370.386-217 480-217Zm-17-246Z"/>
    </svg>
  `,
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


const createThemeButton = () => {
  let button = document.createElement('button');
  button.className = 'themeBtn';
  return button;
}


const setThemeButtonIcon = (button) => {
  if (document.documentElement.getAttribute('dark') === 'true') {
    button.innerHTML = config.lightThemeIconSVG;
  } else {
    button.innerHTML = config.darkThemeIconSVG;
  }
}


const createDownloadButton = (URL, fileName) => {
  let a = document.createElement('a');
  a.className = 'downloadBtn';
  a.href = URL;
  a.download = fileName;
  a.innerHTML = config.downloadIconSVG;
  return a;
};


const setupThemeButtonListener = (button) => {
  button.addEventListener('click', () => {
    if (document.documentElement.getAttribute('dark') === 'false') {
      document.documentElement.setAttribute('dark', 'true');
      chrome.storage.local.set({ 'GCRDarkTheme': true });
    } else {
      document.documentElement.setAttribute('dark', 'false');
      chrome.storage.local.set({ 'GCRDarkTheme': false });
    }
    setThemeButtonIcon(document.querySelector('.themeBtn'));
  });
}


const insertThemeButton = (target) => {
  let themeButton = createThemeButton();
  setThemeButtonIcon(themeButton);
  target.prepend(themeButton);
  setupThemeButtonListener(themeButton);
}


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


// check for theme preference in local storage
themeKey = 'GCRDarkTheme';
chrome.storage.local.get([themeKey], (result) => {
  // if theme preference doesn't exist set theme according prefers-color-scheme
  if (Object.keys(result).length === 0) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
      document.documentElement.setAttribute('dark', 'true');
      chrome.storage.local.set({ 'GCRDarkTheme': true });
    } else {
      document.documentElement.setAttribute('dark', 'false');
      chrome.storage.local.set({ 'GCRDarkTheme': false });
    };
    // else set theme according to saved value
  } else {
    if (result[themeKey] === true) {
      document.documentElement.setAttribute('dark', 'true');
    } else {
      document.documentElement.setAttribute('dark', 'false');
    }
  };
});


// wait for navbar element to be available for inserting theme button
const navObserver = new MutationObserver((mutations, mutationInstance) => {
  let target = document.querySelector(config.themeButtonTarget);
  if (target) {
    // firefox seems to run the script immediately after reloading extension
    // which inserts multipel new buttons
    // if a theme button already exists dont insert a new one
    let themeButton = document.querySelector('.themeBtn');
    if (themeButton) {
      setupThemeButtonListener(themeButton);
    } else {
      insertThemeButton(target);
    };
    mutationInstance.disconnect();
  };
});
navObserver.observe(document.documentElement, config.mutations);

// check for attachments whenever DOM mutations occur
const bodyObserver = new MutationObserver(() => {
  let attachmentElements = document.querySelectorAll(config.attachmentElement);
  // only insert download button if attachments exist on page
  if (attachmentElements.length > 0)
    insertDownloadButtons(attachmentElements);
});


// start observing mutations in document body after page loads
window.addEventListener('load', () => {
  bodyObserver.observe(document.body, config.mutations);
});
