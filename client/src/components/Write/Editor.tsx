import styled from 'styled-components';
import { useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { formats } from './EditorToolbar';
import { useRecoilState } from 'recoil';
import { contentAtom } from '../../recoil/write';
import axios, { AxiosError } from 'axios';

const Editor = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useRecoilState(contentAtom);
  // 이미지를 업로드 하기 위한 함수
  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement('input');
    const formData = new FormData();
    let url = '';

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append('img', file[0]);
        try {
          const res = await axios.post('http://localhost:8080/uploadImg', formData, {
            headers: { 'content-type': 'multipart/form-data' },
          });
          url = res.data[0];
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();
            quill?.setSelection(range, 1);
            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt="이미지 태그가 삽입됩니다." />`);
          }
        } catch (err: any) {
          console.log(err);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: { image: imageHandler },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    []
  );
  return (
    <>
      <EditorToolbar />
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        formats={formats}
        theme='snow'
        placeholder='내용을 입력해주세요.'
        style={{ height: '600px', minWidth: '430px' }}
      />
    </>
  );
};

export default Editor;
