# Translation

The Translation component handles the conversion of text between Igbo and English at two key stages:

1.  **Igbo to English Translation:** After the Speech-to-Text (STT) component transcribes the user's Igbo audio into Igbo text, this component translates the Igbo text into English. This English text is then passed to the Large Language Model (LLM) for processing.
2.  **English to Igbo Translation:** Once the LLM generates its response in English, this component translates the English response back into Igbo. This translated Igbo text is then used by the Text-to-Speech (TTS) component to generate the audio reply.

## Process

1.  **Input (Igbo to English):** Receives Igbo text from the STT component.
2.  **Model Inference (Igbo to English):** Uses a machine translation model to convert Igbo text into English text.
3.  **Output (Igbo to English):** Provides English text to the LLM Integration component.
4.  **Input (English to Igbo):** Receives English text from the LLM Integration component.
5.  **Model Inference (English to Igbo):** Uses a machine translation model to convert English text into Igbo text.
6.  **Output (English to Igbo):** Provides Igbo text to the Text-to-Speech (TTS) component.

## Technology Considerations

-   **Model Choice:** We will explore pre-trained neural machine translation (NMT) models available on platforms like Hugging Face that support both Igbo-to-English and English-to-Igbo translation.
-   **Integration:** The Hugging Face TypeScript SDK will be the primary tool for integrating with the chosen translation models, ensuring efficient communication within the Hono.js backend.
-   **Accuracy and Fluency:** The selection of translation models will prioritize accuracy in conveying meaning and fluency in the translated output to ensure natural-sounding responses.
