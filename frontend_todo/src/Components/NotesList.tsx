interface Note {
  task: string;
  createdAt: string;
}

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <div className="max-h-120 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-orange-700 custom-scrollbar-hide">
      {notes.map((noteObj, idx) => (
        <div
          key={idx}
          className="mb-2 py-2 text-sm text-gray-700 border-b border-[#C5CAD3] text-[24px] leading-[36px] text-black font-inter font-normal border-b border-[#C5CAD3]"
        >
          {noteObj.task}
        </div>
      ))}
    </div>
  );
};

export default NotesList;
