import axios from "axios";

function Note(props) {
  async function deleteNote(id) {
    try {
      await axios.get("/api/delete/", {
        params: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => {
        deleteNote(props.id);
        props.deleteNote(true);
      }}>DELETE</button>
    </div>
  );
}

export default Note;
