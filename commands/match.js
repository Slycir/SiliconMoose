const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { apiKey } = require('./commandConfig.json')
const auth = `X-TBA-Auth-Key=${apiKey}`
const apiURL = 'https://www.thebluealliance.com/api/v3';
const { MessageEmbed } = require('discord.js');

// inside a command, event listener, etc.

module.exports = {
    data: new SlashCommandBuilder()
        .setName('match')
        .setDescription('Match lookup')
        .addStringOption(option => option.setName('match-code').setDescription('Look up specific match').setRequired(true))
        .addStringOption(option => option.setName('team-number').setDescription('Highlight team in designated match (default: 1391)')),
    async execute(interaction) {
        await interaction.deferReply();
        var blueTeams = ''
        var redTeams = ''
        var stor
        var color = '#4154B3'
        var teamNumber = interaction.options.getString('team-number')
        var matchCode = interaction.options.getString('match-code')
        if(teamNumber == null) {
            teamNumber = '1391'
        }
        var Match = await fetch(`${apiURL}/match/${matchCode}?${auth}`).then(response => response.json());
        for(x = 0; x < Match.alliances.blue.team_keys.length; x++){
            stor = Match.alliances.blue.team_keys[x].slice(3)
            if(stor == teamNumber){
                stor = `**${stor}**`
            }
            blueTeams += `${stor}\n`
        }
        for(x = 0; x < Match.score_breakdown.blue.rp; x++){
            blueTeams += '<:rp:931542279527743558>'
        }
        for(x = 0; x < Match.alliances.red.team_keys.length; x++){
            stor = Match.alliances.red.team_keys[x].slice(3)
            if(stor == teamNumber){
                stor = `**${stor}**`
                color = '#C80815'
            }
            redTeams += `${stor}\n`
        }
        for(x = 0; x < Match.score_breakdown.red.rp; x++){
            redTeams += '<:rp:931542279527743558>'
        }
        const matchEmbed = new MessageEmbed()
	        .setColor(color)
	        .setTitle(`${matchCode}`)
	        .setURL(`https://thebluealliance.com/match/${matchCode}`)
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