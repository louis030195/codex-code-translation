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
    // TODO: stream!!!!
    let response: OpenAIResponse = reqwest::Client::new()
        .post("https://api.openai.com/v1/engines/davinci-codex/completions")
        .header("Content-Type", "application/json")
        .header("Authorization", auth)
        .header("OpenAI-Organization", o)
        .json(&serde_json::json!({
            "prompt": prompt.trim(),
            "temperature": 0.7,
            "max_tokens": 2000,
            "top_p": 1,
            "frequency_penalty": 0.3,
            "presence_penalty": 0.3,
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
int add(int a, int b) {
    return a + b;
}

###

Python:
def main():
    number = 3
    if number < 5:
        print(\"condition was true\")
    else:
        print(\"condition was false\")

###

Rust:
fn main() {
  let number = 3;

  if number < 5 {
      println!(\"condition was true\");
  } else {
      println!(\"condition was false\");
  }
}

C:
int main() {
    int number = 3;
    if (number < 5) {
        printf(\"condition was true\");
    } else {
        printf(\"condition was false\");
    }
}

###

Go:
func main() {
    var number int = 3
    if number < 5 {
        fmt.Println(\"condition was true\")
    } else {
        fmt.Println(\"condition was false\")
    }
}

###

Java:
public class Main {
    public static void main(String[] args) {
        int number = 3;
        if (number < 5) {
            System.out.println(\"condition was true\");
        } else {
            System.out.println(\"condition was false\");
        }
    }
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
