const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { stateOku } = require('../utils/gameHelper');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Kelime oyunu liderlik tablosunu gösterir.'),

  async execute(interaction) {
    const state = stateOku();
    const scores = state.scores || {};

    // Skorları sırala (en yüksekten düşüğe)
    const sirali = Object.entries(scores)
      .filter(([_, skor]) => skor > 0) // Sadece 1+ kelime yazanlar
      .sort(([, a], [, b]) => b - a) // Büyükten küçüğe
      .slice(0, 10); // İlk 10'u göster (isteğe bağlı)

    if (sirali.length === 0) {
      return interaction.reply('📊 Henüz kimse kelime yazmamış! Oyunu başlatıp kelime yazmaya başlayın.');
    }

    // Leaderboard embed'i oluştur
    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('🏆 Kelime Oyunu Liderlik Tablosu')
      .setDescription('En çok kelime yazan oyuncular:')
      .setTimestamp();

    let siraliMetin = '';
    let sira = 1;

    for (const [kullaniciId, skor] of sirali) {
      try {
        // Kullanıcıyı sunucudan al
        const uye = await interaction.guild.members.fetch(kullaniciId);
        const isim = uye ? uye.displayName : `Bilinmeyen Kullanıcı (${kullaniciId})`;
        siraliMetin += `**${sira}.** ${isim} — **${skor}** kelime\n`;
      } catch (error) {
        // Kullanıcı bulunamazsa ID ile göster
        siraliMetin += `**${sira}.** Bilinmeyen Kullanıcı (${kullaniciId}) — **${skor}** kelime\n`;
      }
      sira++;
    }

    embed.addFields({ name: '📊 Sıralama', value: siraliMetin || 'Henüz veri yok.' });

    await interaction.reply({ embeds: [embed] });
  }
};