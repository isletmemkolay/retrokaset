# Retro TV QR Site — GitHub'a Yüklenecek Tüm Dosyalar

Bu klasör GitHub Pages için hazırdır.

## Klasörde olması gereken dosyalar
- `index.html`
- `scene.jpg`
- `README-GITHUB-KURULUM.md`

## 1) GitHub'da repository oluştur
1. GitHub hesabına giriş yap.
2. Sağ üstten **New repository** seç.
3. Repository adı olarak örnek: `retro-tv-qr`
4. **Public** seç.
5. `Add a README file` seçmene gerek yok.
6. **Create repository** ile oluştur.

## 2) Dosyaları yükle
Repository açıldıktan sonra:
1. **Add file**
2. **Upload files**
3. Bu klasördeki şu 3 dosyayı birlikte seç ve yükle:
   - `index.html`
   - `scene.jpg`
   - `README-GITHUB-KURULUM.md`
4. Altta **Commit changes** butonuna bas.

## 3) GitHub Pages'i aç
1. Repository içinde **Settings** sekmesine gir.
2. Sol menüden **Pages** bölümünü aç.
3. **Build and deployment** altında:
   - **Source** = `Deploy from a branch`
   - **Branch** = `main`
   - Klasör = `/root`
4. **Save** butonuna bas.
5. 1-5 dakika içinde siten yayına girer.

## 4) Açılacak site adresi
Adres genelde şu yapıda olur:
`https://KULLANICIADIN.github.io/REPOSITORY-ADI/`

Örnek:
`https://adambirgun.github.io/retro-tv-qr/`

## 5) QR kod üret
GitHub Pages linkin açıldıktan sonra bu linki QR kod üreticisinde kullan.
QR okutulunca kullanıcı direkt bu sayfaya gelir.

## 6) Video değiştirmek istersen
`index.html` içinde şu satırı bul:
`const YOUTUBE_VIDEO_ID = 'Yf3UpljAe4I';`

Sadece bu kimliği değiştirmen yeterlidir.

Örnek:
YouTube linki:
`https://www.youtube.com/watch?v=ABC123XYZ99`

Video kimliği:
`ABC123XYZ99`

## 7) Görseli değiştirmek istersen
`scene.jpg` dosyasını aynı isimle değiştir.
Ama yeni görselin oranı farklıysa `index.html` içindeki TV hizasını da güncellemek gerekir.

## 8) Bu projede ne hazır geldi?
- Sade tek sayfa tasarım
- TV ekranının içine yerleşen YouTube video alanı
- Altta özel kontrol paneli
- Video sonlanınca başka videoya geçmeme davranışı
- GitHub Pages uyumlu yapı

## 9) Dosya yapısı
Aynen böyle kalmalı:

retro-tv-qr/
- index.html
- scene.jpg
- README-GITHUB-KURULUM.md

## 10) Önemli not
`index.html` ve `scene.jpg` aynı klasörde olmak zorunda. Eğer biri eksik olursa site düzgün açılmaz.
