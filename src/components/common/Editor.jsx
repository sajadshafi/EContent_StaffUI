import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ value, onChangeContent }) => {
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    toolbarButtonSize: "small",
  };

  return (
    <>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1} // tabIndex of textarea
        //  onChange={(content) => onChangeContent(content)}
        onBlur={(content) => onChangeContent(content)}
      />
    </>
  );
};

export default Editor;
