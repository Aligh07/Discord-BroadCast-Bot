const {Client, SlashCommandBuilder, GatewayIntentBits} = require("discord.js")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages
  ]
})

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  console.log("By !   Xxxtentación ♔");
  

  
  const guild = client.guilds.cache.get("") /// ايدي سيرفرك
  if (!guild){
    console.error("يجب عليك وضع ايدي السيرفر")
    client.destroy()
  }
  const commands = [
    new SlashCommandBuilder()
    .setName("bc") 
    .setDescription("bc!") 

    .addStringOption(option => option
      .setName("message")
      .setDescription("الرسالة الي بترسلها للعضو")
      .setRequired(true))
  ]

 await guild.commands.set(commands)

 
})


  client.on("interactionCreate",async (interaction) => {
    if (interaction.isCommand()) {
      if (interaction.commandName === "bc"){
        try {
          const allowedRole = "" /// ايدي الرتبة الي تقدر تستعمل الأمر
          if (!allowedRole){
            console.error("يجب عليك وضع الرتبة ")
            client.destroy()
          }
        if (interaction.member.roles.cache.has(allowedRole)){
          const message = await interaction.options.getString("message")
          if (message){
            interaction.reply({ content: "تم الارسال بنجاح!", ephemeral: true })
            const members = await interaction.guild.members.fetch()
            members.forEach(member => {
              if(!member.user.bot){
                member.send(message + "\n" + `<@${member.user.id}>`)
                return
              }
            })
          }
        } else {
          interaction.reply({ content: "ليس لديك صلاحية لاستعمال الأمر!", ephemeral: true })
          return
        }
        } catch (error) {
          console.error(error)
        }
        
       
      }
    }
  })

client.login("YOUR-BOT-TOKEN") /// توكن بوتك
