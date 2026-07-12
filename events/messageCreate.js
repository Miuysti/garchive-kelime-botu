const { kelimeGecerliMi } = require('../utils/tdkHelper');
const { stateOku, kelimeKontrolEt, stateGuncelle } = require('../utils/gameHelper');

module.exports = {
  name: 'messageCreate',
  async execute(message, client, config) {
    if (message.author.bot) return;

    // Prefix komut kontrolü
    if (!message.content.startsWith(config.prefix)) {
      // Prefix yok, oyun mantığına git
    } else {
      const args = message.content.slice(config.prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName);
      if (!command) return;

      if (typeof command.prefixExecute === 'function') {
        try {
          await command.prefixExecute(message, args, client, config);
        } catch (error) {
          console.error(`❌ Prefix komut hatası (${commandName}):`, error);
          await message.reply('Komut çalıştırılırken hata oluştu.');
        }
      } else {
        await message.reply('Bu komut sadece `/` ile kullanılabilir.');
      }
      return;
    }

    // --- OYUN MANTIĞI ---
    const state = stateOku();

    if (!state.active) return;
    if (state.channelId !== message.channel.id) return;

    const kelime = message.content.trim();
    if (kelime.length === 0) return;

    // 1. TDK doğrulaması
    const gecerli = await kelimeGecerliMi(kelime);
    if (!gecerli) {
      try {
        await message.delete();
        const errorMsg = await message.channel.send(`❌ "${kelime}" geçerli bir Türkçe kelime değil!`);
        setTimeout(() => errorMsg.delete().catch(console.error), 3000);
      } catch (err) {
        console.error('Mesaj silinirken hata:', err);
      }
      return;
    }

    // 2. Oyun kurallarını kontrol et
    const kontrol = kelimeKontrolEt(state, kelime, message.author.id);
    if (!kontrol.gecerli) {
      try {
        await message.delete();
        
        let hataMesaji = kontrol.mesaj; // Varsayılan mesaj
        
        // Eğer bu hata tekrar eden kelimeyse (yazarId varsa)
        if (kontrol.yazarId) {
          try {
            // Kullanıcıyı sunucudan al
            const yazar = await message.guild.members.fetch(kontrol.yazarId);
            const isim = yazar ? yazar.displayName : 'birisi';
            hataMesaji = `Bu kelime daha önce **${isim}** tarafından kullanıldı!`;
          } catch (fetchError) {
            // Kullanıcı bulunamazsa etiketle
            hataMesaji = `Bu kelime daha önce <@${kontrol.yazarId}> tarafından kullanıldı!`;
          }
        }
        
        const errorMsg = await message.channel.send(`❌ ${hataMesaji}`);
        setTimeout(() => errorMsg.delete().catch(console.error), 3000);
      } catch (err) {
        console.error('Mesaj silinirken hata:', err);
      }
      return;
    }

    // 3. Her şey geçerli -> ✅ reaksiyonu ve durumu güncelle
    await message.react('✅');
    stateGuncelle(state, kelime, message.author.id);
  }
};