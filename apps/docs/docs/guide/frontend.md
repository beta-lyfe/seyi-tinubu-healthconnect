# Frontend

The frontend is the user-facing part of the Igbo Voice Assistant. It is responsible for:

-   Recording the user's voice.
-   Sending the recorded audio to the backend.
-   Receiving the audio response from the backend.
-   Playing the audio response to the user.

For the initial proof-of-concept, the frontend will be a simple web page with a record button. When the user clicks the record button, it will capture audio from their microphone. When they stop recording, it will send the audio data to the backend API. The frontend will then poll the backend for the processed audio response and play it back to the user.

## Technology Stack

The frontend will be built using the following technologies:

-   **[React](https://react.dev/):** A JavaScript library for building user interfaces.
-   **[TypeScript](https://www.typescriptlang.org/):** A typed superset of JavaScript that compiles to plain JavaScript.
-   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.
-   **[Shadcn/UI](https://ui.shadcn.com/):** A collection of re-usable components built using Radix UI and Tailwind CSS.
-   **[TanStack Store](https://tanstack.com/store/latest):** A powerful and flexible state management library.
-   **[openapi-fetch](https://openapi-ts.dev/openapi-fetch/):** A lightweight, type-safe HTTP client for OpenAPI-first APIs.
