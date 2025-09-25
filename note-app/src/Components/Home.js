import { useContext } from "react";
import noteContext from "../Context/noteContext";

function Home() {
    const {text, setText} = useContext(noteContext);
    return (
        <>
            <div>{text}</div>
            <button onClick={()=>setText('clicked')}>click</button>
        </>
    )
}

export default Home;