// @builder.io/qwik/build
const isServer = true;
const isBrowser = false;

/**
 * @license
 * @builder.io/qwik 1.12.0
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
const isNode$1 = (value) => value && "number" == typeof value.nodeType;
const isDocument = (value) => 9 === value.nodeType;
const isElement$1 = (value) => 1 === value.nodeType;
const isQwikElement = (value) => {
  const nodeType = value.nodeType;
  return 1 === nodeType || 111 === nodeType;
};
const isNodeElement = (value) => {
  const nodeType = value.nodeType;
  return 1 === nodeType || 111 === nodeType || 3 === nodeType;
};
const isVirtualElement = (value) => 111 === value.nodeType;
const isText = (value) => 3 === value.nodeType;
const isComment = (value) => 8 === value.nodeType;
const logError = (message, ...optionalParams) => createAndLogError(false, message, ...optionalParams);
const throwErrorAndStop = (message, ...optionalParams) => {
  throw createAndLogError(false, message, ...optionalParams);
};
const logErrorAndStop = (message, ...optionalParams) => createAndLogError(true, message, ...optionalParams);
const logOnceWarn = () => {
};
const logWarn = () => {
};
const printParams = (optionalParams) => optionalParams;
const createAndLogError = (asyncThrow, message, ...optionalParams) => {
  const err = message instanceof Error ? message : new Error(message);
  return console.error("%cQWIK ERROR", "", err.message, ...printParams(optionalParams), err.stack), asyncThrow && setTimeout(() => {
    throw err;
  }, 0), err;
};
function assertDefined() {
}
function assertEqual() {
}
function assertTrue() {
}
function assertString() {
}
function assertQwikElement() {
}
function assertElement() {
}
const codeToText = (code) => `Code(${code}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8 + code}`;
const qError = (code, ...parts) => {
  const text = codeToText(code, ...parts);
  return logErrorAndStop(text, ...parts);
};
const createPlatform$1 = () => ({
  isServer,
  importSymbol(containerEl, url, symbolName) {
    {
      const hash2 = getSymbolHash$1(symbolName);
      const regSym = globalThis.__qwik_reg_symbols?.get(hash2);
      if (regSym) {
        return regSym;
      }
    }
    if (!url) {
      throw qError(31, symbolName);
    }
    if (!containerEl) {
      throw qError(30, url, symbolName);
    }
    const urlDoc = toUrl(containerEl.ownerDocument, containerEl, url).toString();
    const urlCopy = new URL(urlDoc);
    urlCopy.hash = "";
    return import(urlCopy.href).then((mod) => mod[symbolName]);
  },
  raf: (fn) => new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(fn());
    });
  }),
  nextTick: (fn) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    });
  }),
  chunkForSymbol: (symbolName, chunk) => [symbolName, chunk ?? "_"]
});
const toUrl = (doc, containerEl, url) => {
  const baseURI = doc.baseURI;
  const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
  return new URL(url, base);
};
let _platform = /* @__PURE__ */ createPlatform$1();
const setPlatform = (plt) => _platform = plt;
const getPlatform = () => _platform;
const isServerPlatform = () => _platform.isServer;
const isSerializableObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || null === proto;
};
const isObject = (v) => !!v && "object" == typeof v;
const isArray = (v) => Array.isArray(v);
const isString = (v) => "string" == typeof v;
const isFunction = (v) => "function" == typeof v;
const isPromise = (value) => value && "function" == typeof value.then;
const safeCall = (call, thenFn, rejectFn) => {
  try {
    const promise = call();
    return isPromise(promise) ? promise.then(thenFn, rejectFn) : thenFn(promise);
  } catch (e) {
    return rejectFn(e);
  }
};
const maybeThen = (promise, thenFn) => isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
const promiseAll = (promises) => promises.some(isPromise) ? Promise.all(promises) : promises;
const promiseAllLazy = (promises) => promises.length > 0 ? Promise.all(promises) : promises;
const isNotNullable = (v) => null != v;
const delay = (timeout) => new Promise((resolve) => {
  setTimeout(resolve, timeout);
});
const EMPTY_ARRAY = [];
const EMPTY_OBJ = {};
const getDocument = (node) => {
  if ("undefined" != typeof document) {
    return document;
  }
  if (9 === node.nodeType) {
    return node;
  }
  const doc = node.ownerDocument;
  return doc;
};
const OnRenderProp = "q:renderFn";
const QSlot = "q:slot";
const QSlotS = "q:s";
const QStyle = "q:style";
const QScopedStyle = "q:sstyle";
const QInstance$1 = "q:instance";
const getQFuncs = (document2, hash2) => document2["qFuncs_" + hash2] || [];
const ELEMENT_ID = "q:id";
const QOjectTargetSymbol = Symbol("proxy target");
const QObjectFlagsSymbol = Symbol("proxy flags");
const QObjectManagerSymbol = Symbol("proxy manager");
const _IMMUTABLE = Symbol("IMMUTABLE");
const Q_CTX = "_qc_";
const directSetAttribute = (el, prop, value) => el.setAttribute(prop, value);
const directGetAttribute = (el, prop) => el.getAttribute(prop);
const fromCamelToKebabCase = (text) => text.replace(/([A-Z])/g, "-$1").toLowerCase();
const fromKebabToCamelCase = (text) => text.replace(/-./g, (x) => x[1].toUpperCase());
const emitEvent$1 = (el, eventName, detail, bubbles) => {
  ("function" == typeof CustomEvent) && el && el.dispatchEvent(new CustomEvent(eventName, {
    detail,
    bubbles,
    composed: bubbles
  }));
};
const getOrCreateProxy = (target, containerState, flags = 0) => {
  const proxy = containerState.$proxyMap$.get(target);
  return proxy || (0 !== flags && setObjectFlags(target, flags), createProxy(target, containerState, void 0));
};
const createProxy = (target, containerState, subs) => {
  assertEqual(unwrapProxy(target)), assertTrue(!containerState.$proxyMap$.has(target));
  const manager = containerState.$subsManager$.$createManager$(subs);
  const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
  return containerState.$proxyMap$.set(target, proxy), proxy;
};
const createPropsState = () => {
  const props = {};
  return setObjectFlags(props, 2), props;
};
const setObjectFlags = (obj, flags) => {
  Object.defineProperty(obj, QObjectFlagsSymbol, {
    value: flags,
    enumerable: false
  });
};
class ReadWriteProxyHandler {
  $containerState$;
  $manager$;
  constructor($containerState$, $manager$) {
    this.$containerState$ = $containerState$, this.$manager$ = $manager$;
  }
  deleteProperty(target, prop) {
    if (2 & target[QObjectFlagsSymbol]) {
      throw qError(17);
    }
    return "string" == typeof prop && delete target[prop] && (this.$manager$.$notifySubs$(isArray(target) ? void 0 : prop), true);
  }
  get(target, prop) {
    if ("symbol" == typeof prop) {
      return prop === QOjectTargetSymbol ? target : prop === QObjectManagerSymbol ? this.$manager$ : target[prop];
    }
    const flags = target[QObjectFlagsSymbol] ?? 0;
    const invokeCtx = tryGetInvokeContext();
    const recursive = !!(1 & flags);
    const hiddenSignal = target["$$" + prop];
    let subscriber;
    let value;
    if (invokeCtx && (subscriber = invokeCtx.$subscriber$), !!!(2 & flags) || prop in target && !immutableValue(target[_IMMUTABLE]?.[prop]) || (subscriber = null), hiddenSignal ? (value = hiddenSignal.value, subscriber = null) : value = target[prop], subscriber) {
      const isA = isArray(target);
      this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
    }
    return recursive ? wrap(value, this.$containerState$) : value;
  }
  set(target, prop, newValue) {
    if ("symbol" == typeof prop) {
      return target[prop] = newValue, true;
    }
    const flags = target[QObjectFlagsSymbol] ?? 0;
    if (!!(2 & flags)) {
      throw qError(17);
    }
    const unwrappedNewValue = !!(1 & flags) ? unwrapProxy(newValue) : newValue;
    if (isArray(target)) {
      return target[prop] = unwrappedNewValue, this.$manager$.$notifySubs$(), true;
    }
    const oldValue = target[prop];
    return target[prop] = unwrappedNewValue, oldValue !== unwrappedNewValue && this.$manager$.$notifySubs$(prop), true;
  }
  has(target, prop) {
    if (prop === QOjectTargetSymbol) {
      return true;
    }
    const invokeCtx = tryGetInvokeContext();
    if ("string" == typeof prop && invokeCtx) {
      const subscriber = invokeCtx.$subscriber$;
      if (subscriber) {
        const isA = isArray(target);
        this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
      }
    }
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    return !!hasOwnProperty.call(target, prop) || !("string" != typeof prop || !hasOwnProperty.call(target, "$$" + prop));
  }
  ownKeys(target) {
    const flags = target[QObjectFlagsSymbol] ?? 0;
    if (!!!(2 & flags)) {
      let subscriber = null;
      const invokeCtx = tryGetInvokeContext();
      invokeCtx && (subscriber = invokeCtx.$subscriber$), subscriber && this.$manager$.$addSub$(subscriber);
    }
    return isArray(target) ? Reflect.ownKeys(target) : Reflect.ownKeys(target).map((a2) => "string" == typeof a2 && a2.startsWith("$$") ? a2.slice(2) : a2);
  }
  getOwnPropertyDescriptor(target, prop) {
    return isArray(target) || "symbol" == typeof prop ? Object.getOwnPropertyDescriptor(target, prop) : {
      enumerable: true,
      configurable: true
    };
  }
}
const immutableValue = (value) => value === _IMMUTABLE || isSignal(value);
const wrap = (value, containerState) => {
  if (isObject(value)) {
    if (Object.isFrozen(value)) {
      return value;
    }
    const nakedValue = unwrapProxy(value);
    if (nakedValue !== value) {
      return value;
    }
    if (fastSkipSerialize(nakedValue)) {
      return value;
    }
    if (isSerializableObject(nakedValue) || isArray(nakedValue)) {
      const proxy = containerState.$proxyMap$.get(nakedValue);
      return proxy || getOrCreateProxy(nakedValue, containerState, 1);
    }
  }
  return value;
};
const ON_PROP_REGEX = /^(on|window:|document:)/;
const PREVENT_DEFAULT = "preventdefault:";
const isOnProp = (prop) => prop.endsWith("$") && ON_PROP_REGEX.test(prop);
const groupListeners = (listeners) => {
  if (0 === listeners.length) {
    return EMPTY_ARRAY;
  }
  if (1 === listeners.length) {
    const listener = listeners[0];
    return [[listener[0], [listener[1]]]];
  }
  const keys = [];
  for (let i = 0; i < listeners.length; i++) {
    const eventName = listeners[i][0];
    keys.includes(eventName) || keys.push(eventName);
  }
  return keys.map((eventName) => [eventName, listeners.filter((l) => l[0] === eventName).map((a2) => a2[1])]);
};
const setEvent = (existingListeners, prop, input, containerEl) => {
  if (assertTrue(prop.endsWith("$")), prop = normalizeOnProp(prop.slice(0, -1)), input) {
    if (isArray(input)) {
      const processed = input.flat(1 / 0).filter((q) => null != q).map((q) => [prop, ensureQrl(q, containerEl)]);
      existingListeners.push(...processed);
    } else {
      existingListeners.push([prop, ensureQrl(input, containerEl)]);
    }
  }
  return prop;
};
const PREFIXES = ["on", "window:on", "document:on"];
const SCOPED = ["on", "on-window", "on-document"];
const normalizeOnProp = (prop) => {
  let scope = "on";
  for (let i = 0; i < PREFIXES.length; i++) {
    const prefix = PREFIXES[i];
    if (prop.startsWith(prefix)) {
      scope = SCOPED[i], prop = prop.slice(prefix.length);
      break;
    }
  }
  return scope + ":" + (prop = prop.startsWith("-") ? fromCamelToKebabCase(prop.slice(1)) : prop.toLowerCase());
};
const ensureQrl = (value, containerEl) => (value.$setContainer$(containerEl), value);
const getDomListeners = (elCtx, containerEl) => {
  const attributes = elCtx.$element$.attributes;
  const listeners = [];
  for (let i = 0; i < attributes.length; i++) {
    const { name, value } = attributes.item(i);
    if (name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:")) {
      const urls = value.split("\n");
      for (const url of urls) {
        const qrl2 = parseQRL(url, containerEl);
        qrl2.$capture$ && inflateQrl(qrl2, elCtx), listeners.push([name, qrl2]);
      }
    }
  }
  return listeners;
};
const serializeSStyle = (scopeIds) => {
  const value = scopeIds.join("|");
  if (value.length > 0) {
    return value;
  }
};
const useSequentialScope = () => {
  const iCtx = useInvokeContext();
  const elCtx = getContext(iCtx.$hostElement$, iCtx.$renderCtx$.$static$.$containerState$);
  const seq = elCtx.$seq$ ||= [];
  const i = iCtx.$i$++;
  return {
    val: seq[i],
    set: (value) => seq[i] = value,
    i,
    iCtx,
    elCtx
  };
};
const createContextId = (name) => (/* @__PURE__ */ Object.freeze({
  id: fromCamelToKebabCase(name)
}));
const findParentCtx = (el, containerState) => {
  let node = el;
  let stack = 1;
  for (; node && !node.hasAttribute?.("q:container"); ) {
    for (; node = node.previousSibling; ) {
      if (isComment(node)) {
        const virtual = node.__virtual;
        if (virtual) {
          const qtx = virtual[Q_CTX];
          if (node === virtual.open) {
            return qtx ?? getContext(virtual, containerState);
          }
          if (qtx?.$parentCtx$) {
            return qtx.$parentCtx$;
          }
          node = virtual;
          continue;
        }
        if ("/qv" === node.data) {
          stack++;
        } else if (node.data.startsWith("qv ") && (stack--, 0 === stack)) {
          return getContext(getVirtualElement(node), containerState);
        }
      }
    }
    node = el.parentElement, el = node;
  }
  return null;
};
const getParentProvider = (ctx, containerState) => (void 0 === ctx.$parentCtx$ && (ctx.$parentCtx$ = findParentCtx(ctx.$element$, containerState)), ctx.$parentCtx$);
const resolveContext = (context, hostCtx, containerState) => {
  const contextID = context.id;
  if (!hostCtx) {
    return;
  }
  let ctx = hostCtx;
  for (; ctx; ) {
    const found = ctx.$contexts$?.get(contextID);
    if (found) {
      return found;
    }
    ctx = getParentProvider(ctx, containerState);
  }
};
const ERROR_CONTEXT = /* @__PURE__ */ createContextId("qk-error");
const handleError = (err, hostElement, rCtx) => {
  const elCtx = tryGetContext(hostElement);
  if (isServerPlatform()) {
    throw err;
  }
  {
    const errorStore = resolveContext(ERROR_CONTEXT, elCtx, rCtx.$static$.$containerState$);
    if (void 0 === errorStore) {
      throw err;
    }
    errorStore.error = err;
  }
};
const unitlessNumbers = /* @__PURE__ */ new Set(["animationIterationCount", "aspectRatio", "borderImageOutset", "borderImageSlice", "borderImageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "columns", "flex", "flexGrow", "flexShrink", "gridArea", "gridRow", "gridRowEnd", "gridRowStart", "gridColumn", "gridColumnEnd", "gridColumnStart", "fontWeight", "lineClamp", "lineHeight", "opacity", "order", "orphans", "scale", "tabSize", "widows", "zIndex", "zoom", "MozAnimationIterationCount", "MozBoxFlex", "msFlex", "msFlexPositive", "WebkitAnimationIterationCount", "WebkitBoxFlex", "WebkitBoxOrdinalGroup", "WebkitColumnCount", "WebkitColumns", "WebkitFlex", "WebkitFlexGrow", "WebkitFlexShrink", "WebkitLineClamp"]);
const isUnitlessNumber = (name) => unitlessNumbers.has(name);
const executeComponent = (rCtx, elCtx, attempt) => {
  elCtx.$flags$ &= ~HOST_FLAG_DIRTY, elCtx.$flags$ |= HOST_FLAG_MOUNTED, elCtx.$slots$ = [], elCtx.li.length = 0;
  const hostElement = elCtx.$element$;
  const componentQRL = elCtx.$componentQrl$;
  const props = elCtx.$props$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qRender");
  const waitOn = iCtx.$waitOn$ = [];
  const newCtx = pushRenderContext(rCtx);
  newCtx.$cmpCtx$ = elCtx, newCtx.$slotCtx$ = void 0, iCtx.$subscriber$ = [0, hostElement], iCtx.$renderCtx$ = rCtx, componentQRL.$setContainer$(rCtx.$static$.$containerState$.$containerEl$);
  const componentFn = componentQRL.getFn(iCtx);
  return safeCall(() => componentFn(props), (jsxNode) => maybeThen(isServerPlatform() ? maybeThen(promiseAllLazy(waitOn), () => maybeThen(executeSSRTasks(rCtx.$static$.$containerState$, rCtx), () => promiseAllLazy(waitOn))) : promiseAllLazy(waitOn), () => {
    if (elCtx.$flags$ & HOST_FLAG_DIRTY) {
      if (!(attempt && attempt > 100)) {
        return executeComponent(rCtx, elCtx, attempt ? attempt + 1 : 1);
      }
      logWarn(`Infinite loop detected. Element: ${elCtx.$componentQrl$?.$symbol$}`);
    }
    return {
      node: jsxNode,
      rCtx: newCtx
    };
  }), (err) => {
    if (err === SignalUnassignedException) {
      if (!(attempt && attempt > 100)) {
        return maybeThen(promiseAllLazy(waitOn), () => executeComponent(rCtx, elCtx, attempt ? attempt + 1 : 1));
      }
      logWarn(`Infinite loop detected. Element: ${elCtx.$componentQrl$?.$symbol$}`);
    }
    return handleError(err, hostElement, rCtx), {
      node: SkipRender,
      rCtx: newCtx
    };
  });
};
const createRenderContext = (doc, containerState) => {
  const ctx = {
    $static$: {
      $doc$: doc,
      $locale$: containerState.$serverData$.locale,
      $containerState$: containerState,
      $hostElements$: /* @__PURE__ */ new Set(),
      $operations$: [],
      $postOperations$: [],
      $roots$: [],
      $addSlots$: [],
      $rmSlots$: [],
      $visited$: []
    },
    $cmpCtx$: null,
    $slotCtx$: void 0
  };
  return ctx;
};
const pushRenderContext = (ctx) => ({
  $static$: ctx.$static$,
  $cmpCtx$: ctx.$cmpCtx$,
  $slotCtx$: ctx.$slotCtx$
});
const serializeClassWithHost = (obj, hostCtx) => hostCtx?.$scopeIds$?.length ? hostCtx.$scopeIds$.join(" ") + " " + serializeClass(obj) : serializeClass(obj);
const serializeClass = (obj) => {
  if (!obj) {
    return "";
  }
  if (isString(obj)) {
    return obj.trim();
  }
  const classes = [];
  if (isArray(obj)) {
    for (const o of obj) {
      const classList = serializeClass(o);
      classList && classes.push(classList);
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      value && classes.push(key.trim());
    }
  }
  return classes.join(" ");
};
const stringifyStyle = (obj) => {
  if (null == obj) {
    return "";
  }
  if ("object" == typeof obj) {
    if (isArray(obj)) {
      throw qError(0, obj, "style");
    }
    {
      const chunks = [];
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          null != value && "function" != typeof value && (key.startsWith("--") ? chunks.push(key + ":" + value) : chunks.push(fromCamelToKebabCase(key) + ":" + setValueForStyle(key, value)));
        }
      }
      return chunks.join(";");
    }
  }
  return String(obj);
};
const setValueForStyle = (styleName, value) => "number" != typeof value || 0 === value || isUnitlessNumber(styleName) ? value : value + "px";
const getNextIndex = (ctx) => intToStr(ctx.$static$.$containerState$.$elementIndex$++);
const setQId = (rCtx, elCtx) => {
  const id = getNextIndex(rCtx);
  elCtx.$id$ = id;
};
const jsxToString = (data) => isSignal(data) ? jsxToString(data.value) : null == data || "boolean" == typeof data ? "" : String(data);
function isAriaAttribute(prop) {
  return prop.startsWith("aria-");
}
const shouldWrapFunctional = (res, node) => !!node.key && (!isJSXNode(res) || !isFunction(res.type) && res.key != node.key);
const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
const FLUSH_COMMENT = "<!--qkssr-f-->";
class MockElement {
  nodeType;
  [Q_CTX] = null;
  constructor(nodeType) {
    this.nodeType = nodeType;
  }
}
const createDocument = () => new MockElement(9);
const _renderSSR = async (node, opts) => {
  const root = opts.containerTagName;
  const containerEl = createMockQContext(1).$element$;
  const containerState = createContainerState(containerEl, opts.base ?? "/");
  containerState.$serverData$.locale = opts.serverData?.locale;
  const doc = createDocument();
  const rCtx = createRenderContext(doc, containerState);
  const headNodes = opts.beforeContent ?? [];
  const ssrCtx = {
    $static$: {
      $contexts$: [],
      $headNodes$: "html" === root ? headNodes : [],
      $locale$: opts.serverData?.locale,
      $textNodes$: /* @__PURE__ */ new Map()
    },
    $projectedChildren$: void 0,
    $projectedCtxs$: void 0,
    $invocationContext$: void 0
  };
  const locale = opts.serverData?.locale;
  const containerAttributes = opts.containerAttributes;
  const qRender = containerAttributes["q:render"];
  containerAttributes["q:container"] = "paused", containerAttributes["q:version"] = "1.12.0", containerAttributes["q:render"] = (qRender ? qRender + "-" : "") + "ssr", containerAttributes["q:base"] = opts.base || "", containerAttributes["q:locale"] = locale, containerAttributes["q:manifest-hash"] = opts.manifestHash, containerAttributes["q:instance"] = hash$1();
  const children = "html" === root ? [node] : [headNodes, node];
  "html" !== root && (containerAttributes.class = "qc📦" + (containerAttributes.class ? " " + containerAttributes.class : ""));
  const serverData = containerState.$serverData$ = {
    ...containerState.$serverData$,
    ...opts.serverData
  };
  serverData.containerAttributes = {
    ...serverData.containerAttributes,
    ...containerAttributes
  };
  (ssrCtx.$invocationContext$ = newInvokeContext(locale)).$renderCtx$ = rCtx;
  const rootNode = _jsxQ(root, null, containerAttributes, children, HOST_FLAG_DIRTY | HOST_FLAG_NEED_ATTACH_LISTENER, null);
  containerState.$hostsRendering$ = /* @__PURE__ */ new Set(), await Promise.resolve().then(() => renderRoot$1(rootNode, rCtx, ssrCtx, opts.stream, containerState, opts));
};
const hash$1 = () => Math.random().toString(36).slice(2);
const renderRoot$1 = async (node, rCtx, ssrCtx, stream, containerState, opts) => {
  const beforeClose = opts.beforeClose;
  return await renderNode(node, rCtx, ssrCtx, stream, 0, beforeClose ? (stream2) => {
    const result = beforeClose(ssrCtx.$static$.$contexts$, containerState, false, ssrCtx.$static$.$textNodes$);
    return processData$1(result, rCtx, ssrCtx, stream2, 0, void 0);
  } : void 0), rCtx;
};
const renderGenerator = async (node, rCtx, ssrCtx, stream, flags) => {
  stream.write(FLUSH_COMMENT);
  const generator = node.props.children;
  let value;
  if (isFunction(generator)) {
    const v = generator({
      write(chunk) {
        stream.write(chunk), stream.write(FLUSH_COMMENT);
      }
    });
    if (isPromise(v)) {
      return v;
    }
    value = v;
  } else {
    value = generator;
  }
  for await (const chunk of value) {
    await processData$1(chunk, rCtx, ssrCtx, stream, flags, void 0), stream.write(FLUSH_COMMENT);
  }
};
const renderNodeVirtual = (node, elCtx, extraNodes, rCtx, ssrCtx, stream, flags, beforeClose) => {
  const props = node.props;
  const renderQrl = props["q:renderFn"];
  if (renderQrl) {
    return elCtx.$componentQrl$ = renderQrl, renderSSRComponent(rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose);
  }
  let virtualComment = "<!--qv" + renderVirtualAttributes(props);
  const isSlot = "q:s" in props;
  const key = null != node.key ? String(node.key) : null;
  isSlot && (assertDefined(rCtx.$cmpCtx$?.$id$), virtualComment += " q:sref=" + rCtx.$cmpCtx$.$id$), null != key && (virtualComment += " q:key=" + key), virtualComment += "-->", stream.write(virtualComment);
  const html = node.props[dangerouslySetInnerHTML];
  if (html) {
    return stream.write(html), void stream.write(CLOSE_VIRTUAL);
  }
  if (extraNodes) {
    for (const node2 of extraNodes) {
      renderNodeElementSync(node2.type, node2.props, stream);
    }
  }
  const promise = walkChildren(node.children, rCtx, ssrCtx, stream, flags);
  return maybeThen(promise, () => {
    if (!isSlot && !beforeClose) {
      return void stream.write(CLOSE_VIRTUAL);
    }
    let promise2;
    if (isSlot) {
      const content = ssrCtx.$projectedChildren$?.[key];
      if (content) {
        const [rCtx2, sCtx] = ssrCtx.$projectedCtxs$;
        const newSlotRctx = pushRenderContext(rCtx2);
        newSlotRctx.$slotCtx$ = elCtx, ssrCtx.$projectedChildren$[key] = void 0, promise2 = processData$1(content, newSlotRctx, sCtx, stream, flags);
      }
    }
    return beforeClose && (promise2 = maybeThen(promise2, () => beforeClose(stream))), maybeThen(promise2, () => {
      stream.write(CLOSE_VIRTUAL);
    });
  });
};
const CLOSE_VIRTUAL = "<!--/qv-->";
const renderAttributes = (attributes) => {
  let text = "";
  for (const prop in attributes) {
    if (prop === dangerouslySetInnerHTML) {
      continue;
    }
    const value = attributes[prop];
    null != value && (text += " " + ("" === value ? prop : prop + '="' + value + '"'));
  }
  return text;
};
const renderVirtualAttributes = (attributes) => {
  let text = "";
  for (const prop in attributes) {
    if ("children" === prop || prop === dangerouslySetInnerHTML) {
      continue;
    }
    const value = attributes[prop];
    null != value && (text += " " + ("" === value ? prop : prop + "=" + value));
  }
  return text;
};
const renderNodeElementSync = (tagName, attributes, stream) => {
  stream.write("<" + tagName + renderAttributes(attributes) + ">");
  if (!!emptyElements[tagName]) {
    return;
  }
  const innerHTML = attributes[dangerouslySetInnerHTML];
  null != innerHTML && stream.write(innerHTML), stream.write(`</${tagName}>`);
};
const renderSSRComponent = (rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose) => (setComponentProps$1(rCtx, elCtx, node.props.props), maybeThen(executeComponent(rCtx, elCtx), (res) => {
  const hostElement = elCtx.$element$;
  const newRCtx = res.rCtx;
  const iCtx = newInvokeContext(ssrCtx.$static$.$locale$, hostElement, void 0);
  iCtx.$subscriber$ = [0, hostElement], iCtx.$renderCtx$ = newRCtx;
  const newSSrContext = {
    $static$: ssrCtx.$static$,
    $projectedChildren$: splitProjectedChildren(node.children, ssrCtx),
    $projectedCtxs$: [rCtx, ssrCtx],
    $invocationContext$: iCtx
  };
  const extraNodes = [];
  if (elCtx.$appendStyles$) {
    const array = !!(4 & flags) ? ssrCtx.$static$.$headNodes$ : extraNodes;
    for (const style of elCtx.$appendStyles$) {
      array.push(_jsxQ("style", {
        [QStyle]: style.styleId,
        [dangerouslySetInnerHTML]: style.content,
        hidden: ""
      }, null, null, 0, null));
    }
  }
  const newID = getNextIndex(rCtx);
  const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : void 0;
  const processedNode = _jsxC(node.type, {
    [QScopedStyle]: scopeId,
    [ELEMENT_ID]: newID,
    children: res.node
  }, 0, node.key);
  return elCtx.$id$ = newID, ssrCtx.$static$.$contexts$.push(elCtx), renderNodeVirtual(processedNode, elCtx, extraNodes, newRCtx, newSSrContext, stream, flags, (stream2) => {
    if (elCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
      const placeholderCtx = createMockQContext(1);
      const listeners = placeholderCtx.li;
      listeners.push(...elCtx.li), elCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER, placeholderCtx.$id$ = getNextIndex(rCtx);
      const attributes = {
        type: "placeholder",
        hidden: "",
        "q:id": placeholderCtx.$id$
      };
      ssrCtx.$static$.$contexts$.push(placeholderCtx);
      const groups = groupListeners(listeners);
      for (const listener of groups) {
        const eventName = normalizeInvisibleEvents(listener[0]);
        attributes[eventName] = serializeQRLs(listener[1], rCtx.$static$.$containerState$, placeholderCtx), registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
      }
      renderNodeElementSync("script", attributes, stream2);
    }
    const projectedChildren = newSSrContext.$projectedChildren$;
    let missingSlotsDone;
    if (projectedChildren) {
      const nodes = Object.keys(projectedChildren).map((slotName) => {
        const content = projectedChildren[slotName];
        if (content) {
          return _jsxQ("q:template", {
            [QSlot]: slotName || true,
            hidden: true,
            "aria-hidden": "true"
          }, null, content, 0, null);
        }
      });
      const [_rCtx, sCtx] = newSSrContext.$projectedCtxs$;
      const newSlotRctx = pushRenderContext(_rCtx);
      newSlotRctx.$slotCtx$ = elCtx, missingSlotsDone = processData$1(nodes, newSlotRctx, sCtx, stream2, 0, void 0);
    }
    return beforeClose ? maybeThen(missingSlotsDone, () => beforeClose(stream2)) : missingSlotsDone;
  });
}));
const splitProjectedChildren = (children, ssrCtx) => {
  const flatChildren = flatVirtualChildren(children, ssrCtx);
  if (null === flatChildren) {
    return;
  }
  const slotMap = {};
  for (const child of flatChildren) {
    let slotName = "";
    isJSXNode(child) && (slotName = child.props[QSlot] || ""), (slotMap[slotName] ||= []).push(child);
  }
  return slotMap;
};
const createMockQContext = (nodeType) => {
  const elm = new MockElement(nodeType);
  return createContext(elm);
};
const renderNode = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
  const tagName = node.type;
  const hostCtx = rCtx.$cmpCtx$;
  if ("string" == typeof tagName) {
    const key = node.key;
    const props = node.props;
    const immutable = node.immutableProps || EMPTY_OBJ;
    const elCtx = createMockQContext(1);
    const elm = elCtx.$element$;
    const isHead = "head" === tagName;
    let openingElement = "<" + tagName;
    let useSignal2 = false;
    let hasRef = false;
    let classStr = "";
    let htmlStr = null;
    const handleProp = (rawProp, value, isImmutable) => {
      if ("ref" === rawProp) {
        return void (void 0 !== value && (setRef(value, elm), hasRef = true));
      }
      if (isOnProp(rawProp)) {
        return void setEvent(elCtx.li, rawProp, value, void 0);
      }
      if (isSignal(value) && (value = trackSignal(value, isImmutable ? [1, elm, value, hostCtx.$element$, rawProp] : [2, hostCtx.$element$, value, elm, rawProp]), useSignal2 = true), rawProp === dangerouslySetInnerHTML) {
        return void (htmlStr = value);
      }
      let attrValue;
      rawProp.startsWith(PREVENT_DEFAULT) && registerQwikEvent$1(rawProp.slice(15), rCtx.$static$.$containerState$);
      const prop = "htmlFor" === rawProp ? "for" : rawProp;
      "class" === prop || "className" === prop ? classStr = serializeClass(value) : "style" === prop ? attrValue = stringifyStyle(value) : isAriaAttribute(prop) || "draggable" === prop || "spellcheck" === prop ? (attrValue = null != value ? String(value) : null, value = attrValue) : attrValue = false === value || null == value ? null : String(value), null != attrValue && ("value" === prop && "textarea" === tagName ? htmlStr = escapeHtml(attrValue) : isSSRUnsafeAttr(prop) || (openingElement += " " + (true === value ? prop : prop + '="' + escapeHtml(attrValue) + '"')));
    };
    for (const prop in props) {
      let isImmutable = false;
      let value;
      prop in immutable ? (isImmutable = true, value = immutable[prop], value === _IMMUTABLE && (value = props[prop])) : value = props[prop], handleProp(prop, value, isImmutable);
    }
    for (const prop in immutable) {
      if (prop in props) {
        continue;
      }
      const value = immutable[prop];
      value !== _IMMUTABLE && handleProp(prop, value, true);
    }
    const listeners = elCtx.li;
    if (hostCtx) {
      if (hostCtx.$scopeIds$?.length) {
        const extra = hostCtx.$scopeIds$.join(" ");
        classStr = classStr ? `${extra} ${classStr}` : extra;
      }
      hostCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (listeners.push(...hostCtx.li), hostCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER);
    }
    if (isHead && (flags |= 1), tagName in invisibleElements && (flags |= 16), tagName in textOnlyElements && (flags |= 8), classStr && (openingElement += ' class="' + escapeHtml(classStr) + '"'), listeners.length > 0) {
      const groups = groupListeners(listeners);
      const isInvisible = !!(16 & flags);
      for (const listener of groups) {
        const eventName = isInvisible ? normalizeInvisibleEvents(listener[0]) : listener[0];
        openingElement += " " + eventName + '="' + serializeQRLs(listener[1], rCtx.$static$.$containerState$, elCtx) + '"', registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
      }
    }
    if (null != key && (openingElement += ' q:key="' + escapeHtml(key) + '"'), hasRef || useSignal2 || listeners.length > 0) {
      if (hasRef || useSignal2 || listenersNeedId(listeners)) {
        const newID = getNextIndex(rCtx);
        openingElement += ' q:id="' + newID + '"', elCtx.$id$ = newID;
      }
      ssrCtx.$static$.$contexts$.push(elCtx);
    }
    if (1 & flags && (openingElement += " q:head"), openingElement += ">", stream.write(openingElement), tagName in emptyElements) {
      return;
    }
    if (null != htmlStr) {
      return stream.write(String(htmlStr)), void stream.write(`</${tagName}>`);
    }
    "html" === tagName ? flags |= 4 : flags &= -5, 2 & node.flags && (flags |= 1024);
    const promise = processData$1(node.children, rCtx, ssrCtx, stream, flags);
    return maybeThen(promise, () => {
      if (isHead) {
        for (const node2 of ssrCtx.$static$.$headNodes$) {
          renderNodeElementSync(node2.type, node2.props, stream);
        }
        ssrCtx.$static$.$headNodes$.length = 0;
      }
      if (beforeClose) {
        return maybeThen(beforeClose(stream), () => {
          stream.write(`</${tagName}>`);
        });
      }
      stream.write(`</${tagName}>`);
    });
  }
  if (tagName === Virtual) {
    const elCtx = createMockQContext(111);
    return rCtx.$slotCtx$ ? (elCtx.$parentCtx$ = rCtx.$slotCtx$, elCtx.$realParentCtx$ = rCtx.$cmpCtx$) : elCtx.$parentCtx$ = rCtx.$cmpCtx$, hostCtx && hostCtx.$flags$ & HOST_FLAG_DYNAMIC && addDynamicSlot(hostCtx, elCtx), renderNodeVirtual(node, elCtx, void 0, rCtx, ssrCtx, stream, flags, beforeClose);
  }
  if (tagName === SSRRaw) {
    return void stream.write(node.props.data);
  }
  if (tagName === InternalSSRStream) {
    return renderGenerator(node, rCtx, ssrCtx, stream, flags);
  }
  const res = invoke(ssrCtx.$invocationContext$, tagName, node.props, node.key, node.flags, node.dev);
  return shouldWrapFunctional(res, node) ? renderNode(_jsxC(Virtual, {
    children: res
  }, 0, node.key), rCtx, ssrCtx, stream, flags, beforeClose) : processData$1(res, rCtx, ssrCtx, stream, flags, beforeClose);
};
const processData$1 = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
  if (null != node && "boolean" != typeof node) {
    if (!isString(node) && "number" != typeof node) {
      if (isJSXNode(node)) {
        return renderNode(node, rCtx, ssrCtx, stream, flags, beforeClose);
      }
      if (isArray(node)) {
        return walkChildren(node, rCtx, ssrCtx, stream, flags);
      }
      if (isSignal(node)) {
        const insideText = 8 & flags;
        const hostEl = rCtx.$cmpCtx$?.$element$;
        let value;
        if (hostEl) {
          if (!insideText) {
            const id = getNextIndex(rCtx);
            if (value = trackSignal(node, 1024 & flags ? [3, "#" + id, node, "#" + id] : [4, hostEl, node, "#" + id]), isString(value)) {
              const str = jsxToString(value);
              ssrCtx.$static$.$textNodes$.set(str, id);
            }
            return stream.write(`<!--t=${id}-->`), processData$1(value, rCtx, ssrCtx, stream, flags, beforeClose), void stream.write("<!---->");
          }
          value = invoke(ssrCtx.$invocationContext$, () => node.value);
        }
        return void stream.write(escapeHtml(jsxToString(value)));
      }
      return isPromise(node) ? (stream.write(FLUSH_COMMENT), node.then((node2) => processData$1(node2, rCtx, ssrCtx, stream, flags, beforeClose))) : void logWarn();
    }
    stream.write(escapeHtml(String(node)));
  }
};
const walkChildren = (children, rCtx, ssrContext, stream, flags) => {
  if (null == children) {
    return;
  }
  if (!isArray(children)) {
    return processData$1(children, rCtx, ssrContext, stream, flags);
  }
  const len = children.length;
  if (1 === len) {
    return processData$1(children[0], rCtx, ssrContext, stream, flags);
  }
  if (0 === len) {
    return;
  }
  let currentIndex = 0;
  const buffers = [];
  return children.reduce((prevPromise, child, index) => {
    const buffer = [];
    buffers.push(buffer);
    const rendered = processData$1(child, rCtx, ssrContext, prevPromise ? {
      write(chunk) {
        currentIndex === index ? stream.write(chunk) : buffer.push(chunk);
      }
    } : stream, flags);
    if (prevPromise || isPromise(rendered)) {
      const next = () => {
        currentIndex++, buffers.length > currentIndex && buffers[currentIndex].forEach((chunk) => stream.write(chunk));
      };
      return isPromise(rendered) ? prevPromise ? Promise.all([rendered, prevPromise]).then(next) : rendered.then(next) : prevPromise.then(next);
    }
    currentIndex++;
  }, void 0);
};
const flatVirtualChildren = (children, ssrCtx) => {
  if (null == children) {
    return null;
  }
  const result = _flatVirtualChildren(children, ssrCtx);
  const nodes = isArray(result) ? result : [result];
  return 0 === nodes.length ? null : nodes;
};
const _flatVirtualChildren = (children, ssrCtx) => {
  if (null == children) {
    return null;
  }
  if (isArray(children)) {
    return children.flatMap((c) => _flatVirtualChildren(c, ssrCtx));
  }
  if (isJSXNode(children) && isFunction(children.type) && children.type !== SSRRaw && children.type !== InternalSSRStream && children.type !== Virtual) {
    const res = invoke(ssrCtx.$invocationContext$, children.type, children.props, children.key, children.flags);
    return flatVirtualChildren(res, ssrCtx);
  }
  return children;
};
const setComponentProps$1 = (rCtx, elCtx, expectProps) => {
  const keys = Object.keys(expectProps);
  const target = createPropsState();
  if (elCtx.$props$ = createProxy(target, rCtx.$static$.$containerState$), 0 === keys.length) {
    return;
  }
  const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
  for (const prop of keys) {
    "children" !== prop && prop !== QSlot && (isSignal(immutableMeta[prop]) ? target["$$" + prop] = immutableMeta[prop] : target[prop] = expectProps[prop]);
  }
};
const invisibleElements = {
  head: true,
  style: true,
  script: true,
  link: true,
  meta: true
};
const textOnlyElements = {
  title: true,
  style: true,
  script: true,
  noframes: true,
  textarea: true
};
const emptyElements = {
  area: true,
  base: true,
  basefont: true,
  bgsound: true,
  br: true,
  col: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};
