document.addEventListener('DOMContentLoaded', function () {
    // Load data and generate message
    chrome.storage.local.get(['docType', 'source', 'otherSource', 'jobUrl', 'referrerName', 'company', 'role'], function (result) {
        if (!result.docType) {
            window.location.href = 'page1.html';
            return;
        }

        const titleElement = document.getElementById('messageTitle');
        const messageElement = document.getElementById('generatedMessage');

        if (result.docType === 'referral') {
            // Validate required fields for referral
            if (!result.referrerName || !result.company || !result.role || !result.source) {
                window.location.href = 'page2-referral.html';
                return;
            }

            // Set title
            titleElement.textContent = 'Your Referral Request Message';

            // Get the actual source text
            let sourceText = result.source;
            if (sourceText === 'Other' && result.otherSource) {
                sourceText = result.otherSource;
            }

            // Generate referral message
            const referralTemplate = `Hi ${result.referrerName}👋,

I hope you're doing well! I came across a ${result.role} opportunity at ${result.company} through ${sourceText} and would love to apply. I wanted to reach out to you for a referral for the role.

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

            messageElement.value = referralTemplate;

        } else if (result.docType === 'coverLetter') {
            // Validate required fields for cover letter
            if (!result.company || !result.role) {
                window.location.href = 'page2-cover.html';
                return;
            }

            // Set title
            titleElement.textContent = 'Your Cover Letter';

            // Generate cover letter
            const coverLetterTemplate = `I'm excited to apply for the ${result.role} position at ${result.company}. I thrive on solving complex challenges through creative, scalable, and efficient solutions, and I'm eager to bring that mindset to your team.

Key Experiences & Achievements

Groww | SDE Intern (Aug 2024 – Present)
* Web Optimization: Improved SEO and UI/UX through server-side data fetching, CMS integration, and efficient API management. Built tools like the Stock Average Calculator and XIRR Calculator pages.
* Playwright Testing: Refactored test cases to reduce test failures from 57 to 0, significantly boosting test reliability and coverage.
* Backoffice Systems: Developed and enhanced payment gateway flows and omnichannel backoffice portals.
* CI/CD Pipelines: Integrated tools like Argo, Helm, and GitHub Actions for streamlined deployments. Managed build images, PVC mounts, and secret handling.

DOTS Delhi | SDE Intern (Jul 2023 – Aug 2024)
* Full-Stack Revamp: Transitioned a frontend-heavy project into a full-stack system, improving backend efficiency by 30% and increasing data analysis metrics from 0.313 to 2.71.
* Dashboard Automation: Built an Automatic Dashboard Recommendation System that reduced manual effort by 50%, enhancing accessibility for 200+ users.

Additional Achievements
* Secured a position among the top 30 teams out of over 30,000 participants in the Samsung Solve for Tomorrow innovation challenge.
* Solved over 500 data structures and algorithm problems across platforms like LeetCode, Codeforces, and GeeksforGeeks.

Tech Stack & Interests
* Strong in MERN Stack, while also doing python backend development with FastApi, also distributed systems using golang for creating performant and elegant interfaces.
* Passionate about solving real-world problems, optimizing systems, and continuously learning new technologies.

You can explore some of my work at ayush-baliyan.tech. I'd love the opportunity to discuss how I can contribute to your team and bring value through innovative development.

Thank you for your time and consideration.

Best regards,
Ayush Baliyan`;

            messageElement.value = coverLetterTemplate;
        }
    });

    // Determine where to go back to
    chrome.storage.local.get(['docType'], function (result) {
        // Back button action
        document.getElementById('backBtn').addEventListener('click', function () {
            if (result.docType === 'referral') {
                window.location.href = 'page2-referral.html';
            } else {
                window.location.href = 'page2-cover.html';
            }
        });
    });

    // Copy button action
    document.getElementById('copyBtn').addEventListener('click', function () {
        const messageElement = document.getElementById('generatedMessage');
        messageElement.select();

        try {
            // Use the Clipboard API
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