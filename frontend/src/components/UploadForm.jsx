import { useState } from "react";

function UploadForm({ onSubmit, loading }) {
  const [image, setImage] = useState(null);
  const [effect, setEffect] = useState("grayscale");
  const [workers, setWorkers] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Pilih gambar terlebih dahulu");
      return;
    }

    onSubmit({ image, effect, workers });
  };

  return (
    <form className="control-panel" onSubmit={handleSubmit}>
      <h3>Control Panel</h3>

      <div className="form-group">
        <label>Upload Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div className="form-group">
        <label>Efek</label>
        <select value={effect} onChange={(e) => setEffect(e.target.value)}>
          <option value="grayscale">Grayscale</option>
          <option value="blur">Blur</option>
          <option value="edge">Edge Detection</option>
        </select>
      </div>

      <div className="form-group">
        <label>Jumlah Worker</label>
        <select value={workers} onChange={(e) => setWorkers(e.target.value)}>
          <option value="2">2 Workers</option>
          <option value="4">4 Workers</option>
          <option value="6">6 Workers</option>
          <option value="8">8 Workers</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Run Processing"}
      </button>
    </form>
  );
}

export default UploadForm;