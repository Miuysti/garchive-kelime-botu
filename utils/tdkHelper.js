// utils/tdkHelper.js

async function kelimeGecerliMi(kelime) {
  try {
    const url = `https://sozluk.gov.tr/gts?ara=${encodeURIComponent(kelime)}`;
    const response = await fetch(url);
    const data = await response.json();

    // Hata veya boş yanıt kontrolü
    if (!data || data.error) {
      return false;
    }

    // TDK bazen dizi, bazen nesne döndürüyor. Dizi ise ilk elemana bak.
    const ilk = Array.isArray(data) ? data[0] : data;
    if (!ilk) {
      return false;
    }

    // Anahtar kontrolü: anlamlar veya anlamlarListe
    const anlamlar = ilk.anlamlar || ilk.anlamlarListe;
    if (anlamlar && anlamlar.length > 0) {
      return true;
    }

    return false;
  } catch (hata) {
    console.error('TDK API hatası:', hata.message);
    return false;
  }
}

module.exports = { kelimeGecerliMi };