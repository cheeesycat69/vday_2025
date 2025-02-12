import React from "react";
import { Routes, Route } from "react-router-dom";
import CrosswordPage from "./CrosswordPage"; // Your crossword page
import Chatbox from "./Chatbox"; // Your chatbox page

const App = () => {
    return (
        <>
            {/* ✅ Hidden YouTube Video for Background Music */}
            <div id="video_container" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }}>
                <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="hiddenFrame"
                    frameBorder="0"
                    height="315"
                    id="video"
                    src="https://www.youtube.com/embed/MxfbUPpwDlw?autoplay=1&loop=1&playlist=MxfbUPpwDlw"
                    title="YouTube video player"
                    width="560"
                ></iframe>
            </div>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<CrosswordPage />} />
                <Route path="/wybmv" element={<Chatbox />} />
            </Routes>
        </>
    );
};

export default App;
