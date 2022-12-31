const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { ChannelType } = require('discord.js');
const { scheduleJob } = require('node-schedule');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Schedule a message')
        .addStringOption((option) => 
            option
            .setName('message')
            .setDescription('Enter message')
            .setRequired(true)
            )
        .addIntegerOption((option) =>
            option
            .setName('time')
            .setDescription('Enter time in seconds')
            .setRequired(true)
            )
        .addChannelOption((option) =>
            option
            .setName('channel')
            .setDescription('Enter channel')
            .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
            .setRequired(true)
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const message = interaction.member.displayName + ': ' + interaction.options.getString('message');
        const time = interaction.options.getInteger('time');
        const channel = interaction.options.getChannel('channel');
        scheduleJob(new Date(Date.now() + time * 1000), () => {
            channel.send({ content: message });
        });
        return interaction.reply({ content: 'Message scheduled!', ephemeral: true });
    },
};
