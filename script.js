document.getElementById('poemForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const lines = document.getElementById('lines').value;
    const topic = document.getElementById('topic').value;
    const humor = document.getElementById('humor').value;

    const prompt = `Write a ${lines}-line poem about ${topic}. Make it humor level ${humor} (0 is serious, 5 is very funny).`;
    document.getElementById('poemText').innerText = 'Generating your poem...';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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', // Your key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 20 + lines * 15, // More room for longer poems
                temperature: 0.5 + humor * 0.1 // 0.5-1.0, humor increases randomness
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const poem = data.choices[0].message.content.trim();
        document.getElementById('poemText').innerText = poem;
    } catch (error) {
        document.getElementById('poemText').innerText = 'Oops, something went wrong! Try again.';
        console.error('Error:', error);
    }
});