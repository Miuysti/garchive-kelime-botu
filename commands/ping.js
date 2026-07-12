const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun gecikmesini gösterir.'),

  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pong!', fetchReply: true });
    await interaction.editReply(`Pong! 🏓 Gecikme: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
  },

  async prefixExecute(message, args, client, config) {
    const sent = await message.channel.send('Pong!');
    const ping = sent.createdTimestamp - message.createdTimestamp;
    await sent.edit(`Pong! 🏓 Gecikme: ${ping}ms`);
  }
};