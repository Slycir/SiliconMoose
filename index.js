const fs = require('fs');
var childProcess = require('child_process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { token, conPre } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

runScript('./deploy-commands.js', function (err) {
    if (err) throw err;
});

client.commands = new Collection();
var commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
    sendRefresh()
    client.user.setActivity('in FRC!', { type: ActivityType.Competing })
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
        if(interaction.commandName == 'create') {
            await command.execute(interaction);
            runScript('./deploy-commands.js', function (err) {
                if (err) throw err;
            });
            commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./commands/${file}`);
                client.commands.set(command.data.name, command);
            }
        } else {
            await command.execute(interaction);
        }
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);

function sendRefresh() {
	readline.question('', name => {

		const args = name.slice(conPre.length).trim().split(' ');
		const command = args.shift().toLowerCase();
		if (name.startsWith(conPre)) {
			if (command == 'comre') {
                runScript('./deploy-commands.js', function (err) {
                    if (err) throw err;
                });
                commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    const command = require(`./commands/${file}`);
                    client.commands.set(command.data.name, command);
                }
            }
				
		}

		sendRefresh();
	  })
}