const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Post hyperlink')
        .addStringOption(option => option.setName('link').setDescription('Enter link'))
        .addStringOption(option => option.setName('link-text').setDescription('Enter hyperlink text')),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(interaction.options.getString('link-text'))
                    .setStyle(ButtonStyle.Link)
                    .setURL(interaction.options.getString('link')),
            );
        return interaction.reply({content: interaction.options.getString('link-text'), components: [row]});
    },
};