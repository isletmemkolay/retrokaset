/* ===========================================================
   player-engine.js
   YouTube IFrame API entegrasyonu
   =========================================================== */
(function (global) {
  "use strict";
  const { log, warn, isValidVideoId } = global.Helpers;

  let ytApiPromise = null;
  let player = null;
  let currentCard = null;
  let currentIndex = 0;
  let onStateExternal = null;

  /** YouTube IFrame API'yi tek seferlik yükle */
  function loadYouTubeApi() {
    if (ytApiPromise) return ytApiPromise;
    ytApiPromise = new Promise((resolve) => {
      // Mevcutsa direkt resolve
      if (global.YT && global.YT.Player) { resolve(global.YT); return; }

      // Global callback'i kuyruğa ekle
      const prev = global.onYouTubeIframeAPIReady;
      global.onYouTubeIframeAPIReady = function () {
        if (typeof prev === "function") { try { prev(); } catch(e){} }
        resolve(global.YT);
      };

      // Script tag ekle (idempotent)
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        s.async = true;
        document.head.appendChild(s);
      }
    });
    return ytApiPromise;
  }

  /** Player oluştur */
  function createPlayer(card) {
    return new Promise((resolve, reject) => {
      const mount = document.getElementById("player-mount");
      if (!mount) { reject(new Error("player-mount yok")); return; }
      mount.innerHTML = '<div id="yt-player"></div>';

      const playerVars = {
        enablejsapi: 1,
        playsinline: 1,
        rel: 0,
        controls: 1,
        modestbranding: 1,
        origin: location.origin
      };

      const videoId = card.youtube && card.youtube.primaryVideoId;
      const validId = isValidVideoId(videoId);

      const config = {
        width: "100%",
        height: "100%",
        playerVars,
        events: {
          onReady: (ev) => {
            log("YT onReady");
            // Mod'a göre cue
            if (card.mode === "playlist" && Array.isArray(card.youtube.playlistVideoIds) && card.youtube.playlistVideoIds.length) {
              try {
                ev.target.cuePlaylist({ playlist: card.youtube.playlistVideoIds, index: 0 });
              } catch (e) { warn("cuePlaylist hata", e); }
            } else if (validId) {
              try { ev.target.cueVideoById(videoId); } catch (e) { warn("cueVideoById hata", e); }
            }
            resolve(ev.target);
          },
          onStateChange: (ev) => {
            const YT = global.YT;
            if (!YT) return;
            // Playlist index güncelle
            if (card.mode === "playlist") {
              try {
                const idx = ev.target.getPlaylistIndex();
                if (typeof idx === "number" && idx >= 0) {
                  currentIndex = idx;
                  if (onStateExternal) onStateExternal({ type: "indexChange", index: idx });
                }
              } catch (e) {}
            }
            if (ev.data === YT.PlayerState.PLAYING) {
              onStateExternal && onStateExternal({ type: "playing" });
            } else if (ev.data === YT.PlayerState.PAUSED) {
              onStateExternal && onStateExternal({ type: "paused" });
            } else if (ev.data === YT.PlayerState.ENDED) {
              onStateExternal && onStateExternal({ type: "ended" });
            } else if (ev.data === YT.PlayerState.CUED) {
              onStateExternal && onStateExternal({ type: "cued" });
            }
          },
          onError: (ev) => {
            warn("YT onError", ev && ev.data);
            onStateExternal && onStateExternal({ type: "error", code: ev && ev.data });
          }
        }
      };

      // Tek video ve playlist'in ilk videosu için videoId opsiyonu
      if (card.mode === "single" && validId) {
        config.videoId = videoId;
      }

      // Player'ı oluştur
      try {
        player = new global.YT.Player("yt-player", config);
      } catch (e) {
        reject(e);
      }
    });
  }

  const Engine = {
    /** Player'ı yükle ve hazırla */
    async mount(card, { onState } = {}) {
      currentCard = card;
      currentIndex = 0;
      onStateExternal = onState || null;
      await loadYouTubeApi();
      await createPlayer(card);
      return player;
    },

    play() { try { player && player.playVideo && player.playVideo(); } catch(e){ warn(e); } },
    pause() { try { player && player.pauseVideo && player.pauseVideo(); } catch(e){ warn(e); } },
    togglePlay() {
      if (!player) return;
      try {
        const state = player.getPlayerState && player.getPlayerState();
        if (state === 1) player.pauseVideo();
        else player.playVideo();
      } catch (e) { warn(e); }
    },
    next() {
      if (!player) return;
      try {
        if (currentCard && currentCard.mode === "playlist") player.nextVideo();
      } catch (e) { warn(e); }
    },
    prev() {
      if (!player) return;
      try {
        if (currentCard && currentCard.mode === "playlist") player.previousVideo();
      } catch (e) { warn(e); }
    },
    replay() {
      if (!player) return;
      try {
        player.seekTo(0, true);
        player.playVideo();
      } catch (e) { warn(e); }
    },
    playIndex(i) {
      if (!player || !currentCard || currentCard.mode !== "playlist") return;
      try { player.playVideoAt(i); } catch (e) { warn(e); }
    },
    getCurrentIndex() { return currentIndex; },
    isReady() { return !!player; }
  };

  global.PlayerEngine = Engine;
})(window);
