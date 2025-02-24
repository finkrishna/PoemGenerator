document.getElementById('poemForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("Form submitted!"); // Check 1: Does this show up? 

    // Get user inputs
    const lines = document.getElementById('lines').value;
    const topic = document.getElementById('topic').value;
    const humor = document.getElementById('humor').value;
    console.log("Inputs:", lines, topic, humor); // Check 2: Are the inputs captured?

    // Create the prompt for the LLM
    const prompt = `Write a ${lines}-line poem about ${topic}. Make it humor level ${humor} (0 is serious, 5 is very funny).`;
    console.log("Prompt created:", prompt); // Check 3: Is the prompt correct?

    // Display a loading message
    document.getElementById('poemText').innerText = 'Generating your poem...';
    console.log("Loading message set"); // Check 4: Does the text update?

    try {
        console.log("Sending API request..."); // Check 5: Does it reach here?
        // Call the Hugging Face API
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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', // Ensure this is your actual key
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: { max_length: 100, temperature: 0.9 }
            })
        });

        console.log("API response received:", response); // Check 6: Did the API respond?
        const data = await response.json();
        console.log("API data:", data); // Check 7: What did the API return?

        let poem = data[0]?.generated_text || "Sorry, I couldn't generate a poem this time!";
        poem = poem.replace(prompt, '').trim(); // Remove the prompt from the output
        poem = poem.split('.').join('.\n'); // Add line breaks after sentences

        // Display the poem
        document.getElementById('poemText').innerText = poem;
        console.log("Poem displayed"); // Check 8: Did it display?
    } catch (error) {
        document.getElementById('poemText').innerText = 'Oops, something went wrong! Try again.';
        console.error("Error:", error); // Check 9: Did it catch an error?
    }
});
