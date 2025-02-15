curl -X POST https://api.openai.com/v1/realtime/sessions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-realtime-preview-2024-12-17",
    "modalities": ["audio", "text"],
    "instructions": "You are a friendly assistant."
  }'
