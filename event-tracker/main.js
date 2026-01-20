"use strict";

function addEvent(ele, e, fn) {
  return ele.addEventListener(e, fn);
}

function selectA(cssClass) {
  return document.querySelectorAll(cssClass);
}

function throttleTrailing(func, delay) {
  let timeoutId;
  return function (e) {
    if (timeoutId) return;

    timeoutId = setTimeout(() => {
      func(e);
      timeoutId = undefined;
    }, delay);
  };
}

function submitRecord() {
  const jsonRecord = JSON.stringify(record);

  fetch("http://localhost:3000/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonRecord,
  })
    .then((response) => response.json())
    .then((result) => console.log("Success:", result))
    .catch((error) => console.error("Error:", error));

  record.mouseCoords = [];
  record.touchCoords = [];
  record.scroll = [];

  console.log(record);
}

const visitTime = Date.now();

const userEnv = {
  recordId: `${window.location.href}${visitTime}`,
  visitTime: visitTime,
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
  touchCoords: [],
  window: {
    blur: 0,
    resize: 0,
    href: window.location.href,
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    window: window.location.pathname,
  },
};

const highFrequencyEvents = ["mousemove", "scroll", "touchmove"];
const lowFrequencyEvents = ["resize", "blur"];

const highFrequencyFns = [
  function addMouseCoords(e, time = Date.now()) {
    record.mouseCoords.push({ x: e.clientX, y: e.clientY, t: time });
    if (record.mouseCoords.length >= 5 || record.touchCoords.length >= 5) {
      submitRecord();
    }
  },

  function addScrollCoords(e, time = Date.now()) {
    record.scroll.push({ x: window.scrollX, y: window.scrollY, t: time });
  },

  function addTouchCoords(e, time = Date.now()) {
    record.touchCoords.push({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      t: time,
    });
  },
];

const lowFrequencyFns = [
  function addResizeTimes() {
    record.window.resize = record.window.resize + 1;
  },
  function addBlurTimes() {
    record.window.blur = record.window.blur + 1;
  },
];

for (let i = 0; i < highFrequencyEvents.length; i++) {
  addEvent(
    document,
    highFrequencyEvents[i],
    throttleTrailing(highFrequencyFns[i], 200),
  );
}

for (let i = 0; i < lowFrequencyEvents.length; i++) {
  addEvent(window, lowFrequencyEvents[i], lowFrequencyFns[i]);
}
