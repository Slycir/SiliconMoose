const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
import { ChannelType } from 'discord-api-types';
import { scheduleJob } from 'node-schedule';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Schedule a message')
        .addStringOption((option) => 
            option
            .setName('message')
            .setDescription('Enter message')
            .setMinLength(10)
            .setMaxLength(1000)
            .setRequired(true)
            )
        .addIntegerOption((option) =>
            option
            .setName('time')
            .setDescription('Enter time in minutes')
            .setRequired(true)
            )
        .addChannelOption((option) =>
            option
            .setName('channel')
            .setDescription('Enter channel')
            .addChannelTypes()
            .setRequired(true)
            ),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        const time = interaction.options.getInteger('time');
        const channel = interaction.options.getChannel('channel');
        scheduleJob(new Date(Date.now() + time * 60000), () => {
            channel.send({ content: message });
        });
        return interaction.reply({ content: 'Message scheduled!', ephemeral: true });
    },
};
