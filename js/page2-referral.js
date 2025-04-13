document.addEventListener('DOMContentLoaded', function () {
    // Show "Other" text field when "Other" is selected
    const sourceSelect = document.getElementById('source');
    sourceSelect.addEventListener('change', function () {
        if (this.value === 'Other') {
            document.getElementById('otherSource').classList.remove('hidden');
        } else {
            document.getElementById('otherSource').classList.add('hidden');
        }
    });

    // Load any existing data
    chrome.storage.local.get(['source', 'jobUrl', 'referrerName', 'company', 'role', 'otherSource'], function (result) {
        if (result.source) {
            document.getElementById('source').value = result.source;
            if (result.source === 'Other') {
                document.getElementById('otherSource').classList.remove('hidden');
                if (result.otherSource) document.getElementById('otherSource').value = result.otherSource;
            }
        }
        if (result.jobUrl) document.getElementById('jobUrl').value = result.jobUrl;
        if (result.referrerName) document.getElementById('referrerName').value = result.referrerName;
        if (result.company) document.getElementById('company').value = result.company;
        if (result.role) document.getElementById('role').value = result.role;
    });

    // Back button action
    document.getElementById('backBtn').addEventListener('click', function () {
        window.location.href = 'page1.html';
    });

    // Next button action
    document.getElementById('nextBtn').addEventListener('click', function () {
        const source = document.getElementById('source').value;
        const jobUrl = document.getElementById('jobUrl').value;
        const referrerName = document.getElementById('referrerName').value;
        const company = document.getElementById('company').value;
        const role = document.getElementById('role').value;
        let otherSource = '';

        if (source === 'Other') {
            otherSource = document.getElementById('otherSource').value;
        }

        // Validate inputs
        if (!source || !jobUrl || !referrerName || !company || !role) {
            alert('Please fill in all fields');
            return;
        }

        if (source === 'Other' && !otherSource) {
            alert('Please specify the "Other" source');
            return;
        }

        // Save to extension storage
        chrome.storage.local.set({
            'source': source,
            'otherSource': otherSource,
            'jobUrl': jobUrl,
            'referrerName': referrerName,
            'company': company,
            'role': role
        }, function () {
            window.location.href = 'page3.html';
        });
    });
});