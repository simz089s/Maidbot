pub fn welcome(pick: i32, member: &str) -> String {
    match pick {
        0 => "🏴‍☠️ Ahoy! ☠ Welcome aboard, ${member}! 🌊🚣‍♀️",
        1 => "🐰 🐇 🥕 🅰️ 🇭 ⬇️ 🇭 🅰️ ⬆️ 🇭 🅰️ ↘️ 🇭 🅰️ ↗️ 🇭 🅰️ ↘️ 🇭 🅰️ ↗️ Greetings, ${member}.",
        2 => "💀 Welcome to our lair 👹👺, ${member}!",
        3 => "Welcome to our Discord server, ${member}. ***The brainwashing shall begin immediately!***",
        4 => "${member},
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
🎆🎇🤯🎆🎇🤯🎆🎇🤯",
        5 => "
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
",
        6 => "🤖🐈 _Welcome to the **future**_, ${member}! 🤖🐈
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
",
        7 => "MemberException: Error finding $MEMBER
        at ClubManager.findMember(ClubManager.java:42)
        at MaidProgram.main(MaidProgram.java:42)
Caused by: java.MaidBot.NotAnException: Syntax Error
        at Club.list(Club.java:1337)
        ... 2 more
*Rebooting... Please wait*
Apologies, ${member}, welcome to the club!",
        8 => "Welcome, ${member}. Here is an important survey in order to determine the quality of your membership:
    1. Are cereals a salad or a soup?
    2. What are your opinions on pies?
    3. Tomatoes or tomatoes?
    4. ...and are they fruits or vegetables?
    5. Why are we here? Just to suffer?
Thank you for your patience.",
        _ => "Welcome back, ${member}!",
    }.replace("${member}", member)
}

pub const MAX_GREETS: usize = 9;

pub const usersToGreet: [&str; 6] = [
    "",
    "",
    "",
    "",
    "",
    "",
];

pub fn greet(member_id: &str) -> &str {
    match member_id {
        _ if member_id == usersToGreet[1] => "Ooooh! If it isn't you! ❤",
        _ if member_id == usersToGreet[2] => "All hail our saviour, <@${memberID}>!",
        _ if member_id == usersToGreet[3] => "a 🦈 🔱 🐧 🍝",
        _ if member_id == usersToGreet[4] => "I will run as fast as I can to wherever my customer desires. I am the *Auto Maid Doll*, Botchan. :teapot:🍵:bubble_tea:☕🧉🥤🍶🍽🍮 <:togKhunSip:720467911445184592>",
        _ if member_id == usersToGreet[5] => "Have you ☝ ever wanted 🤔<:thinku:641827597298302986> to become 🐛🦋 a detective 🕵️‍♀️ just like me 🔍🧐🩺⏱ ? Well, you're in 🍀🌠🤞 luck! Starting 🕛1️⃣ today⌚🌤🏙, you☝, too✌2️⃣, can become an investigator 🕵️‍♀️ for just 💵💶💷💰💸💲$4,99 USD a month! 💹📈📉📊 🙌",
        
        _ if member_id == usersToGreet[0] => "***Awaken!*** 🎺 🥁 💪🗽",

        _ => "",
    }
}
