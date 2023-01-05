const { SlashCommandBuilder } = require('discord.js');   //Command made by Otto
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sourcecode')
		.setDescription('Look at the source code here'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Source Code')
					.setStyle(ButtonStyle.Link)
					.setURL('https://github.com/Slycir/SiliconMoose'),
			);
		return interaction.reply({ content: 'Find the source code here:', components: [row]});
	},
};
//This was made with the create command
