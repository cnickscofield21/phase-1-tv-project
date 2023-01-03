ben

/**
 * @file index.js is the primary processing script for Phase-1-TV-Project
 * @author Nick Scofield, Ben Tryon
 * @version 0.1
 * @description IMPORTANT: THIS FILE ASSUMES <script defer> IN HTML FILES!
 *              This script will follow the MVC design pattern to the best
 *              of our abilities.
 */

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  MODEL - This section will format & store data into the desired model
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Mostly done by API

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  VIEW - This section will display our data in the DOM.
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function renderSearchUI() {
    // const main = document.getElementById("main-content");
    console.log('renderSearchUI');
}

function renderHomeUI() {
    
    // Deactivated to permit static dev

    // const main = document.getElementById("main-content");
    // const topRow = document.createElement("div");
    // topRow.className = "row";
    // const h2 = document.createElement("h2");
    // h2.textContent = "Welcome to Couchtime!";

    // main.innerHTML = "";
    // topRow.append(h2);
    // main.append(topRow);
}

function renderWatchlistUI() {
    // const main = document.getElementById("main-content");
    console.log('renderWatchlistUI');
}

function renderCollectionsUI() {
    // const main = document.getElementById("main-content");
    console.log('renderCollectionsUI');
}

function renederSettingsUI() {
    // const main = document.getElementById("main-content");
    console.log('renederSettingsUI');
}

function getTheme() {
    return (localStorage.couchTheme) ? localStorage.couchTheme : "automatic";
}

/**
 * 
 * @param {string} theme light|dark|auto 
 */
function setTheme(theme) {
    localStorage.setItem("couchTheme", theme);
    if (theme === "automatic") {
        theme = getSystemColorScheme();
    }
    document.body.setAttribute("data-bs-theme", theme);
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  CONTROLLER - This section will make API calls and handle events
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
//  EVENT LISTENER ATTACHMENTS
///////////////////////////////////////////////////////////////////////////////

/**
 * Listens for hashchange event to trigger UI changes w/o loading a new page 
 * DOES NOT pass thru the event object--not needed.
 * @listens hashchange
 * @callback hashchangeRouter
 */
function attachListeners() {
    window.addEventListener("hashchange", () => hashchangeRouter());
}
///////////////////////////////////////////////////////////////////////////////
//  EVENT HANDLERS
///////////////////////////////////////////////////////////////////////////////

/**
 * Triggers the rendering function for appropriate content based on recently 
 * changed hash value. Hash may be passed manually without a hashchange event
 * @param {string} hash Optional. When passed, it acts as the key to internal
 *                      router object for routing proper rendering function.
 * NOTE: Hash is the string following the # character near the end of the URL
 * TODO: Remove this todo. It was used for testing.
 */
function hashchangeRouter(hash) {
    hash = (hash) ? hash : getHash();
    const router = {
        "Search": renderSearchUI,
        "Home": renderHomeUI,
        "Watchlist": renderWatchlistUI,
        "Collections": renderCollectionsUI,
        "Settings": renederSettingsUI
    };
    
    router[hash]();
}
///////////////////////////////////////////////////////////////////////////////
//  URL MANAGEMENT 
///////////////////////////////////////////////////////////////////////////////

/**
 * TODO: Finish logic
 * @param {string} query 
 * @returns {string} url
 */
function setApiUrl(query = "") {
    const root = "https://api.tvmaze.com/";

    // MUTATIONS
    return `${root}`;
}

/**
 * 
 */
function setGoogleCalendarURL() {
    const root = "https://www.google.com/calendar/render?action=TEMPLATE&text=";
    
    // https://www.google.com/calendar/render?action=TEMPLATE&text=SHOW%20NAME&details=SEASON%20AND%20EPISODE.%20PORTION%20OF%20DESCRITPTION&location=SHOW%20URL%20MAYBE&dates=20210112T083000Z%2F20210115T040000Z&ctz=America%2FNew_York
}

function getHash() {
    return location.hash.slice(1);
}

/**
 * To be called to trigger
 * @param {string} hash The value to be assigned as the URL hash
 */
function setHash(hash = "") {
    location.hash = hash;
}
///////////////////////////////////////////////////////////////////////////////
//  API COMMUNICATION
///////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {string} url The location of data to be retrieved
 * @param {function} callback Function to process JSON after retrieval
 * @returns {object} data The data passed callback function
 * @throws Error response message to console.log
 */
function getJSON(url = "", callback) {
    fetch(url)
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw res;
        }
    })
    .then(data => callback(data))
    .catch((error) => console.log('Error: ', error));
}

/**
 * 
 * @param {string} url The location of data to be updated
 * @param {object} data Object formatted to the pattern required by the data server
 * @param {function} callback Function to process response after update
 * @returns {object} data to passed callback function // TODO: Is this true???
 * @throws Error response message to console.log
 */
function patchJSON(url = "", data = {}, callback) {
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Failed to PATCH record";
        }
    })
    .then(data => callback(data))
    .catch((error) => console.log('Error: ', error));
}

/**
 * 
 * @param {string} url The location of data to be posted
 * @param {object} data Object formatted to the pattern required by the data server
 * @param {function} callback Function to process response after post
 * @returns {object} data to passed callback function // TODO: Is this true???
 * @throws Error response message to console.log
 */
function postJSON(url = "", data = {}, callback) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Failed to POST record";
        }
    })
    .then(data => callback(data))
    .catch((error) => console.log('Error: ', error));
}

/**
 * 
 * @param {string} url The location of data to be deleted
 * @param {function} callback Function to process response after deletion
 * @returns {object} data to passed callback function // TODO: Is this true???
 * @throws Error response message to console.log
 */
function deleteJSON(url = "", callback) {
    fetch(url, {method: "DELETE"})
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw "Failed to DELETE record";
        }
    })
    .then(data => callback(data))
    .catch((error) => console.log('Error: ', error));
}
///////////////////////////////////////////////////////////////////////////////
//  BROWSER CHECKING
///////////////////////////////////////////////////////////////////////////////

function getSystemColorScheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    } else {
        return "light";
    }
}
///////////////////////////////////////////////////////////////////////////////
//  INITIALIZATION
///////////////////////////////////////////////////////////////////////////////

function init() {
    attachListeners();
    renderHomeUI();
    setTheme(getTheme());
}

init();