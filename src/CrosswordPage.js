import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Crossword from '@jaredreisinger/react-crossword';

const data = {
    across: {
        1: { clue: '... controlled ventilation', answer: 'VOLUME', row: 1, col: 11 },
        2: { clue: 'Heart beating not fast enough', answer: 'BRADYCARDIA', row: 7, col: 7 },
        3: { clue: 'The visual representation of a physiological pressure change over time', answer: 'WAVEFORM', row: 18, col: 0 },
    },
    down: {
        4: { clue: 'Someone should show this man some love.', answer: 'TVTANTRY', row: 0, col: 11 },
        5: { clue: 'Tightening of the muscles in the airways that can make it difficult to breathe', answer: 'BRONCHOSPASM', row: 7, col: 7 },
        6: { clue: 'W in PCWP', answer: 'WEDGE', row: 18, col: 0 },
    },
};

const correctCode = "WYBMV";
const correctLetters = correctCode.split("").sort().join("");

const CrosswordPage = () => {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const crosswordRef = useRef(null);
    const navigate = useNavigate();

    const handleCodeSubmit = () => {
        const enteredCode = code.toUpperCase().trim();
        const sortedEnteredCode = enteredCode.split("").sort().join("");

        if (enteredCode === correctCode) {
            navigate("/wybmv"); // ✅ Redirect to Chatbox
        } else if (sortedEnteredCode === correctLetters) {
            setMessage("You got the right letters but the wrong order.");
        } else {
            setMessage("Incorrect Code! Solve the crossword.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>Enter the code:</p>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    textAlign: "center",
                    marginBottom: "10px",
                    width: "150px",
                }}
            />
            <button
                onClick={handleCodeSubmit}
                style={{
                    marginBottom: "10px",
                    padding: "10px 15px",
                    fontSize: "16px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                }}
            >
                Submit Code
            </button>

            {message && <p style={{ fontSize: "16px", fontWeight: "bold", color: "red" }}>{message}</p>}

            <p style={{ fontSize: "16px", fontWeight: "bold" }}>Solve the crossword to get the code.</p>

            <div style={{ width: '30em', display: 'flex' }}>
                <Crossword data={data} useStorage={false} ref={crosswordRef} />
            </div>
        </div>
    );
};


export default CrosswordPage;