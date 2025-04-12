document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['source', 'jobUrl', 'referrerName', 'company', 'role'], function (result) {
        if (!result.referrerName || !result.company || !result.role) {
            window.location.href = 'page1.html';
            return;
        }

        const template = `Your Message Template`;

        document.getElementById('referralMessage').value = template;
    });

    // Back button action
    document.getElementById('backBtn').addEventListener('click', function () {
        window.location.href = 'page2.html';
    });

    // Copy button action
    document.getElementById('copyBtn').addEventListener('click', function () {
        const messageElement = document.getElementById('referralMessage');
        messageElement.select();

        try {
            // Use the Clipboard API instead of execCommand
            navigator.clipboard.writeText(messageElement.value).then(function () {
                // Show notification
                const notification = document.getElementById('notification');
                notification.classList.remove('hidden');

                // Hide notification after 2 seconds
                setTimeout(function () {
                    notification.classList.add('hidden');
                }, 2000);
            });
        } catch (err) {
            // Fallback for older browsers
            document.execCommand('copy');

            // Show notification
            const notification = document.getElementById('notification');
            notification.classList.remove('hidden');

            // Hide notification after 2 seconds
            setTimeout(function () {
                notification.classList.add('hidden');
            }, 2000);
        }
    });

    // Reset button action
    document.getElementById('resetBtn').addEventListener('click', function () {
        if (confirm('Are you sure you want to reset all fields?')) {
            chrome.storage.local.clear(function () {
                window.location.href = '../popup.html';
            });
        }
    });
});