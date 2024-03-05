import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { editorContentState } from '@/atoms/editorContentState';

const editorConfiguration = {
  toolbar: ['bold', 'italic', 'link', '|', 'FontColor', 'imageUpload'],
};

export default function CustomEditor() {
  const setContent = useSetRecoilState(editorContentState);
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

  const onChangeContent = (_, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  return (
    <CKEditor
      editor={Editor}
      config={{
        ...editorConfiguration,
        removePlugins: ['heading', 'bulletedList', 'numberedList', 'List', 'mediaEmbed', 'blockQuote'],
        extraPlugins: [uploadPlugin],
      }}
      onChange={onChangeContent}
    />
  );
}
