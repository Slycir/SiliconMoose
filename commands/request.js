const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const twilio = require('twilio');
const config = require('./commandConfig.json')

const accountSid = config.accountSid;
const authToken = config.authToken;
const client = new twilio(accountSid, authToken);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('request')
        .setDescription('Request a feature or report a bug.')
        .addStringOption(option => option
            .setName('request')
            .setDescription('What would you like to request?')
            .setRequired(true)),
    async execute(interaction) {
        client.messages
            .create({
                body: ("From " + interaction.member.displayName + ": " + interaction.options.getString('request')),
                from: config.from,
                to: config.to
            })
            .then(message => console.log(message.sid));
        return interaction.reply({ content: 'Your request has been sent!', ephemeral: true });
    }
};