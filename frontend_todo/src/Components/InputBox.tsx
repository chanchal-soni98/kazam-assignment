import React from "react";
import NoteIcon from "../assets/note-book";
import AddIcon from "../assets/add-icon";

interface InputBoxProps {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  addNote: () => void;
}

const InputBox = ({ note, setNote, addNote }: InputBoxProps) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-8">
        <div className="flex items-center justify-center">
          <NoteIcon width={55} height={55} />
        </div>
        <h1 className="w-56 h-14 left-[64rem] top-[80rem] font-inter font-bold text-5xl leading-[3.625rem] text-black">
          Note App
        </h1>
      </div>

      <div className="flex mb-4 gap-4 h-16">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="New Note..."
          className="flex-1 border-1  border-gray-300 rounded px-3 py-2 text-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:font-inter placeholder:font-normal placeholder:text-[24px] placeholder:leading-[24px]"
          style={{ boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.22)" }}
        />
        <button
          onClick={addNote}
          className="bg-[#92400E] text-white px-2 py-2 rounded-[12px] hover:bg-orange-700 transition flex items-center gap-3"
        >
          <span className="">
            <AddIcon />
          </span>
          <span className="font-inter font-bold text-[24px] leading-[24px] text-center">
            Add
          </span>
        </button>
      </div>
    </>
  );
};

export default InputBox;
