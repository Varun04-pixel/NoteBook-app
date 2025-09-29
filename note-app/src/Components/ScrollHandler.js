import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollHandler() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/home") {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [location.pathname]);

    return null;
}

export default ScrollHandler;