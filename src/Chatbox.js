import React, { useState, useEffect, useRef } from "react";
import danceGif from "./dance.gif"; // ✅ Import the GIF

const messagesData = [
    { sender: "Shreshkii", text: "WYBMV", delay: 1000 },
    { sender: "Anish", text: "Huh, what does that mean?", delay: 2000 },
    { sender: "Shreshkii", text: "Will you be my VALENTINEE?", delay: 3000 },
    { sender: "Anish", text: "Yessssszzžż", delay: 4000 },
];

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);
    const [showGif, setShowGif] = useState(false); // ✅ Control when the GIF appears
    const [showLoveMessage, setShowLoveMessage] = useState(false); // ✅ Show love message after GIF

    useEffect(() => {
        messagesData.forEach((message, index) => {
            setTimeout(() => {
                setMessages((prev) => [...prev, message]);

                if (index === messagesData.length - 1) {
                    setTimeout(() => {
                        setShowGif(true); // ✅ Show GIF after last message

                        setTimeout(() => {
                            setShowLoveMessage(true); // ✅ Show love message after GIF
                        }, 2000); // Show the message 2 seconds after the GIF appears
                    }, 1000);
                }
            }, message.delay * index);
        });
    }, []);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, showGif, showLoveMessage]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f4f4f4",
            padding: "20px"
        }}>
            {/* Chat Container */}
            <div style={{
                width: "400px",
                height: "500px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                padding: "10px"
            }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        display: "flex",
                        flexDirection: msg.sender === "Anish" ? "row-reverse" : "row",
                        alignItems: "center",
                        marginBottom: "10px"
                    }}>
                        <div style={{
                            backgroundColor: msg.sender === "Anish" ? "#007bff" : "#34c759",
                            color: "white",
                            padding: "10px",
                            borderRadius: "10px",
                            maxWidth: "60%",
                            textAlign: msg.sender === "Anish" ? "right" : "left",
                            fontSize: "16px"
                        }}>
                            <strong>{msg.sender}</strong>: {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={chatRef}></div>
            </div>

            {/* 🎉 Show GIF Below After Last Message */}
            {showGif && (
                <img src={danceGif} alt="Dancing Celebration" style={{
                    marginTop: "20px",
                    width: "300px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                }} />
            )}

            {/* ❤️ Love Message Appears After GIF */}
            {showLoveMessage && (
                <p style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#e63946",
                    marginTop: "20px",
                }}>
                    I love you shreshkiii 💖
                </p>
            )}
        </div>
    );
};

export default Chatbox;

