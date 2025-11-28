// src/components/PageLoader.jsx

const PageLoader = () => {
    return (
        <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
        >
        <div className="text-center">
            {/* Spinner */}
            <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            {/* Text */}
            <p className="text-muted mb-0">Memuat halaman...</p>
        </div>
        </div>
    );
};

export default PageLoader;