# Referral Message Generator Chrome Extension

## Project Purpose

This project is a Chrome extension that helps users generate personalized referral request messages. It guides the user through a multi-step form, collecting necessary information and then crafting a message that can be easily copied and shared. The goal is to streamline the referral process and make it easier for users to ask for referrals.

## Key Features

*   **Multi-Page Form:** Breaks down the referral information gathering into manageable steps.
*   **Dynamic UI:** Adapts the user interface based on user input (e.g., showing/hiding the "Other" source field).
*   **Data Persistence:** Saves user input to Chrome's local storage, allowing users to resume the process later.
*   **Referral Message Generation:** Creates a personalized referral message based on the collected data.
*   **Clipboard Integration:** Allows users to easily copy the generated message to their clipboard.

## Architecture

The extension consists of a popup window and three main pages. The popup (popup.html) serves as the entry point, directing users to the first page of the form (page1.html). Each page collects specific information and saves it to Chrome's local storage. The JavaScript files (page1.js, page2.js, page3.js) handle user interactions, data validation, and navigation between pages. Finally, page3.html displays the generated referral message, allowing the user to copy it to the clipboard or reset the data.

## Technical Stack

*   **HTML:** For structuring the user interface of each page.
*   **CSS:** (styles.css) For styling the user interface and providing a consistent look and feel.
*   **JavaScript:** For handling user interactions, data validation, and logic.
*   **Chrome Storage API:** (chrome.storage.local) For persistent data storage within the extension.
*   **Clipboard API:** For copying the generated message to the clipboard.

## Getting Started

1.  Clone the project repository.
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked" and select the project directory.
5.  The extension should now be installed. Click the extension icon in the toolbar to open the popup and start the referral request process.
6.  To understand the code, start by looking at `popup.html` and `popup.js` to see how the extension is initialized. Then, explore `pages/page1.html` and `js/page1.js` to understand the first step of the form.

## Project Structure

The project is organized as follows:

*   **popup.html:** The main popup window of the extension.
*   **popup.js:** JavaScript code for the popup window.
*   **pages/:** Contains the HTML files for each page of the form (page1.html, page2.html, page3.html).
*   **js/:** Contains the JavaScript files for each page of the form (page1.js, page2.js, page3.js).
*   **styles.css:** Contains the CSS styles for the entire extension.
