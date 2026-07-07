import { useRef, useState } from "react";

/**
 * UploadZone — drag-and-drop (or tap-to-browse on mobile) PDF upload,
 * styled like a document intake tray. Calls onFileSelect(file) whenever
 * a valid PDF is chosen.
 */
export default function UploadZone({ file, onFileSelect }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = (fileList) => {
    const picked = fileList?.[0];
    if (!picked) return;
    if (picked.type !== "application/pdf") {
      setError("Only PDF files are accepted.");
      return;
    }
    setError("");
    onFileSelect(picked);
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        role="button"
        tabIndex={0}
        aria-label="Upload resume PDF"
        className={`group relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors sm:min-h-[220px] ${
          isDragging
            ? "border-teal bg-teal-soft"
            : "border-ink/20 bg-white hover:border-ink/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Document tray icon */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-ink/50 group-hover:text-teal transition-colors">
          <rect x="8" y="4" width="24" height="30" rx="2" stroke="currentColor" strokeWidth="2" />
          <line x1="13" y1="12" x2="27" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="13" y1="18" x2="27" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="13" y1="24" x2="21" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {file ? (
          <div>
            <p className="font-medium text-ink">{file.name}</p>
            <p className="mt-1 font-mono text-xs text-slate">
              {(file.size / 1024).toFixed(0)} KB &middot; tap to replace
            </p>
          </div>
        ) : (
          <div>
            <p className="font-medium text-ink">Drop resume PDF here</p>
            <p className="mt-1 text-sm text-slate">or tap to browse files</p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-coral">{error}</p>}
    </div>
  );
}
