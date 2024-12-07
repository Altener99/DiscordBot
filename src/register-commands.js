const { REST, Routes} = require('discord.js');
require('dotenv').config();

const commands = [

    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name:'members',
        description:'lists all the members in the server'
    },
    {
        name:'bots',
        description:'list all the bots in the server'
    }

];

const rest = new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {

    console.log("Registering commands");

    try{

        await rest.put(

            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.
                GUILD_ID),
                {body: commands}

        )

        console.log("Commands registered succesfully");


    } catch (error) {

        console.log(`There was an error: ${error}`);

    }

})();