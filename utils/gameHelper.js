const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(__dirname, '..', 'gameState.json');

function stateOku() {
  try {
    const data = fs.readFileSync(STATE_FILE, 'utf8');
    const parsed = JSON.parse(data);
    
    // Güvenlik: usedWords dizisini temizle
    if (Array.isArray(parsed.usedWords)) {
      parsed.usedWords = parsed.usedWords.map(entry => {
        if (typeof entry === 'string') {
          return { kelime: entry.toLowerCase(), yazarId: null };
        }
        if (entry && typeof entry === 'object' && entry.kelime) {
          return { kelime: entry.kelime.toLowerCase(), yazarId: entry.yazarId || null };
        }
        return null;
      }).filter(entry => entry !== null);
    } else {
      parsed.usedWords = [];
    }
    
    // scores yoksa oluştur
    if (!parsed.scores || typeof parsed.scores !== 'object') {
      parsed.scores = {};
    }
    
    return parsed;
  } catch (err) {
    return { active: false, channelId: null, lastWord: null, lastLetter: null, usedWords: [], adminRoleId: null, scores: {} };
  }
}

function stateYaz(state) {
  if (Array.isArray(state.usedWords)) {
    state.usedWords = state.usedWords.filter(entry => 
      entry && typeof entry === 'object' && entry.kelime
    );
  }
  if (!state.scores || typeof state.scores !== 'object') {
    state.scores = {};
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

function kelimeKontrolEt(state, yeniKelime, yazarId) {
  if (!state.active) {
    return { gecerli: false, mesaj: 'Oyun şu anda aktif değil.' };
  }

  const bulunan = state.usedWords.find(entry => {
    if (entry && entry.kelime) {
      return entry.kelime.toLowerCase() === yeniKelime.toLowerCase();
    }
    return false;
  });

  if (bulunan) {
    return {
      gecerli: false,
      mesaj: `Bu kelime daha önce kullanıldı!`,
      yazarId: bulunan.yazarId
    };
  }

  if (state.lastWord === null) {
    return { gecerli: true, mesaj: 'İlk kelime geçerli.' };
  }

  const sonHarf = state.lastLetter ? state.lastLetter.toLowerCase() : '';
  const ilkHarf = yeniKelime.charAt(0).toLowerCase();

  if (sonHarf && ilkHarf !== sonHarf) {
    return { gecerli: false, mesaj: `Kelime "${sonHarf}" harfiyle başlamalı!` };
  }

  return { gecerli: true, mesaj: 'Kural uygun.' };
}

function stateGuncelle(state, yeniKelime, yazarId) {
  state.lastWord = yeniKelime;
  state.lastLetter = yeniKelime.charAt(yeniKelime.length - 1);
  
  // Kullanılan kelimelere ekle
  state.usedWords = state.usedWords.filter(entry => 
    entry && entry.kelime && entry.kelime.toLowerCase() !== yeniKelime.toLowerCase()
  );
  state.usedWords.push({
    kelime: yeniKelime.toLowerCase(),
    yazarId: yazarId
  });
  
  // Skoru artır
  if (!state.scores[yazarId]) {
    state.scores[yazarId] = 0;
  }
  state.scores[yazarId] += 1;
  
  stateYaz(state);
}

function skorlariSifirla(state) {
  state.scores = {};
  stateYaz(state);
}

module.exports = {
  stateOku,
  stateYaz,
  kelimeKontrolEt,
  stateGuncelle,
  skorlariSifirla
};