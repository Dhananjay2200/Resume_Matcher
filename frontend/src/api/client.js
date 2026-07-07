import axios from "axios";

// The backend URL can be overridden at build time with a .env file:
//   VITE_API_URL=http://localhost:8000
// Falls back to localhost:8000, which is where `uvicorn main:app` runs by default.
const BASE_URL = import.meta.env.VITE_API_URL || "https://resume-matcher-backend-e87p.onrender.com";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // Local LLM inference can take a while — give it room.
});

/**
 * Sends the resume PDF + job description text to POST /api/match.
 * Matches the current backend contract exactly:
 *   - multipart field "resume": the PDF file
 *   - multipart field "job_desc": the pasted JD text
 *
 * Returns whatever JSON the backend sends back. The Result page reads
 * fields defensively so it keeps working whether the backend returns the
 * current simplified shape (match_score, matched_skills, missing_skills,
 * suggestion) or the fuller shape (semantic_similarity, strengths,
 * weaknesses, resume, job_description) if those are added later.
 */
export async function matchResume(resumeFile, jobDescription) {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("job_desc", jobDescription);

  const response = await client.post("/api/match", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

export default client;
