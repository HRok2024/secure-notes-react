import React, { useState } from "react";
import ReactQuill from "react-quill"; //퀄 라이브러리
import "react-quill/dist/quill.snow.css";
import { MdNoteAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Buttons from "../../utils/Buttons";
import toast from "react-hot-toast";
//노트 작성 페이지
const CreateNote = () => {
  const navigate = useNavigate(); //네비객체
  //리액트퀄의 입력내용 관리
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  //에디터의 내용이 바뀌면 그 내용을 에디터 컨텐트에 저장
  const handleChange = (content, delta, source, editor) => {
    console.log(content, delta, source, editor);
    setEditorContent(content);
  };

  //제출버튼을 누르면 에디터내용을 서버로 보내서 저장한다
  const handleSubmit = async () => {
    if (editorContent.trim().length === 0) {
      return toast.error("내용을 적어주세요!");
    }
    try {
      setLoading(true);
      const noteData = { content: editorContent };
      await api.post("/notes", noteData);
      toast.success("새노트 작성완료!"); //전체 노트페이지로 이동
      navigate("/notes");
    } catch (err) {
      toast.error("노트작성중 에러");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] p-10">
      <div className="flex items-center gap-1 pb-5">
        <h1 className="font-montserrat  text-slate-800 sm:text-4xl text-2xl font-semibold ">
          Create New Note
        </h1>
        <MdNoteAlt className="text-slate-700 text-4xl" />
      </div>

      <div className="h-72 sm:mb-20  lg:mb-14 mb-28 ">
        <ReactQuill
          className="h-full "
          value={editorContent}
          onChange={handleChange}
          modules={{
            toolbar: [
              [
                {
                  header: [1, 2, 3, 4, 5, 6],
                },
              ],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [{ align: [] }],
              [
                {
                  color: [],
                },
                { background: [] },
              ],
              ["clean"],
            ],
          }}
        />
      </div>

      <Buttons
        disabled={loading}
        onClickhandler={handleSubmit}
        className="bg-customRed  text-white px-4 py-2 hover:text-slate-300 rounded-sm"
      >
        {loading ? <span>Loading...</span> : " Create Note"}
      </Buttons>
    </div>
  );
};

export default CreateNote;
