document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            window.location.href = 'pages/page1.html';
        });
    }
});