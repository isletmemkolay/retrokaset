/* ===========================================================
   router.js
   ?card=XXX veya #card=XXX okuma mantığı
   =========================================================== */
(function (global) {
  "use strict";

  function parseHashCard(hash) {
    if (!hash) return null;
    // "#card=LOVE001" veya "#LOVE001"
    const clean = hash.replace(/^#/, "");
    if (!clean) return null;
    if (clean.includes("=")) {
      const params = new URLSearchParams(clean);
      return params.get("card");
    }
    return clean;
  }

  function resolveCardId() {
    const url = new URL(window.location.href);
    // 1) Query string
    const qpCard = url.searchParams.get("card");
    if (qpCard) return qpCard.trim();
    // 2) Hash
    const hashCard = parseHashCard(url.hash);
    if (hashCard) return hashCard.trim();
    return null;
  }

  const Router = {
    resolveCardId,
    /** Test amaçlı: window.Router.setCard('LOVE001') ile URL'i güncelle */
    setCard(id, { replace = true } = {}) {
      const url = new URL(window.location.href);
      url.searchParams.set("card", id);
      url.hash = "";
      const fn = replace ? "replaceState" : "pushState";
      history[fn]({}, "", url.toString());
    }
  };

  global.Router = Router;
})(window);
