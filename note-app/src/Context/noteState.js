import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const [text, setText] = useState("This is the initial text");
    return (
        <noteContext.Provider value={{text,setText}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;