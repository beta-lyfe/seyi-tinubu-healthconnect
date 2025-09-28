# Backend

The backend serves as the central processing unit for the Igbo Voice Assistant. It orchestrates the entire workflow, from receiving audio input from the frontend to delivering the final audio response. Its primary responsibilities include:

-   Receiving recorded audio data from the frontend.
-   Converting audio to text using a Speech-to-Text (STT) model.
-   Translating the transcribed text to English for LLM processing.
-   Interacting with a Large Language Model (LLM) to process user queries.
-   Translating the LLM's English response back to Igbo.
-   Converting the Igbo text response into an audio file using a Text-to-Speech (TTS) model.
-   Storing and providing access to the generated audio files.
-   Sending a link to the audio file back to the frontend.

## Overall Architecture

The backend will be designed as a modular system, allowing for easy integration and swapping of different models and services. It will expose a clear API for the frontend to interact with.

## Technology Stack

The backend will be built using the following technologies:

-   **[TypeScript](https://www.typescriptlang.org/):** A typed superset of JavaScript that compiles to plain JavaScript, providing type safety and improved developer experience.
-   **[Hono.js](https://hono.dev/):** A small, simple, and ultrafast web framework for the Edge, Node.js, and other JavaScript runtimes. It will be used to build the API endpoints for the voice assistant.
-   **AI/ML Integration:**
    -   **[Transformers.js](https://huggingface.co/docs/transformers.js/index):** This library will be used for integrating and running various Hugging Face models directly within the JavaScript environment for tasks such as Speech-to-Text, Translation, and Text-to-Speech.
