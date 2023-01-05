const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vendorlibraries')
        .setDescription('Vendor library links.'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('REV Robotics')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://software-metadata.revrobotics.com/REVLib-2023.json'),
                new ButtonBuilder()
                    .setLabel('CTRE')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://maven.ctr-electronics.com/release/com/ctre/phoenix/Phoenix5-frc2023-latest.json'),
                new ButtonBuilder()
                    .setLabel('navX')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://dev.studica.com/releases/2023/NavX.json'),
                new ButtonBuilder()
                    .setLabel('PathPlannerLib')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://3015rangerrobotics.github.io/pathplannerlib/PathplannerLib.json')
            );
        return interaction.reply({ content: 'Vendor library links: (right click + copy link)', components: [row]});
    }
};