const {Client, IntentsBitField} = require('discord.js');
const env = require('dotenv').config();
const client = new Client({

    intents: [

        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ]

});

client.on('ready', (e) => {

    console.log(`${e.user.tag} is online!`);

});

client.on('messageCreate', (msg)=> {

    if(msg.author.bot)
    {
        return;
    }

    if(msg.content.toLowerCase() === 'hello')
    {
        reply = ['Hello Pookie', 'Hello nigga', "Hello mah nigga","RESPECTFULLY SHUT THE FUCK UP NIGGA","I AM GONNA TOUCH YOU NIGGA"]
        msg.reply(reply[Math.floor(Math.random() * 5)]);
    }

    if(msg.content.toLowerCase() === 'what room is this?')
    {
        msg.reply('bot sex room');
    }

    if(msg)
    {
        console.log(`name: ${msg.author.globalName}\nmessage: ${msg.content}`)
    }
})

client.on('interactionCreate', async (interaction) => {

    if(!interaction.isChatInputCommand()) return;
    
    if(interaction.commandName === 'hey')
    {
        interaction.reply('hey mah nigga');
    }

    if(interaction.commandName === 'members')
    {
        const guild = interaction.guild
        await guild.members.fetch()

        const members = guild.members.cache.map(members=>{
         
            if(!members.user.bot)
            {
               return `${members.user.globalName}`
            }
            return
            }
            ).filter(name=>name).join('\n');

        interaction.reply(members)


        console.log(guild.members.cache);
    }

    if(interaction.commandName === 'bots')
    {
        const guild = interaction.guild
        await guild.members.fetch()

        const members = guild.members.cache.map(members=>{
         
            if(members.user.bot)
            {
               return `${members.user.username}`
            }
            return
            }
            ).filter(name=>name).join('\n');

        interaction.reply(members)

        console.log(members);
    }
})

client.login(process.env.DICORD_TOKEN);