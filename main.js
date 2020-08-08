require('dotenv').config()
const { MessageEmbed } = require('discord.js');
const discord          = require('discord.js')
const fs               = require('fs')
const token            = process.env.TOKEN
const prefix           = process.env.PREFIX
var client             = new discord.Client();
client.commands        = new discord.Collection();

const help = new MessageEmbed()
    .setTitle('Help Liste!')
    .setColor(0x2dc450)
    .addField("say", "Sagt was hinter dem Command steht!")
    .addField("test", "Zeigt in der Konsole von Necra : Test!!")
    .addField("help", "Zeigt dir diese Liste an!")


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Eingeloggt als ${client.user.tag}`)
})


var cmdmap = {
    say : cmd_say,
    test: cmd_test,
    help: cmd_help,
    kick: cmd_kick
}

function cmd_kick(msg, args) {
    client.commands.get('Kick').execute(msg, args)
}

function cmd_help(msg, args) {
    msg.channel.send(help);
}

function cmd_say(msg, args) {
    msg.channel.send(args.join(' '))
}

function cmd_test(msg, args) {
    console.log('Test!!')
}

client.on('message', msg => {

    var cont     = msg.content,
        author   = msg.member
        cahannel = msg.channel,
        guild    = msg.guild

    if(author.id != client.user.id && cont.startsWith(prefix)) {
        
        var invoke = cont.split(' ')[0].substr(prefix.length),
            args   = cont.split(' ').slice(1)

        if(invoke in cmdmap) {
            cmdmap[invoke](msg, args)
        }else {
            msg.channel.send(help);
        }

    }

})

client.login(token)