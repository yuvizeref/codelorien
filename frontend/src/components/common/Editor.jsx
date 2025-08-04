import MonacoEditor from "@monaco-editor/react";
import "../../styles/Editor.css";

const Editor = ({ code, setCode, language }) => {
  const handleEditorChange = (value) => {
    setCode((prevState) => ({
      ...prevState,
      [language]: value,
    }));
  };

  return (
    <div className="editor-container">
      <MonacoEditor
        height="400px"
        language={language}
        value={code[language]}
        onChange={handleEditorChange}
        theme="vs"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "off",
          fontSize: 14,
          fontFamily: "Fira Code, Fira Mono, monospace",
          automaticLayout: true,
          renderLineHighlight: "none",
          renderIndentGuides: false,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
        }}
      />
    </div>
  );
};

export default Editor;
