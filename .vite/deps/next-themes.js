"use client";
import {
  require_react
} from "./chunk-W4EHDCLL.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/next-themes/dist/index.mjs
var t = __toESM(require_react(), 1);
var L = (e, o, s, u, d, m, l, h) => {
  let i = document.documentElement, T = ["light", "dark"];
  function p(a) {
    (Array.isArray(e) ? e : [e]).forEach((g) => {
      let k = g === "class", S = k && m ? d.map((f) => m[f] || f) : d;
      k ? (i.classList.remove(...S), i.classList.add(a)) : i.setAttribute(g, a);
    }), R(a);
  }
  function R(a) {
    h && T.includes(a) && (i.style.colorScheme = a);
  }
  function c() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (u) p(u);
  else try {
    let a = localStorage.getItem(o) || s, g = l && a === "system" ? c() : a;
    p(g);
  } catch (a) {
  }
};
var M = ["light", "dark"];
var Q = "(prefers-color-scheme: dark)";
var U = typeof window == "undefined";
var E = t.createContext(void 0);
var N = { setTheme: (e) => {
}, themes: [] };
var z = () => {
  var e;
  return (e = t.useContext(E)) != null ? e : N;
};
var J = (e) => t.useContext(E) ? t.createElement(t.Fragment, null, e.children) : t.createElement(H, { ...e });
var _ = ["light", "dark"];
var H = ({ forcedTheme: e, disableTransitionOnChange: o = false, enableSystem: s = true, enableColorScheme: u = true, storageKey: d = "theme", themes: m = _, defaultTheme: l = s ? "system" : "light", attribute: h = "data-theme", value: i, children: T, nonce: p, scriptProps: R }) => {
  let [c, a] = t.useState(() => b(d, l)), [w, g] = t.useState(() => b(d)), k = i ? Object.values(i) : m, S = t.useCallback((n) => {
    let r = n;
    if (!r) return;
    n === "system" && s && (r = I());
    let y = i ? i[r] : r, C = o ? W(p) : null, P = document.documentElement, x = (v) => {
      v === "class" ? (P.classList.remove(...k), y && P.classList.add(y)) : v.startsWith("data-") && (y ? P.setAttribute(v, y) : P.removeAttribute(v));
    };
    if (Array.isArray(h) ? h.forEach(x) : x(h), u) {
      let v = M.includes(l) ? l : null, O = M.includes(r) ? r : v;
      P.style.colorScheme = O;
    }
    C == null || C();
  }, [p]), f = t.useCallback((n) => {
    let r = typeof n == "function" ? n(c) : n;
    a(r);
    try {
      localStorage.setItem(d, r);
    } catch (y) {
    }
  }, [c]), A = t.useCallback((n) => {
    let r = I(n);
    g(r), c === "system" && s && !e && S("system");
  }, [c, e]);
  t.useEffect(() => {
    let n = window.matchMedia(Q);
    return n.addListener(A), A(n), () => n.removeListener(A);
  }, [A]), t.useEffect(() => {
    let n = (r) => {
      if (r.key !== d) return;
      let y = r.newValue || l;
      f(y);
    };
    return window.addEventListener("storage", n), () => window.removeEventListener("storage", n);
  }, [f]), t.useEffect(() => {
    S(e != null ? e : c);
  }, [e, c]);
  let D = t.useMemo(() => ({ theme: c, setTheme: f, forcedTheme: e, resolvedTheme: c === "system" ? w : c, themes: s ? [...m, "system"] : m, systemTheme: s ? w : void 0 }), [c, f, e, w, s, m]);
  return t.createElement(E.Provider, { value: D }, t.createElement(V, { forcedTheme: e, storageKey: d, attribute: h, enableSystem: s, enableColorScheme: u, defaultTheme: l, value: i, themes: m, nonce: p, scriptProps: R }), T);
};
var V = t.memo(({ forcedTheme: e, storageKey: o, attribute: s, enableSystem: u, enableColorScheme: d, defaultTheme: m, value: l, themes: h, nonce: i, scriptProps: T }) => {
  let p = JSON.stringify([s, o, m, e, h, l, u, d]).slice(1, -1);
  return t.createElement("script", { ...T, suppressHydrationWarning: true, nonce: typeof window == "undefined" ? i : "", dangerouslySetInnerHTML: { __html: `(${L.toString()})(${p})` } });
});
var b = (e, o) => {
  if (U) return;
  let s;
  try {
    s = localStorage.getItem(e) || void 0;
  } catch (u) {
  }
  return s || o;
};
var W = (e) => {
  let o = document.createElement("style");
  return e && o.setAttribute("nonce", e), o.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(o), () => {
    window.getComputedStyle(document.body), setTimeout(() => {
      document.head.removeChild(o);
    }, 1);
  };
};
var I = (e) => (e || (e = window.matchMedia(Q)), e.matches ? "dark" : "light");
export {
  J as ThemeProvider,
  z as useTheme
};
//# sourceMappingURL=next-themes.js.map
