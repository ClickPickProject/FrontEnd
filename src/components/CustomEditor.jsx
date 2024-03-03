import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build';

const editorConfiguration = {
  toolbar: ['bold', 'italic', 'link', '|', 'FontColor', 'imageUpload', 'blockQuote', 'mediaEmbed'],
};

export default function CustomEditor() {
  const uploadAdapter = (loader) => ({
    upload: async () => {
      try {
        const file = await loader.file;
        const formData = new FormData();
        formData.append('images', file);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_UPLOAD_ENDPOINT}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
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
        removePlugins: ['heading', 'bulletedList', 'numberedList', 'List'],
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
