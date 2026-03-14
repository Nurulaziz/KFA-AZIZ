import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const defaultData = [
    { id: 1, name: 'Budi Santoso', email: 'budi@example.com', role: 'Admin', status: 'Aktif' },
    { id: 2, name: 'Siti Rahayu', email: 'siti@example.com', role: 'User', status: 'Aktif' },
    { id: 3, name: 'Ahmad Fauzi', email: 'ahmad@example.com', role: 'Editor', status: 'Nonaktif' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi@example.com', role: 'User', status: 'Aktif' },
    { id: 5, name: 'Rudi Hartono', email: 'rudi@example.com', role: 'Manager', status: 'Aktif' },
];

const columns = ['id', 'name', 'email', 'role', 'status'];
const columnLabels = { id: 'ID', name: 'Nama', email: 'Email', role: 'Role', status: 'Status' };

const PdfExcel = () => {
    const [data, setData] = useState(defaultData);
    const [importError, setImportError] = useState('');
    const [importSuccess, setImportSuccess] = useState('');
    const fileRef = useRef();

    // Export to PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Laporan Data Pengguna', 14, 18);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 26);
        autoTable(doc, {
            startY: 32,
            head: [columns.map((c) => columnLabels[c])],
            body: data.map((row) => columns.map((c) => row[c])),
            headStyles: { fillColor: [52, 58, 64] },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            styles: { fontSize: 10 },
        });
        doc.save('data-pengguna.pdf');
    };

    // Export to Excel
    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            data.map((row) => ({
                ID: row.id,
                Nama: row.name,
                Email: row.email,
                Role: row.role,
                Status: row.status,
            }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data Pengguna');
        XLSX.writeFile(wb, 'data-pengguna.xlsx');
    };

    // Import from Excel
    const handleImport = (e) => {
        setImportError('');
        setImportSuccess('');
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const wb = XLSX.read(evt.target.result, { type: 'binary' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const rawData = XLSX.utils.sheet_to_json(ws);
                if (!rawData.length) {
                    setImportError('File kosong atau format tidak dikenali.');
                    return;
                }
                const imported = rawData.map((row, i) => ({
                    id: row['ID'] ?? row['id'] ?? i + 1,
                    name: row['Nama'] ?? row['name'] ?? '-',
                    email: row['Email'] ?? row['email'] ?? '-',
                    role: row['Role'] ?? row['role'] ?? '-',
                    status: row['Status'] ?? row['status'] ?? '-',
                }));
                setData(imported);
                setImportSuccess(`Berhasil mengimpor ${imported.length} data dari file Excel.`);
            } catch {
                setImportError('Gagal membaca file. Pastikan format file Excel (.xlsx) benar.');
            }
        };
        reader.readAsBinaryString(file);
        // reset input so same file can be re-imported
        e.target.value = '';
    };

    const resetData = () => {
        setData(defaultData);
        setImportError('');
        setImportSuccess('');
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="mb-1">
                        <i className="bi bi-file-earmark-richtext me-2 text-danger"></i>
                        Aplikasi PDF &amp; Excel
                    </h4>
                    <p className="text-muted mb-0 small">Export data ke PDF / Excel, atau import dari file Excel</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body">
                    <h6 className="card-title mb-3">
                        <i className="bi bi-download me-2"></i>Export &amp; Import
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                        <button className="btn btn-danger" onClick={exportPDF}>
                            <i className="bi bi-file-earmark-pdf me-2"></i>Export PDF
                        </button>
                        <button className="btn btn-success" onClick={exportExcel}>
                            <i className="bi bi-file-earmark-excel me-2"></i>Export Excel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => fileRef.current.click()}
                        >
                            <i className="bi bi-upload me-2"></i>Import Excel
                        </button>
                        <button className="btn btn-outline-secondary" onClick={resetData}>
                            <i className="bi bi-arrow-counterclockwise me-2"></i>Reset Data
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept=".xlsx,.xls"
                            className="d-none"
                            onChange={handleImport}
                        />
                    </div>

                    {importError && (
                        <div className="alert alert-danger mt-3 mb-0 py-2">
                            <i className="bi bi-exclamation-triangle me-2"></i>{importError}
                        </div>
                    )}
                    {importSuccess && (
                        <div className="alert alert-success mt-3 mb-0 py-2">
                            <i className="bi bi-check-circle me-2"></i>{importSuccess}
                        </div>
                    )}
                </div>
            </div>

            {/* Data Preview Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                    <h6 className="mb-0">
                        <i className="bi bi-table me-2"></i>Preview Data
                    </h6>
                    <span className="badge bg-secondary">{data.length} baris</span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0 align-middle">
                            <thead className="table-dark">
                                <tr>
                                    {columns.map((col) => (
                                        <th key={col}>{columnLabels[col]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length} className="text-center text-muted py-4">
                                            Tidak ada data
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((row, idx) => (
                                        <tr key={idx}>
                                            {columns.map((col) => (
                                                <td key={col}>
                                                    {col === 'status' ? (
                                                        <span
                                                            className={`badge ${
                                                                row[col] === 'Aktif'
                                                                    ? 'bg-success'
                                                                    : 'bg-secondary'
                                                            }`}
                                                        >
                                                            {row[col]}
                                                        </span>
                                                    ) : (
                                                        row[col]
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfExcel;
