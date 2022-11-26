use serenity::async_trait;
use serenity::model::application::command::Command;
use serenity::model::application::interaction::Interaction;
use serenity::model::event::ResumedEvent;
use serenity::model::gateway::Ready;
use serenity::prelude::{
    Context,
    EventHandler,
};

use crate::commands::*;
use crate::models::handler::Handler;

#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, ctx: Context, ready: Ready) {
        println!("Connected as {}", ready.user.name);

        let global_commands = Command::set_global_application_commands(
            &ctx.http,
            |commands| {
                commands.create_application_command(ping::register)
                        .create_application_command(poll::register)
        }).await;

        println!("Global slash commands: {:#?}", Vec::from_iter(global_commands.unwrap().iter().map(|c| &(c.name))))
    }

    async fn resume(&self, _: Context, _: ResumedEvent) {
        println!("Resumed")
    }
    
    async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
        self.interaction_create(ctx, interaction).await
    }
}
