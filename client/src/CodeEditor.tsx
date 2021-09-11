import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export interface CodeEditorProps extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
{
    spaces?: number
    onChange?: (text: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export interface CodeEditorRef {
    setText(text: string): void;
}
const CodeEditor = forwardRef((
    {spaces = 4, onChange, className, cols, rows}: CodeEditorProps,
    ref: React.ForwardedRef<CodeEditorRef>,
) => {
    const [text, setText] = useState<{
        value: any, caret: any, target: HTMLTextAreaElement | undefined
    }>({value: '', caret: -1, target: undefined});

    useEffect(() => {
        if(text.caret >= 0 && text.target){
            text.target.setSelectionRange(text.caret + spaces, text.caret + spaces);
        }
    }, [text]);

    useImperativeHandle(ref, () => ({
        setText(value: string) {
          setText({value, caret: value.length, target: text.target});
        }
      }));

    const handleTab = (e: any) => {
        let content = e.target.value;
        let caret   = e.target.selectionStart;
        if(e.key === 'Tab'){
            e.preventDefault();
            let newText = content.substring(0, caret) + ' '.repeat(spaces) + content.substring(caret);
            setText({value: newText, caret: caret, target: e.target});
        }

    }
    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setText({value: e.target.value, caret: -1, target: e.target});
    return(
        <textarea
            className={className}
            cols={cols}
            rows={rows}
            onChange  = {(e) => {
                handleText(e);
                if (onChange) onChange(e);
            }}
            onKeyDown = {handleTab}
            value     = {text.value}
        />
    );
});

export default CodeEditor;
