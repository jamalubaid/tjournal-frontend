import EditorJS, { OutputData } from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import { FC, useEffect } from 'react';


interface IEditorProps {
  onChange?: (block: OutputData['blocks']) => void;
  initialBlock?: OutputData['blocks'];
}

export const Editor: FC<IEditorProps> = ({ onChange, initialBlock }) => {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',

      data: {
        blocks: initialBlock,
      },
      placeholder: 'Введите текст вашей статьи',
      async onChange() {
        const { blocks } = await editor.save();
        onChange(blocks);
      },

      /*tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:6200/posts/files', // Your backend file uploader endpoint
              byUrl: 'http://localhost:6200/posts/files',
            },
          },
        },
      },*/
    });
  }, []);

  return <div id="editor" />;
};