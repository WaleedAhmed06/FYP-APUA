import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";

export default function EnhancedRichTextEditor({
  value,
  onChange,
  onInit,
  placeholders,
}) {
  const editorRef = useRef(null);
  const placeholderRef = useRef(placeholders);

  // keep placeholderRef up-to-date
  useEffect(() => {
    placeholderRef.current = placeholders;
  }, [placeholders]);

  return (
    <Editor
      value={value}
      apiKey="p8ofcklcmnnrv2v0pgppn35ejl747dpia65ulhbfux9jjzfu"
      onInit={(_, editor) => {
        editorRef.current = editor;
        onInit?.(editor);
      }}
      onEditorChange={(newContent) => onChange(newContent)}
      init={{
        height: 400,
        setup: (editor) => {
          editor.ui.registry.addMenuButton("insertPlaceholder", {
            text: "Insert Field",
            fetch: (callback) => {
              const items = placeholderRef.current.map((key) => ({
                type: "menuitem",
                text: `{{${key}}}`,
                onAction: () => {
                  editor.insertContent(`{{${key}}}`);
                  onChange(editor.getContent());
                },
              }));
              callback(items);
            },
          });
        },
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
        ],
        toolbar:
        "undo redo | bold italic underline strikethrough | link media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }"
      }}
    />
  );
}

EnhancedRichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onInit: PropTypes.func,
  placeholders: PropTypes.arrayOf(PropTypes.string).isRequired,
};
