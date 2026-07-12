const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { stateOku, stateYaz, stateGuncelle } = require('../utils/gameHelper');

// Botun söyleyeceği başlangıç kelimeleri (istediğin kadar ekleyebilirsin)
const BASLANGIC_KELIMELERI = ['elma', 'kalem', 'masa', 'araba', 'kitap', 'bilgisayar', 'televizyon', 'çiçek', 'bahçe', 'meyve', 'güneş', 'deniz'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('oyun-baslat')
    .setDescription('Kelime oyununu başlatır. Bot ilk kelimeyi söyler.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const state = stateOku();

    // Admin rol kontrolü
    if (state.adminRoleId) {
      const member = interaction.member;
      if (!member.roles.cache.has(state.adminRoleId)) {
        return interaction.reply({ content: 'Bu komutu kullanma yetkiniz yok.', ephemeral: true });
      }
    }

    if (state.active) {
      return interaction.reply('Oyun zaten aktif!');
    }

    if (!state.channelId) {
      return interaction.reply('Önce `/ayarla-oyun-kanali` ile bir kanal belirleyin.');
    }

    // 1. Rastgele bir başlangıç kelimesi seç
    const rastgeleKelime = BASLANGIC_KELIMELERI[Math.floor(Math.random() * BASLANGIC_KELIMELERI.length)];

    // 2. Oyunu aktif et ve durumu bu kelimeyle başlat
    state.active = true;
    state.lastWord = rastgeleKelime;
    state.lastLetter = rastgeleKelime.charAt(rastgeleKelime.length - 1);
    state.usedWords = [rastgeleKelime.toLowerCase()]; // Kullanılanlara ekle ki tekrar edilmesin
    stateYaz(state);

    // 3. Kullanıcıya cevap ver ve oyun kanalına botun kelimesini yaz
    await interaction.reply(`✅ Oyun başlatıldı! <#${state.channelId}> kanalında oynanacak.`);
    
    // Botun seçtiği kelimeyi oyun kanalına gönder (hemen altına)
    const kanal = await interaction.client.channels.fetch(state.channelId);
    await kanal.send(`🤖 **Bot başlangıç kelimesi:** \`${rastgeleKelime}\`\n📝 **Şimdi sıra sizde! Son harf:** \`${state.lastLetter}\` ile başlayan bir kelime yazın.`);

    // Oyun kanalına bot mesajı atıldığı için, bot kendi mesajını görmezden gelecek (zaten messageCreate'de author.bot kontrolü var).
  },

  async prefixExecute(message, args) {
    // Prefix desteği istersen aynısını buraya da kopyalayabilirsin ama slash yeterli şimdilik.
  }
};