import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import axios from "axios";

function Create(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleClick() {
    try {
      await axios.get("/api/create", {
        params: {
          title: input.title,
          content: input.content,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && <input name="title" placeholder="Title" onChange={handleChange} value={input.title} />}
        <textarea
          name="content"
          value={input.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          onChange={handleChange}
          onClick={expand}
        />
        <Zoom in={isExpanded}>
          <Fab
            onClick={() => {
              handleClick();
              props.createNote(true);
              setInput({
                title: "",
                content: "",
              });
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default Create;
