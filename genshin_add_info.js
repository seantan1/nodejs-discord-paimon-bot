const { ADDRCONFIG } = require('dns');
const { features, exitCode } = require('process');
const path = require('path');

// preparing help message for user
const HELP_MESSAGE = "too complex for paimon, type `~g ar` for help manual";

// trim method
function trimChar(string, charToRemove) {
    while(string.charAt(0)==charToRemove) {
        string = string.substring(1).trim();
    }

    while(string.charAt(string.length-1)==charToRemove) {
        string = string.substring(0,string.length-1).trim();
    }

    return string;
}

function trimChar2(string, charToRemove, charToRemove2) {
    while(string.charAt(0)==charToRemove || string.charAt(0)==charToRemove2) {
        string = string.substring(1).trim();
    }

    while(string.charAt(string.length-1)==charToRemove || string.charAt(string.length-1)==charToRemove2) {
        string = string.substring(0,string.length-1).trim();
    }

    return string;
}

module.exports = {
    name: 'genshin_add_info',
    description: "command for adding new info into genshin_info_keywords",
    execute(Discord, client, message, args) {

        // miscellaneous
        var puru_booli_emote = client.emojis.cache.find(emoji => emoji.name === "purubooli");

        var [CMD_NAME, title, body] = message.content
            .trim()
            .split("|");

        title = trimChar2(title, '\n', " ");
        // title = title.replace(/\r?\n|\r/g, " "); // replacing '\n' characters with " "
        body = trimChar2(body, '\n', " ");
        
        // body = body.replace(/\r?\n|\r/g, "\\n"); // replacing '\n' characters with " "
        console.log("title");
        console.log(title);
        console.log("body");
        console.log(body);

        // test reading csv file
        const fs = require('fs'); 
        const parse = require('csv-parse');
        var parser = parse({columns: true}, function (err, records) {
            console.log(records);
            console.log("records[0]");
            console.log(records[0]);
            console.log("records[0].keyword");
            console.log(records[0].keyword);
        });

        // execute parser function
        fs.createReadStream(path.resolve(__dirname, "user-given-data", "genshin_info_keywords.csv")).pipe(parser);

        // test writing to csv file
        // var newData = [{
        //     id: "3",
        //     keyword: "mock keyword",
        //     content: "mock content",
        //     image: "mock image link"
        // }]

        var csvWriter = require('csv-write-stream');

        var writer = csvWriter({
            sendHeaders: false,
            separator: "|",
            newline: "~"
        });
        writer.pipe(fs.createWriteStream(path.resolve(__dirname, "user-given-data", "genshin_info_keywords.csv"), {flags: 'a'}));
        writer.write({
            id: "3",
            keyword: title,
            content: body
        });
        writer.end();

        // first check if the args fields are registered one by one
        // var ar_registered = false;
        // var exp_registered = false;
        // var num_weis_registered = false;
        // var add_exp_registered = false;

        // if (typeof args[1] !== 'undefined') {
        //     ar_registered = true;
        // }
        // if (typeof args[2] !== 'undefined') {
        //     exp_registered = true;
        // }
        // if (typeof args[3] !== 'undefined') {
        //     num_weis_registered = true;
        // }
        // if (typeof args[4] !== 'undefined') {
        //     add_exp_registered = true;
        // }

        // // send help manual if no argument inputs registered
        // if (!ar_registered) {
        //     client.commands.get('genshin_ar_counter_help').execute(Discord, message);
        //     return;
        // }
        
        // // console.log("ar_registered="+ar_registered);
        // // console.log("exp_registered="+exp_registered);
        // // console.log("num_weis_registered="+num_weis_registered);

        // // fetching the values into local variables
        // typeof ar; // user's AR (adventure rank)
        // typeof exp; // user's current exp
        // typeof num_weis; // number of weis done a day
        // typeof add_exp; // additional EXP to be added daily

        // try {
        //     ar = parseInt(args[1]);
        //     exp = parseInt(args[2]);
        //     num_weis = parseInt(args[3]);
        //     add_exp = parseInt(args[4]);
        // } catch {}
        // // console.log("ar="+ar);
        // // console.log("exp="+exp);
        // // console.log("num_weis="+num_weis);

        // /* Input validity check & print help message*/
        // // if ar input is given but NaN
        // if (ar_registered && Number.isNaN(ar)) {
        //     // console.log('ar input is given but NaN');
        //     message.channel.send(`${HELP_MESSAGE} ${puru_booli_emote}`);
        //     return;
        // }
        // // if exp input is given but NaN
        // else if (exp_registered && Number.isNaN(exp)) {
        //     // console.log('exp input is given but NaN');
        //     message.channel.send(`${HELP_MESSAGE} ${puru_booli_emote}`);
        //     return;
        // }
        // // if num_wei input is given but NaN
        // else if (num_weis_registered && Number.isNaN(num_weis)) {
        //     // console.log('num_wei input is given but NaN');
        //     message.channel.send(`${HELP_MESSAGE} ${puru_booli_emote}`);
        //     return;
        // }
        // // if add_exp input is given but NaN
        // else if (add_exp_registered && Number.isNaN(add_exp)) {
        //     // console.log('add_wei input is given but NaN');
        //     message.channel.send(`${HELP_MESSAGE} ${puru_booli_emote}`);
        //     return;
        // }
        // // if ar input is over the max level available in database
        // else if (ar >= MAX_LEVEL) {
        //     // console.log('ar input is more than max AR');
        //     message.channel.send(`${AR_OVER_MESSAGE} ${puru_booli_emote}`);
        //     return;
        // }
        

        // // read in json data for AR information
        // const fs = require('fs');
        // let rawdata = fs.readFileSync(path.resolve(__dirname, "genshin-data", "ar_levels.json"));
        // let ar_levels_json = JSON.parse(rawdata);

        // // calculation logic here
        // let output_levels = new Array(NUM_LEVELS_COUNTED); // array for user output
        // let output_days = new Array(NUM_LEVELS_COUNTED); // array for user output

        // // variables for iteration
        // var curr_level = ar; // current level being iterated
        // var curr_total_exp = parseInt(ar_levels_json[curr_level-1].total); // current accumulative exp
        // var next_total_exp = parseInt(ar_levels_json[curr_level].total); // accumulative exp needed to hit next level
        // var day_counter = 0; // accumulative days
        // var pos = 0; // array position for days array
        // var wei_exp_daily = 0; // amount of exp earned daily from wei hilichurl

        // // if exp is NaN, calculate assuming exp = 0
        // if (Number.isNaN(exp)) {
        //     // console.log('exp = 0');
        //     exp = 0;
        // } 
        // // else if exp is given, calculate with current exp given
        // else {
        //     // console.log('else hit');
        //     // if the current exp given exceed the cap of the exp of the current level, it's an invalid exp and abort
        //     if (exp >= parseInt(ar_levels_json[ar-1].exp)) {
        //         // console.log('exp invalid');
        //         return;
        //     }
        //     curr_total_exp += exp;
        // }

        // // if num_weis has a valid number input, then change the wei_exp_daily amount accordingly, else leave it at 0
        // if (!Number.isNaN(num_weis)) {
        //     wei_exp_daily += num_weis * WEI_EXP;
        // }
        // else {
        //     num_weis = 0;
        // }

        // // if add_exp does not have a valid number input, make it 0
        // if (Number.isNaN(add_exp)) {
        //     add_exp = 0;
        // }

        // // make sure to stop also if ar level exceeds what is stored in database
        // while(pos != NUM_LEVELS_COUNTED && curr_level < MAX_LEVEL) {

        //     var exp_per_com = 0;
            
        //     // no commission exp if below AR 12
        //     if (curr_level < 12) {
        //         exp_per_com = 0;
        //     }
        //     else if (curr_level < 16) {
        //         exp_per_com = EXP_PER_COM_AR12to15;
        //     }
        //     else if (curr_level < 25) {
        //         exp_per_com = EXP_PER_COM_AR16to24;
        //     }
        //     else if (curr_level < 35) {
        //         exp_per_com = EXP_PER_COM_AR25to34;
        //     }
        //     else if (curr_level < 55) {
        //         exp_per_com = EXP_PER_COM_AR35to55;
        //     }

        //     var total_exp_daily = RESIN_EXP_PER_DAY + (exp_per_com * NUMBER_OF_COM_PER_DAY) + wei_exp_daily + add_exp;

        //     curr_total_exp += total_exp_daily;
        //     // console.log('adding ' + total_exp_daily);
        //     day_counter += 1;

        //     // a level up occured
        //     if (curr_total_exp >= next_total_exp) {
        //         // updating variables
        //         // add ar level & day counter into the output arrays
        //         curr_level += 1;
        //         output_levels[pos] = curr_level;
        //         output_days[pos] = day_counter;
        //         pos += 1;
                
        //         if (curr_level < MAX_LEVEL) {
        //             curr_total_exp = parseInt(ar_levels_json[curr_level-1].total);
        //             next_total_exp = parseInt(ar_levels_json[curr_level].total);
        //         }
        //     }
        // }

        // // prepare string with ar info
        // var info_string = "";
        // var i;
        // for (i = 0; i < pos; i++) {
        //     info_string += "AR " + output_levels[i] + " - " + output_days[i] + " days\n";
        // }

        // // creating embed message for discord
        // const embed = new Discord.MessageEmbed()
        // .setAuthor(message.author.username, message.author.avatarURL())
        // .setColor(0xffebfc)
        // .setFooter("Made by puru", "https://cdn.discordapp.com/attachments/779164026461618196/779228200357855242/JPEG_20200817_214526.jpg")
        // /*
        //  * Takes a Date object, defaults to current date.
        //  */
        // .setTimestamp()
        // .setURL("https://discord.js.org/#/docs/main/v12/class/MessageEmbed")
        // .addFields({
        //     name: "Days to hit the corresponding AR levels",
        //     value: "Calculating starting from AR "+ ar + " - " + exp + "/" + ar_levels_json[ar-1].exp +", " + num_weis + " weis hunted daily and additional " + add_exp + " EXP gained daily." + "\n\n" + info_string + "\nCalculations only includes EXP gained from commissions, resin and weis.\nDoes not include EXP gained from story, events and chests, thus actual progress might differ.\nAdditional info: 180 resin a day, 175/200/225/250 EXP per commission, 18 EXP per wei\n\nType `~g ar` for more info about the command!"
        // });

        // message.channel.send(embed);
        // return;
        
    }
}
