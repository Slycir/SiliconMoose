const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { apiKey } = require('./commandConfig.json')
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
        await interaction.deferReply();
        var blueTeams = ''
        var redTeams = ''
        var status = await fetch(`${apiURL}/status?${auth}`).then(response => response.json());
        var currentSeason = status.current_season
        var Matches = await fetch(`${apiURL}/team/frc1391/matches/${currentSeason}/keys?${auth}`).then(response => response.json());
        if(Matches.length == 0){
            return interaction.editReply(`No matches played in ${currentSeason}... *yet*`);
        }
        var lastMatch = Matches[0]
        console.log(lastMatch)
        var Match = await fetch(`${apiURL}/match/${lastMatch}?${auth}`).then(response => response.json());
        for(x = 0; x < Match.alliances.blue.team_keys.length; x++){
            blueTeams += `${Match.alliances.blue.team_keys[x].slice(3)}\n`
        }
        for(x = 0; x < Match.alliances.red.team_keys.length; x++){
            redTeams += `${Match.alliances.red.team_keys[x].slice(3)}\n`
        }
        const matchEmbed = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('1391\'s Last Match')
	        .setURL(`https://thebluealliance.com/match/${lastMatch}`)
	        .addFields(
		        { name: `Blue Team: ${Match.alliances.blue.score}`, value: `${blueTeams}`, inline: true },
		        { name: `Red Team: ${Match.alliances.red.score}`, value: `${redTeams}`, inline: true },
	        );
        if(Match.videos.length == 0) {
            return interaction.editReply({ embeds: [matchEmbed] });
        }
        interaction.channel.send(`https://youtube.com/watch?v=${Match.videos[0].key}`);
        return interaction.editReply({ embeds: [matchEmbed] });
    },
};