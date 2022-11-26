use std::time::Duration;

use serenity::framework::standard::CommandResult;
use serenity::framework::standard::macros::command;
use serenity::model::channel::Message;
use serenity::prelude::Context;
use tokio::time::sleep;

#[command]
pub async fn moemoekyun(ctx: &Context, msg: &Message) -> CommandResult {
    msg.channel_id.say(ctx, "Nyan nyan 🐈").await?;
    sleep(Duration::from_millis(1500)).await;
    msg.channel_id.say(ctx, "Pyon pyon 🐇").await?;
    sleep(Duration::from_millis(1500)).await;
    msg.channel_id.say(ctx, "Fuwa fuwa ☁").await?;
    sleep(Duration::from_millis(1500)).await;
    msg.channel_id.say(ctx, "Moe moe...").await?;
    sleep(Duration::from_millis(1500)).await;
    msg.channel_id.send_message(ctx, |m| {
        m.embed(|e| {
            e.title(":heart_hands:💨💖 ***...KYUN !!*** :heart_hands:💨💖")
        })
    }).await?;
    sleep(Duration::from_millis(2000)).await;

    Ok(())
}
