# Odyssey

An architecturally refined digital sanctuary and professional showcase built with **Next.js 15**, **Firebase**, and **Genkit AI**. This project serves as a high-performance, immersive guide to my journey as a Software Engineer, Technical Writer, and aspiring Polymath.

## 🚀 Architectural Highlights

- **Liz (Digital Concierge)**: A voice-aware, sophisticated AI assistant powered by **Gemini 3.1 Flash-Lite**. Liz represents my journey with architectural precision, answering inquiries about my research (MedQuery AI), education, and core philosophies.
- **Zen Mode**: A focus-engineered productivity environment featuring a "Luminance Controller" (morphing celestial slider) and a digital ecosystem that grows as you maintain deep focus.
- **Personal Library**: A reorderable, 3D rack of the volumes that shaped my thinking, categorized by **Logic**, **Growth**, and **Imagination**.
- **Real-time Technical HUD**: Live synchronization with **LeetCode** and **GitHub** APIs, showcasing competitive programming performance (Top 2%) and contribution velocity.
- **Atmospheric Environments**: A triple-mode theme engine (**Light**, **Dark**, and **Spring**) featuring haptic feedback, counter-rotating celestial toggles, and CSS View Transitions.

##  Tech Stack

- **Core**: Next.js 15 (App Router, Server Actions)
- **AI Infrastructure**: Google Genkit with Gemini 3.1 Flash-Lite
- **Backend & Persistence**: Firebase (Firestore, Authentication, App Hosting)
- **UI & Styling**: Tailwind CSS, Shadcn UI, Framer Motion
- **Visual Effects**: Three.js (Background Particles), SVG-based procedural generation
- **Type Safety**: TypeScript with strict mode enabled

##  System Architecture

```bash
├── src/
│   ├── ai/            # Genkit flows, prompts, and neural configuration
│   ├── app/           # App Router segments and Server Actions
│   ├── components/    # Atomic UI units and modular sections
│   ├── context/       # Global state management (Music, Atmosphere)
│   ├── firebase/      # Client-side SDK initialization and custom hooks
│   └── lib/           # Static data (Interviews, Milestones) and utilities
```

## 🚥 Getting Started

1.  **Configure Environment**: Populate `.env` with your `GEMINI_API_KEY` and Firebase project credentials.
2.  **Initialize Engine**:
    ```bash
    npm install
    ```
3.  **Ignition**:
    ```bash
    npm run dev
    ```

---
“It is better to live your own destiny imperfectly then to live an imitation of somebody else's life with perfection.”
