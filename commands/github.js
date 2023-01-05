const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Important GitHub links.'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('2022Robot')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/MetalMooseFRC/2022Robot'),
                new ButtonBuilder()
                    .setLabel('Testing-2022')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/MetalMooseFRC/Testing-2022')
            );
        return interaction.reply({ content: 'Github links:', components: [row]});
    },
};