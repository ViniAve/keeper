import React, { useState, useEffect } from "react";
import Create from "./Create";
import Note from "./Note";
import axios from "axios";

function Body() {
  const [notes, setNotes] = useState([]);
  const [updateNotes, setupdateNotes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/notes");
        setNotes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setupdateNotes(false);
  }, [updateNotes]);

  return (
    <>
      <Create createNote={(update) => update && setupdateNotes(true)} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          deleteNote={(update) => update && setupdateNotes(true)}
        />
      ))}
    </>
  );
}

export default Body;
