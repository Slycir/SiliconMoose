const fs = require('fs')
const { setups } = require('./setups.json')
const { SlashCommandBuilder } = require('discord.js');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create a new command')
        .addStringOption(option => option.setName('command-name').setDescription('Enter command name( /[name here] )'))
        .addStringOption(option => option.setName('command-desc').setDescription('Enter command description'))
        .addStringOption(option => option.setName('command-type').setDescription('Enter command type').addChoices(
            { name: 'Text', value: 'text' },
            { name: 'Link', value: 'link' },
        ))
        .addStringOption(option => option.setName('command-text').setDescription('Enter command reply text'))
        .addStringOption(option => option.setName('command-link').setDescription('If type \`link\`: Enter command reply link'))
        .addStringOption(option => option.setName('command-link-label').setDescription('If type \`link\`: Enter command reply link label')),
    async execute(interaction) {
        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)){
            interaction.reply({ content: 'You do not have permissions', ephemeral: true })
            return
        }
        var linkBool = false;
        var commandFile;
        const commandName = interaction.options.getString('command-name');
        const commandDesc = interaction.options.getString('command-desc');
        const commandText = interaction.options.getString('command-text');
		const commandType = interaction.options.getString('command-type');
        var commandLink;
        var commandLinkLabel;
		if (commandType.toLowerCase() == 'link') {
			commandLink = interaction.options.getString('command-link');
            commandLinkLabel = interaction.options.getString('command-link-label')
            linkBool = true;
        }
        console.log(commandName)
        if (linkBool) {
            commandFile = `${setups[1][0]}` + `   //Command made by ${interaction.member.displayName}` + '\n'
            for(x = 1; x < setups[1].length; x++) {
                commandFile += `${setups[1][x]}` + '\n';
            }
            commandFile = commandFile.replace('${commandName}', commandName);
            commandFile = commandFile.replace('${commandDesc}', commandDesc);
            commandFile = commandFile.replace('${commandText}', commandText);
            commandFile = commandFile.replace('${commandLink}', commandLink);
            commandFile = commandFile.replace('${commandLinkLabel}', commandLinkLabel);
        } else {
            commandFile = `${setups[0][0]}` + `   //Command made by ${interaction.member.displayName}` + '\n'
            for(x = 1; x < setups[0].length; x++) {
                commandFile += `${setups[0][x]}` + '\n';
            }
            commandFile = commandFile.replace('${commandName}', commandName);
            commandFile = commandFile.replace('${commandDesc}', commandDesc);
            commandFile = commandFile.replace('${commandText}', commandText);
        }
        fs.writeFile(`./commands/${commandName}CR.js`, commandFile, err => {
            if (err) {
              console.error(err)
            }
        });
        return interaction.reply(`Command created: /${commandName}`);
    },
};