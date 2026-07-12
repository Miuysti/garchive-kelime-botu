module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client, config) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`❌ ${interaction.commandName} komutunda hata:`, error);
      await interaction.reply({ content: 'Komut çalıştırılırken bir hata oluştu.', ephemeral: true });
    }
  }
};