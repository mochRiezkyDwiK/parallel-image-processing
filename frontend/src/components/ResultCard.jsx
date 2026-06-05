function ResultCard({ result }) {
  const efficiency = (result.speedup / result.workers).toFixed(2);

  const isParallelFaster = result.speedup > 1;

  return (
    <section className="result-section">
      <div className="stats">
        <div className="stat-card">
          <h3>{result.sequential_time}s</h3>
          <p>Sequential</p>
        </div>

        <div className="stat-card">
          <h3>{result.parallel_time}s</h3>
          <p>Parallel</p>
        </div>

        <div className="stat-card">
          <h3>{result.speedup}x</h3>
          <p>Speedup</p>
        </div>

        <div className="stat-card">
          <h3>{efficiency}</h3>
          <p>Efficiency</p>
        </div>
      </div>

      <div className="analysis-card">
        <h3>Performance Analysis</h3>

        <p>
          <b>Status:</b>{" "}
          {isParallelFaster
            ? "Parallel processing lebih cepat dari sequential processing."
            : "Parallel processing masih lebih lambat dari sequential processing."}
        </p>

        <p>
          <b>Analisis:</b>{" "}
          {isParallelFaster
            ? "Pembagian proses ke beberapa worker berhasil mengurangi waktu eksekusi."
            : "Overhead multiprocessing masih lebih besar dibanding keuntungan parallel processing, terutama pada gambar kecil atau efek yang ringan."}
        </p>

        <p>
          <b>Kesimpulan:</b> Parallel processing akan lebih efektif pada data
          berukuran besar, efek pemrosesan yang lebih berat, dan jumlah worker
          yang sesuai.
        </p>
      </div>

      <div className="comparison-card">
        <h3>Execution Time Comparison</h3>

        <div className="bar-row">
          <span>Sequential</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: "100%" }}
            ></div>
          </div>
          <strong>{result.sequential_time}s</strong>
        </div>

        <div className="bar-row">
          <span>Parallel</span>
          <div className="bar-track">
            <div
              className="bar-fill parallel"
              style={{
                width: `${Math.min(
                  (result.parallel_time / result.sequential_time) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <strong>{result.parallel_time}s</strong>
        </div>
      </div>

      <div className="image-grid">
        <div className="image-card">
          <div className="image-header">
            <h3>Sequential Result</h3>
            <span>Single Process</span>
          </div>
          <img src={result.sequential_image} alt="Sequential Result" />
        </div>

        <div className="image-card">
          <div className="image-header">
            <h3>Parallel Result</h3>
            <span>Multi Worker</span>
          </div>
          <img src={result.parallel_image} alt="Parallel Result" />
        </div>
      </div>
    </section>
  );
}

export default ResultCard;