import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build';

const editorConfiguration = {
  toolbar: [
    // 'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'FontColor',
    'imageUpload',
    'blockQuote',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

export default function CustomEditor() {
  const uploadAdapter = (loader) => ({
    upload: async () => {
      try {
        const file = await loader.file;
        const body = new FormData();
        body.append('files', file);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT}`,
          body,
        );
        const data = await res.data;
        console.log(data);
        return {
          default: `${process.env.NEXT_PUBLIC_API_URL}/${data.filename}`,
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={Editor}
      config={{
        ...editorConfiguration,
        extraPlugins: [uploadPlugin],
      }}
      // data={props.initialData}
      onChange={(e, editor) => {
        const data = editor.getData();
        console.log({ e, editor, data });
      }}
    />
  );
}
