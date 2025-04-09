document.addEventListener('DOMContentLoaded', function () {
    // Show "Other" text field when "Other" is selected
    document.getElementById('other').addEventListener('change', function () {
        document.getElementById('otherSource').classList.remove('hidden');
    });

    // Hide "Other" text field when other options are selected
    const otherOptions = document.querySelectorAll('input[name="source"]:not(#other)');
    otherOptions.forEach(option => {
        option.addEventListener('change', function () {
            document.getElementById('otherSource').classList.add('hidden');
        });
    });

    // Next button action
    document.getElementById('nextBtn').addEventListener('click', function () {
        const selectedOption = document.querySelector('input[name="source"]:checked');

        if (!selectedOption) {
            alert('Please select a source');
            return;
        }

        let source = selectedOption.value;
        if (source === 'Other') {
            source = document.getElementById('otherSource').value || 'Other';
        }

        // Save to extension storage
        chrome.storage.local.set({ 'source': source }, function () {
            window.location.href = 'page2.html';
        });
    });
});