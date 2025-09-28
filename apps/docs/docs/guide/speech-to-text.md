# Speech-to-Text (STT)

The Speech-to-Text (STT) component is responsible for converting spoken Igbo audio into written Igbo text. This is a crucial first step in processing the user's voice commands.

## Process

1.  **Audio Input:** The backend receives raw audio data (e.g., WAV, MP3) from the frontend.
2.  **Model Inference:** The audio data is fed into an STT model specifically trained or fine-tuned for the Igbo language.
3.  **Text Output:** The STT model outputs the transcribed Igbo text.

## Technology Considerations

-   **Model Choice:** We will explore pre-trained models available on platforms like Hugging Face that support Igbo speech recognition. If suitable models are not readily available, fine-tuning an existing model with Igbo speech datasets will be considered.
-   **Integration:** The Hugging Face TypeScript SDK or Transformers.js will be used to interact with the chosen STT model. This allows for seamless integration within the Hono.js backend.
-   **Performance:** The choice of model and integration method will prioritize low latency to ensure a responsive user experience.
