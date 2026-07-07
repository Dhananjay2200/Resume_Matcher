import { useState } from "react";
import UploadZone from "../components/UploadZone.jsx";
import Spinner from "../components/Spinner.jsx";
import { matchResume } from "../api/client.js";

/**
 * Home — intake screen. Collects the resume PDF and pasted job description,
 * then calls POST /api/match. On success, hands the result up to App so it
 * can switch to the Result view.
 */
export default function Home({ onResult }) {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = file && jobDesc.trim().length > 0 && !loading;

  const handleAnalyze = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    try {
      const data = await matchResume(file, jobDesc.trim());
      onResult(data);
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        "Something went wrong while analyzing. Check that the backend is running and try again.";
      setError(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-14">
      {/* Header */}
      <header className="mb-8 sm:mb-12">
        <p className="font-mono text-xs font-medium tracking-[0.2em] text-teal">
          RESUME ⋄ JD MATCHER
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          See exactly where your resume{" "}
          <span className="text-teal">lines up</span> with the job.
        </h1>
        <p className="mt-3 max-w-xl text-slate">
          Upload your resume and paste a job description. The AI reads both,
          scores the match, and tells you what to fix.
        </p>
      </header>

      {loading ? (
        <div className="rounded-xl border border-ink/10 bg-white shadow-panel">
          <Spinner label="Extracting resume, running LLM analysis…" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Step 1 — Resume */}
          <section>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono text-xs text-slate">01</span>
              <h2 className="font-display text-lg font-medium text-ink">
                Upload resume
              </h2>
            </div>
            <UploadZone file={file} onFileSelect={setFile} />
          </section>

          {/* Step 2 — Job description */}
          <section>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono text-xs text-slate">02</span>
              <h2 className="font-display text-lg font-medium text-ink">
                Paste job description
              </h2>
            </div>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the full job description here…"
              rows={8}
              className="w-full rounded-xl border-2 border-ink/20 bg-white p-4 text-sm text-ink placeholder:text-slate/60 focus:border-teal focus:outline-none"
            />
          </section>

          {error && (
            <div className="rounded-lg border border-coral/30 bg-coral-soft px-4 py-3 text-sm text-coral">
              {error}
            </div>
          )}

          {/* Step 3 — Analyze */}
          <button
            onClick={handleAnalyze}
            disabled={!canSubmit}
            className="group relative w-full overflow-hidden rounded-xl bg-ink py-4 font-display text-base font-medium text-paper transition-transform active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-ink/25 sm:w-auto sm:px-10"
          >
            Analyze match
          </button>
        </div>
      )}
    </div>
  );
}
