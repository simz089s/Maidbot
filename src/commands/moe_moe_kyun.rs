// use std::thread::sleep;
// use std::time::Duration;

use serenity::builder::CreateApplicationCommand;
use serenity::model::prelude::interaction::application_command::CommandDataOption;

pub fn run(_options: &[CommandDataOption]) -> String {
    // msg.channel_id.say(ctx, "Nyan nyan,").await?;
    // sleep(Duration::from_millis(1500)).await;
    // msg.channel_id.say(ctx, "Pyon pyon,").await?;
    // sleep(Duration::from_millis(1500)).await;
    // msg.channel_id.say(ctx, "Fuwa fuwa,").await?;
    // sleep(Duration::from_millis(1500)).await;
    // msg.channel_id.say(ctx, "Moe moe...").await?;
    // sleep(Duration::from_millis(1500)).await;
    // msg.channel_id.send_message(ctx, |m| {
    //     m.embed(|e| {
    //         e.title(":heart_hands: 💖 ***...KYUN !!*** :heart_hands: 💖")
    //     })
    // }).await?;
    // sleep(Duration::from_millis(2000)).await;

    // Ok(())
}

pub fn register(command: &mut CreateApplicationCommand) -> &mut CreateApplicationCommand {
    command.name("moe moe kyun").description("shinitai...")
}
