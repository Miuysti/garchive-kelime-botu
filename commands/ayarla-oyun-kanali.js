const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const { stateOku, stateYaz } = require('../utils/gameHelper');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ayarla-oyun-kanali')
    .setDescription('Oyunun oynanacağı kanalı belirler.')
    .addChannelOption(option =>
      option.setName('kanal')
        .setDescription('Oyun kanalı')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText) // Sadece yazı kanalları
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const state = stateOku();

    if (state.adminRoleId) {
      const member = interaction.member;
      if (!member.roles.cache.has(state.adminRoleId)) {
        return interaction.reply({ content: 'Bu komutu kullanma yetkiniz yok.', ephemeral: true });
      }
    }

    const kanal = interaction.options.getChannel('kanal');
    state.channelId = kanal.id;
    stateYaz(state);
    await interaction.reply(`📌 Oyun kanalı <#${kanal.id}> olarak ayarlandı.`);
  }
};