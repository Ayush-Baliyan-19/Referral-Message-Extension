document.addEventListener('DOMContentLoaded', function () {
    // Next button action
    document.getElementById('nextBtn').addEventListener('click', function () {
        const selectedOption = document.querySelector('input[name="docType"]:checked');

        if (!selectedOption) {
            alert('Please select a document type');
            return;
        }

        const docType = selectedOption.value;

        // Save to extension storage
        chrome.storage.local.set({ 'docType': docType }, function () {
            if (docType === 'referral') {
                window.location.href = 'page2-referral.html';
            } else {
                window.location.href = 'page2-cover.html';
            }
        });
    });
});