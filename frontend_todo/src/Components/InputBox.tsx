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
      <div className="flex items-center gap-4 mb-6">
        <NoteIcon width={50} height={50} />
        <h1 className="text-3xl sm:text-4xl font-bold text-black">Note App</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="New Note..."
          className="flex-1 border border-gray-300 rounded px-4 py-3 text-lg sm:text-xl shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={addNote}
          className="flex items-center justify-center gap-2 bg-orange-800 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition"
        >
          <AddIcon />
          <span className="text-lg sm:text-xl font-semibold">Add</span>
        </button>
      </div>
    </>
  );
};

export default InputBox;
