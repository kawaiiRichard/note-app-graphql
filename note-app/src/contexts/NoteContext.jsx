import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [totalNotes, setTotalNotes] = useState(0);

  return (
    <NoteContext.Provider
      value={{
        totalNotes,
        setTotalNotes,
        selectedNote,
        setSelectedNote,
        isAddingNote,
        setIsAddingNote,
        isEditingNote,
        setIsEditingNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
