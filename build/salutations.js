"use strict";
exports.welcome = function (pick, member) {
    switch (pick) {
        case 0:
            return `:pirate_flag: Ahoy! :skull_crossbones: Welcome aboard, ${member}! :ocean::woman_rowing_boat:`;
        case 1:
            return `:rabbit: :rabbit2: :carrot: 🅰️ 🇭 ⬇️ 🇭 🅰️ ⬆️ 🇭 🅰️ ↘️ 🇭 🅰️ ↗️ 🇭 🅰️ ↘️ 🇭 🅰️ ↗️ Greetings, ${member}.`;
        case 2:
            return `:skull: Welcome to our lair :japanese_ogre::japanese_goblin:, ${member}!`;
        case 3:
            return `Welcome to our Discord server, ${member}. ***The brainwashing shall begin immediately!***`;
        case 4:
            return `${member}
🧙‍♀️🧙‍♂️:mage:🧙‍♀️🧙‍♂️:mage:🧙‍♀️🧙‍♂️:mage:
💣🧨💣🧨💣🧨💣🧨
> ***Darkness blacker than black and darker than dark, I beseech thee, combine with my deep crimson.***
> ***The time of awakening cometh.***
> ***Justice, fallen upon the infallible boundary, appear now as an intangible distortion!***
> ***Dance, Dance, Dance!***
> ***I desire for my torrent of power a destructive force: a destructive force without equal!***
> ***Return all creation to cinders, and come from the abyss!***
> ***Bear witness to the might of humankind!!! Behold! Ultimate magic!!***
> ***💥💥💥 EXPLOOOSION!!! 🔥🔥🔥***
🎆🎇🤯🎆🎇🤯🎆🎇🤯`;
        case 5:
            return `
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣻⣿⡿⣫⣿⣿⠟⠁⠀⣼⠁⠀⠈⣿⣿⢿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣾⢟⣩⣾⠿⠋⠁⠀⢠⣴⣧⣤⣤⣤⣿⡏⠈
⣿⣿⢿⣿⣿⡿⠟⠽⠛⠉⠀⠚⠉⠚⠋⠉⠀⠀⠀⠤⠒⠉⠀⠀⠀⠀⢀⡿⠉⠂
⣿⠏⢸⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀
⣿⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⡀⠀⠀⠀⠀
⡇⠀⣀⣤⣤⣤⣴⣶⣶⣶⣶⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣶⣶⣤⣤⣤⣀
⣩⣿⡿⠟⣿⣿⣿⣿⣿⣯⠙⠳⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣯⠙⠻⢿
⠹⣿⠀⠀⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⠀⠀⢈
⡀⠈⠂⡀⣙⢩⢿⡿⠝⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠻⣿⠃⠀⢀⡘
⣿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠉⠉⠉⠉⠁⠰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⣶⣶⠶⠟⠋⠙⢶⣤⣴⠄⠀⠀⠀⠀⠀⠀
⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼
⣮⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿
`;
        case 6:
            return `🤖🐈 _Welcome to the **future**_, ${member}! 🤖🐈
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣴⣶⣶⣶⣶⣶⠶⣶⣤⣤⣀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⠁⠀⢀⠈⢿⢀⣀⠀⠹⣿⣿⣿⣦⣄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⠿⠀⠀⣟⡇⢘⣾⣽⠀⠀⡏⠉⠙⢛⣿⣷⡖⠀
⠀⠀⠀⠀⠀⣾⣿⣿⡿⠿⠷⠶⠤⠙⠒⠀⠒⢻⣿⣿⡷⠋⠀⠴⠞⠋⠁⢙⣿⣄
⠀⠀⠀⠀⢸⣿⣿⣯⣤⣤⣤⣤⣤⡄⠀⠀⠀⠀⠉⢹⡄⠀⠀⠀⠛⠛⠋⠉⠹⡇
⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⣀⣠⣤⣤⣤⣤⣤⣤⣤⣼⣇⣀⣀⣀⣛⣛⣒⣲⢾⡷
⢀⠤⠒⠒⢼⣿⣿⠶⠞⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⣼⠃
⢮⠀⠀⠀⠀⣿⣿⣆⠀⠀⠻⣿⡿⠛⠉⠉⠁⠀⠉⠉⠛⠿⣿⣿⠟⠁⠀⣼⠃⠀
⠈⠓⠶⣶⣾⣿⣿⣿⣧⡀⠀⠈⠒⢤⣀⣀⡀⠀⠀⣀⣀⡠⠚⠁⠀⢀⡼⠃⠀⠀
⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣷⣤⣤⣤⣤⣭⣭⣭⣭⣭⣥⣤⣤⣤⣴⣟⠁
`;
        case 7:
            return `MemberException: Error finding $MEMBER
        at ClubManager.findMember(ClubManager.java:42)
        at MaidProgram.main(MaidProgram.java:42)
Caused by: java.MaidBot.NotAnException: Syntax Error
        at Club.list(Club.java:1337)
        ... 2 more
*Rebooting... Please wait*
Apologies, ${member}, welcome to the club!`;
        default:
            return `Welcome back, ${member}!`;
    }
};
exports.usersToGreet = ['',
    '',
    '',
    '',
    '',
    '',];
exports.greet = function (memberID) {
    switch (memberID) {
        case exports.usersToGreet[1]:
            return "Ooooh! If it isn't you! :heart:";
        case exports.usersToGreet[2]:
            return `All hail our saviour, <@${memberID}>!`;
        case exports.usersToGreet[3]:
            return `a :shark: 🔱 🐧 🍝`;
        case exports.usersToGreet[4]:
            return `I will run as fast as I can to wherever my customer desires. I am the *Auto Maid Doll*, Botchan. :teapot::tea::bubble_tea::coffee::mate::cup_with_straw::sake:🍽🍮 <:togKhunSip:720467911445184592>`;
        case exports.usersToGreet[5]:
            return `Have you ☝ ever wanted 🤔<:thinku:641827597298302986> to become 🐛🦋 a detective 🕵️‍♀️ just like me 🔍🧐🩺⏱ ? Well, you're in 🍀🌠🤞 luck! Starting 🕛1️⃣ today⌚🌤🏙, you☝, too✌2️⃣, can become an investigator 🕵️‍♀️ for just 💵💶💷💰💸💲$4,99 USD a month! 💹📈📉📊 🙌`;
        case exports.usersToGreet[0]:
            return "***Awaken!*** :trumpet: :drum: :muscle::statue_of_liberty:";
        default:
            return "";
    }
};
