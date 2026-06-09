/* ===========================================================
   app.js
   Uygulama başlangıç akışı
   =========================================================== */
(function (global) {
  "use strict";
  const { $, $$, log } = global.Helpers;
  const { CardsData, Router, UIRender, PlayerEngine } = global;

  let activeCard = null;

  async function boot() {
    log("boot start");

    // 1) Kart ID çöz
    const cardId = Router.resolveCardId();

    // 2) Demo durum: hiç ID yoksa
    if (!cardId) {
      // Demo amaçlı LOVE001'i yüklemek yerine net mesaj göster
      finishBoot(false);
      UIRender.showStatus({
        title: "Kart belirtilmedi",
        text: "QR kodunuzu okutarak tekrar deneyin. (Örn: player.html?card=LOVE001)"
      });
      return;
    }

    // 3) Kart bul
    const card = CardsData.findCard(cardId);
    if (!card) {
      finishBoot(false);
      UIRender.showStatus({
        title: "Kart bulunamadı",
        text: `“${cardId}” numaralı kart kayıtlarda yok.`
      });
      return;
    }

    // 4) Pasif kart kontrolü
    if (card.settings && card.settings.isActive === false) {
      finishBoot(false);
      UIRender.applyTheme((card.ui && card.ui.themeVariant) || "red-alert");
      UIRender.showStatus({
        title: "Kart pasif",
        text: card.tickerMessage || "Bu kart şu anda kullanılamıyor."
      });
      return;
    }

    // 5) Geçerli kart: UI'ı bas
    activeCard = card;
    UIRender.renderCard(card);
    UIRender.showPlayer();

    // 6) YouTube player kur
    try {
      await PlayerEngine.mount(card, {
        onState: handlePlayerState
      });
    } catch (e) {
      console.error("Player kurulamadı", e);
      UIRender.showStatus({
        title: "Oynatıcı yüklenemedi",
        text: "İnternet bağlantınızı kontrol edip tekrar deneyin."
      });
      return;
    }

    // 7) Boot'u kapat
    finishBoot(true);

    // 8) Otomatik oynatma niyeti varsa dene (genelde mobilde başarısız olur)
    if (card.settings && card.settings.autoplayIntent) {
      setTimeout(() => PlayerEngine.play(), 600);
    }

    // 9) Kontrol event'lerini bağla
    bindControls();
  }

  function finishBoot(showPlayer) {
    UIRender.hideBoot();
    if (showPlayer) UIRender.showPlayer();
  }

  function handlePlayerState(evt) {
    switch (evt.type) {
      case "playing":
        UIRender.setPlayingUi(true);
        break;
      case "paused":
      case "ended":
      case "cued":
        UIRender.setPlayingUi(false);
        break;
      case "indexChange":
        UIRender.highlightPlaylistIndex(evt.index);
        break;
      case "error":
        console.warn("YT error code:", evt.code);
        break;
    }
  }

  function bindControls() {
    // Kontrol butonları
    $$("#controls .btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const a = btn.dataset.action;
        switch (a) {
          case "play":   PlayerEngine.togglePlay(); break;
          case "next":   PlayerEngine.next(); break;
          case "prev":   PlayerEngine.prev(); break;
          case "replay": PlayerEngine.replay(); break;
        }
      });
    });

    // Büyük play butonu (ekran üstü)
    const bigPlay = $("#big-play");
    if (bigPlay) {
      bigPlay.addEventListener("click", () => PlayerEngine.play());
    }

    // Playlist tıklamaları
    const list = $("#playlist-list");
    if (list) {
      list.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;
        const idx = Number(li.dataset.index);
        if (!Number.isNaN(idx)) PlayerEngine.playIndex(idx);
      });
    }

    // URL değişimi (hash) - canlı kart değiştirme
    window.addEventListener("hashchange", () => {
      // Tam sayfa yeniden yüklemek en güvenli yol
      window.location.reload();
    });
  }

  // DOM hazır olduğunda başlat
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window);
