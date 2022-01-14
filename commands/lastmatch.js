const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { apiKey } = require('./config.json')
const auth = `X-TBA-Auth-Key=${apiKey}`
const apiURL = 'https://www.thebluealliance.com/api/v3';
const { MessageEmbed } = require('discord.js');
const { match } = require('assert');

// inside a command, event listener, etc.

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lastmatch')
        .setDescription('Last match results.'),
    async execute(interaction) {
        var blueTeams = ''
        var redTeams = ''
        var status = await fetch(`${apiURL}/status?${auth}`);
        var currentSeason = 2019 //status.current_season
        var Matches = await fetch(`${apiURL}/team/frc1391/matches/${currentSeason}/keys?${auth}`);
        if(Matches.length == 0){
            return interaction.reply('No events played... *yet*');
        }
        var lastMatch = Matches[0]
        var Match = await fetch(`${apiURL}/match/${lastMatch}/simple${auth}`);
        for(x = 0; x < Match.alliances.blue.team_keys.length; x++){
            blueTeams += `${Match.alliances.blue.team_keys[x].substring(Match.alliances.blue.team_keys[x].length - 4)}\n`
        }
        for(x = 0; x < Match.alliances.red.team_keys.length; x++){
            redTeams += `${Match.alliances.red.team_keys[x].substring(Match.alliances.red.team_keys[x].length - 4)}\n`
        }
        const matchEmbed = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('1391\'s Last Match')
	        .setURL(`https://thebluealliance.com/match/${lastMatch}`)
	        .addFields(
		        { name: '\u200B', value: '\u200B' },
		        { name: `Blue Team: ${match.alliances.blue.score}`, value: `${blueTeams}`, inline: true },
		        { name: `Red Team: ${match.alliances.red.score}`, value: `${redTeams}`, inline: true },
	        );
        return interaction.reply({ embeds: [matchEmbed] });
    },
};