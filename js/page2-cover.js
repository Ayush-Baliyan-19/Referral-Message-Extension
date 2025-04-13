document.addEventListener('DOMContentLoaded', function () {
    // Load any existing data
    chrome.storage.local.get(['company', 'role'], function (result) {
        if (result.company) document.getElementById('company').value = result.company;
        if (result.role) document.getElementById('role').value = result.role;
    });

    // Back button action
    document.getElementById('backBtn').addEventListener('click', function () {
        window.location.href = 'page1.html';
    });

    // Next button action
    document.getElementById('nextBtn').addEventListener('click', function () {
        const company = document.getElementById('company').value;
        const role = document.getElementById('role').value;

        // Validate inputs
        if (!company || !role) {
            alert('Please fill in all fields');
            return;
        }

        // Save to extension storage
        chrome.storage.local.set({
            'company': company,
            'role': role
        }, function () {
            window.location.href = 'page3.html';
        });
    });
});