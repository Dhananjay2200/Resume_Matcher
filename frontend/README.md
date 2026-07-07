# Resume ⋄ JD Matcher — Frontend

React (Vite) + Tailwind CSS frontend for the AI Resume-JD Matcher. Talks to
the FastAPI backend's `POST /api/match` endpoint.

## Stack

- React 18 (Vite)
- Tailwind CSS
- Axios

No router is used — the app is a single-page flow with two views (upload →
result) switched with local state, since there's nothing to deep-link.

## Project structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Switches between Home and Result views
    ├── index.css           # Tailwind directives + base styles
    ├── api/
    │   └── client.js       # Axios instance + matchResume() call
    ├── components/
    │   ├── Spinner.jsx     # Loading state while backend/LLM runs
    │   ├── ScoreGauge.jsx  # Circular match-score dial (signature visual)
    │   ├── SkillChip.jsx   # Matched (teal) / missing (coral) skill pill
    │   └── UploadZone.jsx  # Drag-and-drop / tap-to-browse PDF upload
    └── pages/
        ├── Home.jsx        # Upload resume + paste JD + Analyze button
        └── Result.jsx      # Score gauge, skills, suggestions dashboard
```

## Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Point the app at your backend (defaults to `http://localhost:8000`,
   which is what `uvicorn main:app` uses by default — you can usually skip
   this step):

   ```bash
   cp .env.example .env
   # edit .env if your backend runs elsewhere
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open the URL Vite prints (usually `http://localhost:5173`).

4. Build for production:

   ```bash
   npm run build
   npm run preview   # serve the production build locally
   ```

## Backend contract this frontend expects

`POST /api/match` — multipart form:

| Field      | Type | Description                  |
| ---------- | ---- | ----------------------------- |
| `resume`   | file | Resume PDF                    |
| `job_desc` | text | Pasted job description text   |

Response JSON (current backend shape):

```json
{
  "match_score": 72.5,
  "matched_skills": ["Python", "FastAPI"],
  "missing_skills": ["Docker", "AWS"],
  "suggestion": "..."
}
```

The Result page also renders `semantic_similarity`, `strengths`,
`weaknesses`, `resume`, and `job_description` automatically **if** the
backend response includes them — those sections are optional and simply
don't render when the fields are absent, so no frontend changes are needed
if you extend the backend later.

## Mobile & desktop

- Layout is a single centered column (`max-w-3xl`) that reflows from
  stacked cards on small screens to a two-column skills/summary grid at
  the `sm` breakpoint (≥640px).
- Tap targets (upload zone, textarea, button) are sized for touch.
- `viewport-fit=cover` + safe defaults keep things usable on notched phones.
- Reduced-motion is respected for the scan-line and score animations.
