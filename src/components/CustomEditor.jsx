'use client';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { editorContentState, postImagesState } from '@/atoms/editorContentState';
import { useEffect, useRef, useState } from 'react';
import { postContentState } from '@/atoms/PostState';
import { axiosInstance } from './utils/Axios';
import { toast } from 'react-toastify';

const editorConfiguration = {
  toolbar: ['bold', 'italic', 'link', '|', 'FontColor', 'imageUpload'],
};

export default function CustomEditor({ editMode }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const content = useRecoilValue(postContentState);
  const [postImages, setPostImages] = useRecoilState(postImagesState);
  const { CKEditor, Editor } = editorRef.current || {};
  useEffect(() => {
    setPostImages([]);
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      Editor: require('ckeditor5-custom-build'),
    };
    setEditorLoaded(true);
  }, []);
  const setContent = useSetRecoilState(editorContentState);
  const uploadAdapter = (loader) => ({
    upload: async () => {
      try {
        const file = await loader.file;
        const formData = new FormData();
        formData.append('image', file);

        const res = await axiosInstance.post(`/api/member/post/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        });
        const data = await res.data;
        const parts = data.url.split('/');
        const imageName = parts[parts.length - 1];
        setPostImages((prev) => [...prev, imageName]);
        return {
          default: `${data.url}`,
        };
      } catch (err) {
        toast.error('이미지 업로드 중 오류가 발생했습니다.');
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
    if (editor) {
      // editor가 null인지 확인
      const data = editor.getData();
      setContent(data);
      console.log(data);
    }
  };

  return editorLoaded ? (
    <CKEditor
      editor={Editor}
      config={{
        ...editorConfiguration,
        removePlugins: ['heading', 'bulletedList', 'numberedList', 'List', 'mediaEmbed', 'blockQuote'],
        extraPlugins: [uploadPlugin],
      }}
      onChange={onChangeContent}
      useRef={editorRef}
      data={editMode && content}
    />
  ) : (
    <div>로딩중입니다...</div>
  );
}
