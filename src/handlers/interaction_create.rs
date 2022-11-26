use serenity::model::application::interaction::{
    Interaction,
    InteractionResponseType,
};
use serenity::prelude::Context;

use crate::models::handler::Handler;
use crate::commands::*;

impl Handler {
    pub async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
        if let Interaction::ApplicationCommand(command) = interaction {
            println!("Received command interaction: {:?}", command);
    
            let content = match command.data.name.as_str() {
                "ping" => ping::run(&command.data.options),
                "poll" => poll::run(&command.data.options),
                
                _ => "not implemented :C".to_string(),
            };

            if let Err(why) = command
                .create_interaction_response(&ctx.http, |response| {
                    response
                        .kind(InteractionResponseType::ChannelMessageWithSource)
                        .interaction_response_data(|message| message.content(content))
                })
                .await
            {
                println!("Cannot respond to slash command: {}", why)
            }
        }
    }
}
