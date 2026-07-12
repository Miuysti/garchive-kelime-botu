const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { stateOku, stateYaz } = require('../utils/gameHelper');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('oyun-durdur')
    .setDescription('Kelime oyununu durdurur.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const state = stateOku();

    if (state.adminRoleId) {
      const member = interaction.member;
      if (!member.roles.cache.has(state.adminRoleId)) {
        return interaction.reply({ content: 'Bu komutu kullanma yetkiniz yok.', ephemeral: true });
      }
    }

    if (!state.active) {
      return interaction.reply('Oyun zaten durdurulmuş.');
    }

    state.active = false;
    stateYaz(state);
    await interaction.reply('⏹️ Oyun durduruldu.');
  }
};