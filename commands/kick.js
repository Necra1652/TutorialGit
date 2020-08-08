const discord = require('discord.js')
module.exports = {
    name: "Kick",
    execute(msg, args) {

    // Ignore messages that aren't from a guild
    if (!msg.guild) return;

       // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = msg.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = msg.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            msg.channel.send(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            const Fehler = new discord.MessageEmbed()
            .setTitle("Fehler!")
            .setColor(0xf55656)
            .setDescription("Ich konnte den User nicht kicken!")
            .addField("Fehler Code:", "50013")
            msg.channel.send(Fehler)
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        const Fehler = new discord.MessageEmbed()
        .setTitle("Fehler!")
        .setColor(0xf55656)
        .setDescription("Diesen User gibt es nicht!")
        msg.channel.send(Fehler)
      }
      // Otherwise, if no user was mentioned
    } else {
        const Fehler = new discord.MessageEmbed()
        .setTitle("Fehler!")
        .setColor(0xf55656)
        .setDescription("Du hast keinen User angegeben!")
        msg.channel.send(Fehler)
    }

    }
}