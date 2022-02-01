const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var bad = fs.readFile('./commands/badidea.json', err => {
    if (err) {
      console.error(err)
    }
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bad')
        .setDescription('Bad idea? clock it in.')
        .addSubcommand(subcommand => 
          subcommand
            .setName('ideas')
            .setDescription('List the ideas')
            .addIntegerOption(option => option.setName('page').setDescription('Page number'))
        )
        .addSubcommand(subcommand => 
          subcommand
            .setName('add')
            .setDescription('Whoops')
            .addStringOption(option => option.setName('what-happened').setDescription('*sigh*'))
        ),
    async execute(interaction) {
      bad = fs.readFileSync('./commands/badidea.json', err => {
          if (err) {
            console.error(err)
          }
      });
      bad = JSON.parse(bad)
      if(interaction.options.getSubcommand() == 'ideas'){
        contents = ''
        page = interaction.options.getInteger('page') - 1
        if(page < 0 || page == null){
          page = 0
        }
        pageMax = parseInt(bad.reasons.length / 10)
        if(page > pageMax){
          page = pageMax
        }
        for(x=0;x<10;x++){
          place = x + ((page)*10)
          if (place > bad.reasons.length - 1){
            break
          }
          contents += `${place + 1}: ${bad.reasons[place]}\n`
        }
        const badIdeas = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Bad Ideas')
	        .addFields(
		        { name: 'Reasons', value: contents })
	        .setFooter({ text: `Page ${page + 1} of ${pageMax + 1}` });
        interaction.reply({ embeds: [badIdeas]})
      } else {
        badCount = bad.count
        badCount++
        bad.count = badCount
        reason = interaction.options.getString('what-happened');
        if(reason != null) {
          bad.reasons.push(reason)
        }
        bad = JSON.stringify(bad)
        fs.writeFile(`./commands/badidea.json`, bad, err => {
            if (err) {
              console.error(err)
            }
        });
        return interaction.reply(`So far, there have been ${badCount} bad ideas.`);
      }
    },
};