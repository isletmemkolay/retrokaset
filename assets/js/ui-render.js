/* ===========================================================
   ui-render.js
   Kart verisini ekrana basma katmanı
   =========================================================== */
(function (global) {
  "use strict";
  const { $, $$, escapeHtml, setHidden } = global.Helpers;

  const UI = {
    /** Boot overlay'i gizle */
    hideBoot() {
      const boot = $("#boot");
      if (boot) {
        boot.classList.add("hide");
        // erişilebilirlik
        boot.setAttribute("aria-hidden", "true");
      }
    },

    /** Player shell'i göster */
    showPlayer() {
      const shell = $("#player-shell");
      setHidden(shell, false);
      shell.style.display = "flex";
    },

    /** Player shell'i gizle */
    hidePlayer() {
      const shell = $("#player-shell");
      shell.style.display = "none";
      setHidden(shell, true);
    },

    /** Tema uygula */
    applyTheme(variant) {
      const shell = $("#player-shell");
      shell.setAttribute("data-theme", variant || "pink-neon");
    },

    /** Kart bilgilerini doldur */
    renderCard(card) {
      this.applyTheme(card.ui && card.ui.themeVariant);

      const titleEl = $("#track-title");
      const subEl = $("#track-sub");
      const sideLabel = $("#side-label");
      const tickerText = $("#ticker-text");

      titleEl.textContent = card.title || "—";
      const modeLabel = card.mode === "playlist" ? "5 PARÇA · PLAYLIST" : "TEK PARÇA";
      const rec = card.recipientName ? ` · ${card.recipientName}` : "";
      subEl.textContent = modeLabel + rec;

      if (sideLabel) sideLabel.textContent = (card.ui && card.ui.labelText) || (card.mode === "playlist" ? "B Side" : "A Side");

      // Ticker
      const msg = (card.tickerMessage && card.tickerMessage.trim())
        || "Bu şarkı sana gelsin.";
      // İçeriği iki kez koy ki kayma yumuşak olsun
      tickerText.textContent = `★  ${msg}  ★  ${msg}  ★  ${msg}  ★`;

      // Playlist strip
      const strip = $("#playlist-strip");
      const list = $("#playlist-list");
      list.innerHTML = "";
      const show = card.mode === "playlist" && card.ui && card.ui.showPlaylistStrip !== false;
      if (show && Array.isArray(card.youtube?.playlistVideoIds)) {
        card.youtube.playlistVideoIds.forEach((vid, i) => {
          const li = document.createElement("li");
          li.dataset.index = String(i);
          li.dataset.videoId = vid;
          li.innerHTML = `<span class="pl-title">${escapeHtml("Track " + (i + 1))}</span>`;
          if (i === 0) li.classList.add("active");
          list.appendChild(li);
        });
        setHidden(strip, false);
      } else {
        setHidden(strip, true);
      }
    },

    /** Çalan parçayı vurgula */
    highlightPlaylistIndex(index) {
      $$("#playlist-list li").forEach(li => {
        li.classList.toggle("active", Number(li.dataset.index) === index);
      });
    },

    /** Play/pause buton state */
    setPlayingUi(isPlaying) {
      const btn = $('[data-action="play"]');
      btn.classList.toggle("playing", !!isPlaying);
      const reelA = $("#reel-a");
      const reelB = $("#reel-b");
      reelA && reelA.classList.toggle("spin", !!isPlaying);
      reelB && reelB.classList.toggle("spin", !!isPlaying);
      // Büyük play butonu
      const bigPlay = $("#big-play");
      if (bigPlay) bigPlay.classList.toggle("hide", !!isPlaying);
    },

    /** Status (missing / inactive) ekranı */
    showStatus({ title, text }) {
      const status = $("#status-screen");
      $("#status-title").textContent = title || "Kart bulunamadı";
      $("#status-text").textContent  = text  || "Lütfen QR kodu tekrar okutun.";
      setHidden(status, false);
      this.hidePlayer();
    },

    hideStatus() {
      setHidden($("#status-screen"), true);
    }
  };

  global.UIRender = UI;
})(window);