const ESCAPE_HTML = /[&<>'"]/g;
const registerQwikEvent$1 = (prop, containerState) => {
  containerState.$events$.add(getEventName(prop));
};
const escapeHtml = (s) => s.replace(ESCAPE_HTML, (c) => {
  switch (c) {
    case "&":
      return "&amp;";
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    case '"':
      return "&quot;";
    case "'":
      return "&#39;";
    default:
      return "";
  }
});
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const isSSRUnsafeAttr = (name) => unsafeAttrCharRE.test(name);
const listenersNeedId = (listeners) => listeners.some((l) => l[1].$captureRef$ && l[1].$captureRef$.length > 0);
const addDynamicSlot = (hostCtx, elCtx) => {
  const dynamicSlots = hostCtx.$dynamicSlots$ ||= [];
  dynamicSlots.includes(elCtx) || dynamicSlots.push(elCtx);
};
const normalizeInvisibleEvents = (eventName) => "on:qvisible" === eventName ? "on-document:qinit" : eventName;
const _fnSignal = (fn, args, fnStr) => new SignalDerived(fn, args, fnStr);
const serializeDerivedSignalFunc = (signal) => {
  const fnBody = signal.$funcStr$;
  let args = "";
  for (let i = 0; i < signal.$args$.length; i++) {
    args += `p${i},`;
  }
  return `(${args})=>(${fnBody})`;
};
const _jsxQ = (type, mutableProps, immutableProps, children, flags, key) => {
  const processed = null == key ? null : String(key);
  const node = new JSXNodeImpl(type, mutableProps || EMPTY_OBJ, immutableProps, children, flags, processed);
  return node;
};
const _jsxS = (type, mutableProps, immutableProps, flags, key, dev) => {
  let children = null;
  return "children" in mutableProps && (children = mutableProps.children, delete mutableProps.children), _jsxQ(type, mutableProps, immutableProps, children, flags, key);
};
const _jsxC = (type, mutableProps, flags, key, dev) => {
  const processed = null == key ? null : String(key);
  const props = mutableProps ?? {};
  if ("string" == typeof type && _IMMUTABLE in props) {
    const immutableProps = props[_IMMUTABLE];
    delete props[_IMMUTABLE];
    const children = props.children;
    delete props.children;
    for (const [k, v] of Object.entries(immutableProps)) {
      v !== _IMMUTABLE && (delete props[k], props[k] = v);
    }
    return _jsxQ(type, null, props, children, flags, key);
  }
  const node = new JSXNodeImpl(type, props, null, props.children, flags, processed);
  return "string" == typeof type && mutableProps && delete mutableProps.children, node;
};
const jsx = (type, props, key) => {
  const processed = null ;
  const children = untrack(() => {
    const c = props.children;
    return "string" == typeof type && delete props.children, c;
  });
  isString(type) && "className" in props && (props.class = props.className, delete props.className);
  const node = new JSXNodeImpl(type, props, null, children, 0, processed);
  return node;
};
class JSXNodeImpl {
  type;
  props;
  immutableProps;
  children;
  flags;
  key;
  dev;
  constructor(type, props, immutableProps, children, flags, key = null) {
    this.type = type, this.props = props, this.immutableProps = immutableProps, this.children = children, this.flags = flags, this.key = key;
  }
}
const Virtual = (props) => props.children;
const isJSXNode = (n) => n instanceof JSXNodeImpl;
const Fragment = (props) => props.children;
const SkipRender = Symbol("skip render");
const SSRRaw = () => null;
const InternalSSRStream = () => null;
const renderComponent = (rCtx, elCtx, flags) => {
  const justMounted = !(elCtx.$flags$ & HOST_FLAG_MOUNTED);
  const hostElement = elCtx.$element$;
  const containerState = rCtx.$static$.$containerState$;
  return containerState.$hostsStaging$.delete(elCtx), containerState.$subsManager$.$clearSub$(hostElement), maybeThen(executeComponent(rCtx, elCtx), (res) => {
    const staticCtx = rCtx.$static$;
    const newCtx = res.rCtx;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement);
    if (staticCtx.$hostElements$.add(hostElement), iCtx.$subscriber$ = [0, hostElement], iCtx.$renderCtx$ = newCtx, justMounted && elCtx.$appendStyles$) {
      for (const style of elCtx.$appendStyles$) {
        appendHeadStyle(staticCtx, style);
      }
    }
    const processedJSXNode = processData(res.node, iCtx);
    return maybeThen(processedJSXNode, (processedJSXNode2) => {
      const newVdom = wrapJSX(hostElement, processedJSXNode2);
      const oldVdom = getVdom(elCtx);
      return maybeThen(smartUpdateChildren(newCtx, oldVdom, newVdom, flags), () => {
        elCtx.$vdom$ = newVdom;
      });
    });
  });
};
const getVdom = (elCtx) => (elCtx.$vdom$ || (elCtx.$vdom$ = domToVnode(elCtx.$element$)), elCtx.$vdom$);
class ProcessedJSXNodeImpl {
  $type$;
  $props$;
  $immutableProps$;
  $children$;
  $flags$;
  $key$;
  $elm$ = null;
  $text$ = "";
  $signal$ = null;
  $id$;
  $dev$;
  constructor($type$, $props$, $immutableProps$, $children$, $flags$, $key$) {
    this.$type$ = $type$, this.$props$ = $props$, this.$immutableProps$ = $immutableProps$, this.$children$ = $children$, this.$flags$ = $flags$, this.$key$ = $key$, this.$id$ = $type$ + ($key$ ? ":" + $key$ : "");
  }
}
const processNode = (node, invocationContext) => {
  const { key, type, props, children, flags, immutableProps } = node;
  let textType = "";
  if (isString(type)) {
    textType = type;
  } else {
    if (type !== Virtual) {
      if (isFunction(type)) {
        const res = invoke(invocationContext, type, props, key, flags, node.dev);
        return shouldWrapFunctional(res, node) ? processNode(_jsxC(Virtual, {
          children: res
        }, 0, key), invocationContext) : processData(res, invocationContext);
      }
      throw qError(25, type);
    }
    textType = VIRTUAL;
  }
  let convertedChildren = EMPTY_ARRAY;
  if (null != children) {
    return maybeThen(processData(children, invocationContext), (result) => {
      void 0 !== result && (convertedChildren = isArray(result) ? result : [result]);
      const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
      return vnode;
    });
  }
  {
    const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
    return vnode;
  }
};
const wrapJSX = (element, input) => {
  const children = void 0 === input ? EMPTY_ARRAY : isArray(input) ? input : [input];
  const node = new ProcessedJSXNodeImpl(":virtual", {}, null, children, 0, null);
  return node.$elm$ = element, node;
};
const processData = (node, invocationContext) => {
  if (null != node && "boolean" != typeof node) {
    if (isPrimitive(node)) {
      const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
      return newNode.$text$ = String(node), newNode;
    }
    if (isJSXNode(node)) {
      return processNode(node, invocationContext);
    }
    if (isSignal(node)) {
      const newNode = new ProcessedJSXNodeImpl("#signal", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
      return newNode.$signal$ = node, newNode;
    }
    if (isArray(node)) {
      const output = promiseAll(node.flatMap((n) => processData(n, invocationContext)));
      return maybeThen(output, (array) => array.flat(100).filter(isNotNullable));
    }
    return isPromise(node) ? node.then((node2) => processData(node2, invocationContext)) : node === SkipRender ? new ProcessedJSXNodeImpl(":skipRender", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null) : void logWarn();
  }
};
const isPrimitive = (obj) => isString(obj) || "number" == typeof obj;
const resumeIfNeeded = (containerEl) => {
  "paused" === directGetAttribute(containerEl, "q:container") && (resumeContainer(containerEl), appendQwikDevTools(containerEl));
};
const getPauseState = (containerEl) => {
  const doc = getDocument(containerEl);
  const script = getQwikJSON(containerEl === doc.documentElement ? doc.body : containerEl, "type");
  if (script) {
    return JSON.parse(unescapeText(script.firstChild.data) || "{}");
  }
};
const resumeContainer = (containerEl) => {
  if (!isContainer$1(containerEl)) {
    return void logWarn();
  }
  const pauseState = containerEl._qwikjson_ ?? getPauseState(containerEl);
  if (containerEl._qwikjson_ = null, !pauseState) {
    return void logWarn();
  }
  const doc = getDocument(containerEl);
  const hash2 = containerEl.getAttribute(QInstance$1);
  const inlinedFunctions = getQFuncs(doc, hash2);
  const containerState = _getContainerState(containerEl);
  const elements = /* @__PURE__ */ new Map();
  const text = /* @__PURE__ */ new Map();
  let node = null;
  let container = 0;
  const elementWalker = doc.createTreeWalker(containerEl, SHOW_COMMENT$1);
  for (; node = elementWalker.nextNode(); ) {
    const data = node.data;
    if (0 === container) {
      if (data.startsWith("qv ")) {
        const id = getID(data);
        id >= 0 && elements.set(id, node);
      } else if (data.startsWith("t=")) {
        const id = data.slice(2);
        const index = strToInt(id);
        const textNode = getTextNode(node);
        elements.set(index, textNode), text.set(index, textNode.data);
      }
    }
    "cq" === data ? container++ : "/cq" === data && container--;
  }
  const slotPath = 0 !== containerEl.getElementsByClassName("qc📦").length;
  containerEl.querySelectorAll("[q\\:id]").forEach((el) => {
    if (slotPath && el.closest("[q\\:container]") !== containerEl) {
      return;
    }
    const id = directGetAttribute(el, "q:id");
    const index = strToInt(id);
    elements.set(index, el);
  });
  const parser = createParser(containerState, doc);
  const finalized = /* @__PURE__ */ new Map();
  const revived = /* @__PURE__ */ new Set();
  const getObject = (id) => (assertTrue("string" == typeof id && id.length > 0), finalized.has(id) ? finalized.get(id) : computeObject(id));
  const computeObject = (id) => {
    if (id.startsWith("#")) {
      const elementId = id.slice(1);
      const index2 = strToInt(elementId);
      assertTrue(elements.has(index2));
      const rawElement = elements.get(index2);
      if (isComment(rawElement)) {
        if (!rawElement.isConnected) {
          return void finalized.set(id, void 0);
        }
        const virtual = getVirtualElement(rawElement);
        return finalized.set(id, virtual), getContext(virtual, containerState), virtual;
      }
      return isElement$1(rawElement) ? (finalized.set(id, rawElement), getContext(rawElement, containerState), rawElement) : (finalized.set(id, rawElement), rawElement);
    }
    if (id.startsWith("@")) {
      const funcId = id.slice(1);
      const index2 = strToInt(funcId);
      const func = inlinedFunctions[index2];
      return func;
    }
    if (id.startsWith("*")) {
      const elementId = id.slice(1);
      const index2 = strToInt(elementId);
      assertTrue(elements.has(index2));
      const str = text.get(index2);
      return finalized.set(id, str), str;
    }
    const index = strToInt(id);
    const objs = pauseState.objs;
    assertTrue(objs.length > index);
    let value = objs[index];
    isString(value) && (value = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value));
    let obj = value;
    for (let i = id.length - 1; i >= 0; i--) {
      const transform = OBJECT_TRANSFORMS[id[i]];
      if (!transform) {
        break;
      }
      obj = transform(obj, containerState);
    }
    return finalized.set(id, obj), isPrimitive(value) || revived.has(index) || (revived.add(index), reviveSubscriptions(value, index, pauseState.subs, getObject, containerState, parser), reviveNestedObjects(value, getObject, parser)), obj;
  };
  containerState.$elementIndex$ = 1e5, containerState.$pauseCtx$ = {
    getObject,
    meta: pauseState.ctx,
    refs: pauseState.refs
  }, directSetAttribute(containerEl, "q:container", "resumed"), emitEvent$1(containerEl, "qresume", void 0, true);
};
const reviveSubscriptions = (value, i, objsSubs, getObject, containerState, parser) => {
  const subs = objsSubs[i];
  if (subs) {
    const converted = [];
    let flag = 0;
    for (const sub of subs) {
      if (sub.startsWith("_")) {
        flag = parseInt(sub.slice(1), 10);
      } else {
        const parsed = parseSubscription(sub, getObject);
        parsed && converted.push(parsed);
      }
    }
    if (flag > 0 && setObjectFlags(value, flag), !parser.subs(value, converted)) {
      const proxy = containerState.$proxyMap$.get(value);
      proxy ? getSubscriptionManager(proxy).$addSubs$(converted) : createProxy(value, containerState, converted);
    }
  }
};
const reviveNestedObjects = (obj, getObject, parser) => {
  if (!parser.fill(obj, getObject) && obj && "object" == typeof obj) {
    if (isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = getObject(obj[i]);
      }
    } else if (isSerializableObject(obj)) {
      for (const key in obj) {
        obj[key] = getObject(obj[key]);
      }
    }
  }
};
const unescapeText = (str) => str.replace(/\\x3C(\/?script)/gi, "<$1");
const getQwikJSON = (parentElm, attribute) => {
  let child = parentElm.lastElementChild;
  for (; child; ) {
    if ("SCRIPT" === child.tagName && "qwik/json" === directGetAttribute(child, attribute)) {
      return child;
    }
    child = child.previousElementSibling;
  }
};
const getTextNode = (mark) => {
  const nextNode = mark.nextSibling;
  if (isText(nextNode)) {
    return nextNode;
  }
  {
    const textNode = mark.ownerDocument.createTextNode("");
    return mark.parentElement.insertBefore(textNode, mark), textNode;
  }
};
const appendQwikDevTools = (containerEl) => {
  containerEl.qwik = {
    pause: () => pauseContainer(containerEl),
    state: _getContainerState(containerEl)
  };
};
const getID = (stuff) => {
  const index = stuff.indexOf("q:id=");
  return index > 0 ? strToInt(stuff.slice(index + 5)) : -1;
};
const executeSignalOperation = (rCtx, operation) => {
  try {
    const type = operation[0];
    const staticCtx = rCtx.$static$;
    switch (type) {
      case 1:
      case 2: {
        let elm;
        let hostElm;
        1 === type ? (elm = operation[1], hostElm = operation[3]) : (elm = operation[3], hostElm = operation[1]);
        const elCtx = tryGetContext(elm);
        if (null == elCtx) {
          return;
        }
        const prop = operation[4];
        const isSVG = elm.namespaceURI === SVG_NS;
        staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
        let value = trackSignal(operation[2], operation.slice(0, -1));
        "class" === prop ? value = serializeClassWithHost(value, tryGetContext(hostElm)) : "style" === prop && (value = stringifyStyle(value));
        const vdom = getVdom(elCtx);
        if (prop in vdom.$props$ && vdom.$props$[prop] === value) {
          return;
        }
        return vdom.$props$[prop] = value, smartSetProperty(staticCtx, elm, prop, value, isSVG);
      }
      case 3:
      case 4: {
        const elm = operation[3];
        if (!staticCtx.$visited$.includes(elm)) {
          staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
          const invocationContext = void 0;
          let signalValue = trackSignal(operation[2], operation.slice(0, -1));
          const subscription = getLastSubscription();
          Array.isArray(signalValue) && (signalValue = new JSXNodeImpl(Virtual, {}, null, signalValue, 0, null));
          let newVnode = processData(signalValue, invocationContext);
          if (isPromise(newVnode)) {
            logError("Rendering promises in JSX signals is not supported");
          } else {
            void 0 === newVnode && (newVnode = processData("", invocationContext));
            const oldVnode = getVnodeFromEl(elm);
            const element = getQwikElement(operation[1]);
            if (rCtx.$cmpCtx$ = getContext(element, rCtx.$static$.$containerState$), oldVnode.$type$ == newVnode.$type$ && oldVnode.$key$ == newVnode.$key$ && oldVnode.$id$ == newVnode.$id$) {
              diffVnode(rCtx, oldVnode, newVnode, 0);
            } else {
              const promises = [];
              const oldNode = oldVnode.$elm$;
              const newElm = createElm(rCtx, newVnode, 0, promises);
              promises.length && logError("Rendering promises in JSX signals is not supported"), subscription[3] = newElm, insertBefore(rCtx.$static$, elm.parentElement, newElm, oldNode), oldNode && removeNode(staticCtx, oldNode);
            }
          }
        }
      }
    }
  } catch (e) {
  }
};
function getQwikElement(element) {
  for (; element; ) {
    if (isQwikElement(element)) {
      return element;
    }
    element = element.parentElement;
  }
  throw new Error("Not found");
}
const notifyChange = (subAction, containerState) => {
  if (0 === subAction[0]) {
    const host = subAction[1];
    isSubscriberDescriptor(host) ? notifyTask(host, containerState) : notifyRender(host, containerState);
  } else {
    notifySignalOperation(subAction, containerState);
  }
};
const notifyRender = (hostElement, containerState) => {
  const server = isServerPlatform();
  server || resumeIfNeeded(containerState.$containerEl$);
  const elCtx = getContext(hostElement, containerState);
  if (assertDefined(elCtx.$componentQrl$), elCtx.$flags$ & HOST_FLAG_DIRTY) {
    return;
  }
  elCtx.$flags$ |= HOST_FLAG_DIRTY;
  if (void 0 !== containerState.$hostsRendering$) {
    containerState.$hostsStaging$.add(elCtx);
  } else {
    if (server) {
      return void logWarn();
    }
    containerState.$hostsNext$.add(elCtx), scheduleFrame(containerState);
  }
};
const notifySignalOperation = (op, containerState) => {
  const activeRendering = void 0 !== containerState.$hostsRendering$;
  containerState.$opsNext$.add(op), activeRendering || scheduleFrame(containerState);
};
const notifyTask = (task, containerState) => {
  if (task.$flags$ & TaskFlagsIsDirty) {
    return;
  }
  task.$flags$ |= TaskFlagsIsDirty;
  void 0 !== containerState.$hostsRendering$ ? containerState.$taskStaging$.add(task) : (containerState.$taskNext$.add(task), scheduleFrame(containerState));
};
const scheduleFrame = (containerState) => (void 0 === containerState.$renderPromise$ && (containerState.$renderPromise$ = getPlatform().nextTick(() => renderMarked(containerState))), containerState.$renderPromise$);
const renderMarked = async (containerState) => {
  const containerEl = containerState.$containerEl$;
  const doc = getDocument(containerEl);
  try {
    const rCtx = createRenderContext(doc, containerState);
    const staticCtx = rCtx.$static$;
    const hostsRendering = containerState.$hostsRendering$ = new Set(containerState.$hostsNext$);
    containerState.$hostsNext$.clear(), await executeTasksBefore(containerState, rCtx), containerState.$hostsStaging$.forEach((host) => {
      hostsRendering.add(host);
    }), containerState.$hostsStaging$.clear();
    const signalOperations = Array.from(containerState.$opsNext$);
    containerState.$opsNext$.clear();
    const renderingQueue = Array.from(hostsRendering);
    if (sortNodes(renderingQueue), !containerState.$styleMoved$ && renderingQueue.length > 0) {
      containerState.$styleMoved$ = true;
      (containerEl === doc.documentElement ? doc.body : containerEl).querySelectorAll("style[q\\:style]").forEach((el) => {
        containerState.$styleIds$.add(directGetAttribute(el, QStyle)), appendChild(staticCtx, doc.head, el);
      });
    }
    for (const elCtx of renderingQueue) {
      const el = elCtx.$element$;
      if (!staticCtx.$hostElements$.has(el) && elCtx.$componentQrl$) {
        assertTrue(el.isConnected, "element must be connected to the dom"), staticCtx.$roots$.push(elCtx);
        try {
          await renderComponent(rCtx, elCtx, getFlags(el.parentElement));
        } catch (err) {
          logError(err);
        }
      }
    }
    return signalOperations.forEach((op) => {
      executeSignalOperation(rCtx, op);
    }), staticCtx.$operations$.push(...staticCtx.$postOperations$), 0 === staticCtx.$operations$.length ? (printRenderStats(staticCtx), void await postRendering(containerState, rCtx)) : (await executeContextWithScrollAndTransition(staticCtx), printRenderStats(staticCtx), postRendering(containerState, rCtx));
  } catch (err) {
    logError(err);
  }
};
const getFlags = (el) => {
  let flags = 0;
  return el && (el.namespaceURI === SVG_NS && (flags |= IS_SVG), "HEAD" === el.tagName && (flags |= IS_HEAD)), flags;
};
const postRendering = async (containerState, rCtx) => {
  const hostElements = rCtx.$static$.$hostElements$;
  await executeTasksAfter(containerState, rCtx, (task, stage) => !!(task.$flags$ & TaskFlagsIsVisibleTask) && (!stage || hostElements.has(task.$el$))), containerState.$hostsStaging$.forEach((el) => {
    containerState.$hostsNext$.add(el);
  }), containerState.$hostsStaging$.clear(), containerState.$hostsRendering$ = void 0, containerState.$renderPromise$ = void 0;
  containerState.$hostsNext$.size + containerState.$taskNext$.size + containerState.$opsNext$.size > 0 && (containerState.$renderPromise$ = renderMarked(containerState));
};
const isTask = (task) => !!(task.$flags$ & TaskFlagsIsTask);
const isResourceTask$1 = (task) => !!(task.$flags$ & TaskFlagsIsResource);
const executeTasksBefore = async (containerState, rCtx) => {
  const containerEl = containerState.$containerEl$;
  const resourcesPromises = [];
  const taskPromises = [];
  containerState.$taskNext$.forEach((task) => {
    isTask(task) && (taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)), containerState.$taskNext$.delete(task)), isResourceTask$1(task) && (resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)), containerState.$taskNext$.delete(task));
  });
  do {
    if (containerState.$taskStaging$.forEach((task) => {
      isTask(task) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)) : isResourceTask$1(task) ? resourcesPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)) : containerState.$taskNext$.add(task);
    }), containerState.$taskStaging$.clear(), taskPromises.length > 0) {
      const tasks = await Promise.all(taskPromises);
      sortTasks(tasks), await Promise.all(tasks.map((task) => runSubscriber(task, containerState, rCtx))), taskPromises.length = 0;
    }
  } while (containerState.$taskStaging$.size > 0);
  if (resourcesPromises.length > 0) {
    const resources = await Promise.all(resourcesPromises);
    sortTasks(resources);
    for (const task of resources) {
      runSubscriber(task, containerState, rCtx);
    }
  }
};
const executeSSRTasks = (containerState, rCtx) => {
  const containerEl = containerState.$containerEl$;
  const staging = containerState.$taskStaging$;
  if (!staging.size) {
    return;
  }
  const taskPromises = [];
  let tries = 20;
  const runTasks = () => {
    if (staging.forEach((task) => {
      isTask(task) && taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task));
    }), staging.clear(), taskPromises.length > 0) {
      return Promise.all(taskPromises).then(async (tasks) => {
        if (sortTasks(tasks), await Promise.all(tasks.map((task) => runSubscriber(task, containerState, rCtx))), taskPromises.length = 0, --tries && staging.size > 0) {
          return runTasks();
        }
        tries || logWarn(`Infinite task loop detected. Tasks:
${Array.from(staging).map((task) => `  ${task.$qrl$.$symbol$}`).join("\n")}`);
      });
    }
  };
  return runTasks();
};
const executeTasksAfter = async (containerState, rCtx, taskPred) => {
  const taskPromises = [];
  const containerEl = containerState.$containerEl$;
  containerState.$taskNext$.forEach((task) => {
    taskPred(task, false) && (task.$el$.isConnected && taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)), containerState.$taskNext$.delete(task));
  });
  do {
    if (containerState.$taskStaging$.forEach((task) => {
      task.$el$.isConnected && (taskPred(task, true) ? taskPromises.push(maybeThen(task.$qrl$.$resolveLazy$(containerEl), () => task)) : containerState.$taskNext$.add(task));
    }), containerState.$taskStaging$.clear(), taskPromises.length > 0) {
      const tasks = await Promise.all(taskPromises);
      sortTasks(tasks);
      for (const task of tasks) {
        runSubscriber(task, containerState, rCtx);
      }
      taskPromises.length = 0;
    }
  } while (containerState.$taskStaging$.size > 0);
};
const sortNodes = (elements) => {
  elements.sort((a2, b) => 2 & a2.$element$.compareDocumentPosition(getRootNode(b.$element$)) ? 1 : -1);
};
const sortTasks = (tasks) => {
  const isServer3 = isServerPlatform();
  tasks.sort((a2, b) => isServer3 || a2.$el$ === b.$el$ ? a2.$index$ < b.$index$ ? -1 : 1 : 2 & a2.$el$.compareDocumentPosition(getRootNode(b.$el$)) ? 1 : -1);
};
const createSignal = (initialState) => {
  const containerState = useContainerState();
  const value = isFunction(initialState) && !isQwikComponent$1(initialState) ? invoke(void 0, initialState) : initialState;
  return _createSignal(value, containerState, 0);
};
const useConstant = (value) => {
  const { val, set } = useSequentialScope();
  return null != val ? val : set(value = isFunction(value) && !isQwikComponent$1(value) ? value() : value);
};
const useSignal = (initialState) => useConstant(() => createSignal(initialState));
const TaskFlagsIsVisibleTask = 1;
const TaskFlagsIsTask = 2;
const TaskFlagsIsResource = 4;
const TaskFlagsIsDirty = 16;
const isResourceTask = (task) => !!(task.$flags$ & TaskFlagsIsResource);
const isComputedTask = (task) => !!(8 & task.$flags$);
const runSubscriber = async (task, containerState, rCtx) => (assertEqual(!!(task.$flags$ & TaskFlagsIsDirty)), isResourceTask(task) ? runResource(task, containerState, rCtx) : isComputedTask(task) ? runComputed(task, containerState, rCtx) : runTask(task, containerState, rCtx));
const runResource = (task, containerState, rCtx, waitOn) => {
  task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, task.$el$, void 0, "qTask");
  const { $subsManager$: subsManager } = containerState;
  iCtx.$renderCtx$ = rCtx;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const cleanups = [];
  const resource = task.$state$;
  const resourceTarget = unwrapProxy(resource);
  const opts = {
    track: (obj, prop) => {
      if (isFunction(obj)) {
        const ctx = newInvokeContext();
        return ctx.$renderCtx$ = rCtx, ctx.$subscriber$ = [0, task], invoke(ctx, obj);
      }
      const manager = getSubscriptionManager(obj);
      return manager ? manager.$addSub$([0, task], prop) : logErrorAndStop(codeToText(26), obj), prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
    },
    cleanup(callback) {
      cleanups.push(callback);
    },
    cache(policy) {
      let milliseconds = 0;
      milliseconds = "immutable" === policy ? 1 / 0 : policy, resource._cache = milliseconds;
    },
    previous: resourceTarget._resolved
  };
  let resolve;
  let reject;
  let done = false;
  const setState = (resolved, value) => !done && (done = true, resolved ? (done = true, resource.loading = false, resource._state = "resolved", resource._resolved = value, resource._error = void 0, resolve(value)) : (done = true, resource.loading = false, resource._state = "rejected", resource._error = value, reject(value)), true);
  invoke(iCtx, () => {
    resource._state = "pending", resource.loading = !isServerPlatform(), resource.value = new Promise((r, re) => {
      resolve = r, reject = re;
    });
  }), task.$destroy$ = noSerialize(() => {
    done = true, cleanups.forEach((fn) => fn());
  });
  const promise = safeCall(() => maybeThen(waitOn, () => taskFn(opts)), (value) => {
    setState(true, value);
  }, (reason) => {
    setState(false, reason);
  });
  const timeout = resourceTarget._timeout;
  return timeout > 0 ? Promise.race([promise, delay(timeout).then(() => {
    setState(false, new Error("timeout")) && cleanupTask(task);
  })]) : promise;
};
const runTask = (task, containerState, rCtx) => {
  task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
  const hostElement = task.$el$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qTask");
  iCtx.$renderCtx$ = rCtx;
  const { $subsManager$: subsManager } = containerState;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const cleanups = [];
  task.$destroy$ = noSerialize(() => {
    cleanups.forEach((fn) => fn());
  });
  const opts = {
    track: (obj, prop) => {
      if (isFunction(obj)) {
        const ctx = newInvokeContext();
        return ctx.$subscriber$ = [0, task], invoke(ctx, obj);
      }
      const manager = getSubscriptionManager(obj);
      return manager ? manager.$addSub$([0, task], prop) : logErrorAndStop(codeToText(26), obj), prop ? obj[prop] : isSignal(obj) ? obj.value : obj;
    },
    cleanup(callback) {
      cleanups.push(callback);
    }
  };
  return safeCall(() => taskFn(opts), (returnValue) => {
    isFunction(returnValue) && cleanups.push(returnValue);
  }, (reason) => {
    handleError(reason, hostElement, rCtx);
  });
};
const runComputed = (task, containerState, rCtx) => {
  assertSignal(task.$state$), task.$flags$ &= ~TaskFlagsIsDirty, cleanupTask(task);
  const hostElement = task.$el$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "qComputed");
  iCtx.$subscriber$ = [0, task], iCtx.$renderCtx$ = rCtx;
  const { $subsManager$: subsManager } = containerState;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const ok = (returnValue) => {
    untrack(() => {
      const signal = task.$state$;
      signal[QObjectSignalFlags] &= ~SIGNAL_UNASSIGNED, signal.untrackedValue = returnValue, signal[QObjectManagerSymbol].$notifySubs$();
    });
  };
  const fail = (reason) => {
    handleError(reason, hostElement, rCtx);
  };
  try {
    return maybeThen(task.$qrl$.$resolveLazy$(containerState.$containerEl$), () => {
      const result = taskFn();
      if (isPromise(result)) {
        const warningMessage = "useComputed$: Async functions in computed tasks are deprecated and will stop working in v2. Use useTask$ or useResource$ instead.";
        const stack = new Error(warningMessage).stack;
        if (stack) {
          stack.replace(/^Error:\s*/, "");
          logOnceWarn();
        } else {
          logOnceWarn();
        }
        return result.then(ok, fail);
      }
      ok(result);
    });
  } catch (reason) {
    fail(reason);
  }
};
const cleanupTask = (task) => {
  const destroy = task.$destroy$;
  if (destroy) {
    task.$destroy$ = void 0;
    try {
      destroy();
    } catch (err) {
      logError(err);
    }
  }
};
const destroyTask = (task) => {
  if (32 & task.$flags$) {
    task.$flags$ &= -33;
    (0, task.$qrl$)();
  } else {
    cleanupTask(task);
  }
};
const isSubscriberDescriptor = (obj) => isObject(obj) && obj instanceof Task;
const serializeTask = (task, getObjId) => {
  let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(task.$qrl$)} ${getObjId(task.$el$)}`;
  return task.$state$ && (value += ` ${getObjId(task.$state$)}`), value;
};
const parseTask = (data) => {
  const [flags, index, qrl2, el, resource] = data.split(" ");
  return new Task(strToInt(flags), strToInt(index), el, qrl2, resource);
};
class Task {
  $flags$;
  $index$;
  $el$;
  $qrl$;
  $state$;
  constructor($flags$, $index$, $el$, $qrl$, $state$) {
    this.$flags$ = $flags$, this.$index$ = $index$, this.$el$ = $el$, this.$qrl$ = $qrl$, this.$state$ = $state$;
  }
}
function isElement(value) {
  return isNode$2(value) && 1 === value.nodeType;
}
function isNode$2(value) {
  return value && "number" == typeof value.nodeType;
}
const HOST_FLAG_DIRTY = 1;
const HOST_FLAG_NEED_ATTACH_LISTENER = 2;
const HOST_FLAG_MOUNTED = 4;
const HOST_FLAG_DYNAMIC = 8;
const tryGetContext = (element) => element[Q_CTX];
const getContext = (el, containerState) => {
  const ctx = tryGetContext(el);
  if (ctx) {
    return ctx;
  }
  const elCtx = createContext(el);
  const elementID = directGetAttribute(el, "q:id");
  if (elementID) {
    const pauseCtx = containerState.$pauseCtx$;
    if (elCtx.$id$ = elementID, pauseCtx) {
      const { getObject, meta, refs } = pauseCtx;
      if (isElement(el)) {
        const refMap = refs[elementID];
        refMap && (elCtx.$refMap$ = refMap.split(" ").map(getObject), elCtx.li = getDomListeners(elCtx, containerState.$containerEl$));
      } else {
        const styleIds = el.getAttribute("q:sstyle");
        elCtx.$scopeIds$ = styleIds ? styleIds.split("|") : null;
        const ctxMeta = meta[elementID];
        if (ctxMeta) {
          const seq = ctxMeta.s;
          const host = ctxMeta.h;
          const contexts = ctxMeta.c;
          const tasks = ctxMeta.w;
          if (seq && (elCtx.$seq$ = seq.split(" ").map(getObject)), tasks && (elCtx.$tasks$ = tasks.split(" ").map(getObject)), contexts) {
            elCtx.$contexts$ = /* @__PURE__ */ new Map();
            for (const part of contexts.split(" ")) {
              const [key, value] = part.split("=");
              elCtx.$contexts$.set(key, getObject(value));
            }
          }
          if (host) {
            const [renderQrl, props] = host.split(" ");
            if (elCtx.$flags$ = HOST_FLAG_MOUNTED, renderQrl && (elCtx.$componentQrl$ = getObject(renderQrl)), props) {
              const propsObj = getObject(props);
              elCtx.$props$ = propsObj, setObjectFlags(propsObj, 2), propsObj[_IMMUTABLE] = getImmutableFromProps(propsObj);
            } else {
              elCtx.$props$ = createProxy(createPropsState(), containerState);
            }
          }
        }
      }
    }
  }
  return elCtx;
};
const getImmutableFromProps = (props) => {
  const immutable = {};
  const target = getProxyTarget(props);
  for (const key in target) {
    key.startsWith("$$") && (immutable[key.slice(2)] = target[key]);
  }
  return immutable;
};
const createContext = (element) => {
  const ctx = {
    $flags$: 0,
    $id$: "",
    $element$: element,
    $refMap$: [],
    li: [],
    $tasks$: null,
    $seq$: null,
    $slots$: null,
    $scopeIds$: null,
    $appendStyles$: null,
    $props$: null,
    $vdom$: null,
    $componentQrl$: null,
    $contexts$: null,
    $dynamicSlots$: null,
    $parentCtx$: void 0,
    $realParentCtx$: void 0
  };
  return element[Q_CTX] = ctx, ctx;
};
const cleanupContext = (elCtx, subsManager) => {
  elCtx.$tasks$?.forEach((task) => {
    subsManager.$clearSub$(task), destroyTask(task);
  }), elCtx.$componentQrl$ = null, elCtx.$seq$ = null, elCtx.$tasks$ = null;
};
let _context;
const tryGetInvokeContext = () => {
  if (!_context) {
    const context = "undefined" != typeof document && document && document.__q_context__;
    if (!context) {
      return;
    }
    return isArray(context) ? document.__q_context__ = newInvokeContextFromTuple(context) : context;
  }
  return _context;
};
const useInvokeContext = () => {
  const ctx = tryGetInvokeContext();
  if (!ctx || "qRender" !== ctx.$event$) {
    throw qError(20);
  }
  return assertDefined(ctx.$hostElement$), assertDefined(ctx.$waitOn$), assertDefined(ctx.$renderCtx$), assertDefined(ctx.$subscriber$), ctx;
};
const useContainerState = () => useInvokeContext().$renderCtx$.$static$.$containerState$;
function invoke(context, fn, ...args) {
  return invokeApply.call(this, context, fn, args);
}
function invokeApply(context, fn, args) {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context, returnValue = fn.apply(this, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
}
const newInvokeContextFromTuple = ([element, event, url]) => {
  const container = element.closest("[q\\:container]");
  const locale = container?.getAttribute("q:locale") || void 0;
  return newInvokeContext(locale, void 0, element, event, url);
};
const newInvokeContext = (locale, hostElement, element, event, url) => {
  const ctx = {
    $url$: url,
    $i$: 0,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $qrl$: void 0,
    $waitOn$: void 0,
    $subscriber$: void 0,
    $renderCtx$: void 0,
    $locale$: locale || ("object" == typeof event && event && "locale" in event ? event.locale : void 0)
  };
  return ctx;
};
const untrack = (fn) => invoke(void 0, fn);
const trackInvocation = /* @__PURE__ */ newInvokeContext(void 0, void 0, void 0, "qRender");
const trackSignal = (signal, sub) => (trackInvocation.$subscriber$ = sub, invoke(trackInvocation, () => signal.value));
const _jsxBranch = (input) => {
  const iCtx = tryGetInvokeContext();
  if (iCtx && iCtx.$hostElement$ && iCtx.$renderCtx$) {
    getContext(iCtx.$hostElement$, iCtx.$renderCtx$.$static$.$containerState$).$flags$ |= HOST_FLAG_DYNAMIC;
  }
  return input;
};
const _createSignal = (value, containerState, flags, subscriptions) => {
  const manager = containerState.$subsManager$.$createManager$(subscriptions);
  return new SignalImpl(value, manager, flags);
};
const QObjectSignalFlags = Symbol("proxy manager");
const SIGNAL_IMMUTABLE = 1;
const SIGNAL_UNASSIGNED = 2;
const SignalUnassignedException = Symbol("unassigned signal");
class SignalBase {
}
class SignalImpl extends SignalBase {
  untrackedValue;
  [QObjectManagerSymbol];
  [QObjectSignalFlags] = 0;
  constructor(v, manager, flags) {
    super(), this.untrackedValue = v, this[QObjectManagerSymbol] = manager, this[QObjectSignalFlags] = flags;
  }
  valueOf() {
  }
  toString() {
    return `[Signal ${String(this.value)}]`;
  }
  toJSON() {
    return {
      value: this.value
    };
  }
  get value() {
    if (this[QObjectSignalFlags] & SIGNAL_UNASSIGNED) {
      throw SignalUnassignedException;
    }
    const sub = tryGetInvokeContext()?.$subscriber$;
    return sub && this[QObjectManagerSymbol].$addSub$(sub), this.untrackedValue;
  }
  set value(v) {
    const manager = this[QObjectManagerSymbol];
    manager && this.untrackedValue !== v && (this.untrackedValue = v, manager.$notifySubs$());
  }
}
class SignalDerived extends SignalBase {
  $func$;
  $args$;
  $funcStr$;
  constructor($func$, $args$, $funcStr$) {
    super(), this.$func$ = $func$, this.$args$ = $args$, this.$funcStr$ = $funcStr$;
  }
  get value() {
    return this.$func$.apply(void 0, this.$args$);
  }
}
class SignalWrapper extends SignalBase {
  ref;
  prop;
  constructor(ref, prop) {
    super(), this.ref = ref, this.prop = prop;
  }
  get [QObjectManagerSymbol]() {
    return getSubscriptionManager(this.ref);
  }
  get value() {
    return this.ref[this.prop];
  }
  set value(value) {
    this.ref[this.prop] = value;
  }
}
const isSignal = (obj) => obj instanceof SignalBase;
const CONTAINER_STATE = Symbol("ContainerState");
const _getContainerState = (containerEl) => {
  let state = containerEl[CONTAINER_STATE];
  return state || (containerEl[CONTAINER_STATE] = state = createContainerState(containerEl, directGetAttribute(containerEl, "q:base") ?? "/")), state;
};
const createContainerState = (containerEl, base) => {
  const containerAttributes = {};
  if (containerEl) {
    const attrs = containerEl.attributes;
    if (attrs) {
      for (let index = 0; index < attrs.length; index++) {
        const attr = attrs[index];
        containerAttributes[attr.name] = attr.value;
      }
    }
  }
  const containerState = {
    $containerEl$: containerEl,
    $elementIndex$: 0,
    $styleMoved$: false,
    $proxyMap$: /* @__PURE__ */ new WeakMap(),
    $opsNext$: /* @__PURE__ */ new Set(),
    $taskNext$: /* @__PURE__ */ new Set(),
    $taskStaging$: /* @__PURE__ */ new Set(),
    $hostsNext$: /* @__PURE__ */ new Set(),
    $hostsStaging$: /* @__PURE__ */ new Set(),
    $styleIds$: /* @__PURE__ */ new Set(),
    $events$: /* @__PURE__ */ new Set(),
    $serverData$: {
      containerAttributes
    },
    $base$: base,
    $renderPromise$: void 0,
    $hostsRendering$: void 0,
    $pauseCtx$: void 0,
    $subsManager$: null,
    $inlineFns$: /* @__PURE__ */ new Map()
  };
  return containerState.$subsManager$ = createSubscriptionManager(containerState), containerState;
};
const setRef = (value, elm) => {
  if (isFunction(value)) {
    return value(elm);
  }
  if (isSignal(value)) {
    return isServerPlatform() ? value.untrackedValue = elm : value.value = elm;
  }
  throw qError(32, value);
};
const SHOW_COMMENT$1 = 128;
const isContainer$1 = (el) => isElement$1(el) && el.hasAttribute("q:container");
const intToStr = (nu) => nu.toString(36);
const strToInt = (nu) => parseInt(nu, 36);
const getEventName = (attribute) => {
  const colonPos = attribute.indexOf(":");
  return attribute ? fromKebabToCamelCase(attribute.slice(colonPos + 1)) : attribute;
};
const SVG_NS = "http://www.w3.org/2000/svg";
const IS_SVG = 1;
const IS_HEAD = 2;
const CHILDREN_PLACEHOLDER = [];
const smartUpdateChildren = (ctx, oldVnode, newVnode, flags) => {
  assertQwikElement(oldVnode.$elm$);
  const ch = newVnode.$children$;
  if (1 === ch.length && ":skipRender" === ch[0].$type$) {
    return void (newVnode.$children$ = oldVnode.$children$);
  }
  const elm = oldVnode.$elm$;
  let filter = isChildComponent;
  if (oldVnode.$children$ === CHILDREN_PLACEHOLDER) {
    "HEAD" === elm.nodeName && (filter = isHeadChildren, flags |= IS_HEAD);
  }
  const oldCh = getVnodeChildren(oldVnode, filter);
  return oldCh.length > 0 && ch.length > 0 ? diffChildren(ctx, elm, oldCh, ch, flags) : oldCh.length > 0 && 0 === ch.length ? removeChildren(ctx.$static$, oldCh, 0, oldCh.length - 1) : ch.length > 0 ? addChildren(ctx, elm, null, ch, 0, ch.length - 1, flags) : void 0;
};
const getVnodeChildren = (oldVnode, filter) => {
  const oldCh = oldVnode.$children$;
  return oldCh === CHILDREN_PLACEHOLDER ? oldVnode.$children$ = getChildrenVnodes(oldVnode.$elm$, filter) : oldCh;
};
const diffChildren = (ctx, parentElm, oldCh, newCh, flags) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  const results = [];
  const staticCtx = ctx.$static$;
  for (; oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx; ) {
    if (null == oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (null == oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (null == newStartVnode) {
      newStartVnode = newCh[++newStartIdx];
    } else if (null == newEndVnode) {
      newEndVnode = newCh[--newEndIdx];
    } else if (oldStartVnode.$id$ === newStartVnode.$id$) {
      results.push(diffVnode(ctx, oldStartVnode, newStartVnode, flags)), oldStartVnode = oldCh[++oldStartIdx], newStartVnode = newCh[++newStartIdx];
    } else if (oldEndVnode.$id$ === newEndVnode.$id$) {
      results.push(diffVnode(ctx, oldEndVnode, newEndVnode, flags)), oldEndVnode = oldCh[--oldEndIdx], newEndVnode = newCh[--newEndIdx];
    } else if (oldStartVnode.$key$ && oldStartVnode.$id$ === newEndVnode.$id$) {
      assertDefined(oldStartVnode.$elm$), assertDefined(oldEndVnode.$elm$), results.push(diffVnode(ctx, oldStartVnode, newEndVnode, flags)), insertAfter(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$), oldStartVnode = oldCh[++oldStartIdx], newEndVnode = newCh[--newEndIdx];
    } else if (oldEndVnode.$key$ && oldEndVnode.$id$ === newStartVnode.$id$) {
      assertDefined(oldStartVnode.$elm$), assertDefined(oldEndVnode.$elm$), results.push(diffVnode(ctx, oldEndVnode, newStartVnode, flags)), insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$), oldEndVnode = oldCh[--oldEndIdx], newStartVnode = newCh[++newStartIdx];
    } else {
      if (void 0 === oldKeyToIdx && (oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)), idxInOld = oldKeyToIdx[newStartVnode.$key$], void 0 === idxInOld) {
        const newElm = createElm(ctx, newStartVnode, flags, results);
        insertBefore(staticCtx, parentElm, newElm, oldStartVnode?.$elm$);
      } else if (elmToMove = oldCh[idxInOld], elmToMove.$type$ !== newStartVnode.$type$) {
        const newElm = createElm(ctx, newStartVnode, flags, results);
        maybeThen(newElm, (newElm2) => {
          insertBefore(staticCtx, parentElm, newElm2, oldStartVnode?.$elm$);
        });
      } else {
        results.push(diffVnode(ctx, elmToMove, newStartVnode, flags)), oldCh[idxInOld] = void 0, assertDefined(elmToMove.$elm$), insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  if (newStartIdx <= newEndIdx) {
    results.push(addChildren(ctx, parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].$elm$, newCh, newStartIdx, newEndIdx, flags));
  }
  let wait = promiseAll(results);
  return oldStartIdx <= oldEndIdx && (wait = maybeThen(wait, () => {
    removeChildren(staticCtx, oldCh, oldStartIdx, oldEndIdx);
  })), wait;
};
const getChildren = (elm, filter) => {
  const end = isVirtualElement(elm) ? elm.close : null;
  const nodes = [];
  let node = elm.firstChild;
  for (; (node = processVirtualNodes(node)) && (filter(node) && nodes.push(node), node = node.nextSibling, node !== end); ) {
  }
  return nodes;
};
const getChildrenVnodes = (elm, filter) => getChildren(elm, filter).map(getVnodeFromEl);
const getVnodeFromEl = (el) => isElement$1(el) ? tryGetContext(el)?.$vdom$ ?? domToVnode(el) : domToVnode(el);
const domToVnode = (node) => {
  if (isQwikElement(node)) {
    const t = new ProcessedJSXNodeImpl(node.localName, {}, null, CHILDREN_PLACEHOLDER, 0, getKey(node));
    return t.$elm$ = node, t;
  }
  if (isText(node)) {
    const t = new ProcessedJSXNodeImpl(node.nodeName, EMPTY_OBJ, null, CHILDREN_PLACEHOLDER, 0, null);
    return t.$text$ = node.data, t.$elm$ = node, t;
  }
};
const isHeadChildren = (node) => {
  const type = node.nodeType;
  return 1 === type ? node.hasAttribute("q:head") : 111 === type;
};
const isSlotTemplate = (node) => "Q:TEMPLATE" === node.nodeName;
const isChildComponent = (node) => {
  const type = node.nodeType;
  if (3 === type || 111 === type) {
    return true;
  }
  if (1 !== type) {
    return false;
  }
  const nodeName = node.nodeName;
  return "Q:TEMPLATE" !== nodeName && ("HEAD" === nodeName ? node.hasAttribute("q:head") : "STYLE" !== nodeName || !node.hasAttribute(QStyle));
};
const splitChildren = (input) => {
  const output = {};
  for (const item of input) {
    const key = getSlotName(item);
    (output[key] ?? (output[key] = new ProcessedJSXNodeImpl(VIRTUAL, {
      [QSlotS]: ""
    }, null, [], 0, key))).$children$.push(item);
  }
  return output;
};
const diffVnode = (rCtx, oldVnode, newVnode, flags) => {
  assertEqual(oldVnode.$type$, newVnode.$type$), assertEqual(oldVnode.$key$, newVnode.$key$), assertEqual(oldVnode.$id$, newVnode.$id$);
  const elm = oldVnode.$elm$;
  const tag = newVnode.$type$;
  const staticCtx = rCtx.$static$;
  const containerState = staticCtx.$containerState$;
  const currentComponent = rCtx.$cmpCtx$;
  if (newVnode.$elm$ = elm, "#text" === tag) {
    staticCtx.$visited$.push(elm);
    const signal = newVnode.$signal$;
    return signal && (newVnode.$text$ = jsxToString(trackSignal(signal, [4, currentComponent.$element$, signal, elm]))), void setProperty(staticCtx, elm, "data", newVnode.$text$);
  }
  if ("#signal" === tag) {
    return;
  }
  const props = newVnode.$props$;
  const vnodeFlags = newVnode.$flags$;
  const elCtx = getContext(elm, containerState);
  if (tag !== VIRTUAL) {
    let isSvg = !!(flags & IS_SVG);
    if (isSvg || "svg" !== tag || (flags |= IS_SVG, isSvg = true), props !== EMPTY_OBJ) {
      1 & vnodeFlags || (elCtx.li.length = 0);
      const values = oldVnode.$props$;
      newVnode.$props$ = values;
      for (const prop in props) {
        let newValue = props[prop];
        if ("ref" !== prop) {
          if (isOnProp(prop)) {
            const normalized = setEvent(elCtx.li, prop, newValue, containerState.$containerEl$);
            addQwikEvent(staticCtx, elm, normalized);
          } else {
            isSignal(newValue) && (newValue = trackSignal(newValue, [1, currentComponent.$element$, newValue, elm, prop])), "class" === prop ? newValue = serializeClassWithHost(newValue, currentComponent) : "style" === prop && (newValue = stringifyStyle(newValue)), values[prop] !== newValue && (values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg));
          }
        } else {
          void 0 !== newValue && setRef(newValue, elm);
        }
      }
    }
    if (2 & vnodeFlags) {
      return;
    }
    isSvg && "foreignObject" === tag && (flags &= ~IS_SVG);
    if (void 0 !== props[dangerouslySetInnerHTML]) {
      return void 0;
    }
    if ("textarea" === tag) {
      return;
    }
    return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
  }
  if ("q:renderFn" in props) {
    const cmpProps = props.props;
    setComponentProps(containerState, elCtx, cmpProps);
    let needsRender = !!(elCtx.$flags$ & HOST_FLAG_DIRTY);
    return needsRender || elCtx.$componentQrl$ || elCtx.$element$.hasAttribute("q:id") || (setQId(rCtx, elCtx), elCtx.$componentQrl$ = cmpProps["q:renderFn"], assertQrl(elCtx.$componentQrl$), needsRender = true), needsRender ? maybeThen(renderComponent(rCtx, elCtx, flags), () => renderContentProjection(rCtx, elCtx, newVnode, flags)) : renderContentProjection(rCtx, elCtx, newVnode, flags);
  }
  if ("q:s" in props) {
    return assertDefined(currentComponent.$slots$), void currentComponent.$slots$.push(newVnode);
  }
  if (dangerouslySetInnerHTML in props) {
    setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]);
  } else if (!(2 & vnodeFlags)) {
    return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
  }
};
const renderContentProjection = (rCtx, hostCtx, vnode, flags) => {
  if (2 & vnode.$flags$) {
    return;
  }
  const staticCtx = rCtx.$static$;
  const splittedNewChildren = splitChildren(vnode.$children$);
  const slotMaps = getSlotMap(hostCtx);
  for (const key in slotMaps.slots) {
    if (!splittedNewChildren[key]) {
      const slotEl = slotMaps.slots[key];
      const oldCh = getChildrenVnodes(slotEl, isChildComponent);
      if (oldCh.length > 0) {
        const slotCtx = tryGetContext(slotEl);
        slotCtx && slotCtx.$vdom$ && (slotCtx.$vdom$.$children$ = []), removeChildren(staticCtx, oldCh, 0, oldCh.length - 1);
      }
    }
  }
  for (const key in slotMaps.templates) {
    const templateEl = slotMaps.templates[key];
    templateEl && !splittedNewChildren[key] && (slotMaps.templates[key] = void 0, removeNode(staticCtx, templateEl));
  }
  return promiseAll(Object.keys(splittedNewChildren).map((slotName) => {
    const newVdom = splittedNewChildren[slotName];
    const slotCtx = getSlotCtx(staticCtx, slotMaps, hostCtx, slotName, rCtx.$static$.$containerState$);
    const oldVdom = getVdom(slotCtx);
    const slotRctx = pushRenderContext(rCtx);
    const slotEl = slotCtx.$element$;
    slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVdom, newVdom.$elm$ = slotEl;
    let newFlags = flags & ~IS_SVG;
    slotEl.isSvg && (newFlags |= IS_SVG);
    const index = staticCtx.$addSlots$.findIndex((slot) => slot[0] === slotEl);
    return index >= 0 && staticCtx.$addSlots$.splice(index, 1), smartUpdateChildren(slotRctx, oldVdom, newVdom, newFlags);
  }));
};
const addChildren = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
  const promises = [];
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    const elm = createElm(ctx, ch, flags, promises);
    insertBefore(ctx.$static$, parentElm, elm, before);
  }
  return promiseAllLazy(promises);
};
const removeChildren = (staticCtx, nodes, startIdx, endIdx) => {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = nodes[startIdx];
    ch && (assertDefined(ch.$elm$), removeNode(staticCtx, ch.$elm$));
  }
};
const getSlotCtx = (staticCtx, slotMaps, hostCtx, slotName, containerState) => {
  const slotEl = slotMaps.slots[slotName];
  if (slotEl) {
    return getContext(slotEl, containerState);
  }
  const templateEl = slotMaps.templates[slotName];
  if (templateEl) {
    return getContext(templateEl, containerState);
  }
  const template = createTemplate(staticCtx.$doc$, slotName);
  const elCtx = createContext(template);
  return elCtx.$parentCtx$ = hostCtx, prepend(staticCtx, hostCtx.$element$, template), slotMaps.templates[slotName] = template, elCtx;
};
const getSlotName = (node) => node.$props$[QSlot] ?? "";
const createElm = (rCtx, vnode, flags, promises) => {
  const tag = vnode.$type$;
  const doc = rCtx.$static$.$doc$;
  const currentComponent = rCtx.$cmpCtx$;
  if ("#text" === tag) {
    return vnode.$elm$ = doc.createTextNode(vnode.$text$);
  }
  if ("#signal" === tag) {
    const signal = vnode.$signal$;
    const signalValue = signal.value;
    if (isJSXNode(signalValue)) {
      const processedSignal = processData(signalValue);
      if (isSignal(processedSignal)) {
        throw new Error("NOT IMPLEMENTED: Promise");
      }
      if (Array.isArray(processedSignal)) {
        throw new Error("NOT IMPLEMENTED: Array");
      }
      {
        const elm2 = createElm(rCtx, processedSignal, flags, promises);
        return trackSignal(signal, 4 & flags ? [3, elm2, signal, elm2] : [4, currentComponent.$element$, signal, elm2]), vnode.$elm$ = elm2;
      }
    }
    {
      const elm2 = doc.createTextNode(vnode.$text$);
      return elm2.data = vnode.$text$ = jsxToString(signalValue), trackSignal(signal, 4 & flags ? [3, elm2, signal, elm2] : [4, currentComponent.$element$, signal, elm2]), vnode.$elm$ = elm2;
    }
  }
  let elm;
  let isSvg = !!(flags & IS_SVG);
  isSvg || "svg" !== tag || (flags |= IS_SVG, isSvg = true);
  const isVirtual = tag === VIRTUAL;
  const props = vnode.$props$;
  const staticCtx = rCtx.$static$;
  const containerState = staticCtx.$containerState$;
  isVirtual ? elm = newVirtualElement(doc, isSvg) : "head" === tag ? (elm = doc.head, flags |= IS_HEAD) : (elm = createElement(doc, tag, isSvg), flags &= ~IS_HEAD), 2 & vnode.$flags$ && (flags |= 4), vnode.$elm$ = elm;
  const elCtx = createContext(elm);
  if (rCtx.$slotCtx$ ? (elCtx.$parentCtx$ = rCtx.$slotCtx$, elCtx.$realParentCtx$ = rCtx.$cmpCtx$) : elCtx.$parentCtx$ = rCtx.$cmpCtx$, isVirtual) {
    if ("q:renderFn" in props) {
      const renderQRL = props["q:renderFn"];
      const target = createPropsState();
      const manager = containerState.$subsManager$.$createManager$();
      const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
      const expectProps = props.props;
      if (containerState.$proxyMap$.set(target, proxy), elCtx.$props$ = proxy, expectProps !== EMPTY_OBJ) {
        const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
        for (const prop in expectProps) {
          if ("children" !== prop && prop !== QSlot) {
            const immutableValue2 = immutableMeta[prop];
            isSignal(immutableValue2) ? target["$$" + prop] = immutableValue2 : target[prop] = expectProps[prop];
          }
        }
      }
      setQId(rCtx, elCtx), elCtx.$componentQrl$ = renderQRL;
      const wait = maybeThen(renderComponent(rCtx, elCtx, flags), () => {
        let children2 = vnode.$children$;
        if (0 === children2.length) {
          return;
        }
        1 === children2.length && ":skipRender" === children2[0].$type$ && (children2 = children2[0].$children$);
        const slotMap = getSlotMap(elCtx);
        const p = [];
        const splittedNewChildren = splitChildren(children2);
        for (const slotName in splittedNewChildren) {
          const newVnode = splittedNewChildren[slotName];
          const slotCtx = getSlotCtx(staticCtx, slotMap, elCtx, slotName, staticCtx.$containerState$);
          const slotRctx = pushRenderContext(rCtx);
          const slotEl = slotCtx.$element$;
          slotRctx.$slotCtx$ = slotCtx, slotCtx.$vdom$ = newVnode, newVnode.$elm$ = slotEl;
          let newFlags = flags & ~IS_SVG;
          slotEl.isSvg && (newFlags |= IS_SVG);
          for (const node of newVnode.$children$) {
            const nodeElm = createElm(slotRctx, node, newFlags, p);
            assertDefined(node.$elm$), assertEqual(nodeElm, node.$elm$), appendChild(staticCtx, slotEl, nodeElm);
          }
        }
        return promiseAllLazy(p);
      });
      return isPromise(wait) && promises.push(wait), elm;
    }
    if ("q:s" in props) {
      assertDefined(currentComponent.$slots$), setKey(elm, vnode.$key$), directSetAttribute(elm, "q:sref", currentComponent.$id$), directSetAttribute(elm, "q:s", ""), currentComponent.$slots$.push(vnode), staticCtx.$addSlots$.push([elm, currentComponent.$element$]);
    } else if (dangerouslySetInnerHTML in props) {
      return setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]), elm;
    }
  } else {
    if (vnode.$immutableProps$) {
      const immProps = props !== EMPTY_OBJ ? Object.fromEntries(Object.entries(vnode.$immutableProps$).map(([k, v]) => [k, v === _IMMUTABLE ? props[k] : v])) : vnode.$immutableProps$;
      setProperties(staticCtx, elCtx, currentComponent, immProps, isSvg, true);
    }
    if (props !== EMPTY_OBJ) {
      elCtx.$vdom$ = vnode;
      const p = vnode.$immutableProps$ ? Object.fromEntries(Object.entries(props).filter(([k]) => !(k in vnode.$immutableProps$))) : props;
      vnode.$props$ = setProperties(staticCtx, elCtx, currentComponent, p, isSvg, false);
    }
    if (isSvg && "foreignObject" === tag && (isSvg = false, flags &= ~IS_SVG), currentComponent) {
      const scopedIds = currentComponent.$scopeIds$;
      scopedIds && scopedIds.forEach((styleId) => {
        elm.classList.add(styleId);
      }), currentComponent.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER && (elCtx.li.push(...currentComponent.li), currentComponent.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER);
    }
    for (const listener of elCtx.li) {
      addQwikEvent(staticCtx, elm, listener[0]);
    }
    if (void 0 !== props[dangerouslySetInnerHTML]) {
      return elm;
    }
    isSvg && "foreignObject" === tag && (isSvg = false, flags &= ~IS_SVG);
  }
  let children = vnode.$children$;
  if (0 === children.length) {
    return elm;
  }
  1 === children.length && ":skipRender" === children[0].$type$ && (children = children[0].$children$);
  const nodes = children.map((ch) => createElm(rCtx, ch, flags, promises));
  for (const node of nodes) {
    directAppendChild(elm, node);
  }
  return elm;
};
const getSlots = (elCtx) => {
  const slots = elCtx.$slots$;
  if (!slots) {
    return assertDefined(elCtx.$element$.parentElement), elCtx.$slots$ = readDOMSlots(elCtx);
  }
  return slots;
};
const getSlotMap = (elCtx) => {
  const slotsArray = getSlots(elCtx);
  const slots = {};
  const templates = {};
  const t = Array.from(elCtx.$element$.childNodes).filter(isSlotTemplate);
  for (const vnode of slotsArray) {
    assertQwikElement(vnode.$elm$), slots[vnode.$key$ ?? ""] = vnode.$elm$;
  }
  for (const elm of t) {
    templates[directGetAttribute(elm, QSlot) ?? ""] = elm;
  }
  return {
    slots,
    templates
  };
};
const readDOMSlots = (elCtx) => {
  const parent = elCtx.$element$.parentElement;
  return queryAllVirtualByAttribute(parent, "q:sref", elCtx.$id$).map(domToVnode);
};
const handleStyle = (ctx, elm, newValue) => (setProperty(ctx, elm.style, "cssText", newValue), true);
const handleClass = (ctx, elm, newValue) => (elm.namespaceURI === SVG_NS ? setAttribute(ctx, elm, "class", newValue) : setProperty(ctx, elm, "className", newValue), true);
const checkBeforeAssign = (ctx, elm, newValue, prop) => prop in elm && ((elm[prop] !== newValue || "value" === prop && !elm.hasAttribute(prop)) && ("value" === prop && "OPTION" !== elm.tagName ? setPropertyPost(ctx, elm, prop, newValue) : setProperty(ctx, elm, prop, newValue)), true);
const forceAttribute = (ctx, elm, newValue, prop) => (setAttribute(ctx, elm, prop.toLowerCase(), newValue), true);
const setInnerHTML = (ctx, elm, newValue) => (setProperty(ctx, elm, "innerHTML", newValue), true);
const noop = () => true;
const PROP_HANDLER_MAP = {
  style: handleStyle,
  class: handleClass,
  className: handleClass,
  value: checkBeforeAssign,
  checked: checkBeforeAssign,
  href: forceAttribute,
  list: forceAttribute,
  form: forceAttribute,
  tabIndex: forceAttribute,
  download: forceAttribute,
  innerHTML: noop,
  [dangerouslySetInnerHTML]: setInnerHTML
};
const smartSetProperty = (staticCtx, elm, prop, newValue, isSvg) => {
  if (isAriaAttribute(prop)) {
    return void setAttribute(staticCtx, elm, prop, null != newValue ? String(newValue) : newValue);
  }
  const exception = PROP_HANDLER_MAP[prop];
  exception && exception(staticCtx, elm, newValue, prop) || (isSvg || !(prop in elm) ? (prop.startsWith(PREVENT_DEFAULT) && registerQwikEvent(prop.slice(15)), setAttribute(staticCtx, elm, prop, newValue)) : setProperty(staticCtx, elm, prop, newValue));
};
const setProperties = (staticCtx, elCtx, hostCtx, newProps, isSvg, immutable) => {
  const values = {};
  const elm = elCtx.$element$;
  for (const prop in newProps) {
    let newValue = newProps[prop];
    if ("ref" !== prop) {
      if (isOnProp(prop)) {
        setEvent(elCtx.li, prop, newValue, staticCtx.$containerState$.$containerEl$);
      } else {
        if (isSignal(newValue) && (newValue = trackSignal(newValue, immutable ? [1, elm, newValue, hostCtx.$element$, prop] : [2, hostCtx.$element$, newValue, elm, prop])), "class" === prop) {
          if (newValue = serializeClassWithHost(newValue, hostCtx), !newValue) {
            continue;
          }
        } else {
          "style" === prop && (newValue = stringifyStyle(newValue));
        }
        values[prop] = newValue, smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
      }
    } else {
      void 0 !== newValue && setRef(newValue, elm);
    }
  }
  return values;
};
const setComponentProps = (containerState, elCtx, expectProps) => {
  let props = elCtx.$props$;
  if (props || (elCtx.$props$ = props = createProxy(createPropsState(), containerState)), expectProps === EMPTY_OBJ) {
    return;
  }
  const manager = getSubscriptionManager(props);
  const target = getProxyTarget(props);
  const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
  for (const prop in expectProps) {
    if ("children" !== prop && prop !== QSlot && !immutableMeta[prop]) {
      const value = expectProps[prop];
      target[prop] !== value && (target[prop] = value, manager.$notifySubs$(prop));
    }
  }
};
const cleanupTree = (elm, staticCtx, subsManager, stopSlots) => {
  if (subsManager.$clearSub$(elm), isQwikElement(elm)) {
    if (stopSlots && elm.hasAttribute("q:s")) {
      return void staticCtx.$rmSlots$.push(elm);
    }
    const ctx = tryGetContext(elm);
    ctx && cleanupContext(ctx, subsManager);
    const end = isVirtualElement(elm) ? elm.close : null;
    let node = elm.firstChild;
    for (; (node = processVirtualNodes(node)) && (cleanupTree(node, staticCtx, subsManager, true), node = node.nextSibling, node !== end); ) {
    }
  }
};
const executeContextWithScrollAndTransition = async (ctx) => {
  (executeDOMRender(ctx), isBrowser);
};
const directAppendChild = (parent, child) => {
  isVirtualElement(child) ? child.appendTo(parent) : parent.appendChild(child);
};
const directRemoveChild = (parent, child) => {
  isVirtualElement(child) ? child.remove() : parent.removeChild(child);
};
const directInsertAfter = (parent, child, ref) => {
  isVirtualElement(child) ? child.insertBeforeTo(parent, ref?.nextSibling ?? null) : parent.insertBefore(child, ref?.nextSibling ?? null);
};
const directInsertBefore = (parent, child, ref) => {
  isVirtualElement(child) ? child.insertBeforeTo(parent, getRootNode(ref)) : parent.insertBefore(child, getRootNode(ref));
};
const createKeyToOldIdx = (children, beginIdx, endIdx) => {
  const map = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i].$key$;
    null != key && (map[key] = i);
  }
  return map;
};
const addQwikEvent = (staticCtx, elm, prop) => {
  prop.startsWith("on:") || setAttribute(staticCtx, elm, prop, ""), registerQwikEvent(prop);
};
const registerQwikEvent = (prop) => {
  {
    const eventName = getEventName(prop);
    try {
      (globalThis.qwikevents ||= []).push(eventName);
    } catch (err) {
    }
  }
};
const setAttribute = (staticCtx, el, prop, value) => {
  staticCtx.$operations$.push({
    $operation$: _setAttribute,
    $args$: [el, prop, value]
  });
};
const _setAttribute = (el, prop, value) => {
  if (null == value || false === value) {
    el.removeAttribute(prop);
  } else {
    const str = true === value ? "" : String(value);
    directSetAttribute(el, prop, str);
  }
};
const setProperty = (staticCtx, node, key, value) => {
  staticCtx.$operations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  });
};
const setPropertyPost = (staticCtx, node, key, value) => {
  staticCtx.$postOperations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  });
};
const _setProperty = (node, key, value) => {
  try {
    node[key] = null == value ? "" : value, null == value && isNode$1(node) && isElement$1(node) && node.removeAttribute(key);
  } catch (err) {
    logError(codeToText(6), key, {
      node,
      value
    }, err);
  }
};
const createElement = (doc, expectTag, isSvg) => isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);
const insertBefore = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
  $operation$: directInsertBefore,
  $args$: [parent, newChild, refChild || null]
}), newChild);
const insertAfter = (staticCtx, parent, newChild, refChild) => (staticCtx.$operations$.push({
  $operation$: directInsertAfter,
  $args$: [parent, newChild, refChild || null]
}), newChild);
const appendChild = (staticCtx, parent, newChild) => (staticCtx.$operations$.push({
  $operation$: directAppendChild,
  $args$: [parent, newChild]
}), newChild);
const appendHeadStyle = (staticCtx, styleTask) => {
  staticCtx.$containerState$.$styleIds$.add(styleTask.styleId), staticCtx.$postOperations$.push({
    $operation$: _appendHeadStyle,
    $args$: [staticCtx.$containerState$, styleTask]
  });
};
const _appendHeadStyle = (containerState, styleTask) => {
  const containerEl = containerState.$containerEl$;
  const doc = getDocument(containerEl);
  const isDoc = doc.documentElement === containerEl;
  const headEl = doc.head;
  const style = doc.createElement("style");
  directSetAttribute(style, QStyle, styleTask.styleId), directSetAttribute(style, "hidden", ""), style.textContent = styleTask.content, isDoc && headEl ? directAppendChild(headEl, style) : directInsertBefore(containerEl, style, containerEl.firstChild);
};
const prepend = (staticCtx, parent, newChild) => {
  staticCtx.$operations$.push({
    $operation$: directPrepend,
    $args$: [parent, newChild]
  });
};
const directPrepend = (parent, newChild) => {
  directInsertBefore(parent, newChild, parent.firstChild);
};
const removeNode = (staticCtx, el) => {
  if (isQwikElement(el)) {
    cleanupTree(el, staticCtx, staticCtx.$containerState$.$subsManager$, true);
  }
  staticCtx.$operations$.push({
    $operation$: _removeNode,
    $args$: [el, staticCtx]
  });
};
const _removeNode = (el) => {
  const parent = el.parentElement;
  parent && directRemoveChild(parent, el);
};
const createTemplate = (doc, slotName) => {
  const template = createElement(doc, "q:template", false);
  return directSetAttribute(template, QSlot, slotName), directSetAttribute(template, "hidden", ""), directSetAttribute(template, "aria-hidden", "true"), template;
};
const executeDOMRender = (staticCtx) => {
  for (const op of staticCtx.$operations$) {
    op.$operation$.apply(void 0, op.$args$);
  }
  resolveSlotProjection(staticCtx);
};
const getKey = (el) => directGetAttribute(el, "q:key");
const setKey = (el, key) => {
  null !== key && directSetAttribute(el, "q:key", key);
};
const resolveSlotProjection = (staticCtx) => {
  const subsManager = staticCtx.$containerState$.$subsManager$;
  for (const slotEl of staticCtx.$rmSlots$) {
    const key = getKey(slotEl);
    const slotChildren = getChildren(slotEl, isChildComponent);
    if (slotChildren.length > 0) {
      const sref = slotEl.getAttribute("q:sref");
      const hostCtx = staticCtx.$roots$.find((r) => r.$id$ === sref);
      if (hostCtx) {
        const hostElm = hostCtx.$element$;
        if (hostElm.isConnected) {
          if (getChildren(hostElm, isSlotTemplate).some((node) => directGetAttribute(node, QSlot) === key)) {
            cleanupTree(slotEl, staticCtx, subsManager, false);
          } else {
            const template = createTemplate(staticCtx.$doc$, key);
            for (const child of slotChildren) {
              directAppendChild(template, child);
            }
            directInsertBefore(hostElm, template, hostElm.firstChild);
          }
        } else {
          cleanupTree(slotEl, staticCtx, subsManager, false);
        }
      } else {
        cleanupTree(slotEl, staticCtx, subsManager, false);
      }
    }
  }
  for (const [slotEl, hostElm] of staticCtx.$addSlots$) {
    const key = getKey(slotEl);
    const template = getChildren(hostElm, isSlotTemplate).find((node) => node.getAttribute(QSlot) === key);
    template && (getChildren(template, isChildComponent).forEach((child) => {
      directAppendChild(slotEl, child);
    }), template.remove());
  }
};
const printRenderStats = () => {
};
const newVirtualElement = (doc, isSvg) => {
  const open = doc.createComment("qv ");
  const close = doc.createComment("/qv");
  return new VirtualElementImpl(open, close, isSvg);
};
const parseVirtualAttributes = (str) => {
  if (!str) {
    return {};
  }
  const attributes = str.split(" ");
  return Object.fromEntries(attributes.map((attr) => {
    const index = attr.indexOf("=");
    return index >= 0 ? [attr.slice(0, index), unescape(attr.slice(index + 1))] : [attr, ""];
  }));
};
const serializeVirtualAttributes = (map) => {
  const attributes = [];
  return Object.entries(map).forEach(([key, value]) => {
    attributes.push(value ? `${key}=${escape(value)}` : `${key}`);
  }), attributes.join(" ");
};
const walkerVirtualByAttribute = (el, prop, value) => el.ownerDocument.createTreeWalker(el, 128, {
  acceptNode(c) {
    const virtual = getVirtualElement(c);
    return virtual && directGetAttribute(virtual, prop) === value ? 1 : 2;
  }
});
const queryAllVirtualByAttribute = (el, prop, value) => {
  const walker = walkerVirtualByAttribute(el, prop, value);
  const pars = [];
  let currentNode = null;
  for (; currentNode = walker.nextNode(); ) {
    pars.push(getVirtualElement(currentNode));
  }
  return pars;
};
const escape = (s) => s.replace(/ /g, "+");
const unescape = (s) => s.replace(/\+/g, " ");
const VIRTUAL = ":virtual";
class VirtualElementImpl {
  open;
  close;
  isSvg;
  ownerDocument;
  _qc_ = null;
  nodeType = 111;
  localName = VIRTUAL;
  nodeName = VIRTUAL;
  $attributes$;
  $template$;
  constructor(open, close, isSvg) {
    this.open = open, this.close = close, this.isSvg = isSvg;
    const doc = this.ownerDocument = open.ownerDocument;
    this.$template$ = createElement(doc, "template", false), this.$attributes$ = parseVirtualAttributes(open.data.slice(3)), assertTrue(open.data.startsWith("qv ")), open.__virtual = this, close.__virtual = this;
  }
  insertBefore(node, ref) {
    const parent = this.parentElement;
    if (parent) {
      parent.insertBefore(node, ref || this.close);
    } else {
      this.$template$.insertBefore(node, ref);
    }
    return node;
  }
  remove() {
    const parent = this.parentElement;
    if (parent) {
      const ch = this.childNodes;
      assertEqual(this.$template$.childElementCount), parent.removeChild(this.open);
      for (let i = 0; i < ch.length; i++) {
        this.$template$.appendChild(ch[i]);
      }
      parent.removeChild(this.close);
    }
  }
  appendChild(node) {
    return this.insertBefore(node, null);
  }
  insertBeforeTo(newParent, child) {
    const ch = this.childNodes;
    newParent.insertBefore(this.open, child);
    for (const c of ch) {
      newParent.insertBefore(c, child);
    }
    newParent.insertBefore(this.close, child), assertEqual(this.$template$.childElementCount);
  }
  appendTo(newParent) {
    this.insertBeforeTo(newParent, null);
  }
  get namespaceURI() {
    return this.parentElement?.namespaceURI ?? "";
  }
  removeChild(child) {
    this.parentElement ? this.parentElement.removeChild(child) : this.$template$.removeChild(child);
  }
  getAttribute(prop) {
    return this.$attributes$[prop] ?? null;
  }
  hasAttribute(prop) {
    return prop in this.$attributes$;
  }
  setAttribute(prop, value) {
    this.$attributes$[prop] = value, this.open.data = updateComment(this.$attributes$);
  }
  removeAttribute(prop) {
    delete this.$attributes$[prop], this.open.data = updateComment(this.$attributes$);
  }
  matches(_) {
    return false;
  }
  compareDocumentPosition(other) {
    return this.open.compareDocumentPosition(other);
  }
  closest(query) {
    const parent = this.parentElement;
    return parent ? parent.closest(query) : null;
  }
  querySelectorAll(query) {
    const result = [];
    return getChildren(this, isNodeElement).forEach((el) => {
      isQwikElement(el) && (el.matches(query) && result.push(el), result.concat(Array.from(el.querySelectorAll(query))));
    }), result;
  }
  querySelector(query) {
    for (const el of this.childNodes) {
      if (isElement$1(el)) {
        if (el.matches(query)) {
          return el;
        }
        const v = el.querySelector(query);
        if (null !== v) {
          return v;
        }
      }
    }
    return null;
  }
  get innerHTML() {
    return "";
  }
  set innerHTML(html) {
    const parent = this.parentElement;
    parent ? (this.childNodes.forEach((a2) => this.removeChild(a2)), this.$template$.innerHTML = html, parent.insertBefore(this.$template$.content, this.close)) : this.$template$.innerHTML = html;
  }
  get firstChild() {
    if (this.parentElement) {
      const first = this.open.nextSibling;
      return first === this.close ? null : first;
    }
    return this.$template$.firstChild;
  }
  get nextSibling() {
    return this.close.nextSibling;
  }
  get previousSibling() {
    return this.open.previousSibling;
  }
  get childNodes() {
    if (!this.parentElement) {
      return Array.from(this.$template$.childNodes);
    }
    const nodes = [];
    let node = this.open;
    for (; (node = node.nextSibling) && node !== this.close; ) {
      nodes.push(node);
    }
    return nodes;
  }
  get isConnected() {
    return this.open.isConnected;
  }
  get parentElement() {
    return this.open.parentElement;
  }
}
const updateComment = (attributes) => `qv ${serializeVirtualAttributes(attributes)}`;
const processVirtualNodes = (node) => {
  if (null == node) {
    return null;
  }
  if (isComment(node)) {
    const virtual = getVirtualElement(node);
    if (virtual) {
      return virtual;
    }
  }
  return node;
};
const findClose = (open) => {
  let node = open;
  let stack = 1;
  for (; node = node.nextSibling; ) {
    if (isComment(node)) {
      const virtual = node.__virtual;
      if (virtual) {
        node = virtual;
      } else if (node.data.startsWith("qv ")) {
        stack++;
      } else if ("/qv" === node.data && (stack--, 0 === stack)) {
        return node;
      }
    }
  }
};
const getVirtualElement = (open) => {
  const virtual = open.__virtual;
  if (virtual) {
    return virtual;
  }
  if (open.data.startsWith("qv ")) {
    const close = findClose(open);
    return new VirtualElementImpl(open, close, open.parentElement?.namespaceURI === SVG_NS);
  }
  return null;
};
const getRootNode = (node) => null == node ? null : isVirtualElement(node) ? node.open : node;
const pauseContainer = async (elmOrDoc) => {
  const doc = getDocument(elmOrDoc);
  const documentElement = doc.documentElement;
  const containerEl = isDocument(elmOrDoc) ? documentElement : elmOrDoc;
  if ("paused" === directGetAttribute(containerEl, "q:container")) {
    throw qError(21);
  }
  const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
  const containerState = _getContainerState(containerEl);
  const contexts = getNodesInScope(containerEl, hasContext);
  directSetAttribute(containerEl, "q:container", "paused");
  for (const elCtx of contexts) {
    const elm = elCtx.$element$;
    const listeners = elCtx.li;
    if (elCtx.$scopeIds$) {
      const value = serializeSStyle(elCtx.$scopeIds$);
      value && elm.setAttribute("q:sstyle", value);
    }
    if (elCtx.$id$ && elm.setAttribute("q:id", elCtx.$id$), isElement$1(elm) && listeners.length > 0) {
      const groups = groupListeners(listeners);
      for (const listener of groups) {
        elm.setAttribute(listener[0], serializeQRLs(listener[1], containerState, elCtx));
      }
    }
  }
  const data = await _pauseFromContexts(contexts, containerState, (el) => isNode$1(el) && isText(el) ? getTextID(el, containerState) : null);
  const qwikJson = doc.createElement("script");
  directSetAttribute(qwikJson, "type", "qwik/json"), qwikJson.textContent = escapeText$1(JSON.stringify(data.state, void 0, void 0)), parentJSON.appendChild(qwikJson);
  const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
  const eventsScript = doc.createElement("script");
  return eventsScript.textContent = `(window.qwikevents||=[]).push(${extraListeners.join(", ")})`, parentJSON.appendChild(eventsScript), data;
};
const _pauseFromContexts = async (allContexts, containerState, fallbackGetObjId, textNodes) => {
  const collector = createCollector(containerState);
  textNodes?.forEach((_, key) => {
    collector.$seen$.add(key);
  });
  let hasListeners = false;
  for (const ctx of allContexts) {
    if (ctx.$tasks$) {
      for (const task of ctx.$tasks$) {
        isResourceTask(task) && collector.$resources$.push(task.$state$), destroyTask(task);
      }
    }
  }
  for (const ctx of allContexts) {
    const el = ctx.$element$;
    const ctxListeners = ctx.li;
    for (const listener of ctxListeners) {
      if (isElement$1(el)) {
        const qrl2 = listener[1];
        const captured = qrl2.$captureRef$;
        if (captured) {
          for (const obj of captured) {
            collectValue(obj, collector, true);
          }
        }
        collector.$qrls$.push(qrl2), hasListeners = true;
      }
    }
  }
  if (!hasListeners) {
    return {
      state: {
        refs: {},
        ctx: {},
        objs: [],
        subs: []
      },
      objs: [],
      funcs: [],
      qrls: [],
      resources: collector.$resources$,
      mode: "static"
    };
  }
  let promises;
  for (; (promises = collector.$promises$).length > 0; ) {
    collector.$promises$ = [], await Promise.all(promises);
  }
  const canRender = collector.$elements$.length > 0;
  if (canRender) {
    for (const elCtx of collector.$deferElements$) {
      collectElementData(elCtx, collector, elCtx.$element$);
    }
    for (const ctx of allContexts) {
      collectProps(ctx, collector);
    }
  }
  for (; (promises = collector.$promises$).length > 0; ) {
    collector.$promises$ = [], await Promise.all(promises);
  }
  const elementToIndex = /* @__PURE__ */ new Map();
  const objs = Array.from(collector.$objSet$.keys());
  const objToId = /* @__PURE__ */ new Map();
  const getObjId = (obj) => {
    let suffix = "";
    if (isPromise(obj)) {
      const promiseValue = getPromiseValue(obj);
      if (!promiseValue) {
        return null;
      }
      obj = promiseValue.value, suffix += promiseValue.resolved ? "~" : "_";
    }
    if (isObject(obj)) {
      const target = getProxyTarget(obj);
      if (target) {
        suffix += "!", obj = target;
      } else if (isQwikElement(obj)) {
        const elID = ((el) => {
          let id2 = elementToIndex.get(el);
          return void 0 === id2 && (id2 = getQId(el), id2 || console.warn("Missing ID", el), elementToIndex.set(el, id2)), id2;
        })(obj);
        return elID ? "#" + elID + suffix : null;
      }
    }
    const id = objToId.get(obj);
    if (id) {
      return id + suffix;
    }
    const textId = textNodes?.get(obj);
    return textId ? "*" + textId : fallbackGetObjId ? fallbackGetObjId(obj) : null;
  };
  const mustGetObjId = (obj) => {
    const key = getObjId(obj);
    if (null === key) {
      if (isQrl(obj)) {
        const id = intToStr(objToId.size);
        return objToId.set(obj, id), id;
      }
      throw qError(27, obj);
    }
    return key;
  };
  const subsMap = /* @__PURE__ */ new Map();
  for (const obj of objs) {
    const subs2 = getManager(obj, containerState)?.$subs$;
    if (!subs2) {
      continue;
    }
    const flags = getProxyFlags(obj) ?? 0;
    const converted = [];
    1 & flags && converted.push(flags);
    for (const sub of subs2) {
      const host = sub[1];
      0 === sub[0] && isNode$1(host) && isVirtualElement(host) && !collector.$elements$.includes(tryGetContext(host)) || converted.push(sub);
    }
    converted.length > 0 && subsMap.set(obj, converted);
  }
  objs.sort((a2, b) => (subsMap.has(a2) ? 0 : 1) - (subsMap.has(b) ? 0 : 1));
  let count = 0;
  for (const obj of objs) {
    objToId.set(obj, intToStr(count)), count++;
  }
  if (collector.$noSerialize$.length > 0) {
    const undefinedID = objToId.get(void 0);
    for (const obj of collector.$noSerialize$) {
      objToId.set(obj, undefinedID);
    }
  }
  const subs = [];
  for (const obj of objs) {
    const value = subsMap.get(obj);
    if (null == value) {
      break;
    }
    subs.push(value.map((s) => "number" == typeof s ? `_${s}` : serializeSubscription(s, getObjId)).filter(isNotNullable));
  }
  assertEqual(subs.length, subsMap.size);
  const convertedObjs = serializeObjects(objs, mustGetObjId, getObjId, collector, containerState);
  const meta = {};
  const refs = {};
  for (const ctx of allContexts) {
    const node = ctx.$element$;
    const elementID = ctx.$id$;
    const ref = ctx.$refMap$;
    const props = ctx.$props$;
    const contexts = ctx.$contexts$;
    const tasks = ctx.$tasks$;
    const renderQrl = ctx.$componentQrl$;
    const seq = ctx.$seq$;
    const metaValue = {};
    const elementCaptured = isVirtualElement(node) && collector.$elements$.includes(ctx);
    if (ref.length > 0) {
      const value = mapJoin(ref, mustGetObjId, " ");
      value && (refs[elementID] = value);
    } else if (canRender) {
      let add = false;
      if (elementCaptured) {
        const propsId = getObjId(props);
        metaValue.h = mustGetObjId(renderQrl) + (propsId ? " " + propsId : ""), add = true;
      } else {
        const propsId = getObjId(props);
        propsId && (metaValue.h = " " + propsId, add = true);
      }
      if (tasks && tasks.length > 0) {
        const value = mapJoin(tasks, getObjId, " ");
        value && (metaValue.w = value, add = true);
      }
      if (elementCaptured && seq && seq.length > 0) {
        const value = mapJoin(seq, mustGetObjId, " ");
        metaValue.s = value, add = true;
      }
      if (contexts) {
        const serializedContexts = [];
        contexts.forEach((value2, key) => {
          const id = getObjId(value2);
          id && serializedContexts.push(`${key}=${id}`);
        });
        const value = serializedContexts.join(" ");
        value && (metaValue.c = value, add = true);
      }
      add && (meta[elementID] = metaValue);
    }
  }
  return {
    state: {
      refs,
      ctx: meta,
      objs: convertedObjs,
      subs
    },
    objs,
    funcs: collector.$inlinedFunctions$,
    resources: collector.$resources$,
    qrls: collector.$qrls$,
    mode: canRender ? "render" : "listeners"
  };
};
const mapJoin = (objects, getObjectId, sep) => {
  let output = "";
  for (const obj of objects) {
    const id = getObjectId(obj);
    null !== id && ("" !== output && (output += sep), output += id);
  }
  return output;
};
const getNodesInScope = (parent, predicate) => {
  const results = [];
  const v = predicate(parent);
  void 0 !== v && results.push(v);
  const walker = parent.ownerDocument.createTreeWalker(parent, 1 | SHOW_COMMENT$1, {
    acceptNode(node) {
      if (isContainer(node)) {
        return 2;
      }
      const v2 = predicate(node);
      return void 0 !== v2 && results.push(v2), 3;
    }
  });
  for (; walker.nextNode(); ) {
  }
  return results;
};
const collectProps = (elCtx, collector) => {
  const parentCtx = elCtx.$realParentCtx$ || elCtx.$parentCtx$;
  const props = elCtx.$props$;
  if (parentCtx && props && !isEmptyObj(props) && collector.$elements$.includes(parentCtx)) {
    const subs = getSubscriptionManager(props)?.$subs$;
    const el = elCtx.$element$;
    if (subs) {
      for (const [type, host] of subs) {
        0 === type ? (host !== el && collectSubscriptions(getSubscriptionManager(props), collector, false), isNode$1(host) ? collectElement(host, collector) : collectValue(host, collector, true)) : (collectValue(props, collector, false), collectSubscriptions(getSubscriptionManager(props), collector, false));
      }
    }
  }
};
const createCollector = (containerState) => {
  const inlinedFunctions = [];
  return containerState.$inlineFns$.forEach((id, fnStr) => {
    for (; inlinedFunctions.length <= id; ) {
      inlinedFunctions.push("");
    }
    inlinedFunctions[id] = fnStr;
  }), {
    $containerState$: containerState,
    $seen$: /* @__PURE__ */ new Set(),
    $objSet$: /* @__PURE__ */ new Set(),
    $prefetch$: 0,
    $noSerialize$: [],
    $inlinedFunctions$: inlinedFunctions,
    $resources$: [],
    $elements$: [],
    $qrls$: [],
    $deferElements$: [],
    $promises$: []
  };
};
const collectDeferElement = (el, collector) => {
  const ctx = tryGetContext(el);
  collector.$elements$.includes(ctx) || (collector.$elements$.push(ctx), ctx.$flags$ & HOST_FLAG_DYNAMIC ? (collector.$prefetch$++, collectElementData(ctx, collector, true), collector.$prefetch$--) : collector.$deferElements$.push(ctx));
};
const collectElement = (el, collector) => {
  const ctx = tryGetContext(el);
  if (ctx) {
    if (collector.$elements$.includes(ctx)) {
      return;
    }
    collector.$elements$.push(ctx), collectElementData(ctx, collector, el);
  }
};
const collectElementData = (elCtx, collector, dynamicCtx) => {
  if (elCtx.$props$ && !isEmptyObj(elCtx.$props$) && (collectValue(elCtx.$props$, collector, dynamicCtx), collectSubscriptions(getSubscriptionManager(elCtx.$props$), collector, dynamicCtx)), elCtx.$componentQrl$ && collectValue(elCtx.$componentQrl$, collector, dynamicCtx), elCtx.$seq$) {
    for (const obj of elCtx.$seq$) {
      collectValue(obj, collector, dynamicCtx);
    }
  }
  if (elCtx.$tasks$) {
    const map = collector.$containerState$.$subsManager$.$groupToManagers$;
    for (const obj of elCtx.$tasks$) {
      map.has(obj) && collectValue(obj, collector, dynamicCtx);
    }
  }
  if (true === dynamicCtx && (collectContext(elCtx, collector), elCtx.$dynamicSlots$)) {
    for (const slotCtx of elCtx.$dynamicSlots$) {
      collectContext(slotCtx, collector);
    }
  }
};
const collectContext = (elCtx, collector) => {
  for (; elCtx; ) {
    if (elCtx.$contexts$) {
      for (const obj of elCtx.$contexts$.values()) {
        collectValue(obj, collector, true);
      }
    }
    elCtx = elCtx.$parentCtx$;
  }
};
const escapeText$1 = (str) => str.replace(/<(\/?script)/gi, "\\x3C$1");
const collectSubscriptions = (manager, collector, leaks) => {
  if (collector.$seen$.has(manager)) {
    return;
  }
  collector.$seen$.add(manager);
  const subs = manager.$subs$;
  for (const sub of subs) {
    if (sub[0] > 0 && collectValue(sub[2], collector, leaks), true === leaks) {
      const host = sub[1];
      isNode$1(host) && isVirtualElement(host) ? 0 === sub[0] && collectDeferElement(host, collector) : collectValue(host, collector, true);
    }
  }
};
const PROMISE_VALUE = Symbol();
const resolvePromise = (promise) => promise.then((value) => (promise[PROMISE_VALUE] = {
  resolved: true,
  value
}, value), (value) => (promise[PROMISE_VALUE] = {
  resolved: false,
  value
}, value));
const getPromiseValue = (promise) => promise[PROMISE_VALUE];
const collectValue = (obj, collector, leaks) => {
  if (null != obj) {
    const objType = typeof obj;
    switch (objType) {
      case "function":
      case "object": {
        if (collector.$seen$.has(obj)) {
          return;
        }
        if (collector.$seen$.add(obj), fastSkipSerialize(obj)) {
          return collector.$objSet$.add(void 0), void collector.$noSerialize$.push(obj);
        }
        const input = obj;
        const target = getProxyTarget(obj);
        if (target) {
          const mutable = !(2 & getProxyFlags(obj = target));
          if (leaks && mutable && collectSubscriptions(getSubscriptionManager(input), collector, leaks), fastWeakSerialize(input)) {
            return void collector.$objSet$.add(obj);
          }
        }
        if (collectDeps(obj, collector, leaks)) {
          return void collector.$objSet$.add(obj);
        }
        if (isPromise(obj)) {
          return void collector.$promises$.push(resolvePromise(obj).then((value) => {
            collectValue(value, collector, leaks);
          }));
        }
        if ("object" === objType) {
          if (isNode$1(obj)) {
            return;
          }
          if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
              collectValue(input[i], collector, leaks);
            }
          } else if (isSerializableObject(obj)) {
            for (const key in obj) {
              collectValue(input[key], collector, leaks);
            }
          }
        }
        break;
      }
    }
  }
  collector.$objSet$.add(obj);
};
const isContainer = (el) => isElement$1(el) && el.hasAttribute("q:container");
const hasContext = (el) => {
  const node = processVirtualNodes(el);
  if (isQwikElement(node)) {
    const ctx = tryGetContext(node);
    if (ctx && ctx.$id$) {
      return ctx;
    }
  }
};
const getManager = (obj, containerState) => {
  if (!isObject(obj)) {
    return;
  }
  if (obj instanceof SignalImpl) {
    return getSubscriptionManager(obj);
  }
  const proxy = containerState.$proxyMap$.get(obj);
  return proxy ? getSubscriptionManager(proxy) : void 0;
};
const getQId = (el) => {
  const ctx = tryGetContext(el);
  return ctx ? ctx.$id$ : null;
};
const getTextID = (node, containerState) => {
  const prev = node.previousSibling;
  if (prev && isComment(prev) && prev.data.startsWith("t=")) {
    return "#" + prev.data.slice(2);
  }
  const doc = node.ownerDocument;
  const id = intToStr(containerState.$elementIndex$++);
  const open = doc.createComment(`t=${id}`);
  const close = doc.createComment("");
  const parent = node.parentElement;
  return parent.insertBefore(open, node), parent.insertBefore(close, node.nextSibling), "#" + id;
};
const isEmptyObj = (obj) => 0 === Object.keys(obj).length;
function serializeObjects(objs, mustGetObjId, getObjId, collector, containerState) {
  return objs.map((obj) => {
    if (null === obj) {
      return null;
    }
    const typeObj = typeof obj;
    switch (typeObj) {
      case "undefined":
        return UNDEFINED_PREFIX;
      case "number":
        if (!Number.isFinite(obj)) {
          break;
        }
        return obj;
      case "string":
        if (obj.charCodeAt(0) < 32) {
          break;
        }
        return obj;
      case "boolean":
        return obj;
    }
    const value = serializeValue(obj, mustGetObjId, collector, containerState);
    if (void 0 !== value) {
      return value;
    }
    if ("object" === typeObj) {
      if (isArray(obj)) {
        return obj.map(mustGetObjId);
      }
      if (isSerializableObject(obj)) {
        const output = {};
        for (const key in obj) {
          {
            const id = getObjId(obj[key]);
            null !== id && (output[key] = id);
          }
        }
        return output;
      }
    }
    throw qError(3, obj);
  });
}
const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);
const _noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null);
const serializeQRL = (qrl2, opts = {}) => {
  let symbol = qrl2.$symbol$;
  let chunk = qrl2.$chunk$;
  const refSymbol = qrl2.$refSymbol$ ?? symbol;
  const platform = getPlatform();
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol, chunk, qrl2.dev?.file);
    result ? (chunk = result[1], qrl2.$refSymbol$ || (symbol = result[0])) : console.error("serializeQRL: Cannot resolve symbol", symbol, "in", chunk, qrl2.dev?.file);
  }
  if (null == chunk) {
    throw qError(31, qrl2.$symbol$);
  }
  if (chunk.startsWith("./") && (chunk = chunk.slice(2)), isSyncQrl(qrl2)) {
    if (opts.$containerState$) {
      const fn = qrl2.resolved;
      const containerState = opts.$containerState$;
      const fnStrKey = fn.serialized || fn.toString();
      let id = containerState.$inlineFns$.get(fnStrKey);
      void 0 === id && (id = containerState.$inlineFns$.size, containerState.$inlineFns$.set(fnStrKey, id)), symbol = String(id);
    } else {
      throwErrorAndStop("Sync QRL without containerState");
    }
  }
  let output = `${chunk}#${symbol}`;
  const capture = qrl2.$capture$;
  const captureRef = qrl2.$captureRef$;
  return captureRef && captureRef.length ? opts.$getObjId$ ? output += `[${mapJoin(captureRef, opts.$getObjId$, " ")}]` : opts.$addRefMap$ && (output += `[${mapJoin(captureRef, opts.$addRefMap$, " ")}]`) : capture && capture.length > 0 && (output += `[${capture.join(" ")}]`), output;
};
const serializeQRLs = (existingQRLs, containerState, elCtx) => {
  assertElement(elCtx.$element$);
  const opts = {
    $containerState$: containerState,
    $addRefMap$: (obj) => addToArray(elCtx.$refMap$, obj)
  };
  return mapJoin(existingQRLs, (qrl2) => serializeQRL(qrl2, opts), "\n");
};
const parseQRL = (qrl2, containerEl) => {
  const endIdx = qrl2.length;
  const hashIdx = indexOf(qrl2, 0, "#");
  const captureIdx = indexOf(qrl2, hashIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, captureIdx);
  const chunk = qrl2.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbol = symbolStartIdx == captureIdx ? "default" : qrl2.substring(symbolStartIdx, captureIdx);
  const capture = captureIdx === endIdx ? EMPTY_ARRAY : qrl2.substring(captureIdx + 1, endIdx - 1).split(" ");
  const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
  return containerEl && iQrl.$setContainer$(containerEl), iQrl;
};
const indexOf = (text, startIdx, char) => {
  const endIdx = text.length;
  const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
  return -1 == charIdx ? endIdx : charIdx;
};
const addToArray = (array, obj) => {
  const index = array.indexOf(obj);
  return -1 === index ? (array.push(obj), String(array.length - 1)) : String(index);
};
const inflateQrl = (qrl2, elCtx) => (assertDefined(qrl2.$capture$), qrl2.$captureRef$ = qrl2.$capture$.map((idx) => {
  const int = parseInt(idx, 10);
  const obj = elCtx.$refMap$[int];
  return assertTrue(elCtx.$refMap$.length > int), obj;
}));
const _createResourceReturn = (opts) => ({
  __brand: "resource",
  value: void 0,
  loading: !isServerPlatform(),
  _resolved: void 0,
  _error: void 0,
  _state: "pending",
  _timeout: opts?.timeout ?? -1,
  _cache: 0
});
const isResourceReturn = (obj) => isObject(obj) && "resource" === obj.__brand;
const serializeResource = (resource, getObjId) => {
  const state = resource._state;
  return "resolved" === state ? `0 ${getObjId(resource._resolved)}` : "pending" === state ? "1" : `2 ${getObjId(resource._error)}`;
};
const parseResourceReturn = (data) => {
  const [first, id] = data.split(" ");
  const result = _createResourceReturn(void 0);
  return result.value = Promise.resolve(), "0" === first ? (result._state = "resolved", result._resolved = id, result.loading = false) : "1" === first ? (result._state = "pending", result.value = new Promise(() => {
  }), result.loading = true) : "2" === first && (result._state = "rejected", result._error = id, result.loading = false), result;
};
const Slot = (props) => _jsxC(Virtual, {
  [QSlotS]: ""
}, 0, props.name ?? "");
const UNDEFINED_PREFIX = "";
function serializer(serializer2) {
  return {
    $prefixCode$: serializer2.$prefix$.charCodeAt(0),
    $prefixChar$: serializer2.$prefix$,
    $test$: serializer2.$test$,
    $serialize$: serializer2.$serialize$,
    $prepare$: serializer2.$prepare$,
    $fill$: serializer2.$fill$,
    $collect$: serializer2.$collect$,
    $subs$: serializer2.$subs$
  };
}
const QRLSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isQrl(v),
  $collect$: (v, collector, leaks) => {
    if (v.$captureRef$) {
      for (const item of v.$captureRef$) {
        collectValue(item, collector, leaks);
      }
    }
    0 === collector.$prefetch$ && collector.$qrls$.push(v);
  },
  $serialize$: (obj, getObjId) => serializeQRL(obj, {
    $getObjId$: getObjId
  }),
  $prepare$: (data, containerState) => parseQRL(data, containerState.$containerEl$),
  $fill$: (qrl2, getObject) => {
    qrl2.$capture$ && qrl2.$capture$.length > 0 && (qrl2.$captureRef$ = qrl2.$capture$.map(getObject), qrl2.$capture$ = null);
  }
});
const TaskSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isSubscriberDescriptor(v),
  $collect$: (v, collector, leaks) => {
    collectValue(v.$qrl$, collector, leaks), v.$state$ && (collectValue(v.$state$, collector, leaks), true === leaks && v.$state$ instanceof SignalImpl && collectSubscriptions(v.$state$[QObjectManagerSymbol], collector, true));
  },
  $serialize$: (obj, getObjId) => serializeTask(obj, getObjId),
  $prepare$: (data) => parseTask(data),
  $fill$: (task, getObject) => {
    task.$el$ = getObject(task.$el$), task.$qrl$ = getObject(task.$qrl$), task.$state$ && (task.$state$ = getObject(task.$state$));
  }
});
const ResourceSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isResourceReturn(v),
  $collect$: (obj, collector, leaks) => {
    collectValue(obj.value, collector, leaks), collectValue(obj._resolved, collector, leaks);
  },
  $serialize$: (obj, getObjId) => serializeResource(obj, getObjId),
  $prepare$: (data) => parseResourceReturn(data),
  $fill$: (resource, getObject) => {
    if ("resolved" === resource._state) {
      resource._resolved = getObject(resource._resolved), resource.value = Promise.resolve(resource._resolved);
    } else if ("rejected" === resource._state) {
      const p = Promise.reject(resource._error);
      p.catch(() => null), resource._error = getObject(resource._error), resource.value = p;
    }
  }
});
const URLSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof URL,
  $serialize$: (obj) => obj.href,
  $prepare$: (data) => new URL(data)
});
const DateSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Date,
  $serialize$: (obj) => obj.toISOString(),
  $prepare$: (data) => new Date(data)
});
const RegexSerializer = /* @__PURE__ */ serializer({
  $prefix$: "\x07",
  $test$: (v) => v instanceof RegExp,
  $serialize$: (obj) => `${obj.flags} ${obj.source}`,
  $prepare$: (data) => {
    const space = data.indexOf(" ");
    const source = data.slice(space + 1);
    const flags = data.slice(0, space);
    return new RegExp(source, flags);
  }
});
const ErrorSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Error,
  $serialize$: (obj) => obj.message,
  $prepare$: (text) => {
    const err = new Error(text);
    return err.stack = void 0, err;
  }
});
const DocumentSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => !!v && "object" == typeof v && isDocument(v),
  $prepare$: (_, _c, doc) => doc
});
const SERIALIZABLE_STATE = Symbol("serializable-data");
const ComponentSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (obj) => isQwikComponent$1(obj),
  $serialize$: (obj, getObjId) => {
    const [qrl2] = obj[SERIALIZABLE_STATE];
    return serializeQRL(qrl2, {
      $getObjId$: getObjId
    });
  },
  $prepare$: (data, containerState) => {
    const qrl2 = parseQRL(data, containerState.$containerEl$);
    return componentQrl(qrl2);
  },
  $fill$: (component, getObject) => {
    const [qrl2] = component[SERIALIZABLE_STATE];
    qrl2.$capture$?.length && (qrl2.$captureRef$ = qrl2.$capture$.map(getObject), qrl2.$capture$ = null);
  }
});
const DerivedSignalSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (obj) => obj instanceof SignalDerived,
  $collect$: (obj, collector, leaks) => {
    if (obj.$args$) {
      for (const arg of obj.$args$) {
        collectValue(arg, collector, leaks);
      }
    }
  },
  $serialize$: (signal, getObjID, collector) => {
    const serialized = serializeDerivedSignalFunc(signal);
    let index = collector.$inlinedFunctions$.indexOf(serialized);
    return index < 0 && (index = collector.$inlinedFunctions$.length, collector.$inlinedFunctions$.push(serialized)), mapJoin(signal.$args$, getObjID, " ") + " @" + intToStr(index);
  },
  $prepare$: (data) => {
    const ids = data.split(" ");
    const args = ids.slice(0, -1);
    const fn = ids[ids.length - 1];
    return new SignalDerived(fn, args, fn);
  },
  $fill$: (fn, getObject) => {
    assertString(fn.$func$), fn.$func$ = getObject(fn.$func$), fn.$args$ = fn.$args$.map(getObject);
  }
});
const SignalSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof SignalImpl,
  $collect$: (obj, collector, leaks) => {
    collectValue(obj.untrackedValue, collector, leaks);
    return true === leaks && !(obj[QObjectSignalFlags] & SIGNAL_IMMUTABLE) && collectSubscriptions(obj[QObjectManagerSymbol], collector, true), obj;
  },
  $serialize$: (obj, getObjId) => getObjId(obj.untrackedValue),
  $prepare$: (data, containerState) => new SignalImpl(data, containerState?.$subsManager$?.$createManager$(), 0),
  $subs$: (signal, subs) => {
    signal[QObjectManagerSymbol].$addSubs$(subs);
  },
  $fill$: (signal, getObject) => {
    signal.untrackedValue = getObject(signal.untrackedValue);
  }
});
const SignalWrapperSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof SignalWrapper,
  $collect$(obj, collector, leaks) {
    if (collectValue(obj.ref, collector, leaks), fastWeakSerialize(obj.ref)) {
      const localManager = getSubscriptionManager(obj.ref);
      isTreeShakeable(collector.$containerState$.$subsManager$, localManager, leaks) && collectValue(obj.ref[obj.prop], collector, leaks);
    }
    return obj;
  },
  $serialize$: (obj, getObjId) => `${getObjId(obj.ref)} ${obj.prop}`,
  $prepare$: (data) => {
    const [id, prop] = data.split(" ");
    return new SignalWrapper(id, prop);
  },
  $fill$: (signal, getObject) => {
    signal.ref = getObject(signal.ref);
  }
});
const NoFiniteNumberSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => "number" == typeof v,
  $serialize$: (v) => String(v),
  $prepare$: (data) => Number(data)
});
const URLSearchParamsSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof URLSearchParams,
  $serialize$: (obj) => obj.toString(),
  $prepare$: (data) => new URLSearchParams(data)
});
const FormDataSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => "undefined" != typeof FormData && v instanceof globalThis.FormData,
  $serialize$: (formData) => {
    const array = [];
    return formData.forEach((value, key) => {
      array.push("string" == typeof value ? [key, value] : [key, value.name]);
    }), JSON.stringify(array);
  },
  $prepare$: (data) => {
    const array = JSON.parse(data);
    const formData = new FormData();
    for (const [key, value] of array) {
      formData.append(key, value);
    }
    return formData;
  }
});
const JSXNodeSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => isJSXNode(v),
  $collect$: (node, collector, leaks) => {
    collectValue(node.children, collector, leaks), collectValue(node.props, collector, leaks), collectValue(node.immutableProps, collector, leaks), collectValue(node.key, collector, leaks);
    let type = node.type;
    type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), collectValue(type, collector, leaks);
  },
  $serialize$: (node, getObjID) => {
    let type = node.type;
    return type === Slot ? type = ":slot" : type === Fragment && (type = ":fragment"), `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.immutableProps)} ${getObjID(node.key)} ${getObjID(node.children)} ${node.flags}`;
  },
  $prepare$: (data) => {
    const [type, props, immutableProps, key, children, flags] = data.split(" ");
    return new JSXNodeImpl(type, props, immutableProps, children, parseInt(flags, 10), key);
  },
  $fill$: (node, getObject) => {
    node.type = getResolveJSXType(getObject(node.type)), node.props = getObject(node.props), node.immutableProps = getObject(node.immutableProps), node.key = getObject(node.key), node.children = getObject(node.children);
  }
});
const BigIntSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => "bigint" == typeof v,
  $serialize$: (v) => v.toString(),
  $prepare$: (data) => BigInt(data)
});
const Uint8ArraySerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Uint8Array,
  $serialize$: (v) => {
    let buf = "";
    for (const c of v) {
      buf += String.fromCharCode(c);
    }
    return btoa(buf).replace(/=+$/, "");
  },
  $prepare$: (data) => {
    const buf = atob(data);
    const bytes = new Uint8Array(buf.length);
    let i = 0;
    for (const s of buf) {
      bytes[i++] = s.charCodeAt(0);
    }
    return bytes;
  },
  $fill$: void 0
});
const DATA = Symbol();
const SetSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Set,
  $collect$: (set, collector, leaks) => {
    set.forEach((value) => collectValue(value, collector, leaks));
  },
  $serialize$: (v, getObjID) => Array.from(v).map(getObjID).join(" "),
  $prepare$: (data) => {
    const set = /* @__PURE__ */ new Set();
    return set[DATA] = data, set;
  },
  $fill$: (set, getObject) => {
    const data = set[DATA];
    set[DATA] = void 0;
    const items = 0 === data.length ? [] : data.split(" ");
    for (const id of items) {
      set.add(getObject(id));
    }
  }
});
const MapSerializer = /* @__PURE__ */ serializer({
  $prefix$: "",
  $test$: (v) => v instanceof Map,
  $collect$: (map, collector, leaks) => {
    map.forEach((value, key) => {
      collectValue(value, collector, leaks), collectValue(key, collector, leaks);
    });
  },
  $serialize$: (map, getObjID) => {
    const result = [];
    return map.forEach((value, key) => {
      result.push(getObjID(key) + " " + getObjID(value));
    }), result.join(" ");
  },
  $prepare$: (data) => {
    const set = /* @__PURE__ */ new Map();
    return set[DATA] = data, set;
  },
  $fill$: (set, getObject) => {
    const data = set[DATA];
    set[DATA] = void 0;
    const items = 0 === data.length ? [] : data.split(" ");
    assertTrue(items.length % 2 == 0);
    for (let i = 0; i < items.length; i += 2) {
      set.set(getObject(items[i]), getObject(items[i + 1]));
    }
  }
});
const StringSerializer = /* @__PURE__ */ serializer({
  $prefix$: "\x1B",
  $test$: (v) => !!getSerializer(v) || v === UNDEFINED_PREFIX,
  $serialize$: (v) => v,
  $prepare$: (data) => data
});
const serializers = [QRLSerializer, TaskSerializer, ResourceSerializer, URLSerializer, DateSerializer, RegexSerializer, ErrorSerializer, DocumentSerializer, ComponentSerializer, DerivedSignalSerializer, SignalSerializer, SignalWrapperSerializer, NoFiniteNumberSerializer, URLSearchParamsSerializer, FormDataSerializer, JSXNodeSerializer, BigIntSerializer, SetSerializer, MapSerializer, StringSerializer, Uint8ArraySerializer];
const serializerByPrefix = /* @__PURE__ */ (() => {
  const serializerByPrefix2 = [];
  return serializers.forEach((s) => {
    const prefix = s.$prefixCode$;
    for (; serializerByPrefix2.length < prefix; ) {
      serializerByPrefix2.push(void 0);
    }
    serializerByPrefix2.push(s);
  }), serializerByPrefix2;
})();
function getSerializer(obj) {
  if ("string" == typeof obj) {
    const prefix = obj.charCodeAt(0);
    if (prefix < serializerByPrefix.length) {
      return serializerByPrefix[prefix];
    }
  }
}
const collectorSerializers = /* @__PURE__ */ serializers.filter((a2) => a2.$collect$);
const collectDeps = (obj, collector, leaks) => {
  for (const s of collectorSerializers) {
    if (s.$test$(obj)) {
      return s.$collect$(obj, collector, leaks), true;
    }
  }
  return false;
};
const serializeValue = (obj, getObjID, collector, containerState) => {
  for (const s of serializers) {
    if (s.$test$(obj)) {
      let value = s.$prefixChar$;
      return s.$serialize$ && (value += s.$serialize$(obj, getObjID, collector, containerState)), value;
    }
  }
  if ("string" == typeof obj) {
    return obj;
  }
};
const createParser = (containerState, doc) => {
  const fillMap = /* @__PURE__ */ new Map();
  const subsMap = /* @__PURE__ */ new Map();
  return {
    prepare(data) {
      const serializer2 = getSerializer(data);
      if (serializer2) {
        const value = serializer2.$prepare$(data.slice(1), containerState, doc);
        return serializer2.$fill$ && fillMap.set(value, serializer2), serializer2.$subs$ && subsMap.set(value, serializer2), value;
      }
      return data;
    },
    subs(obj, subs) {
      const serializer2 = subsMap.get(obj);
      return !!serializer2 && (serializer2.$subs$(obj, subs, containerState), true);
    },
    fill(obj, getObject) {
      const serializer2 = fillMap.get(obj);
      return !!serializer2 && (serializer2.$fill$(obj, getObject, containerState), true);
    }
  };
};
const OBJECT_TRANSFORMS = {
  "!": (obj, containerState) => containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState),
  "~": (obj) => Promise.resolve(obj),
  _: (obj) => Promise.reject(obj)
};
const isTreeShakeable = (manager, target, leaks) => {
  if ("boolean" == typeof leaks) {
    return leaks;
  }
  const localManager = manager.$groupToManagers$.get(leaks);
  return !!(localManager && localManager.length > 0) && (1 !== localManager.length || localManager[0] !== target);
};
const getResolveJSXType = (type) => ":slot" === type ? Slot : ":fragment" === type ? Fragment : type;
const noSerializeSet = /* @__PURE__ */ new WeakSet();
const weakSerializeSet = /* @__PURE__ */ new WeakSet();
const fastSkipSerialize = (obj) => noSerializeSet.has(obj);
const fastWeakSerialize = (obj) => weakSerializeSet.has(obj);
const noSerialize = (input) => (null != input && noSerializeSet.add(input), input);
const unwrapProxy = (proxy) => isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
const getProxyTarget = (obj) => obj[QOjectTargetSymbol];
const getSubscriptionManager = (obj) => obj[QObjectManagerSymbol];
const getProxyFlags = (obj) => obj[QObjectFlagsSymbol];
const serializeSubscription = (sub, getObjId) => {
  const type = sub[0];
  const host = "string" == typeof sub[1] ? sub[1] : getObjId(sub[1]);
  if (!host) {
    return;
  }
  let base = type + " " + host;
  let key;
  if (0 === type) {
    key = sub[2];
  } else {
    const signalID = getObjId(sub[2]);
    if (!signalID) {
      return;
    }
    if (type <= 2) {
      key = sub[5], base += ` ${signalID} ${must(getObjId(sub[3]))} ${sub[4]}`;
    } else if (type <= 4) {
      key = sub[4];
      base += ` ${signalID} ${"string" == typeof sub[3] ? sub[3] : must(getObjId(sub[3]))}`;
    } else ;
  }
  return key && (base += ` ${encodeURI(key)}`), base;
};
const parseSubscription = (sub, getObject) => {
  const parts = sub.split(" ");
  const type = parseInt(parts[0], 10);
  assertTrue(parts.length >= 2);
  const host = getObject(parts[1]);
  if (!host) {
    return;
  }
  if (isSubscriberDescriptor(host) && !host.$el$) {
    return;
  }
  const subscription = [type, host];
  return 0 === type ? (assertTrue(parts.length <= 3), subscription.push(safeDecode(parts[2]))) : type <= 2 ? (assertTrue(5 === parts.length || 6 === parts.length), subscription.push(getObject(parts[2]), getObject(parts[3]), parts[4], safeDecode(parts[5]))) : type <= 4 && (assertTrue(4 === parts.length || 5 === parts.length), subscription.push(getObject(parts[2]), getObject(parts[3]), safeDecode(parts[4]))), subscription;
};
const safeDecode = (str) => {
  if (void 0 !== str) {
    return decodeURI(str);
  }
};
const createSubscriptionManager = (containerState) => {
  const groupToManagers = /* @__PURE__ */ new Map();
  const manager = {
    $groupToManagers$: groupToManagers,
    $createManager$: (initialMap) => new LocalSubscriptionManager(groupToManagers, containerState, initialMap),
    $clearSub$: (group) => {
      const managers = groupToManagers.get(group);
      if (managers) {
        for (const manager2 of managers) {
          manager2.$unsubGroup$(group);
        }
        groupToManagers.delete(group), managers.length = 0;
      }
    },
    $clearSignal$: (signal) => {
      const managers = groupToManagers.get(signal[1]);
      if (managers) {
        for (const manager2 of managers) {
          manager2.$unsubEntry$(signal);
        }
      }
    }
  };
  return manager;
};
class LocalSubscriptionManager {
  $groupToManagers$;
  $containerState$;
  $subs$;
  constructor($groupToManagers$, $containerState$, initialMap) {
    this.$groupToManagers$ = $groupToManagers$, this.$containerState$ = $containerState$, this.$subs$ = [], initialMap && this.$addSubs$(initialMap);
  }
  $addSubs$(subs) {
    this.$subs$.push(...subs);
    for (const sub of this.$subs$) {
      this.$addToGroup$(sub[1], this);
    }
  }
  $addToGroup$(group, manager) {
    let managers = this.$groupToManagers$.get(group);
    managers || this.$groupToManagers$.set(group, managers = []), managers.includes(manager) || managers.push(manager);
  }
  $unsubGroup$(group) {
    const subs = this.$subs$;
    for (let i = 0; i < subs.length; i++) {
      subs[i][1] === group && (subs.splice(i, 1), i--);
    }
  }
  $unsubEntry$(entry) {
    const [type, group, signal, elm] = entry;
    const subs = this.$subs$;
    if (1 === type || 2 === type) {
      const prop = entry[4];
      for (let i = 0; i < subs.length; i++) {
        const sub = subs[i];
        sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && sub[4] === prop && (subs.splice(i, 1), i--);
      }
    } else if (3 === type || 4 === type) {
      for (let i = 0; i < subs.length; i++) {
        const sub = subs[i];
        sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && (subs.splice(i, 1), i--);
      }
    }
  }
  $addSub$(sub, key) {
    const subs = this.$subs$;
    const group = sub[1];
    0 === sub[0] && subs.some(([_type, _group, _key]) => 0 === _type && _group === group && _key === key) || (subs.push(__lastSubscription = [...sub, key]), this.$addToGroup$(group, this));
  }
  $notifySubs$(key) {
    const subs = this.$subs$;
    for (const sub of subs) {
      const compare = sub[sub.length - 1];
      key && compare && compare !== key || notifyChange(sub, this.$containerState$);
    }
  }
}
let __lastSubscription;
function getLastSubscription() {
  return __lastSubscription;
}
const must = (a2) => {
  if (null == a2) {
    throw logError("must be non null", a2);
  }
  return a2;
};
const isQrl = (value) => "function" == typeof value && "function" == typeof value.getSymbol;
const isSyncQrl = (value) => isQrl(value) && "<sync>" == value.$symbol$;
const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
  let _containerEl;
  const qrl2 = async function(...args) {
    const fn = invokeFn.call(this, tryGetInvokeContext());
    return await fn(...args);
  };
  const setContainer = (el) => (_containerEl || (_containerEl = el), _containerEl);
  const wrapFn = (fn) => "function" != typeof fn || !capture?.length && !captureRef?.length ? fn : function(...args) {
    let context = tryGetInvokeContext();
    if (context) {
      const prevQrl = context.$qrl$;
      context.$qrl$ = qrl2;
      const prevEvent = context.$event$;
      void 0 === context.$event$ && (context.$event$ = this);
      try {
        return fn.apply(this, args);
      } finally {
        context.$qrl$ = prevQrl, context.$event$ = prevEvent;
      }
    }
    return context = newInvokeContext(), context.$qrl$ = qrl2, context.$event$ = this, invoke.call(this, context, fn, ...args);
  };
  const resolve = async (containerEl) => {
    if (null !== symbolRef) {
      return symbolRef;
    }
    if (containerEl && setContainer(containerEl), "" === chunk) {
      const hash3 = _containerEl.getAttribute(QInstance$1);
      const qFuncs = getQFuncs(_containerEl.ownerDocument, hash3);
      return qrl2.resolved = symbolRef = qFuncs[Number(symbol)];
    }
    const start = now();
    const ctx = tryGetInvokeContext();
    {
      const imported = getPlatform().importSymbol(_containerEl, chunk, symbol);
      symbolRef = maybeThen(imported, (ref) => qrl2.resolved = symbolRef = wrapFn(ref));
    }
    return "object" == typeof symbolRef && isPromise(symbolRef) && symbolRef.then(() => emitUsedSymbol(symbol, ctx?.$element$, start), (err) => {
      throw console.error(`qrl ${symbol} failed to load`, err), symbolRef = null, err;
    }), symbolRef;
  };
  const resolveLazy = (containerEl) => null !== symbolRef ? symbolRef : resolve(containerEl);
  function invokeFn(currentCtx, beforeFn) {
    return (...args) => maybeThen(resolveLazy(), (f) => {
      if (!isFunction(f)) {
        throw qError(10);
      }
      if (beforeFn && false === beforeFn()) {
        return;
      }
      const context = createOrReuseInvocationContext(currentCtx);
      return invoke.call(this, context, f, ...args);
    });
  }
  const createOrReuseInvocationContext = (invoke2) => null == invoke2 ? newInvokeContext() : isArray(invoke2) ? newInvokeContextFromTuple(invoke2) : invoke2;
  const resolvedSymbol = symbol;
  const hash2 = getSymbolHash$1(resolvedSymbol);
  return Object.assign(qrl2, {
    getSymbol: () => resolvedSymbol,
    getHash: () => hash2,
    getCaptured: () => captureRef,
    resolve,
    $resolveLazy$: resolveLazy,
    $setContainer$: setContainer,
    $chunk$: chunk,
    $symbol$: symbol,
    $refSymbol$: refSymbol,
    $hash$: hash2,
    getFn: invokeFn,
    $capture$: capture,
    $captureRef$: captureRef,
    dev: null,
    resolved: void 0
  }), symbolRef && (symbolRef = maybeThen(symbolRef, (resolved) => qrl2.resolved = symbolRef = wrapFn(resolved))), qrl2;
};
const getSymbolHash$1 = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  return index > -1 ? symbolName.slice(index + 1) : symbolName;
};
function assertQrl() {
}
function assertSignal() {
}
const EMITTED = /* @__PURE__ */ new Set();
const emitUsedSymbol = (symbol, element, reqTime) => {
  EMITTED.has(symbol) || (EMITTED.add(symbol), emitEvent("qsymbol", {
    symbol,
    element,
    reqTime
  }));
};
const emitEvent = (eventName, detail) => {
  isServerPlatform() || "object" != typeof document || document.dispatchEvent(new CustomEvent(eventName, {
    bubbles: false,
    detail
  }));
};
const now = () => isServerPlatform() ? 0 : "object" == typeof performance ? performance.now() : 0;
const componentQrl = (componentQrl2) => {
  function QwikComponent(props, key, flags) {
    const finalKey = componentQrl2.$hash$.slice(0, 4) + ":" + (key || "");
    return _jsxC(Virtual, {
      [OnRenderProp]: componentQrl2,
      [QSlot]: props[QSlot],
      [_IMMUTABLE]: props[_IMMUTABLE],
      children: props.children,
      props
    }, flags, finalKey);
  }
  return QwikComponent[SERIALIZABLE_STATE] = [componentQrl2], QwikComponent;
};
const isQwikComponent$1 = (component) => "function" == typeof component && void 0 !== component[SERIALIZABLE_STATE];

