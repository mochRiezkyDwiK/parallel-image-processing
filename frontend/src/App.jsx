import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultCard from "./components/ResultCard";
import { processImage } from "./api/imageApi";
import "./styles/App.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProcessImage = async ({ image, effect, workers }) => {
    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("effect", effect);
      formData.append("workers", workers);

      const data = await processImage(formData);
      setResult(data);
    } catch (error) {
      alert(error.response?.data?.error || "Gagal memproses gambar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">P</div>
          <div>
            <h2>Parallel Vision</h2>
            <p>Image Processing Lab</p>
          </div>
        </div>

        <UploadForm onSubmit={handleProcessImage} loading={loading} />

        <div className="info-box">
          <h4>Arsitektur</h4>
          <p>React Frontend</p>
          <p>Flask Backend</p>
          <p>Python Multiprocessing</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Parallel Image Processing</h1>
            <p>
              Perbandingan pemrosesan citra secara sequential dan parallel.
            </p>
          </div>
          <span className="badge">Komputasi Paralel</span>
        </header>

        {loading && (
          <div className="empty-state">
            <h2>Memproses gambar...</h2>
            <p>Sequential dan parallel processing sedang dijalankan.</p>
          </div>
        )}

        {!loading && !result && (
          <div className="empty-state">
            <h2>Belum ada hasil</h2>
            <p>Upload gambar dari panel kiri untuk memulai proses.</p>
          </div>
        )}

        {!loading && result && <ResultCard result={result} />}
      </main>
    </div>
  );
}

export default App;