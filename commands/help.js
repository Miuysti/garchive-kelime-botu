const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Botun tüm komutlarını ve kullanımlarını gösterir.'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('📚 Garchive Bot - Komut Listesi')
      .setDescription('Botun tüm komutları ve ne işe yaradıkları:')
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter({ text: 'Garchive Bot v1.0', iconURL: interaction.client.user.displayAvatarURL() });

    // Komutları ekle
    embed.addFields(
      {
        name: '🎮 **Oyun Komutları**',
        value: '───────────────',
        inline: false
      },
      {
        name: '/oyun-baslat',
        value: 'Kelime oyununu başlatır. Bot ilk kelimeyi söyler.',
        inline: true
      },
      {
        name: '/oyun-durdur',
        value: 'Kelime oyununu durdurur.',
        inline: true
      },
      {
        name: '/ayarla-oyun-kanali',
        value: 'Oyunun oynanacağı kanalı belirler.',
        inline: true
      },
      {
        name: '/ayarla-yonetici-rol',
        value: 'Oyunu yönetebilecek rolü belirler.',
        inline: true
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true
      },
      {
        name: '📊 **Skor Komutları**',
        value: '───────────────',
        inline: false
      },
      {
        name: '/leaderboard',
        value: 'Liderlik tablosunu gösterir.',
        inline: true
      },
      {
        name: '/skorlari-sifirla',
        value: 'Tüm skorları sıfırlar (sadece yöneticiler).',
        inline: true
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true
      },
      {
        name: 'ℹ️ **Diğer Komutlar**',
        value: '───────────────',
        inline: false
      },
      {
        name: '/ping',
        value: 'Botun gecikme süresini gösterir.',
        inline: true
      },
      {
        name: '/help',
        value: 'Bu komut listesini gösterir.',
        inline: true
      }
    );

    // Kullanım bilgisi ekle
    embed.addFields({
      name: '📝 **Oyun Kuralları**',
      value: '1️⃣ Kelime TDK\'da geçerli olmalı\n2️⃣ Kelime önceki kelimenin son harfiyle başlamalı\n3️⃣ Daha önce kullanılan kelimeler tekrar edilemez\n4️⃣ Sadece botun belirlediği kanalda oynanabilir',
      inline: false
    });

    await interaction.reply({ embeds: [embed] });
  },

  async prefixExecute(message, args, client, config) {
    // Prefix desteği de ekleyelim
    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('📚 Garchive Bot - Komut Listesi')
      .setDescription('Botun tüm komutları ve ne işe yaradıkları:')
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      .setFooter({ text: 'Garchive Bot v1.0', iconURL: client.user.displayAvatarURL() });

    embed.addFields(
      {
        name: '🎮 **Oyun Komutları**',
        value: '───────────────',
        inline: false
      },
      {
        name: '`/oyun-baslat`',
        value: 'Kelime oyununu başlatır. Bot ilk kelimeyi söyler.',
        inline: true
      },
      {
        name: '`/oyun-durdur`',
        value: 'Kelime oyununu durdurur.',
        inline: true
      },
      {
        name: '`/ayarla-oyun-kanali`',
        value: 'Oyunun oynanacağı kanalı belirler.',
        inline: true
      },
      {
        name: '`/ayarla-yonetici-rol`',
        value: 'Oyunu yönetebilecek rolü belirler.',
        inline: true
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true
      },
      {
        name: '📊 **Skor Komutları**',
        value: '───────────────',
        inline: false
      },
      {
        name: '`/leaderboard`',
        value: 'Liderlik tablosunu gösterir.',
        inline: true
      },
      {
        name: '`/skorlari-sifirla`',
        value: 'Tüm skorları sıfırlar (sadece yöneticiler).',
        inline: true
      },
      {
        name: '\u200B',
        value: '\u200B',
        inline: true
      },
      {
        name: 'ℹ️ **Diğer Komutlar**',
        value: '───────────────',
        inline: false
      },
      {
        name: '`/ping`',
        value: 'Botun gecikme süresini gösterir.',
        inline: true
      },
      {
        name: '`/help`',
        value: 'Bu komut listesini gösterir.',
        inline: true
      }
    );

    embed.addFields({
      name: '📝 **Oyun Kuralları**',
      value: '1️⃣ Kelime TDK\'da geçerli olmalı\n2️⃣ Kelime önceki kelimenin son harfiyle başlamalı\n3️⃣ Daha önce kullanılan kelimeler tekrar edilemez\n4️⃣ Sadece botun belirlediği kanalda oynanabilir',
      inline: false
    });

    await message.reply({ embeds: [embed] });
  }
};