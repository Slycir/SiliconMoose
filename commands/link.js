const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Post hyperlink')
        .addStringOption(option => option.setName('link').setDescription('Enter link'))
        .addStringOption(option => option.setName('link-text').setDescription('Enter hyperlink text')),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel(interaction.options.getString('link-text'))
                    .setStyle('LINK')
                    .setURL(interaction.options.getString('link')),
            );
        return interaction.reply({components: [row]});
    },
};