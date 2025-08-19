import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <NoteContext.Provider
      value={{ selectedNote, setSelectedNote, isAddingNote, setIsAddingNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
