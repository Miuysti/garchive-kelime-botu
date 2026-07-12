# 🧩 Garchive Kelime Botu

**Garchive Kelime Botu**, Discord sunucunuzda oynayabileceğiniz, **TDK api kullanan Türkçe kelime oyunu** botudur. Bot, oyuncuların yazdığı kelimeleri Türk Dil Kurumu'nun resmi API'si üzerinden doğrular ve oyun kurallarına uygunluğunu kontrol eder.

---

## 🎮 Oyun Nasıl Oynanır?

1. Bot, oyun başlangıcında rastgele bir kelime söyler.
2. Sıradaki oyuncu, bu kelimenin **son harfiyle başlayan** yeni bir kelime yazmalıdır.
3. Yazılan kelime:
   - TDK'da geçerli olmalı,
   - Daha önce kullanılmamış olmalı,
   - Son harf kuralına uymalıdır.
4. Geçerli kelimeler ✅ ile onaylanır.
5. Geçersiz kelimeler silinir ve hata mesajı gösterilir (3 saniye sonra kaybolur).
6. Her doğru kelime, oyuncunun skoruna +1 eklenir.

---

## 📥 Kurulum (Botu Kendi Sunucuna Eklemek İçin)

### 1. Gereksinimler
- **Node.js** (v18 veya üzeri) — [nodejs.org](https://nodejs.org)
- **Discord Hesabı** ve bir sunucu
- **Discord Developer Portal** üzerinden oluşturulmuş bir bot

### 2. Projeyi İndir
```bash git clone https://github.com/Miuysti/garchive-kelime-botu.git cd garchive-kelime-botu```

### 3. Bağımlılıkları İndir
```npm install```

### 4. .env dosyasını oluştur

Proje ana dizininde .env adlı bir dosya oluştur ve içine aşağıdaki bilgileri yaz:

```TOKEN=bot_tokenunuz CLIENT_ID=bot_client_id GUILD_ID=sunucu_id```

### 5. Botu Çalıştır

```node index.js```

## 🛠️ Komutlar

| Komut | Açıklama | Yetki |
|-------|----------|-------|
| `/oyun-baslat` | Oyunu başlatır, bot ilk kelimeyi söyler. | Yönetici |
| `/oyun-durdur` | Oyunu durdurur. | Yönetici |
| `/ayarla-oyun-kanali` | Oyunun oynanacağı kanalı belirler. | Yönetici |
| `/ayarla-yonetici-rol` | Oyunu yönetebilecek rolü belirler. | Yönetici |
| `/skorlari-sifirla` | Tüm skorları sıfırlar. | Yönetici |
| `/leaderboard` | Liderlik tablosunu gösterir. | Herkes |
| `/ping` | Botun gecikme süresini ölçer. | Herkes |
| `/help` | Tüm komutları ve kuralları gösterir. | Herkes |

---
