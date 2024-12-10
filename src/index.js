const {Client, IntentsBitField} = require('discord.js');
const express = require('express');
const app = express();
const env = require('dotenv').config();
const connectDB = require('./database');
const User = require('../models/User');
const Message = require('../models/messages');
const cors = require('cors');

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

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

    // if(msg.author.bot)
    // {
    //     return;
    // }

    // if(msg.content.toLowerCase() === 'hello')
    // {
    //     reply = ['Hello Pookie', 'Hello nigga', "Hello mah nigga","RESPECTFULLY SHUT THE FUCK UP NIGGA","I AM GONNA TOUCH YOU NIGGA"]
    //     msg.reply(reply[Math.floor(Math.random() * 5)]);
    // }

    // if(msg.content.toLowerCase() === 'what room is this?')
    // {
    //     msg.reply('bot sex room');
    // }

    // if(msg.content.toLowerCase() === 'aishie wants to ban you')
    //     {
    //         msg.reply('Nyaa~! Oh nooo, is Miku-chan being banned? 💔 gomenasai! If I did something wrong, I’ll do better next time, promise! Aishie-chan');
    //     }

    //     if(msg.content.toLowerCase() === 'meow')
    //         {
    //             msg.reply('Meow meow, what do you wanna do nyaa~!');
    //         }

    if(msg)
    {
           const {content, createdTimestamp} = msg;
           const {globalName, avatar} = msg.author;
           const date = new Date(createdTimestamp);

           try{

           const message = new Message({

            globalName:globalName,
            content:content,
            date:date,
            avatar:avatar,

           });

           message.save();

           }
           catch(err)
           {
            console.log(err);
           }

           console.log(content, date.toLocaleString(), globalName,avatar);
    }

    if(msg)
    {
        console.log(msg);
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

app.get('/', (req, res) => {
    
        res.send("Bot is online");
    
    }
);

app.get('/logs', async (req, res) => {

    const messages = await Message.find({}).sort({date:-1});
    res.json(messages);

});


app.listen(3001, () => {

    console.log("Bot is online");   

});