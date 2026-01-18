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
  touchCoords: [],
  window: { blur: 0, resize: 0 },
};

const highFrequencyEvents = ["mousemove", "scroll", "touchmove"];
const lowFrequencyEvents = ["resize", "blur"];

const highFrequencyFns = [
  function addMouseCoords(e) {
    const t = Date.now();
    record.mouseCoords.push({ x: e.clientX, y: e.clientY, t: t });
  },

  function addScrollCoords() {
    const t = Date.now();
    record.scroll.push({ x: window.scrollX, y: window.scrollY, t: t });
  },

  function addTouchCoords(e) {
    const t = Date.now();
    record.touchCoords.push({
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
      t: t,
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
