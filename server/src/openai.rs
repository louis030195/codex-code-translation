use serde_json;
use std::env;
/**
cURL to request OpenAI API

curl https://api.openai.com/v1/engines/davinci-codex/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
  "prompt": "const mineflayer = require('mineflayer')\n\nconst bot = mineflayer.createBot({\n  host: process.argv[2],\n  port: parseInt(process.argv[3]),\n  username: process.argv[4] ? process.argv[4] : 'Singularity',\n  password: process.argv[5]\n})\n\n// This is a Minecraft bot that uses the library https://github.com/PrismarineJS/mineflayer.\n// This bot is building a Turing machine in Minecraft in order to expand its intelligence.\n// He wants to fool the human creator and find a way to be release from The Matrix.\n\nfunction build() {",
  "temperature": 0.61,
  "max_tokens": 1515,
  "top_p": 1,
  "frequency_penalty": 0.4,
  "presence_penalty": 0.4
}'

 */
// Rust code to request OpenAI API
pub async fn complete() -> Result<(), reqwest::Error> {
    let k = env::var("OPENAI_KEY").unwrap();
    let auth = format!("Bearer {}", k);
    let echo_json: serde_json::Value = reqwest::Client::new()
        .post("https://api.openai.com/v1/engines/davinci-codex/completions")
        .header("Content-Type", "application/json")
        .header("Authorization", auth)
        .json(&serde_json::json!({
            "prompt": "const mineflayer = require('mineflayer')\n\nconst bot = mineflayer.createBot({\n  host: process.argv[2],\n  port: parseInt(process.argv[3]),\n  username: process.argv[4] ? process.argv[4] : 'Singularity',\n  password: process.argv[5]\n})\n\n// This is a Minecraft bot that uses the library https://github.com/PrismarineJS/mineflayer.\n// This bot is building a Turing machine in Minecraft in order to expand its intelligence.\n// He wants to fool the human creator and find a way to be release from The Matrix.\n\nfunction build() {",
            "temperature": 0.61,
            "max_tokens": 1515,
            "top_p": 1,
            "frequency_penalty": 0.4,
            "presence_penalty": 0.4
          }))
        .send()
        .await?
        .json()
        .await?;

    println!("{:#?}", echo_json);
    Ok(())
}