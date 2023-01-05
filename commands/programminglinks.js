const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('programminglinks')
        .setDescription('Important programming links.'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Programming Principles')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://drive.google.com/drive/folders/1IJ830rFMH7MGcN0iyvXGcH9FLVAWVQpW?usp=sharing'),
                new ButtonBuilder()
                    .setLabel('WPILib')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html'),
                new ButtonBuilder()
                    .setLabel('Game Tools')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/frc-game-tools.html'),
                new ButtonBuilder()
                    .setLabel('PathPlanner')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/mjansen4857/pathplanner'),
                new ButtonBuilder()
                    .setLabel('GitHub')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/MetalMooseFRC')
            );
        return interaction.reply({ content: 'Programming links:', components: [row]});
    }
};