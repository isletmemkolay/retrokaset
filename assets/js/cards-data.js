/* ===========================================================
   cards-data.js
   Tüm kart kayıtları — Faz 1: statik veri
   Yeni kart eklemek için aşağıdaki "cards" dizisine yeni obje ekleyin.

   YouTube primaryVideoId / playlistVideoIds alanlarına
   "https://www.youtube.com/watch?v=XXXXXXXXXXX" linkindeki XXXXXXXXXXX kısmını yazın.

   ÖNEMLİ:
   - mode "single" ise playlistVideoIds boş [] olmalı
   - mode "playlist" ise playlistVideoIds tam 5 video ID içermeli ve
     primaryVideoId listedeki ilk video olmalı.
   =========================================================== */
(function (global) {
  "use strict";

  const cards = [
    {
      cardId: "LOVE001",
      slug: "romantik-gece",
      mode: "single",
      title: "Romantik Gece",
      recipientName: "",
      tickerMessage: "Bu şarkı bu gece sadece sana çalıyor.",
      youtube: {
        primaryVideoId: "VIDEO_ID_1",
        playlistVideoIds: []
      },
      ui: {
        themeVariant: "pink-neon",
        labelText: "A Side",
        showPlaylistStrip: false
      },
      settings: {
        isActive: true,
        allowReplay: true,
        autoplayIntent: false
      },
      meta: {
        createdAt: "2026-06-09",
        updatedAt: "2026-06-09"
      }
    },
    {
      cardId: "MISS001",
      slug: "seni-ozledim",
      mode: "single",
      title: "Seni Özledim",
      recipientName: "",
      tickerMessage: "Mesafeye rağmen bu parça sana gelsin.",
      youtube: {
        primaryVideoId: "VIDEO_ID_2",
        playlistVideoIds: []
      },
      ui: {
        themeVariant: "violet-neon",
        labelText: "A Side",
        showPlaylistStrip: false
      },
      settings: {
        isActive: true,
        allowReplay: true,
        autoplayIntent: false
      },
      meta: {
        createdAt: "2026-06-09",
        updatedAt: "2026-06-09"
      }
    },
    {
      cardId: "LIST001",
      slug: "gece-listesi",
      mode: "playlist",
      title: "Gece Listesi",
      recipientName: "",
      tickerMessage: "Bu kasetin içinde geceye özel 5 parça var.",
      youtube: {
        primaryVideoId: "VIDEO_ID_3",
        playlistVideoIds: ["VIDEO_ID_3", "VIDEO_ID_4", "VIDEO_ID_5", "VIDEO_ID_6", "VIDEO_ID_7"]
      },
      ui: {
        themeVariant: "green-neon",
        labelText: "B Side",
        showPlaylistStrip: true
      },
      settings: {
        isActive: true,
        allowReplay: true,
        autoplayIntent: false
      },
      meta: {
        createdAt: "2026-06-09",
        updatedAt: "2026-06-09"
      }
    },
    {
      cardId: "TEST000",
      slug: "pasif-kart",
      mode: "single",
      title: "Pasif Kart",
      recipientName: "",
      tickerMessage: "Bu kart şu anda aktif değil.",
      youtube: {
        primaryVideoId: "",
        playlistVideoIds: []
      },
      ui: {
        themeVariant: "red-alert",
        labelText: "Locked",
        showPlaylistStrip: false
      },
      settings: {
        isActive: false,
        allowReplay: false,
        autoplayIntent: false
      },
      meta: {
        createdAt: "2026-06-09",
        updatedAt: "2026-06-09"
      }
    }
  ];

  /** Kart sözlüğü (cardId -> kart) */
  const cardsIndex = cards.reduce((acc, c) => {
    acc[c.cardId] = c;
    return acc;
  }, {});

  /** ID veya slug ile kart bulma — büyük/küçük harf duyarsız */
  function findCard(id) {
    if (!id) return null;
    const key = String(id).trim().toUpperCase();
    if (cardsIndex[key]) return cardsIndex[key];
    // slug fallback
    const found = cards.find(c => c.slug && c.slug.toLowerCase() === String(id).trim().toLowerCase());
    return found || null;
  }

  global.CardsData = { cards, cardsIndex, findCard };
})(window);
