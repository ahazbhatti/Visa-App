import React, { useState } from 'react';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const apiKey = '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'; // OpenAI API key
    const chatApiUrl = 'https://api.openai.com/v1/chat/completions'; // Chat API URL
    const dalleApiUrl = 'https://api.openai.com/v1/images/generations'; // DALL-E API URL

    const handleSend = async () => {
        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        
        if (input.toLowerCase().startsWith("draw me")) {
            // Call DALL-E API for image generation
            const prompt = input.replace("draw me", "").trim(); // Extract the prompt
            const response = await fetch(dalleApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    prompt: prompt,
                    n: 1,
                    size: '1024x1024',
                }),
            });

            const data = await response.json();
            if (data.data && data.data.length > 0) {
                const imageUrl = data.data[0].url;
                setMessages([...newMessages, { text: `Here is your image:`, sender: 'bot' }, { imageUrl: imageUrl, sender: 'bot' }]);
            } else {
                setMessages([...newMessages, { text: "Sorry, I couldn't generate the image.", sender: 'bot' }]);
            }
        } else {
            // Handle chatbot response
            const response = await fetch(chatApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: input }],
                }),
            });

            const data = await response.json();
            const botMessage = data.choices[0].message.content;

            setMessages([...newMessages, { text: botMessage, sender: 'bot' }]);
        }
        setInput('');
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            marginTop: '800px', // Increase margin to move it down
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '800px', // Increased width for better visibility
            margin: '0 auto', // Center horizontally
            color: 'white', // Set text color to white
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Optional: Add background for better contrast
        }}>
            <h2 style={{ color: 'white' }}>Chatbot</h2>
            <p style={{ textAlign: 'center', color: 'white' }}>
                Which book in the library above would you like to learn about?
            </p>
            <div style={{ maxHeight: '300px', overflowY: 'scroll', marginBottom: '10px', width: '100%' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', color: 'white' }}>
                        <strong>{msg.sender === 'user' ? 'You' : 'Chatbot'}:</strong> {msg.text}
                        {msg.imageUrl && <img src={msg.imageUrl} alt="DALL-E generated" style={{ width: '100%', height: 'auto' }} />}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    style={{ flex: '1', marginRight: '10px', color: 'white', backgroundColor: 'transparent', border: '1px solid white', borderRadius: '4px', padding: '5px' }} // Style input for better visibility
                />
                <button 
                    onClick={handleSend} 
                    style={{ color: 'white', backgroundColor: 'transparent', border: '1px solid white', borderRadius: '4px', padding: '5px 10px' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;