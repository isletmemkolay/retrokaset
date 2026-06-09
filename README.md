# QR Gift Cassette Player 🎀📼

Retro neon kasetçalar temalı, mobil-first, GitHub Pages'e doğrudan yüklenebilir QR hediye deneyimi.

Her hediye kartındaki QR okutulduğunda `player.html?card=CARDID` açılır, kart ID'sine göre **tek şarkı** ya da **5 şarkılık playlist** YouTube üzerinden oynar ve karta özel **kayan mesaj** gösterir.

---

## 🚀 Hızlı Başlangıç (GitHub Pages)

1. Bu klasördeki tüm dosyaları **olduğu gibi** yeni bir GitHub repo'sunun kök dizinine yükleyin.
2. Repo ayarlarından **Settings → Pages → Source: `main` / root** seçin.
3. Birkaç saniye sonra siteniz şu adreste yayında olur:
   ```
   https://KULLANICI_ADI.github.io/REPO_ADI/player.html?card=LOVE001
   ```
4. QR kodlarınızı bu URL formatıyla üretin (kart ID'sini değiştirerek).

> ✅ `.nojekyll` dosyası dahil edildi (Jekyll devre dışı).
> ✅ `404.html` SPA fallback — yanlış yola düşen ziyaretçileri `player.html`'e yönlendirir.
> ✅ Tüm yollar göreceli (relative) — User/Org Pages ve Project Pages için de çalışır.

---

## 🎵 Kart Ekleme / Düzenleme

`assets/js/cards-data.js` dosyasını açın ve `cards` dizisine yeni obje ekleyin.

### Tek şarkı (single) örneği
```js
{
  cardId: "LOVE002",
  slug: "ilk-bulusma",
  mode: "single",
  title: "İlk Buluşma",
  recipientName: "",
  tickerMessage: "Bu şarkı seninle olduğum o günü anlatıyor.",
  youtube: {
    primaryVideoId: "dQw4w9WgXcQ",   // YouTube linkindeki v= sonrası
    playlistVideoIds: []
  },
  ui: { themeVariant: "pink-neon", labelText: "A Side", showPlaylistStrip: false },
  settings: { isActive: true, allowReplay: true, autoplayIntent: false },
  meta: { createdAt: "2026-06-09", updatedAt: "2026-06-09" }
}
```

### Playlist (5 şarkı) örneği
```js
{
  cardId: "LIST002",
  slug: "yaz-listesi",
  mode: "playlist",
  title: "Yaz Listesi",
  tickerMessage: "Yaz boyu kulağından düşmesin.",
  youtube: {
    primaryVideoId: "abc1",  // listenin ilk videosu ile aynı olmalı
    playlistVideoIds: ["abc1","abc2","abc3","abc4","abc5"]
  },
  ui: { themeVariant: "green-neon", labelText: "B Side", showPlaylistStrip: true },
  settings: { isActive: true, allowReplay: true, autoplayIntent: false },
  meta: { createdAt: "2026-06-09", updatedAt: "2026-06-09" }
}
```

### Tema seçenekleri
- `pink-neon` (varsayılan)
- `violet-neon`
- `green-neon`
- `cyan-neon`
- `red-alert` (pasif kart için)

### Doğrulama kuralları
- `cardId` benzersiz olmalı (büyük harf önerilir)
- `single` modunda `playlistVideoIds` boş `[]` olmalı
- `playlist` modunda `playlistVideoIds` tam 5 video ID içermeli
- `playlist` modunda `primaryVideoId` listedeki ilk video ile **aynı** olmalı
- `isActive: false` ise pasif kart ekranı gösterilir

---

## 🔗 URL Formatları

Aşağıdaki üç format da aynı kartı açar:

| Format | Örnek |
|---|---|
| Query (önerilen) | `player.html?card=LOVE001` |
| Hash (fallback) | `player.html#card=LOVE001` |
| Sadece hash | `player.html#LOVE001` |

QR kod üretirken **query formatını** kullanın — paylaşım ve takip açısından en yaygın desteklenen biçim budur.

---

## 📱 Yerel Test

GitHub Pages'e yüklemeden önce yerelde test etmek için:

```bash
# Bu klasörde:
python3 -m http.server 5500
# sonra: http://localhost:5500/player.html?card=LOVE001
```

> ⚠️ `file://` üzerinden değil mutlaka HTTP üzerinden test edin (YouTube IFrame API origin kontrolü için).

### Test edilecek senaryolar
- ✅ `player.html?card=LOVE001` → tek şarkı
- ✅ `player.html?card=LIST001` → 5 şarkılık playlist
- ✅ `player.html?card=TEST000` → pasif kart ekranı
- ✅ `player.html?card=YOK999` → bulunamayan kart ekranı
- ✅ `player.html` → "kart belirtilmedi" mesajı

### Cihaz testleri
- iPhone Safari (iOS 16+)
- Android Chrome
- Masaüstü Chrome / Safari
- 375px genişlik (iPhone SE) ve 320px (eski cihazlar)

---

## 🗂️ Dosya Yapısı

```
qr-gift-cassette-player/
├── player.html              # Ana giriş sayfası
├── 404.html                 # SPA fallback
├── .nojekyll                # Jekyll devre dışı
├── README.md
└── assets/
    ├── css/
    │   └── style.css        # Tüm tema + responsive stiller
    ├── js/
    │   ├── helpers.js       # Yardımcı fonksiyonlar
    │   ├── cards-data.js    # ⭐ Kart kayıtları (buradan düzenle)
    │   ├── router.js        # URL çözümleme
    │   ├── ui-render.js     # DOM render katmanı
    │   ├── player-engine.js # YouTube IFrame API
    │   └── app.js           # Başlangıç akışı
    └── images/
        ├── cassette-shell/  # (opsiyonel görseller)
        ├── icons/
        └── qr-samples/
```

---

## 🎯 MVP Kapsamı

**Var:**
- Tek sayfa player deneyimi
- Single ve playlist kart tipleri
- Kart bazlı kayan mesaj (ticker)
- Pasif kart ekranı / Bulunamayan kart ekranı
- 5 farklı neon tema
- Mobil-first kaset arayüzü
- GitHub Pages deploy hazır

**Yok (gelecek faz):**
- Admin panel
- Veritabanı
- Üyelik sistemi
- Analytics dashboard

---

## 🛠️ Notlar

- **Otomatik oynatma:** Mobil tarayıcılar kullanıcı etkileşimi olmadan video başlatmaz. Bu yüzden büyük "play" butonu ekran üzerine yerleştirildi.
- **YouTube minimum boyut:** Embed alanı 200×200'den küçük olmamalı — `cassette-screen` CSS'te `min-height: 200px` ile garantilendi.
- **Video kısıtlamaları:** Bazı YouTube videoları embed'e kapalı olabilir. Eklemeden önce başka bir sitede embed olarak çalıştığını doğrulayın.

---

## 📈 Sonraki Adımlar

1. `assets/js/cards-data.js` içindeki `VIDEO_ID_X` placeholder'larını gerçek YouTube ID'leri ile değiştirin.
2. Repo'yu GitHub'a push edin, Pages'i aktif edin.
3. [QR Code Monkey](https://www.qrcode-monkey.com/) gibi bir araçla `https://...github.io/REPO/player.html?card=LOVE001` URL'i için QR üretin.
4. QR'ı bastırın → kart üstüne yapıştırın → hediye edin. 💝
