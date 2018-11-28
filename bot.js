const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Bookkeeping...");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    
    let prefix = "/";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if(cmd === `${prefix}rewards` && messageArray.length === 1){
                //await bot.delete_message(message);
                return message.channel.send({embed: {
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    color: 3447003, 
                    title: "The /rewards command",
                    description: "`/rewards Hours_Played Difficulty Party_Level DM_Level Overseer/Playtester_levels(optional)`",
                    fields: [
                    {
                    name: "Hours_Played",
                    value: "The hours played in session. Аccepts whole numbers or numbers that end in .5."
                    },
                    {
                    name: "Difficulty",
                    value: "The difficulty of the session. There are 4 possible difficulties: Easy, Normal, Deadly and TPK."
                    },
                    {
                    name: "Party_Level",
                    value: "The average level of the party. Аccepts whole numbers between 3 and 26. Characters with X boons are considered level 2X."
                    },
                    {
                    name: "DM_Level",
                    value: "The level of the DM character you want to attribute rewards to. Аccepts whole numbers between 3 and 26. Characters with X boons are considered level 2X."
                    },
                    {
                    name: "Overseer/Playtester_levels(optional)",
                    value: "The levels of the Overseer and/or Playtest characters participating in the session. Аccepts whole numbers between 3 and 26. Characters with X boons are considered level 2X."
                    },    
                    {
                    name: "Example usage",
                    value: "The DM ran a **4** hour session. The session difficulty was **Normal**. The average party level was **11**. They want to attribute the rewards to a level **3** character. Therefore, their command would look like this: \n`/rewards 4 Normal 11 3`"
                    },     
                        ],
                timestamp: new Date(),
                },
                });
    }
    
    msg = message.content.toLowerCase();
    
    if (message.author.bot) return;
    if (msg.startsWith(prefix + "rewards")) {
        let multiplier = 1;
        let dtd = 0;
        let gold = 0;
        let gpcp = 0;
        let dm_gpcp = 0;
        let overseer_gpcp = 0;
        let diff_word = "";
        let end_of_sentence = "";
        let cp = parseFloat(messageArray[1]);
        let difficulty = messageArray[2].toLowerCase();
        let avg_level = parseInt(messageArray[3]);
        let dmchar_level = parseInt(messageArray[4]);
       // await bot.delete_message(message);
        if (Number.isInteger(cp*2) === false) {
            message.delete();
            return message.channel.send("Error! Round time up to nearest half-hour.");
        }
        if (difficulty.charAt(0).toLowerCase() === 'e') {
            multiplier = 0.5;
            diff_word = "Easy";
        }
        else if (difficulty.charAt(0).toLowerCase() === 'n') {
            multiplier = 1;
            diff_word = "Normal";
        }
        else if (difficulty.charAt(0).toLowerCase() === 'd') {
            multiplier = 1.5;
            diff_word = "Deadly";
        }
        else if (difficulty.charAt(0).toLowerCase() === 't') {
            multiplier = 2;
            diff_word = "TPK";
        } 
        else {
            message.delete();
            return message.channel.send("Error! Please use one of the following difficulties: Easy, Normal, Deadly, TPK.");
        }
        dtd = multiplier*cp;
        if (avg_level >= 3 && avg_level <= 4) {
            gpcp = 100;
        }
        else if (avg_level >= 5 && avg_level <= 10) {
            gpcp = 200;
        }
        else if (avg_level >= 11 && avg_level <= 16) {
            gpcp = 300;
        }
        else if (avg_level >= 17 && avg_level <= 19) {
            gpcp = 500;
        }
        else if (avg_level >= 20 && avg_level <= 23) {
            gpcp = 750;
        }
        else if (avg_level >= 24 && avg_level <= 26) {
            gpcp = 1000;
        } else {
            message.delete();
            return message.channel.send("Error! Please input an average level between 3 and 26.");
        }
        
        if (dmchar_level >= 3 && dmchar_level <= 4) {
            dm_gpcp = 100;
        }
        else if (dmchar_level >= 5 && dmchar_level <= 10) {
            dm_gpcp = 200;
        }
        else if (dmchar_level >= 11 && dmchar_level <= 16) {
            dm_gpcp = 300;
        }
        else if (dmchar_level >= 17 && dmchar_level <= 19) {
            dm_gpcp = 500;
        }
         else if (dmchar_level >= 20 && dmchar_level <= 23) {
            dm_gpcp = 750;
        }
        else if (dmchar_level >= 24 && dmchar_level <= 26) {
            dm_gpcp = 1000;
        } else {
            message.delete();
            return message.channel.send("Error! Please input an average level between 3 and 26.")
        }
        if (messageArray.length > 4) {
            let counter = 1;
            while (counter+4 < messageArray.length) {
                overseer_level = messageArray[counter+4];
                if (overseer_level >= 3 && overseer_level <= 4) {
                    overseer_gpcp = 100;
                 }
                 else if (overseer_level >= 5 && overseer_level <= 10) {
                     overseer_gpcp = 200;
                 }
                 else if (overseer_level >= 11 && overseer_level <= 16) {
                     overseer_gpcp = 300;
                 }
                 else if (overseer_level >= 17 && overseer_level <= 19) {
                     overseer_gpcp = 500;
                 }
                 else if (overseer_level >= 20 && overseer_level <= 23) {
                     overseer_gpcp = 750;
                 }
                 else if (overseer_level >= 24 && overseer_level <= 26) {
                     overseer_gpcp = 1000;
                 } else {
                     message.delete();
                     return message.channel.send("Error! Please input an average level between 3 and 26 for the overseer/playtester #" + counter);
                 }
                end_of_sentence += "\nOverseer/Playtester#" + counter + " earns " + Math.round(2*1.5*cp)/2 + " CP, " + Math.round(2*1.5*cp)/2 + " TP, "  + Math.round(2*1.5*cp) + " DtD and " + Math.round(2*1.5*cp)/2*overseer_gpcp + " gold."
                counter++;
            }
        }
        if (end_of_sentence !== "") {
            end_of_sentence += "\n";
        }
        message.delete();
        return (message.channel.send({embed: {
            color: 3447003,
            title: cp + " hour session of " + diff_word + " difficulty with average party level of " + avg_level + " and a level " + dmchar_level + " DM character.",
            description: "The players earn " + cp + " CP, " + cp + " TP, " + 2*cp + " DtD and " + cp*gpcp*multiplier + " gold.\n" + end_of_sentence + "The DM earns " + Math.round(2*1.5*cp)/2 + " CP, " + Math.round(2*1.5*cp)/2 + " TP, "  + Math.round(2*1.5*cp) + " DtD and " + Math.round(2*1.5*cp)/2*dm_gpcp + " gold."}}));
//01-04 / 0100 per cp
//05-10 / 0200 per cp
//11-16 / 0300 per cp
//17-19 / 0500 per cp
//20-20+ / 0750 per cp
    }
});

bot.login(process.env.BOT_TOKEN);
