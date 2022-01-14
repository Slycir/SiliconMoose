const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { apiKey } = require('./commandConfig.json')
const auth = `X-TBA-Auth-Key=${apiKey}`
const apiURL = 'https://www.thebluealliance.com/api/v3';
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lastmatch')
        .setDescription('Last match results.'),
    async execute(interaction) {
        await interaction.deferReply();
        var blueTeams = ''
        var redTeams = ''
        var stor
        var color = '#4154B3'
        var status = await fetch(`${apiURL}/status?${auth}`).then(response => response.json());
        var currentSeason = status.current_season
        var Matches = await fetch(`${apiURL}/team/frc1391/matches/${currentSeason}/simple?${auth}`).then(response => response.json());
        if(Matches.length == 0){
            return interaction.editReply(`No matches played in ${currentSeason}... *yet*`);
        }
        var lastMatch = Matches.reduce(function(prev, current) {
            return (prev.actual_time > current.actual_time) ? prev : current
        }).key
        console.log(lastMatch)
        var Match = await fetch(`${apiURL}/match/${lastMatch}?${auth}`).then(response => response.json());
        for(x = 0; x < Match.alliances.blue.team_keys.length; x++){
            stor = Match.alliances.blue.team_keys[x].slice(3)
            if(stor == '1391'){
                stor = `**${stor}**`
            }
            blueTeams += `${stor}\n`
        }
        for(x = 0; x < Match.alliances.red.team_keys.length; x++){
            stor = Match.alliances.red.team_keys[x].slice(3)
            if(stor == '1391'){
                stor = `**${stor}**`
                color = '#C80815'
            }
            redTeams += `${stor}\n`
        }
        const matchEmbed = new MessageEmbed()
	        .setColor(color)
	        .setTitle('1391\'s Last Match')
	        .setURL(`https://thebluealliance.com/match/${lastMatch}`)
	        .addFields(
		        { name: `Blue Alliance: ${Match.alliances.blue.score}`, value: `${blueTeams}`, inline: true },
		        { name: `Red Alliance: ${Match.alliances.red.score}`, value: `${redTeams}`, inline: true },
	        );
        if(Match.videos.length == 0) {
            return interaction.editReply({ embeds: [matchEmbed] });
        }
        interaction.channel.send(`https://youtube.com/watch?v=${Match.videos[0].key}`);
        return interaction.editReply({ embeds: [matchEmbed] });
    },
};