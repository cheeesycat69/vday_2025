import React from "react";
import { Routes, Route } from "react-router-dom";
import CrosswordPage from "./CrosswordPage"; // Your crossword page
import Chatbox from "./Chatbox"; // Your chatbox page

const App = () => {
    return (
        <>
            {/* Routes */}
            <Routes>
                <Route path="/" element={<CrosswordPage />} />
                <Route path="/wybmv" element={<Chatbox />} />
            </Routes>
        </>
    );
};

export default App;
