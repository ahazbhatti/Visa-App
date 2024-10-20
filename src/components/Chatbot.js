import React, { useState } from 'react';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const handleSend = async () => {
        const newMessages = [...messages, { text: input, sender: 'user' }];
        setMessages(newMessages);
        
        // Make API call
        const response = await fetch(apiUrl, {
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
            width: '300px', // Adjust width as needed
            margin: '0 auto', // Center horizontally
        }}>
            <h2>Chatbot</h2>
            <div style={{ maxHeight: '300px', overflowY: 'scroll', marginBottom: '10px', width: '100%' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <strong>{msg.sender === 'user' ? 'You' : 'Chatbot'}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    style={{ flex: '1', marginRight: '10px' }}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;