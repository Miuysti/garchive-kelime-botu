const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { stateOku, skorlariSifirla } = require('../utils/gameHelper');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skorlari-sifirla')
    .setDescription('Tüm kullanıcıların kelime skorlarını sıfırlar.')
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

    // Skorları sıfırla
    skorlariSifirla(state);

    await interaction.reply('🗑️ Tüm kelime skorları başarıyla sıfırlandı!');
  }
};