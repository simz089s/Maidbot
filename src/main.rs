use std::collections::HashSet;
use dotenvy;
use serenity::prelude::*;
use serenity::http::Http;

mod models;

use crate::models::handler::Handler;

mod handlers;

mod commands;

#[tokio::main]
async fn main() {
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
    let mut client = Client::builder(token, intents)
        .event_handler(Handler)
        .await
        .expect("Error creating client");

    // Start listening for events by starting a single shard
    if let Err(why) = client.start().await {
        println!("Client error: {:?}", why)
    }
}
