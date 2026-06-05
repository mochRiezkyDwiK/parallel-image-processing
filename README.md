# Parallel Image Processing System

## Overview

Parallel Image Processing System adalah aplikasi berbasis web yang dirancang untuk membandingkan performa pemrosesan citra menggunakan dua pendekatan:

* Sequential Processing (pemrosesan berurutan)
* Parallel Processing (pemrosesan paralel)

Aplikasi ini dibangun sebagai implementasi konsep Komputasi Paralel dengan memanfaatkan Python Multiprocessing pada backend dan React sebagai frontend.

---

## Background

Pemrosesan citra digital sering digunakan dalam berbagai bidang seperti:

* Computer Vision
* Medical Imaging
* Smart Transportation
* Artificial Intelligence
* Industrial Automation

Pada data berukuran besar, proses pengolahan citra dapat memerlukan waktu yang cukup lama.

Oleh karena itu diperlukan pendekatan komputasi paralel untuk membagi pekerjaan ke beberapa worker sehingga proses dapat berjalan secara bersamaan.

---

## Objectives

Tujuan dari project ini adalah:

* Mengimplementasikan konsep komputasi paralel pada pemrosesan citra.
* Membandingkan performa antara metode sequential dan parallel.
* Mengukur execution time, speedup, dan efficiency.
* Menampilkan hasil pengolahan citra secara visual.

---

## Features

### Image Upload

Pengguna dapat mengunggah file gambar yang akan diproses.

### Image Processing Effects

Sistem menyediakan beberapa efek:

* Grayscale
* Blur
* Edge Detection

### Sequential Processing

Gambar diproses menggunakan satu proses secara berurutan.

### Parallel Processing

Gambar dibagi menjadi beberapa bagian dan diproses menggunakan beberapa worker secara bersamaan.

### Performance Analysis

Sistem menampilkan:

* Sequential Time
* Parallel Time
* Speedup
* Efficiency
* Performance Insight

---

## Technologies Used

### Frontend

* React
* Vite
* Axios

### Backend

* Flask
* Flask CORS

### Processing

* Python Multiprocessing
* ProcessPoolExecutor
* Pillow (PIL)

---
## Dashboard 

(docs/Dashboard.png)







## System Architecture

![Architecture](docs/architecture.png)

### Architecture Explanation

Frontend React bertugas menerima input dari pengguna dan menampilkan hasil.

Backend Flask menerima request dari frontend lalu meneruskan proses ke Service Layer.

Service Layer bertugas mengatur alur bisnis aplikasi dan melakukan pengukuran performa.

Processing Layer terdiri dari:

* Sequential Processor
* Parallel Processor

Storage Layer digunakan untuk menyimpan:

* Uploaded Images
* Processed Images

---

## Flowchart

![Flowchart](docs/flowchart.png)

### Processing Flow

1. User mengunggah gambar.
2. User memilih efek pemrosesan.
3. User menentukan jumlah worker.
4. Frontend mengirim request ke Flask API.
5. Backend menjalankan Sequential Processing.
6. Backend menjalankan Parallel Processing.
7. Sistem membandingkan waktu eksekusi.
8. Hasil ditampilkan ke pengguna.

---

## Project Structure

```text
parallel-image-processing/

├── backend/
│   ├── processors/
│   │   ├── sequential_processor.py
│   │   └── parallel_processor.py
│   │
│   ├── services/
│   │   └── image_service.py
│   │
│   ├── utils/
│   │   └── file_utils.py
│   │
│   ├── uploads/
│   ├── results/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docs/
│   ├── architecture.png
│   └── flowchart.png
│
└── README.md
```

## Parallel Computing Implementation

Implementasi komputasi paralel berada pada:

```python
parallel_processor.py
```

Menggunakan:

```python
ProcessPoolExecutor
```

Tahapan:

1. Gambar dibagi menjadi beberapa chunk.
2. Setiap chunk diproses oleh worker yang berbeda.
3. Hasil dari seluruh worker digabung kembali.
4. Waktu eksekusi dibandingkan dengan metode sequential.

---

## Performance Metrics

### Execution Time

Waktu yang diperlukan untuk menyelesaikan proses.

### Speedup

Rumus:

Speedup = Sequential Time / Parallel Time

Interpretasi:

* Speedup > 1 → Parallel lebih cepat
* Speedup = 1 → Sama
* Speedup < 1 → Parallel lebih lambat

### Efficiency

Rumus:

Efficiency = Speedup / Number of Workers

Digunakan untuk mengukur efektivitas penggunaan worker.

---

## Running The Application

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan pada:

```text
http://localhost:5173
```

Backend akan berjalan pada:

```text
http://localhost:5000
```

---

## Future Improvements

* Support larger image datasets
* More advanced image filters
* Real-time performance monitoring
* GPU-based parallel processing
* Distributed computing support

---

## Author

Parallel Image Processing System

Developed for IFB206 - Komputasi Paralel

Institut Teknologi Nasional Bandung
