(async () => {
  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        {
          id: 'user-1',
          role: 'user',
          parts: [{ type: 'text', text: 'ROI on Downtown?' }]
        },
        {
          id: 'asst-1',
          role: 'assistant',
          parts: [
            { type: 'text', text: '' },
            {
              type: 'tool-show_property_cards',
              toolCallId: 'chatcmpl-tool-abc123',
              state: 'output-available',
              input: { query: 'Downtown' },
              output: { success: true, query: 'Downtown', properties: '- Dubai Mall Tower 2BR AED 2.5M\n- Boulevard Heights 1BR AED 1.8M' }
            }
          ]
        },
        {
          id: 'user-2',
          role: 'user',
          parts: [{ type: 'text', text: 'What is the price range for 2BR in Downtown?' }]
        }
      ]
    })
  });
  const text = await res.text();
  console.log(text.slice(0, 1000));
})();
