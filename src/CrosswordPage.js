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
    const [code, setCode] = useState(["", "", "", "", ""]); // ✅ Store 5 letters
    const [message, setMessage] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const crosswordRef = useRef(null);
    const navigate = useNavigate();
    const inputRefs = useRef([]); // ✅ Store references to input boxes

    const handleInputChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value.toUpperCase(); // ✅ Convert to uppercase
        setCode(newCode);

        // ✅ Move to next box if letter is entered
        if (value && index < 4) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus(); // ✅ Move to previous box on backspace
        }
    };

    const handleCodeSubmit = () => {
        const enteredCode = code.join("").trim();
        const sortedEnteredCode = enteredCode.split("").sort().join("");

        if (enteredCode === correctCode) {
            navigate("/wybmv"); // ✅ Redirect to Chatbox
        } else if (sortedEnteredCode === correctLetters) {
            setMessage("You got the right letters but the wrong order.");
        } else {
            if(isCorrect) {
                setMessage("Look for the letters in intersection!!");
            } else {
                setMessage("Incorrect Code! Solve the crossword.");
            }
        }
    };

    // ✅ Check if the crossword is correct
    const checkCrosswordAnswer = () => {
        if (crosswordRef.current?.isCrosswordCorrect()) {
            setIsCorrect(true);
            setMessage("✅ Crossword is correct! Well done.");
        } else {
            setIsCorrect(false);
            setMessage("❌ Some answers are incorrect. Keep trying!");
        }
    };

    return (
        <div style={{textAlign: "center", padding: "20px"}}>
            <p style={{fontSize: "18px", fontWeight: "bold"}}>Enter the code:</p>

            {/* ✅ 5 Separate Input Boxes */}
            <div style={{display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px"}}>
                {code.map((letter, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)} // ✅ Store ref
                        type="text"
                        value={letter}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        style={{
                            width: "40px",
                            height: "40px",
                            fontSize: "18px",
                            textAlign: "center",
                            textTransform: "uppercase",
                            border: "2px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                ))}
            </div>

            {/* ✅ Submit Button */}
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
                }}
            >
                Submit Code
            </button>

            {message &&
                <p style={{fontSize: "16px", fontWeight: "bold", color: isCorrect ? "green" : "red"}}>{message}</p>}

            <p style={{fontSize: "16px", fontWeight: "bold"}}>Solve the crossword to get the code.</p>

            {/* ✅ Make the background green when crossword is correct */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "20px",
                backgroundColor: isCorrect ? "#c3f3c3" : "transparent"
            }}>
                <Crossword data={data} useStorage={false} ref={crosswordRef}/>
            </div>

            {/* ✅ "Check Crossword" Button */}
            <button
                onClick={checkCrosswordAnswer}
                style={{
                    marginTop: "10px",
                    padding: "10px 15px",
                    fontSize: "16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    fontWeight: "bold",
                }}
            >
                Check Crossword
            </button>
        </div>
    );
};

export default CrosswordPage;
