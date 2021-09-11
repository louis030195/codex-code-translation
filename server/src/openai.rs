use serde_json;
use std::env;
use serde::{Deserialize, Serialize};

/*
OpenAIResponse
{
  "id": "cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7",
  "object": "text_completion",
  "created": 1589478378,
  "model": "davinci:2020-05-03",
  "choices": [
    {
      "text": " there was a girl who",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ]
}
*/
#[derive(Debug, Serialize, Deserialize)]
struct OpenAICompletionChoice {
    text: String,
    // index: i32,
    // logprobs: Option<Vec<f32>>,
    // finish_reason: String,
}
#[derive(Debug, Serialize, Deserialize)]
struct OpenAIResponse {
    // id: Option<i32>,
    // object: String,
    // created: Option<i32>,
    // model: String,
    choices: Vec<OpenAICompletionChoice>,
}

// Rust code to request OpenAI API
pub async fn complete(prompt: String) -> Result<String, reqwest::Error> {
    let k = env::var("OPENAI_KEY").unwrap();
    let o = env::var("OPENAI_ORG").unwrap();
    let auth = format!("Bearer {}", k);
    let response: OpenAIResponse = reqwest::Client::new()
        .post("https://api.openai.com/v1/engines/davinci-codex/completions")
        .header("Content-Type", "application/json")
        .header("Authorization", auth)
        .header("OpenAI-Organization", o)
        .json(&serde_json::json!({
            "prompt": prompt.trim(),
            "temperature": 0.61,
            "max_tokens": 1515,
            "top_p": 1,
            "frequency_penalty": 0.4,
            "presence_penalty": 0.4,
            "stop": ["###", "\n###\n", "\"\"\""]
          }))
        .send()
        .await?
        .json()
        .await?;

    let out = &response.choices[0];
    Ok(out.text.clone())
}

// TODO: this prompt is obviously biases towards function
//  it should be wiser to take a small piece of every programming concepts
//  and pair translations between languages (functions, variables, etc)
const CONTEXT: &str = "Python:
def add(a, b):
    return a + b

###

JavaScript:
const add = (a, b) => a + b;

###

Rust:
fn add(a: u32, b: u32) -> u32 {
    a + b
}

###

Go:
func add(a, b int) int {
   return a + b
}

###

C:
int max(int num1, int num2) {

   /* local variable declaration */
   int result;
 
   if (num1 > num2)
      result = num1;
   else
      result = num2;
 
   return result; 
}

###

";

/**
 * This is a function that turn an input code, input language, output language
 * into the adequate prompt to be given to be translated later by OpenAI Codex
 */
pub fn build_prompt(
  input_code: String,
  input_language: String,
  output_language: String,
) -> String {
    let mut prompt = CONTEXT.to_owned();

    prompt.push_str(
      format!(
        "{}:\n{}\n\n###\n\n{}:\n",
        input_language,
        input_code,
        output_language
      ).as_str(),
    );

    prompt
}
