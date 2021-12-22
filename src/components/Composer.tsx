import React, { useState, useMemo, useCallback } from "react";
import { createEditor, Node } from "slate";
// See docs and examples at https://docs.slatejs.org
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  RenderElementProps,
} from "slate-react";
import TextStatistics from "./TextStatistics";
import "./Composer.css";

const Element = ({ attributes, children }: RenderElementProps) => {
  return <p {...attributes}>{children}</p>;
};

const Composer = () => {
  const [value, setValue] = useState<Node[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const onChange = useCallback((value) => setValue(value), []);
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);
  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <div className="composer">
        <Editable
          renderElement={renderElement}
          className="editable"
          placeholder="Enter some plain text..."
        />
        <TextStatistics />
      </div>
    </Slate>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable plain text, just like a <textarea>!" },
    ],
  },
];

export default Composer;
