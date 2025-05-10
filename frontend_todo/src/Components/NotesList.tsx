interface Note {
  task: string;
  createdAt: string;
}

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-orange-700">
      {notes.map((noteObj, idx) => (
        <div
          key={idx}
          className="text-lg sm:text-xl text-black border-b border-gray-300 pb-2"
        >
          {noteObj.task}
        </div>
      ))}
    </div>
  );
};

export default NotesList;
