import EditorJS, { OutputData } from '@editorjs/editorjs';
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
      // tools: {
      //   image: {
      //     class: ImageTool,
      //     config: {
      //       endpoints: {
      //         byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
      //         byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      //       }
      //     }
      //   }
      // }
    });
  }, []);

  return <div id="editor" />;
};
