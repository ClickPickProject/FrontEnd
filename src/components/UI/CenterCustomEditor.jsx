'use client';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { editorContentState, postImagesState } from '@/atoms/editorContentState';
import { useEffect, useRef, useState } from 'react';
import { postContentState } from '@/atoms/PostState';
import { tokenState } from '@/atoms/tokenState';

const editorConfiguration = {
  toolbar: ['bold', 'italic', 'link', '|', 'FontColor'],
};

export default function CenterCustomEditor({ editMode }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const content = useRecoilValue(postContentState);
  const token = useRecoilValue(tokenState);
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
    }
  };

  return editorLoaded ? (
    <CKEditor
      editor={Editor}
      config={{
        ...editorConfiguration,
        removePlugins: [
          'heading',
          'bulletedList',
          'numberedList',
          'List',
          'mediaEmbed',
          'imageUpload',
          'blockQuote',
          '',
        ],
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
