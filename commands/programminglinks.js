const { SlashCommandBuilder } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('programminglinks')
        .setDescription('Important programming links.'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Programming Principles')
                    .setStyle('LINK')
                    .setURL('https://drive.google.com/drive/folders/1IJ830rFMH7MGcN0iyvXGcH9FLVAWVQpW?usp=sharing'),
                new MessageButton()
                    .setLabel('WPILib')
                    .setStyle('LINK')
                    .setURL('https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html'),
                new MessageButton()
                    .setLabel('Game Tools')
                    .setStyle('LINK')
                    .setURL('https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/frc-game-tools.html'),
                new MessageButton()
                    .setLabel('PathPlanner')
                    .setStyle('LINK')
                    .setURL('https://github.com/mjansen4857/pathplanner'),
                new MessageButton()
                    .setLabel('GitHub')
                    .setStyle('LINK')
                    .setURL('https://github.com/MetalMooseFRC')
            );
        return interaction.reply({ content: 'Programming links:', components: [row]});
    }
};