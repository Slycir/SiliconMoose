const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders');
var bad = fs.readFile('./badidea.txt', err => {
    if (err) {
      console.error(err)
    }
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bad')
        .setDescription('Bad idea? clock it in.'),
    async execute(interaction) {
        bad = fs.readFile('./badidea.txt', err => {
            if (err) {
              console.error(err)
            }
        });
        badCount = parseInt(bad)
        badCount++
        bad = badCount.toString()
        fs.writeFile(`./commands/badidea.txt`, bad, err => {
            if (err) {
              console.error(err)
            }
        });
        return interaction.reply(`So far, there have been ${bad} bad ideas.`);
    },
};