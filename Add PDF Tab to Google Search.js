// ==UserScript==
// @name         Add PDF Tab to Google Search
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a PDF tab to Google search results
// @author       BuiQuocDung1991
// @author       Pencilheart
// @match        *://www.google.com/search*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBmaWxsPSJyZWQiIGQ9Ik0xMiAyMS4zNWwtMS40NS0xLjMyQzUuNCAxNS4zNiAyIDEyLjI4IDIgOC41IDIgNS40MiA0LjQyIDMgNy41IDNjMS43NCAwIDMuNDEuODEgNC41IDIuMDlDMTMuMDkgMy44MSAxNC43NiAzIDE2LjUgMyAxOS41OCAzIDIyIDUuNDIgMjIgOC41YzAgMy43OC0zLjQgNi44Ni04LjU1IDExLjU0TDEyIDIxLjM1eiIvPjwvc3ZnPg==
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    // Find the container for the search tabs (parent element containing the tab list)
    const tabContainer = document.querySelector('.crJ18e');

    if (!tabContainer) return;

    // Find the "更多" (More) tab
    const moreTab = [...tabContainer.querySelectorAll('div[role="listitem"]')]
        .find(tab => tab.textContent.trim() === '更多');

    if (!moreTab) return;

    // Get the search query from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (!query) return;

    // Check if the query already contains "filetype:pdf"
    if (query.toLowerCase().includes("filetype:pdf")) {
        return; // If filetype:pdf is already in the query, do nothing
    }

    // Create the URL for the PDF search by appending "filetype:pdf"
    const pdfSearchUrl = `/search?q=${encodeURIComponent(query)}+filetype:pdf`;

    // Create a new PDF tab
    const pdfTab = document.createElement('div');
    pdfTab.setAttribute('role', 'listitem');
    pdfTab.innerHTML = `
        <a href="${pdfSearchUrl}" class="nPDzT T3FoJb">
            <div class="YmvwI">PDF</div>
        </a>
    `;

    // Insert the PDF tab before the "更多" tab
    moreTab.insertAdjacentElement('beforebegin', pdfTab);
})();
