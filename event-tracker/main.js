"use strict";

function addEvent(ele, e, fn) {
  return ele.addEventListener(e, fn);
}

function selectA(cssClass) {
  return document.querySelectorAll(cssClass);
}

const userEnv = {
  appVersion: navigator.appVersion,
  browser: navigator.userAgentData?.brands?.[0]?.brand,
  osPlatform: navigator.userAgentData?.platform,
  isMobile: navigator.userAgentData?.mobile,
  language: navigator.language,
  cookieEnabled: navigator.cookieEnabled,
  deviceMemory: navigator.deviceMemory,
  cpu: navigator.hardwareConcurrency,
  screenSize: `${screen.width}px x ${screen.height}px`,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

const record = {
  userEnv: userEnv,
  mouseCoords: [],
  scroll: [],
};

const momentousE = ["mousemove", "scroll"];

const fns = [
  function addMouseCoords(e) {
    let t = Date.now();
    record.mouseCoords.push({ x: e.clientX, y: e.clientY, t: t });
    console.log(record);
  },

  function addScrollCoords() {
    let date = new Date();
    record.scroll.push({ x: window.scrollX, y: window.scrollY, t: date });
    console.log(record);
  },
];

function debounce(func, delay) {
  let timeoutId;
  return function (e) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(e);
    }, delay);
  };
}

for (let i = 0; i < momentousE.length; i++) {
  addEvent(document, momentousE[i], debounce(fns[i], 100));
}
