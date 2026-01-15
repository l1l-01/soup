"use strict";

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
