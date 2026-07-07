import { useState } from "react";
import Home from "./pages/Home.jsx";
import Result from "./pages/Result.jsx";

/**
 * App — simple two-view app (Home -> Result). No router is used since
 * there are only two screens and no shareable/deep-linked URLs are needed;
 * this keeps the dependency list minimal for the assignment.
 */
export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-paper bg-paper-grain">
      {result ? (
        <Result data={result} onReset={() => setResult(null)} />
      ) : (
        <Home onResult={setResult} />
      )}
    </div>
  );
}
