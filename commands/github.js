const { SlashCommandBuilder } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Important GitHub links.'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('2022Robot')
                    .setStyle('LINK')
                    .setURL('https://github.com/MetalMooseFRC/2022Robot'),
                new MessageButton()
                    .setLabel('Testing-2022')
                    .setStyle('LINK')
                    .setURL('https://github.com/MetalMooseFRC/Testing-2022')
            );
        return interaction.reply({ content: 'Github links:', components: [row]});
    },
};