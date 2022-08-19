import React from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface IEditorProps {
  onChange?: (block: OutputData['blocks']) => void;
  initialBlock?: OutputData['blocks'];
}

export const Editor: React.FC<IEditorProps> = ({ onChange, initialBlock }) => {

  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      data: {
        blocks: initialBlock
      },
      placeholder: 'Введите текст вашей статьи',
      async onChange() {
        const { blocks } = await editor.save();
        onChange(blocks);
      }
    });
    

  }, []);

  return (
    <div id="editor" />
  );
};
