module.exports = {
  name: 'ready',
  once: true,
  execute(client, config) {
    console.log(`✅ ${client.user.tag} olarak giriş yapıldı!`);
    registerSlashCommands(client);
  }
};

async function registerSlashCommands(client) {
  const { REST, Routes } = require('discord.js');
  const fs = require('fs');
  const path = require('path');

  const commands = [];
  const commandsPath = path.join(__dirname, '..', 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command) {
      commands.push(command.data.toJSON());
    }
  }

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log('🔁 Slash komutlar kaydediliyor...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Slash komutlar başarıyla kaydedildi!');
  } catch (error) {
    console.error('❌ Slash komut kaydı hatası:', error);
  }
}