document.addEventListener('DOMContentLoaded', function () {
    // Load data and generate message
    chrome.storage.local.get(['source', 'jobUrl', 'referrerName', 'company', 'role'], function (result) {
        if (!result.referrerName || !result.company || !result.role) {
            window.location.href = 'page1.html';
            return;
        }

        const template = `Hi ${result.referrerName},

I hope you're doing well! I came across a ${result.role} opportunity at ${result.company} through ${result.source} and would love to apply. I wanted to reach out to you for a referral for the role.

Job URL: ${result.jobUrl}

I have gained strong foundation in development, covering areas like optimizing application chunk sizes, improving SEO, implementing SSR, and efficiently using various frontend and backend libraries. I have worked on diverse projects, utilizing 3.js for 3D graphics, WebSockets for real-time communication, and UI libraries like Tailwind CSS and ShadCN for modern, scalable interfaces.

The type of guy if given some work, Will get you 3 solutions for it.

I just completed my intern as an SDE at Groww, where I have:
- Optimized web performance and SEO, improving user engagement.
- Refactored Playwright test cases, reducing failures from 57 to 0.
- Developed and revamped internal portals, including payment gateways and omnichannel platforms.
- Worked on CI-CD Pipelines for automations

Last proof of concept I presented to my team was to automate the playwright testing by fetching urls from Sitemap and also static pages generated while making the build, which can be integrated with CI pipeline.

All these work were new to me but the zeal to learn something new enabled me to implement such features.

I am excited about the opportunity to contribute to ${result.company} and would appreciate any guidance you can provide. I've attached my resume for your reference. You can also check out my work at www.ayush-baliyan.tech.

Looking forward to your response!

Best regards,
Ayush Baliyan`;

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