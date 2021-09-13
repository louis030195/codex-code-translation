import React, { useEffect, useState } from "react";
import CodeEditor, { CodeEditorRef } from "./CodeEditor";
import { CodeTranslationServiceClient } from "./pb/TranslationsServiceClientPb";
import {
  TranslateCodeRequest,
  Translation,
} from "./pb/translations_pb";

const client = new CodeTranslationServiceClient(
  process.env.REACT_APP_BACKEND_URL || "http://localhost:9999",
);
// https://statisticstimes.com/tech/top-computer-languages.php
// Most popular programming languages
const languages = [
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "JavaScript",
  "TypeScript",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "PHP",
  "Ruby",
  "R",
  "Perl",
  "Scala",
  "Haskell",
]

const defaultTranslation = new Translation();
defaultTranslation.setInputCode("def foo():");
defaultTranslation.setOutputCode("public void foo() {");
defaultTranslation.setInputLanguage(languages[0]);
defaultTranslation.setOutputLanguage(languages[1]);

function App() {
  const [translation, setTranslation] = useState<Translation>(defaultTranslation);
  const [isDisabled, setIsDisabled] = useState(false);
  const codeEditorRef = React.useRef<CodeEditorRef>(null);
  useEffect(() => {
    codeEditorRef.current?.setText(translation.getInputCode());
  }, []);

  const createTranslation = async (e: any): Promise<Translation | undefined> => {
    e.preventDefault();
    setTranslation(translation.cloneMessage().setOutputCode("..."));
    const req = new TranslateCodeRequest();
    req.setTranslation(translation);

    const r = await client.translateCode(req, null);
    if (!r.hasTranslation()) throw Error("no translation");
    return r.getTranslation()!;
  };

  return (
    <div
      className="codexrs-page"
    >
      <form
        style={{ 
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          padding: "10px",
        }}
      >
        <div
         style={{ 
            display: "flex",
            justifyContent: "center",
            height: "70%",
            width: "90%",
            alignItems: "center",
            alignContent: "center",
            padding: "10px",
          }}
        >
          <div
            className="code-block"
          >
            <select
              tabIndex={-1}
              onChange={(e) => setTranslation(
                translation.cloneMessage().setInputLanguage(e.target.value)
              )}
              value={translation.getInputLanguage()}
              className="noselect language-select"
            >
              {languages.map((language, index) =>
                <option key={index} value={language}>{language}</option>
              )}
            </select>
            <CodeEditor 
              ref={codeEditorRef}
              onChange={(e) => setTranslation(
                translation.cloneMessage().setInputCode(e.target.value)
              )}
              className="code-text"
              cols={60} rows={40}
              name="input"/>
          </div>
          <div
            className="code-block"
          >
            <select
              tabIndex={-1}
              onChange={(e) => setTranslation(
                translation.cloneMessage().setOutputLanguage(e.target.value)
              )}
              value={translation.getOutputLanguage()}
              className="noselect language-select"
            >
              {languages.map((language, index) =>
                <option key={index} value={language}>{language}</option>
              )}
            </select>
            <textarea 
              tabIndex={-1}
              readOnly
              value={translation.getOutputCode()}
              className="code-text"
              cols={60} rows={40}
              name="output"/>
          </div>
        </div>
        <button 
          tabIndex={-1}
          className="code-button"
          disabled={isDisabled}
          onClick={(e) => {
            if (isDisabled) return;
            createTranslation(e).then((res) => {
              setTranslation(translation.cloneMessage().setOutputCode(res!.getOutputCode()));
            });
            setIsDisabled(true);
            setTimeout(() => {
              setIsDisabled(false);
            }, 2000);
          }}>Translate
        </button>
      </form>
      <a 
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          color: "white",
          fontStyle: "italic",
        }}
        target="_blank" rel="noopener noreferrer" 
        href="https://github.com/louis030195/codex-code-translation">made with ❤️ by louis030195</a>
    </div>
  );
}

export default App;
