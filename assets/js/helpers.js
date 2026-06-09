/* ===========================================================
   helpers.js
   Genel yardımcı fonksiyonlar
   =========================================================== */
(function (global) {
  "use strict";

  const Helpers = {
    /** Element seç */
    $(sel, root = document) { return root.querySelector(sel); },
    $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); },

    /** Güvenli text escape */
    escapeHtml(str) {
      if (str == null) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },

    /** Class toggle helper */
    setHidden(el, hidden) {
      if (!el) return;
      if (hidden) {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      } else {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      }
    },

    /** Promise tabanlı bekleme */
    wait(ms) { return new Promise(res => setTimeout(res, ms)); },

    /** YouTube video ID format kontrolü (gevşek) */
    isValidVideoId(id) {
      return typeof id === "string" && /^[A-Za-z0-9_-]{6,20}$/.test(id);
    },

    /** Log wrapper — production'da kapatılabilir */
    log(...args) {
      if (global.DEBUG_CASSETTE) console.log("[cassette]", ...args);
    },

    warn(...args) { console.warn("[cassette]", ...args); }
  };

  global.Helpers = Helpers;
})(window);
