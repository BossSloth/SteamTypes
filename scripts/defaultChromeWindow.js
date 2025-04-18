// This can be obtained by running `Object.keys(window)` in a empty Chrome tab
const defaultChromeWindowProperties = [
  "0",
  "window",
  "self",
  "document",
  "name",
  "location",
  "customElements",
  "history",
  "navigation",
  "locationbar",
  "menubar",
  "personalbar",
  "scrollbars",
  "statusbar",
  "toolbar",
  "status",
  "closed",
  "frames",
  "length",
  "top",
  "opener",
  "parent",
  "frameElement",
  "navigator",
  "origin",
  "external",
  "screen",
  "innerWidth",
  "innerHeight",
  "scrollX",
  "pageXOffset",
  "scrollY",
  "pageYOffset",
  "visualViewport",
  "screenX",
  "screenY",
  "outerWidth",
  "outerHeight",
  "devicePixelRatio",
  "event",
  "clientInformation",
  "screenLeft",
  "screenTop",
  "styleMedia",
  "onsearch",
  "trustedTypes",
  "performance",
  "onappinstalled",
  "onbeforeinstallprompt",
  "crypto",
  "indexedDB",
  "sessionStorage",
  "localStorage",
  "onbeforexrselect",
  "onabort",
  "onbeforeinput",
  "onbeforematch",
  "onbeforetoggle",
  "onblur",
  "oncancel",
  "oncanplay",
  "oncanplaythrough",
  "onchange",
  "onclick",
  "onclose",
  "oncontentvisibilityautostatechange",
  "oncontextlost",
  "oncontextmenu",
  "oncontextrestored",
  "oncuechange",
  "ondblclick",
  "ondrag",
  "ondragend",
  "ondragenter",
  "ondragleave",
  "ondragover",
  "ondragstart",
  "ondrop",
  "ondurationchange",
  "onemptied",
  "onended",
  "onerror",
  "onfocus",
  "onformdata",
  "oninput",
  "oninvalid",
  "onkeydown",
  "onkeypress",
  "onkeyup",
  "onload",
  "onloadeddata",
  "onloadedmetadata",
  "onloadstart",
  "onmousedown",
  "onmouseenter",
  "onmouseleave",
  "onmousemove",
  "onmouseout",
  "onmouseover",
  "onmouseup",
  "onmousewheel",
  "onpause",
  "onplay",
  "onplaying",
  "onprogress",
  "onratechange",
  "onreset",
  "onresize",
  "onscroll",
  "onsecuritypolicyviolation",
  "onseeked",
  "onseeking",
  "onselect",
  "onslotchange",
  "onstalled",
  "onsubmit",
  "onsuspend",
  "ontimeupdate",
  "ontoggle",
  "onvolumechange",
  "onwaiting",
  "onwebkitanimationend",
  "onwebkitanimationiteration",
  "onwebkitanimationstart",
  "onwebkittransitionend",
  "onwheel",
  "onauxclick",
  "ongotpointercapture",
  "onlostpointercapture",
  "onpointerdown",
  "onpointermove",
  "onpointerrawupdate",
  "onpointerup",
  "onpointercancel",
  "onpointerover",
  "onpointerout",
  "onpointerenter",
  "onpointerleave",
  "onselectstart",
  "onselectionchange",
  "onanimationend",
  "onanimationiteration",
  "onanimationstart",
  "ontransitionrun",
  "ontransitionstart",
  "ontransitionend",
  "ontransitioncancel",
  "onafterprint",
  "onbeforeprint",
  "onbeforeunload",
  "onhashchange",
  "onlanguagechange",
  "onmessage",
  "onmessageerror",
  "onoffline",
  "ononline",
  "onpagehide",
  "onpageshow",
  "onpopstate",
  "onrejectionhandled",
  "onstorage",
  "onunhandledrejection",
  "onunload",
  "isSecureContext",
  "crossOriginIsolated",
  "scheduler",
  "alert",
  "atob",
  "blur",
  "btoa",
  "cancelAnimationFrame",
  "cancelIdleCallback",
  "captureEvents",
  "clearInterval",
  "clearTimeout",
  "close",
  "confirm",
  "createImageBitmap",
  "fetch",
  "find",
  "focus",
  "getComputedStyle",
  "getSelection",
  "matchMedia",
  "moveBy",
  "moveTo",
  "open",
  "postMessage",
  "print",
  "prompt",
  "queueMicrotask",
  "releaseEvents",
  "reportError",
  "requestAnimationFrame",
  "requestIdleCallback",
  "resizeBy",
  "resizeTo",
  "scroll",
  "scrollBy",
  "scrollTo",
  "setInterval",
  "setTimeout",
  "stop",
  "structuredClone",
  "webkitCancelAnimationFrame",
  "webkitRequestAnimationFrame",
  "chrome",
  "caches",
  "cookieStore",
  "ondevicemotion",
  "ondeviceorientation",
  "ondeviceorientationabsolute",
  "launchQueue",
  "sharedStorage",
  "documentPictureInPicture",
  "getScreenDetails",
  "queryLocalFonts",
  "showDirectoryPicker",
  "showOpenFilePicker",
  "showSaveFilePicker",
  "originAgentCluster",
  "onpageswap",
  "onpagereveal",
  "credentialless",
  "fence",
  "speechSynthesis",
  "onscrollend",
  "onscrollsnapchange",
  "onscrollsnapchanging",
  "webkitRequestFileSystem",
  "webkitResolveLocalFileSystemURL",
  "JSCompiler_renameProperty",
  "litPropertyMetadata",
  "reactiveElementVersions",
  "litHtmlVersions",
  "litElementVersions",
  "cr"
];

function windowDiff(windowObj) {
  const keys1 = new Set(Object.keys(windowObj));
  const keys2 = new Set(defaultChromeWindowProperties);

  const onlyInObj1 = [...keys1].filter(key => !keys2.has(key));
  const onlyInObj2 = [...keys2].filter(key => !keys1.has(key));

  return {
      onlyInObj1,
      onlyInObj2
  };
}