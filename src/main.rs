use std::collections::HashSet;

use dotenvy;
use serenity::framework::standard::macros::group;
use serenity::framework::standard::StandardFramework;
use serenity::http::Http;
use serenity::prelude::{
    Client,
    GatewayIntents,
};

mod commands;
mod handlers;
mod models;

use crate::commands::moe_moe_kyun::*;
use crate::models::handler::Handler;

#[group]
#[commands(
    moemoekyun,
)]
struct General;


#[tokio::main]
async fn main() {
    let framework = StandardFramework::new()
        .configure(|c| c.prefix("+botchan please ")) // Set the bot's prefix for non-slash commands
        .group(&GENERAL_GROUP);

    // Login with a bot token from the environment
    let mut token = String::new();
    for item in dotenvy::dotenv_iter().expect("token") {
        let (k, v) = item.expect("token");
        if k == "DISCORD_TOKEN" {
            token = v;
        }
    }
    let http = Http::new(&token);
    let (_owners, _bot_id) = match http.get_current_application_info().await {
        Ok(info) => {
            let mut owners = HashSet::new();
            owners.insert(info.owner.id);

            (owners, info.id)
        },
        Err(why) => panic!("Could not access application info: {:?}", why),
    };
    let intents = GatewayIntents::non_privileged()
                                | GatewayIntents::MESSAGE_CONTENT
                                ;
    let mut client = match
        Client::builder(&token, intents)
        .event_handler(Handler)
        .framework(framework)
        .await
    {
        Ok(client) => client,
        Err(_) => {
            println!("Error creating privileged client");
            Client::builder(&token, GatewayIntents::non_privileged())
            .event_handler(Handler)
            .await
            .expect("Error creating unprivileged client")
        }
    };

    // Start listening for events by starting a single shard
    if let Err(why) = client.start().await {
        println!("Client error: {:?}", why)
    }
}
