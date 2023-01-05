const { SlashCommandBuilder } = require('discord.js');   //Command made by Otto
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ds')
		.setDescription('Driver Station Version Log'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Driver Station Version Log')
					.setStyle(ButtonStyle.Link)
					.setURL('https://docs.google.com/spreadsheets/d/127HdKVQ3We0iVL3kmtLET2hSc79JuQFB2xk2BJmzW1E/edit?usp=sharing'),
			);
		return interaction.reply({ content: 'Sheet:', components: [row]});
	},
};
//This was made with the create command