const isNode = true;
const qAstroManifestPath = "/Users/jackshelton/dev/playground/q-astro-vercel/node_modules/.pnpm/@qwikdev+astro@0.7.6_@builder.io+qwik@1.12.0_vite@6.0.7_yaml@2.7.0___astro@5.1.2_rollup@4.29._idn66wqk2kj2hjbcbbhncbk75e/node_modules/@qwikdev/astro/q-astro-manifest.json";

/**
 * @license
 * @builder.io/qwik/server 1.12.0
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/QwikDev/qwik/blob/main/LICENSE
 */
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var SYNC_QRL = "<sync>";
function createPlatform(opts, resolvedManifest) {
  const mapper = resolvedManifest?.mapper;
  const mapperFn = opts.symbolMapper ? opts.symbolMapper : (symbolName, _chunk, parent) => {
    if (mapper) {
      const hash2 = getSymbolHash(symbolName);
      const result = mapper[hash2];
      if (!result) {
        if (hash2 === SYNC_QRL) {
          return [hash2, ""];
        }
        const isRegistered = globalThis.__qwik_reg_symbols?.has(hash2);
        if (isRegistered) {
          return [symbolName, "_"];
        }
        if (parent) {
          return [symbolName, `${parent}?qrl=${symbolName}`];
        }
        console.error("Cannot resolve symbol", symbolName, "in", mapper, parent);
      }
      return result;
    }
  };
  const serverPlatform = {
    isServer: true,
    async importSymbol(_containerEl, url, symbolName) {
      const hash2 = getSymbolHash(symbolName);
      const regSym = globalThis.__qwik_reg_symbols?.get(hash2);
      if (regSym) {
        return regSym;
      }
      let modulePath = String(url);
      if (!modulePath.endsWith(".js")) {
        modulePath += ".js";
      }
      const module = __require(modulePath);
      if (!(symbolName in module)) {
        throw new Error(`Q-ERROR: missing symbol '${symbolName}' in module '${modulePath}'.`);
      }
      return module[symbolName];
    },
    raf: () => {
      console.error("server can not rerender");
      return Promise.resolve();
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName, _chunk, parent) {
      return mapperFn(symbolName, mapper, parent);
    }
  };
  return serverPlatform;
}
async function setServerPlatform(opts, manifest) {
  const platform = createPlatform(opts, manifest);
  setPlatform(platform);
}
var getSymbolHash = (symbolName) => {
  const index = symbolName.lastIndexOf("_");
  if (index > -1) {
    return symbolName.slice(index + 1);
  }
  return symbolName;
};
var QInstance = "q:instance";
function getValidManifest(manifest) {
  if (manifest != null && manifest.mapping != null && typeof manifest.mapping === "object" && manifest.symbols != null && typeof manifest.symbols === "object" && manifest.bundles != null && typeof manifest.bundles === "object") {
    return manifest;
  }
  return void 0;
}
function workerFetchScript() {
  const fetch2 = `Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})`;
  const workerBody = `onmessage=(e)=>{${fetch2}}`;
  const blob = `new Blob(['${workerBody}'],{type:"text/javascript"})`;
  const url = `URL.createObjectURL(${blob})`;
  let s = `const w=new Worker(${url});`;
  s += `w.postMessage(u.map(u=>new URL(u,origin)+''));`;
  s += `w.onmessage=()=>{w.terminate()};`;
  return s;
}
function prefetchUrlsEventScript(base, prefetchResources) {
  const data = {
    bundles: flattenPrefetchResources(prefetchResources).map((u) => u.split("/").pop())
  };
  const args = JSON.stringify(["prefetch", base, ...data.bundles]);
  return `(window.qwikPrefetchSW||(window.qwikPrefetchSW=[])).push(${args});`;
}
function flattenPrefetchResources(prefetchResources) {
  const urls = [];
  const addPrefetchResource = (prefetchResources2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        if (!urls.includes(prefetchResource.url)) {
          urls.push(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports);
        }
      }
    }
  };
  addPrefetchResource(prefetchResources);
  return urls;
}
function getMostReferenced(prefetchResources) {
  const common = /* @__PURE__ */ new Map();
  let total = 0;
  const addPrefetchResource = (prefetchResources2, visited2) => {
    if (Array.isArray(prefetchResources2)) {
      for (const prefetchResource of prefetchResources2) {
        const count = common.get(prefetchResource.url) || 0;
        common.set(prefetchResource.url, count + 1);
        total++;
        if (!visited2.has(prefetchResource.url)) {
          visited2.add(prefetchResource.url);
          addPrefetchResource(prefetchResource.imports, visited2);
        }
      }
    }
  };
  const visited = /* @__PURE__ */ new Set();
  for (const resource of prefetchResources) {
    visited.clear();
    addPrefetchResource(resource.imports, visited);
  }
  const threshold = total / common.size * 2;
  const urls = Array.from(common.entries());
  urls.sort((a, b) => b[1] - a[1]);
  return urls.slice(0, 5).filter((e) => e[1] > threshold).map((e) => e[0]);
}
function applyPrefetchImplementation(base, prefetchStrategy, prefetchResources, nonce) {
  const prefetchImpl = normalizePrefetchImplementation(prefetchStrategy?.implementation);
  const prefetchNodes = [];
  if (prefetchImpl.prefetchEvent === "always") {
    prefetchUrlsEvent(base, prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchImpl.linkInsert === "html-append") {
    linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl);
  }
  if (prefetchImpl.linkInsert === "js-append") {
    linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce);
  } else if (prefetchImpl.workerFetchInsert === "always") {
    workerFetchImplementation(prefetchNodes, prefetchResources, nonce);
  }
  if (prefetchNodes.length > 0) {
    return jsx(Fragment, { children: prefetchNodes });
  }
  return null;
}
function prefetchUrlsEvent(base, prefetchNodes, prefetchResources, nonce) {
  const mostReferenced = getMostReferenced(prefetchResources);
  for (const url of mostReferenced) {
    prefetchNodes.push(
      jsx("link", {
        rel: "modulepreload",
        href: url,
        nonce
      })
    );
  }
  prefetchNodes.push(
    jsx("script", {
      "q:type": "prefetch-bundles",
      dangerouslySetInnerHTML: prefetchUrlsEventScript(base, prefetchResources) + `document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: [location.pathname]}}))`,
      nonce
    })
  );
}
function linkHtmlImplementation(prefetchNodes, prefetchResources, prefetchImpl) {
  const urls = flattenPrefetchResources(prefetchResources);
  const rel = prefetchImpl.linkRel || "prefetch";
  const priority = prefetchImpl.linkFetchPriority;
  for (const url of urls) {
    const attributes = {};
    attributes["href"] = url;
    attributes["rel"] = rel;
    if (priority) {
      attributes["fetchpriority"] = priority;
    }
    if (rel === "prefetch" || rel === "preload") {
      if (url.endsWith(".js")) {
        attributes["as"] = "script";
      }
    }
    prefetchNodes.push(jsx("link", attributes));
  }
}
function linkJsImplementation(prefetchNodes, prefetchResources, prefetchImpl, nonce) {
  const rel = prefetchImpl.linkRel || "prefetch";
  const priority = prefetchImpl.linkFetchPriority;
  let s = ``;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `let supportsLinkRel = true;`;
  }
  s += `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += `u.map((u,i)=>{`;
  s += `const l=document.createElement('link');`;
  s += `l.setAttribute("href",u);`;
  s += `l.setAttribute("rel","${rel}");`;
  if (priority) {
    s += `l.setAttribute("fetchpriority","${priority}");`;
  }
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(i===0){`;
    s += `try{`;
    s += `supportsLinkRel=l.relList.supports("${rel}");`;
    s += `}catch(e){}`;
    s += `}`;
  }
  s += `document.body.appendChild(l);`;
  s += `});`;
  if (prefetchImpl.workerFetchInsert === "no-link-support") {
    s += `if(!supportsLinkRel){`;
    s += workerFetchScript();
    s += `}`;
  }
  if (prefetchImpl.workerFetchInsert === "always") {
    s += workerFetchScript();
  }
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "link-js",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function workerFetchImplementation(prefetchNodes, prefetchResources, nonce) {
  let s = `const u=${JSON.stringify(flattenPrefetchResources(prefetchResources))};`;
  s += workerFetchScript();
  prefetchNodes.push(
    jsx("script", {
      type: "module",
      "q:type": "prefetch-worker",
      dangerouslySetInnerHTML: s,
      nonce
    })
  );
}
function normalizePrefetchImplementation(input) {
  return { ...PrefetchImplementationDefault, ...input };
}
var PrefetchImplementationDefault = {
  linkInsert: null,
  linkRel: null,
  linkFetchPriority: null,
  workerFetchInsert: null,
  prefetchEvent: "always"
};
function createTimer() {
  if (typeof performance === "undefined") {
    return () => 0;
  }
  const start = performance.now();
  return () => {
    const end = performance.now();
    const delta = end - start;
    return delta / 1e6;
  };
}
function getBuildBase(opts) {
  let base = opts.base;
  if (typeof opts.base === "function") {
    base = opts.base(opts);
  }
  if (typeof base === "string") {
    if (!base.endsWith("/")) {
      base += "/";
    }
    return base;
  }
  return `${"/"}build/`;
}
function getPrefetchResources(snapshotResult, opts, resolvedManifest) {
  if (!resolvedManifest) {
    return [];
  }
  const prefetchStrategy = opts.prefetchStrategy;
  const buildBase = getBuildBase(opts);
  if (prefetchStrategy !== null) {
    if (!prefetchStrategy || !prefetchStrategy.symbolsToPrefetch || prefetchStrategy.symbolsToPrefetch === "auto") {
      return getAutoPrefetch(snapshotResult, resolvedManifest, buildBase);
    }
    if (typeof prefetchStrategy.symbolsToPrefetch === "function") {
      try {
        return prefetchStrategy.symbolsToPrefetch({ manifest: resolvedManifest.manifest });
      } catch (e) {
        console.error("getPrefetchUrls, symbolsToPrefetch()", e);
      }
    }
  }
  return [];
}
function getAutoPrefetch(snapshotResult, resolvedManifest, buildBase) {
  const prefetchResources = [];
  const qrls = snapshotResult?.qrls;
  const { mapper, manifest } = resolvedManifest;
  const urls = /* @__PURE__ */ new Map();
  if (Array.isArray(qrls)) {
    for (const qrl of qrls) {
      const qrlSymbolName = qrl.getHash();
      const resolvedSymbol = mapper[qrlSymbolName];
      if (resolvedSymbol) {
        const bundleFileName = resolvedSymbol[1];
        addBundle(manifest, urls, prefetchResources, buildBase, bundleFileName);
      }
    }
  }
  return prefetchResources;
}
function addBundle(manifest, urls, prefetchResources, buildBase, bundleFileName) {
  const url = buildBase + bundleFileName;
  let prefetchResource = urls.get(url);
  if (!prefetchResource) {
    prefetchResource = {
      url,
      imports: []
    };
    urls.set(url, prefetchResource);
    const bundle = manifest.bundles[bundleFileName];
    if (bundle) {
      if (Array.isArray(bundle.imports)) {
        for (const importedFilename of bundle.imports) {
          addBundle(manifest, urls, prefetchResource.imports, buildBase, importedFilename);
        }
      }
    }
  }
  prefetchResources.push(prefetchResource);
}
var QWIK_LOADER_DEFAULT_MINIFIED = '(()=>{var e=Object.defineProperty,t=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,n=(t,o,r)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,s=(e,s)=>{for(var a in s||(s={}))o.call(s,a)&&n(e,a,s[a]);if(t)for(var a of t(s))r.call(s,a)&&n(e,a,s[a]);return e};((e,t)=>{const o="__q_context__",r=window,n=new Set,a=new Set([e]),i="replace",c="forEach",l="target",f="getAttribute",p="isConnected",b="qvisible",u="_qwikjson_",y=(e,t)=>Array.from(e.querySelectorAll(t)),h=e=>{const t=[];return a.forEach((o=>t.push(...y(o,e)))),t},d=e=>{S(e),y(e,"[q\\\\:shadowroot]").forEach((e=>{const t=e.shadowRoot;t&&d(t)}))},m=e=>e&&"function"==typeof e.then,w=(e,t,o=t.type)=>{h("[on"+e+"\\\\:"+o+"]")[c]((r=>g(r,e,t,o)))},q=t=>{if(void 0===t[u]){let o=(t===e.documentElement?e.body:t).lastElementChild;for(;o;){if("SCRIPT"===o.tagName&&"qwik/json"===o[f]("type")){t[u]=JSON.parse(o.textContent[i](/\\\\x3C(\\/?script)/gi,"<$1"));break}o=o.previousElementSibling}}},v=(e,t)=>new CustomEvent(e,{detail:t}),g=async(t,r,n,a=n.type)=>{const c="on"+r+":"+a;t.hasAttribute("preventdefault:"+a)&&n.preventDefault(),t.hasAttribute("stoppropagation:"+a)&&n.stopPropagation();const l=t._qc_,b=l&&l.li.filter((e=>e[0]===c));if(b&&b.length>0){for(const e of b){const o=e[1].getFn([t,n],(()=>t[p]))(n,t),r=n.cancelBubble;m(o)&&await o,r&&n.stopPropagation()}return}const u=t[f](c);if(u){const r=t.closest("[q\\\\:container]"),a=r[f]("q:base"),c=r[f]("q:version")||"unknown",l=r[f]("q:manifest-hash")||"dev",b=new URL(a,e.baseURI);for(const f of u.split("\\n")){const u=new URL(f,b),y=u.href,h=u.hash[i](/^#?([^?[|]*).*$/,"$1")||"default",d=performance.now();let w,v,g;const A=f.startsWith("#"),_={qBase:a,qManifest:l,qVersion:c,href:y,symbol:h,element:t,reqTime:d};if(A){const t=r.getAttribute("q:instance");w=(e["qFuncs_"+t]||[])[Number.parseInt(h)],w||(v="sync",g=Error("sync handler error for symbol: "+h))}else{const e=u.href.split("#")[0];try{const t=import(e);q(r),w=(await t)[h],w||(v="no-symbol",g=Error(`${h} not in ${e}`))}catch(e){v||(v="async"),g=e}}if(!w){E("qerror",s({importError:v,error:g},_)),console.error(g);break}const k=e[o];if(t[p])try{e[o]=[t,n,u],A||E("qsymbol",s({},_));const r=w(n,t);m(r)&&await r}catch(e){E("qerror",s({error:e},_))}finally{e[o]=k}}}},E=(t,o)=>{e.dispatchEvent(v(t,o))},A=e=>e[i](/([A-Z])/g,(e=>"-"+e.toLowerCase())),_=async e=>{let t=A(e.type),o=e[l];for(w("-document",e,t);o&&o[f];){const r=g(o,"",e,t);let n=e.cancelBubble;m(r)&&await r,n=n||e.cancelBubble||o.hasAttribute("stoppropagation:"+e.type),o=e.bubbles&&!0!==n?o.parentElement:null}},k=e=>{w("-window",e,A(e.type))},C=()=>{var o;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(a.forEach(d),t=1,E("qinit"),(null!=(o=r.requestIdleCallback)?o:r.setTimeout).bind(r)((()=>E("qidle"))),n.has(b))){const e=h("[on\\\\:"+b+"]"),t=new IntersectionObserver((e=>{for(const o of e)o.isIntersecting&&(t.unobserve(o[l]),g(o[l],"",v(b,o)))}));e[c]((e=>t.observe(e)))}},O=(e,t,o,r=!1)=>e.addEventListener(t,o,{capture:r,passive:!1}),S=(...e)=>{for(const t of e)"string"==typeof t?n.has(t)||(a.forEach((e=>O(e,t,_,!0))),O(r,t,k,!0),n.add(t)):a.has(t)||(n.forEach((e=>O(t,e,_,!0))),a.add(t))};if(!(o in e)){e[o]=0;const t=r.qwikevents;Array.isArray(t)&&S(...t),r.qwikevents={events:n,roots:a,push:S},O(e,"readystatechange",C),C()}})(document)})()';
var QWIK_LOADER_DEFAULT_DEBUG = '(() => {\n    var __defProp = Object.defineProperty;\n    var __getOwnPropSymbols = Object.getOwnPropertySymbols;\n    var __hasOwnProp = Object.prototype.hasOwnProperty;\n    var __propIsEnum = Object.prototype.propertyIsEnumerable;\n    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {\n        enumerable: !0,\n        configurable: !0,\n        writable: !0,\n        value: value\n    }) : obj[key] = value;\n    var __spreadValues = (a, b) => {\n        for (var prop in b || (b = {})) {\n            __hasOwnProp.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n        }\n        if (__getOwnPropSymbols) {\n            for (var prop of __getOwnPropSymbols(b)) {\n                __propIsEnum.call(b, prop) && __defNormalProp(a, prop, b[prop]);\n            }\n        }\n        return a;\n    };\n    ((doc, hasInitialized) => {\n        const Q_CONTEXT = "__q_context__";\n        const win = window;\n        const events =  new Set;\n        const roots =  new Set([ doc ]);\n        const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));\n        const querySelectorAll = query => {\n            const elements = [];\n            roots.forEach((root => elements.push(...nativeQuerySelectorAll(root, query))));\n            return elements;\n        };\n        const findShadowRoots = fragment => {\n            processEventOrNode(fragment);\n            nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent => {\n                const shadowRoot = parent.shadowRoot;\n                shadowRoot && findShadowRoots(shadowRoot);\n            }));\n        };\n        const isPromise = promise => promise && "function" == typeof promise.then;\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el => dispatch(el, infix, ev, type)));\n        };\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if ("SCRIPT" === script.tagName && "qwik/json" === script.getAttribute("type")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = "on" + onPrefix + ":" + eventName;\n            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();\n            element.hasAttribute("stoppropagation:" + eventName) && ev.stopPropagation();\n            const ctx = element._qc_;\n            const relevantListeners = ctx && ctx.li.filter((li => li[0] === attrName));\n            if (relevantListeners && relevantListeners.length > 0) {\n                for (const listener of relevantListeners) {\n                    const results = listener[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                    const cancelBubble = ev.cancelBubble;\n                    isPromise(results) && await results;\n                    cancelBubble && ev.stopPropagation();\n                }\n                return;\n            }\n            const attrValue = element.getAttribute(attrName);\n            if (attrValue) {\n                const container = element.closest("[q\\\\:container]");\n                const qBase = container.getAttribute("q:base");\n                const qVersion = container.getAttribute("q:version") || "unknown";\n                const qManifest = container.getAttribute("q:manifest-hash") || "dev";\n                const base = new URL(qBase, doc.baseURI);\n                for (const qrl of attrValue.split("\\n")) {\n                    const url = new URL(qrl, base);\n                    const href = url.href;\n                    const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";\n                    const reqTime = performance.now();\n                    let handler;\n                    let importError;\n                    let error;\n                    const isSync = qrl.startsWith("#");\n                    const eventData = {\n                        qBase: qBase,\n                        qManifest: qManifest,\n                        qVersion: qVersion,\n                        href: href,\n                        symbol: symbol,\n                        element: element,\n                        reqTime: reqTime\n                    };\n                    if (isSync) {\n                        const hash = container.getAttribute("q:instance");\n                        handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];\n                        if (!handler) {\n                            importError = "sync";\n                            error = new Error("sync handler error for symbol: " + symbol);\n                        }\n                    } else {\n                        const uri = url.href.split("#")[0];\n                        try {\n                            const module = import(\n                                                        uri);\n                            resolveContainer(container);\n                            handler = (await module)[symbol];\n                            if (!handler) {\n                                importError = "no-symbol";\n                                error = new Error(`${symbol} not in ${uri}`);\n                            }\n                        } catch (err) {\n                            importError || (importError = "async");\n                            error = err;\n                        }\n                    }\n                    if (!handler) {\n                        emitEvent("qerror", __spreadValues({\n                            importError: importError,\n                            error: error\n                        }, eventData));\n                        console.error(error);\n                        break;\n                    }\n                    const previousCtx = doc[Q_CONTEXT];\n                    if (element.isConnected) {\n                        try {\n                            doc[Q_CONTEXT] = [ element, ev, url ];\n                            isSync || emitEvent("qsymbol", __spreadValues({}, eventData));\n                            const results = handler(ev, element);\n                            isPromise(results) && await results;\n                        } catch (error2) {\n                            emitEvent("qerror", __spreadValues({\n                                error: error2\n                            }, eventData));\n                        } finally {\n                            doc[Q_CONTEXT] = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast("-document", ev, type);\n            while (element && element.getAttribute) {\n                const results = dispatch(element, "", ev, type);\n                let cancelBubble = ev.cancelBubble;\n                isPromise(results) && await results;\n                cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type);\n                element = ev.bubbles && !0 !== cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast("-window", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {\n                roots.forEach(findShadowRoots);\n                hasInitialized = 1;\n                emitEvent("qinit");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));\n                if (events.has("qvisible")) {\n                    const results = querySelectorAll("[on\\\\:qvisible]");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, "", createEvent("qvisible", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const processEventOrNode = (...eventNames) => {\n            for (const eventNameOrNode of eventNames) {\n                if ("string" == typeof eventNameOrNode) {\n                    if (!events.has(eventNameOrNode)) {\n                        roots.forEach((root => addEventListener(root, eventNameOrNode, processDocumentEvent, !0)));\n                        addEventListener(win, eventNameOrNode, processWindowEvent, !0);\n                        events.add(eventNameOrNode);\n                    }\n                } else if (!roots.has(eventNameOrNode)) {\n                    events.forEach((eventName => addEventListener(eventNameOrNode, eventName, processDocumentEvent, !0)));\n                    roots.add(eventNameOrNode);\n                }\n            }\n        };\n        if (!(Q_CONTEXT in doc)) {\n            doc[Q_CONTEXT] = 0;\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && processEventOrNode(...qwikevents);\n            win.qwikevents = {\n                events: events,\n                roots: roots,\n                push: processEventOrNode\n            };\n            addEventListener(doc, "readystatechange", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})()';
function getQwikLoaderScript(opts = {}) {
  return opts.debug ? QWIK_LOADER_DEFAULT_DEBUG : QWIK_LOADER_DEFAULT_MINIFIED;
}
var DOCTYPE = "<!DOCTYPE html>";
async function renderToStream(rootNode, opts) {
  let stream = opts.stream;
  let bufferSize = 0;
  let totalSize = 0;
  let networkFlushes = 0;
  let firstFlushTime = 0;
  let buffer = "";
  let snapshotResult;
  const inOrderStreaming = opts.streaming?.inOrder ?? {
    strategy: "auto",
    maximunInitialChunk: 5e4,
    maximunChunk: 3e4
  };
  const containerTagName = opts.containerTagName ?? "html";
  const containerAttributes = opts.containerAttributes ?? {};
  const nativeStream = stream;
  const firstFlushTimer = createTimer();
  const buildBase = getBuildBase(opts);
  const resolvedManifest = resolveManifest(opts.manifest);
  function flush() {
    if (buffer) {
      nativeStream.write(buffer);
      buffer = "";
      bufferSize = 0;
      networkFlushes++;
      if (networkFlushes === 1) {
        firstFlushTime = firstFlushTimer();
      }
    }
  }
  function enqueue(chunk) {
    const len = chunk.length;
    bufferSize += len;
    totalSize += len;
    buffer += chunk;
  }
  switch (inOrderStreaming.strategy) {
    case "disabled":
      stream = {
        write: enqueue
      };
      break;
    case "direct":
      stream = nativeStream;
      break;
    case "auto":
      let count = 0;
      let forceFlush = false;
      const minimunChunkSize = inOrderStreaming.maximunChunk ?? 0;
      const initialChunkSize = inOrderStreaming.maximunInitialChunk ?? 0;
      stream = {
        write(chunk) {
          if (chunk === "<!--qkssr-f-->") {
            forceFlush || (forceFlush = true);
          } else if (chunk === "<!--qkssr-pu-->") {
            count++;
          } else if (chunk === "<!--qkssr-po-->") {
            count--;
          } else {
            enqueue(chunk);
          }
          const chunkSize = networkFlushes === 0 ? initialChunkSize : minimunChunkSize;
          if (count === 0 && (forceFlush || bufferSize >= chunkSize)) {
            forceFlush = false;
            flush();
          }
        }
      };
      break;
  }
  if (containerTagName === "html") {
    stream.write(DOCTYPE);
  } else {
    stream.write("<!--cq-->");
    if (opts.qwikLoader) {
      if (opts.qwikLoader.include === void 0) {
        opts.qwikLoader.include = "never";
      }
      if (opts.qwikLoader.position === void 0) {
        opts.qwikLoader.position = "bottom";
      }
    } else {
      opts.qwikLoader = {
        include: "never"
      };
    }
    if (!opts.qwikPrefetchServiceWorker) {
      opts.qwikPrefetchServiceWorker = {};
    }
    if (!opts.qwikPrefetchServiceWorker.include) {
      opts.qwikPrefetchServiceWorker.include = false;
    }
    if (!opts.qwikPrefetchServiceWorker.position) {
      opts.qwikPrefetchServiceWorker.position = "top";
    }
  }
  if (!opts.manifest) {
    console.warn(
      `Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.`
    );
  }
  await setServerPlatform(opts, resolvedManifest);
  const injections = resolvedManifest?.manifest.injections;
  const beforeContent = injections ? injections.map((injection) => jsx(injection.tag, injection.attributes ?? {})) : [];
  const includeMode = opts.qwikLoader?.include ?? "auto";
  const positionMode = opts.qwikLoader?.position ?? "bottom";
  if (positionMode === "top" && includeMode !== "never") {
    const qwikLoaderScript = getQwikLoaderScript({
      debug: opts.debug
    });
    beforeContent.push(
      jsx("script", {
        id: "qwikloader",
        dangerouslySetInnerHTML: qwikLoaderScript
      })
    );
    beforeContent.push(
      jsx("script", {
        dangerouslySetInnerHTML: `window.qwikevents.push('click')`
      })
    );
  }
  const renderTimer = createTimer();
  const renderSymbols = [];
  let renderTime = 0;
  let snapshotTime = 0;
  await _renderSSR(rootNode, {
    stream,
    containerTagName,
    containerAttributes,
    serverData: opts.serverData,
    base: buildBase,
    beforeContent,
    beforeClose: async (contexts, containerState, _dynamic, textNodes) => {
      renderTime = renderTimer();
      const snapshotTimer = createTimer();
      snapshotResult = await _pauseFromContexts(contexts, containerState, void 0, textNodes);
      const children = [];
      if (opts.prefetchStrategy !== null) {
        const prefetchResources = getPrefetchResources(snapshotResult, opts, resolvedManifest);
        const base = containerAttributes["q:base"];
        if (prefetchResources.length > 0) {
          const prefetchImpl = applyPrefetchImplementation(
            base,
            opts.prefetchStrategy,
            prefetchResources,
            opts.serverData?.nonce
          );
          if (prefetchImpl) {
            children.push(prefetchImpl);
          }
        }
      }
      const jsonData = JSON.stringify(snapshotResult.state, void 0, void 0);
      children.push(
        jsx("script", {
          type: "qwik/json",
          dangerouslySetInnerHTML: escapeText(jsonData),
          nonce: opts.serverData?.nonce
        })
      );
      if (snapshotResult.funcs.length > 0) {
        const hash2 = containerAttributes[QInstance];
        children.push(
          jsx("script", {
            "q:func": "qwik/json",
            dangerouslySetInnerHTML: serializeFunctions(hash2, snapshotResult.funcs),
            nonce: opts.serverData?.nonce
          })
        );
      }
      const needLoader = !snapshotResult || snapshotResult.mode !== "static";
      const includeLoader = includeMode === "always" || includeMode === "auto" && needLoader;
      if (includeLoader) {
        const qwikLoaderScript = getQwikLoaderScript({
          debug: opts.debug
        });
        children.push(
          jsx("script", {
            id: "qwikloader",
            dangerouslySetInnerHTML: qwikLoaderScript,
            nonce: opts.serverData?.nonce
          })
        );
      }
      const extraListeners = Array.from(containerState.$events$, (s) => JSON.stringify(s));
      if (extraListeners.length > 0) {
        const content = (includeLoader ? `window.qwikevents` : `(window.qwikevents||=[])`) + `.push(${extraListeners.join(", ")})`;
        children.push(
          jsx("script", {
            dangerouslySetInnerHTML: content,
            nonce: opts.serverData?.nonce
          })
        );
      }
      collectRenderSymbols(renderSymbols, contexts);
      snapshotTime = snapshotTimer();
      return jsx(Fragment, { children });
    },
    manifestHash: resolvedManifest?.manifest.manifestHash || "dev" + hash()
  });
  if (containerTagName !== "html") {
    stream.write("<!--/cq-->");
  }
  flush();
  const isDynamic = snapshotResult.resources.some((r) => r._cache !== Infinity);
  const result = {
    prefetchResources: void 0,
    snapshotResult,
    flushes: networkFlushes,
    manifest: resolvedManifest?.manifest,
    size: totalSize,
    isStatic: !isDynamic,
    timing: {
      render: renderTime,
      snapshot: snapshotTime,
      firstFlush: firstFlushTime
    },
    _symbols: renderSymbols
  };
  return result;
}
function hash() {
  return Math.random().toString(36).slice(2);
}
function resolveManifest(manifest) {
  if (!manifest) {
    return void 0;
  }
  if ("mapper" in manifest) {
    return manifest;
  }
  manifest = getValidManifest(manifest);
  if (manifest) {
    const mapper = {};
    Object.entries(manifest.mapping).forEach(([symbol, bundleFilename]) => {
      mapper[getSymbolHash(symbol)] = [symbol, bundleFilename];
    });
    return {
      mapper,
      manifest
    };
  }
  return void 0;
}
var escapeText = (str) => {
  return str.replace(/<(\/?script)/gi, "\\x3C$1");
};
function collectRenderSymbols(renderSymbols, elements) {
  for (const ctx of elements) {
    const symbol = ctx.$componentQrl$?.getSymbol();
    if (symbol && !renderSymbols.includes(symbol)) {
      renderSymbols.push(symbol);
    }
  }
}
var Q_FUNCS_PREFIX = 'document["qFuncs_HASH"]=';
function serializeFunctions(hash2, funcs) {
  return Q_FUNCS_PREFIX.replace("HASH", hash2) + `[${funcs.join(",\n")}]`;
}

const isQwikLoaderAddedMap = /* @__PURE__ */ new WeakMap();
const modulePreloadScript = `window.addEventListener("load",()=>{(async()=>{window.requestIdleCallback||(window.requestIdleCallback=(e,t)=>{const n=t||{},o=1,i=n.timeout||o,a=performance.now();return setTimeout(()=>{e({get didTimeout(){return!n.timeout&&performance.now()-a-o>i},timeRemaining:()=>Math.max(0,o+(performance.now()-a))})},o)});const e=async()=>{const e=new Set,t=document.querySelectorAll('script[q\\\\:type="prefetch-bundles"]');t.forEach(t=>{if(!t.textContent)return;const n=t.textContent,o=n.match(/\\["prefetch","[/]build[/]","(.*?)"\\]/);o&&o[1]&&o[1].split('","').forEach(t=>{t.startsWith("q-")&&e.add(t)})}),document.querySelectorAll('script[type="qwik/json"]').forEach(t=>{if(!t.textContent)return;const n=t.textContent.match(/q-[A-Za-z0-9_-]+\\.js/g);n&&n.forEach(t=>e.add(t))}),e.forEach(e=>{const t=document.createElement("link");t.rel="modulepreload",t.href="/build/"+e,t.fetchPriority="low",document.head.appendChild(t)})};await requestIdleCallback(await e)})()});`;
function isInlineComponent(component) {
  if (typeof component !== "function") return false;
  const codeStr = component?.toString().toLowerCase();
  return (codeStr.includes("_jsxq") || codeStr.includes("jsxsplit")) && component.name !== "QwikComponent";
}
function isQwikComponent(component) {
  if (typeof component !== "function") return false;
  if (isInlineComponent(component)) return true;
  if (component.name !== "QwikComponent") return false;
  return true;
}
async function check(component) {
  try {
    return isQwikComponent(component);
  } catch (error) {
    console.error("Error in check function of @qwikdev/astro: ", error);
    return false;
  }
}
async function renderToStaticMarkup(component, props, slotted) {
  _jsxBranch();
  try {
    if (!isQwikComponent(component)) return;
    let html = "";
    let integrationManifest = null;
    if (isNode) try {
      const { readFileSync } = await import('node:fs');
      const manifestContent = readFileSync(qAstroManifestPath, "utf-8");
      integrationManifest = JSON.parse(manifestContent);
    } catch (error) {
      throw new Error(`@qwikdev/astro: Failed to read the q-astro-manifest.json file. This file is required for the @qwikdev/astro integration to work. 
          
          It seems like you're using node. If this is not the case, please set the isNode option to false in the integration options in astro.config.mjs.
          
          Also make sure this is the case with both your local and deployed environment.`);
    }
    const renderToStreamOpts = {
      containerAttributes: {
        style: "display: contents"
      },
      containerTagName: "div",
      ...{
        manifest: globalThis.qManifest || integrationManifest?.default || integrationManifest
      },
      serverData: props,
      qwikPrefetchServiceWorker: {
        include: false
      },
      stream: {
        write: (chunk) => {
          html += chunk;
        }
      }
    };
    const isInline = isInlineComponent(component);
    if (isInline) {
      const inlineComponentJSX = component(props);
      await renderToStream(inlineComponentJSX, renderToStreamOpts);
      return {
        html
      };
    }
    const isQwikLoaderNeeded = !isQwikLoaderAddedMap.has(this.result);
    const qwikLoader = isQwikLoaderNeeded && _jsxQ("script", null, {
      "qwik-loader": "",
      dangerouslySetInnerHTML: getQwikLoaderScript()
    }, null, 3, "de_0");
    const modulePreload = isQwikLoaderNeeded && _jsxQ("script", null, {
      "qwik-astro-preloader": "",
      dangerouslySetInnerHTML: modulePreloadScript
    }, null, 3, "de_1");
    const qwikScripts = _jsxQ("span", {
      "q:slot": "qwik-scripts"
    }, {
      "qwik-scripts": ""
    }, [
      qwikLoader,
      modulePreload
    ], 1, "de_2");
    const slots = {};
    let defaultSlot = void 0;
    for (const [key, value] of Object.entries(slotted)) {
      const namedSlot = key !== "default" && {
        "q:slot": key
      };
      const jsxElement = _jsxS("span", {
        dangerouslySetInnerHTML: String(value),
        style: "display: contents",
        ...namedSlot,
        get "q:key"() {
          return Math.random().toString(26).split(".").pop();
        }
      }, {
        style: _IMMUTABLE,
        "q:key": Math.random().toString(26).split(".").pop()
      }, 0, "de_3");
      if (key === "default") defaultSlot = jsxElement;
      else slots[key] = jsxElement;
    }
    const slotValues = Object.values(slots);
    const qwikComponentJSX = _jsxC(component, {
      ...props,
      children: [
        qwikScripts,
        defaultSlot,
        ...slotValues
      ]
    }, 0, "de_4");
    if (isQwikLoaderNeeded) isQwikLoaderAddedMap.set(this.result, true);
    await renderToStream(qwikComponentJSX, renderToStreamOpts);
    const isClientRouter = Array.from(this.result._metadata.renderedScripts).some((path) => path.includes("ClientRouter.astro"));
    const htmlWithRerun = html.replace('<script q:func="qwik/json">', '<script q:func="qwik/json" data-astro-rerun>');
    const htmlWithObservers = isClientRouter && isQwikLoaderNeeded && htmlWithRerun + `
      <script data-qwik-astro-client-router>document.addEventListener('astro:after-swap',()=>{const e=document.querySelectorAll('[on\\\\:qvisible]');if(e.length){const o=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.dispatchEvent(new CustomEvent('qvisible')),o.unobserve(e.target))})});e.forEach(e=>o.observe(e))}});<\/script>
    `;
    return {
      html: isClientRouter ? htmlWithObservers : html
    };
  } catch (error) {
    console.error("Error in renderToStaticMarkup function of @qwikdev/astro: ", error);
    throw error;
  }
}
const _renderer0 = {
  renderToStaticMarkup,
  supportsAstroStaticSlot: true,
  testing123: true,
  check
};

export { Fragment as F, _renderer0 as _, _jsxC as a, _jsxQ as b, componentQrl as c, _noopQrl as d, _fnSignal as e, inlinedQrl as i, renderToStaticMarkup as r, useSignal as u };
