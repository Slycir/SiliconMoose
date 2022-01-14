const { SlashCommandBuilder } = require('@discordjs/builders');   //Command made by Otto
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ds')
		.setDescription('Driver Station Version Log'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Driver Station Version Log')
					.setStyle('LINK')
					.setURL('https://docs.google.com/spreadsheets/d/127HdKVQ3We0iVL3kmtLET2hSc79JuQFB2xk2BJmzW1E/edit?usp=sharing'),
			);
		return interaction.reply({ content: 'Sheet:', components: [row]});
	},
};
//This was made with the create command
