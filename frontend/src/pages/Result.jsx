import ScoreGauge from "../components/ScoreGauge.jsx";
import SkillChip from "../components/SkillChip.jsx";

/**
 * Result — the dashboard. Reads fields defensively so it renders correctly
 * against the current backend response:
 *   { match_score, matched_skills, missing_skills, suggestion }
 * and will also pick up these fields automatically if the backend is later
 * extended to send them (all optional, all conditionally rendered):
 *   { semantic_similarity, strengths, weaknesses, resume, job_description }
 */
export default function Result({ data, onReset }) {
  const {
    match_score,
    semantic_similarity,
    matched_skills = [],
    missing_skills = [],
    suggestion,
    suggestions, // tolerate either key name
    strengths,
    weaknesses,
    resume,
    job_description,
  } = data || {};

  const suggestionText = suggestion || suggestions;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-14">
      {/* Header */}
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-teal">
            ANALYSIS COMPLETE
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Your match report
          </h1>
        </div>
        <button
          onClick={onReset}
          className="shrink-0 rounded-lg border border-ink/20 px-3 py-2 font-mono text-xs text-slate transition-colors hover:border-ink/40 hover:text-ink sm:px-4"
        >
          ← New scan
        </button>
      </header>

      {/* Score gauge */}
      <section className="mb-8 flex flex-col items-center rounded-2xl border border-ink/10 bg-white py-10 shadow-panel animate-fade-up">
        <ScoreGauge score={match_score ?? 0} />
        {typeof semantic_similarity === "number" && (
          <div className="mt-6 flex items-center gap-2 rounded-full bg-paper-dim px-4 py-1.5">
            <span className="font-mono text-xs text-slate">SEMANTIC SIMILARITY</span>
            <span className="font-mono text-xs font-semibold text-ink">
              {Math.round(semantic_similarity)}%
            </span>
          </div>
        )}
      </section>

      {/* Skills */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-panel">
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-teal-deep">
            Matched skills
          </h2>
          {matched_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matched_skills.map((skill, i) => (
                <SkillChip key={i} label={skill} tone="matched" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate">No overlapping skills found.</p>
          )}
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-panel">
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-coral">
            Missing skills
          </h2>
          {missing_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missing_skills.map((skill, i) => (
                <SkillChip key={i} label={skill} tone="missing" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate">Nothing missing — full coverage.</p>
          )}
        </div>
      </section>

      {/* Strengths / Weaknesses — only shown if backend provides them */}
      {(strengths || weaknesses) && (
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {strengths && (
            <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-panel">
              <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-ink">
                Strengths
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate">
                {strengths}
              </p>
            </div>
          )}
          {weaknesses && (
            <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-panel">
              <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-ink">
                Weaknesses
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-slate">
                {weaknesses}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Suggestions */}
      {suggestionText && (
        <section className="mb-8 rounded-xl border border-ink/10 bg-ink p-6 shadow-panel">
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Suggestions to improve your resume
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-paper/90">
            {suggestionText}
          </p>
        </section>
      )}

      {/* Optional structured resume / JD summary, if backend sends it */}
      {(resume || job_description) && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resume && (
            <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-panel">
              <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-ink">
                Resume summary
              </h2>
              <dl className="space-y-2 text-sm text-slate">
                {resume.name && (
                  <div>
                    <dt className="font-medium text-ink">Name</dt>
                    <dd>{resume.name}</dd>
                  </div>
                )}
                {resume.education && (
                  <div>
                    <dt className="font-medium text-ink">Education</dt>
                    <dd>{resume.education}</dd>
                  </div>
                )}
                {resume.experience && (
                  <div>
                    <dt className="font-medium text-ink">Experience</dt>
                    <dd>{resume.experience}</dd>
                  </div>
                )}
                {resume.summary && (
                  <div>
                    <dt className="font-medium text-ink">Summary</dt>
                    <dd>{resume.summary}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
          {job_description && (
            <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-panel">
              <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-ink">
                Job description summary
              </h2>
              <dl className="space-y-2 text-sm text-slate">
                {job_description.experience && (
                  <div>
                    <dt className="font-medium text-ink">Experience required</dt>
                    <dd>{job_description.experience}</dd>
                  </div>
                )}
                {job_description.education && (
                  <div>
                    <dt className="font-medium text-ink">Education required</dt>
                    <dd>{job_description.education}</dd>
                  </div>
                )}
                {Array.isArray(job_description.responsibilities) &&
                  job_description.responsibilities.length > 0 && (
                    <div>
                      <dt className="font-medium text-ink">Responsibilities</dt>
                      <dd>
                        <ul className="list-inside list-disc">
                          {job_description.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
              </dl>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
