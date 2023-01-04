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
/*
db.json {
    "Watchlist": {
        showObj1: {showData},
        showObj2: {showData},
        showObjn: {showData}
    },
    "Collections": {
        "Collection1": {
            showObj1: {showData},
            showObj2: {showData},
            showObjn: {showData}
        },
        "Collection2": {
            showObj1: {showData},
            showObj2: {showData},
            showObjn: {showData}
        }
    }
}
*/

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
    togglePrimaryVisibility("Home-Section");
    // Call in the "playing soon" stuff.
}

function renderWatchlistUI() {
    togglePrimaryVisibility("Watchlist-Section");

    console.log('renderWatchlistUI');
}

function renderCollectionsUI() {
    togglePrimaryVisibility("Collections-Section");
    
    console.log('Called renderCollectionsUI() ');
}

function renederSettingsUI() {
    togglePrimaryVisibility("Settings-Section");
    setSettingsFormValues();
}

function renderShows(shows = {}) {

}

function renderShow(show = {}) {
    // Show detail up top

    // "View Episodes" below, nav to episodes view
}


function renderEpisodes(episodes = {}) {
    const table = episodeTable();
    const tbody = episodeTableBody(episodes);

    table.append(tbody);

    return table;
}

/**
 * 
 * @returns {HTMLNode} Table with headers for episode list
 */
function episodeTable() {
    const docFrag = document.createDocumentFragment();
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const hRow = document.createElement("tr");
    const headerText = ["Number", "Date", "Name"];
    const ths = [];
    
    table.className = "table table-striped table-hover";

    headerText.forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        th.scope = "col";
        ths.push(th);
    });

    hRow.append(...ths);
    thead.append(hRow);
    table.append(thead);
    docFrag.append(table);

    return docFrag;
}

/**
 * 
 * @param {object} episodes List of episodes to be displayed in table
 * @returns {HTMLNode} <tbody> with completed rows
 */
function episodeTableBody(episodes = {}) {
    console.log('episodes: ', episodes);
    
    const docFrag = document.createDocumentFragment();
    const tbody = document.createElement("tbody");
    const rows = [];

    episodes.forEach(episode => {
        let row = document.createElement("tr");
        let epData = [episode.number, episode.season, episode.name];
        
        epData.forEach(field => {
            let tds = [];
            let td = document.createElement("td");
            td.textContent = field;
        })
        
        row.addEventListener("click", (e) => console.log(e, 'FINISH MY HANDLER!!!'));
        rows.push(row);
    })

    tbody.append(...rows);
    docFrag.append(tbody);

    return docFrag;
}

function renderEpisode(episode = {}) {

}

/**
 * 
 * @returns {HTMLNode} A status spinner for ansychronous status
 */
function renderSpinner() {
    const docFrag = document.createDocumentFragment();
    const outerDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    const span = document.createElement("span");

    outerDiv.className = "d-flex justify-content-center";
    innerDiv.className = "spinner-border";
    innerDiv.role = "status";
    span.className = "visually-hidden";
    span.textContent = "Loading...";
    
    innerDiv.append(span);
    outerDiv.append(innerDiv);
    docFrag.append(outerDiv);

    return docFrag;
}

function togglePrimaryVisibility(sectionId = "Home-Section") {
    const contentSections = document.querySelectorAll(".content-section");
    
    // Loop all content sections, find section w/o d-none, add it to hide it
    contentSections.forEach(element => {
        if (element.className === "content-section") { 
            element.classList.toggle("d-none");
        }
    })
    
    document.querySelector(`#${sectionId}`).classList.toggle("d-none");
}

/**
 * 
 * NOT IN USE
 */
function getMain() {
    const main = document.getElementById("main-content");
    main.innerHTML = "";
    return main;
}

/**
 * 
 * @param {string} classes A space separated list of class names
 * @example getDivWithClasses()
 * // returns <div class="row"></div>
 * @example getDivWithClasses("row gy-2 gx-3 align-items-center")
 * // returns <div class="row gy-2 gx-3 align-items-center"></div>
 * @returns {HTMLNode}
 */
function getNewDivWithClasses(classes = "") {
    const docFrag = document.createDocumentFragment();
    const div = document.createElement("div");
    div.classList = classes;
    docFrag.append(div);
    return docFrag;
}

/**
 * @alias getNewDivWithClasses() 
 * @example getNewRow()
 * // returns <div class="row"></div>
 * @example getNewRow("row gy-2 gx-3 align-items-center")
 * // returns <div class="row gy-2 gx-3 align-items-center"></div>
 * @returns {HTMLNode}
 */
function getNewRow(classes = "row") {return getNewDivWithClasses(classes)}

/**
 * @alias getDivWithClasses() 
 * @example getNewCol()
 * // returns <div class="col"></div>
 * @example getNewCol("col gy-2 gx-3")
 * // returns <div class="col gy-2 gx-3"></div>
 * @returns {HTMLNode}
 */
function getNewCol(classes = "col") {return getNewDivWithClasses(classes)}

/**
 * 
 * @returns {string} Current value of theme setting from localStorage, or "automatic" as default
 */
function getTheme() {
    return (localStorage.couchTheme) ? localStorage.couchTheme : "automatic";
}

/**
 * 
 * @param {string} theme light|dark|automatic 
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
 * Attaches all needed event listeners on page load.
 */
function attachListeners() {
    window.addEventListener("hashchange", () => hashchangeRouter());
    document.getElementById("settings-form").addEventListener("submit", (e) => settingsFormHandler(e));
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

function settingsFormHandler(e) {
    e.preventDefault();
    const settings = getSettingsFormValues();
    setTheme(settings.couchTheme);
    setLandingPage(settings.landingPage)
}
///////////////////////////////////////////////////////////////////////////////
//  URL MANAGEMENT 
///////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {string} query String value from search input.
 * @returns {string} Formatted URL for getJSON call to TVMaze API.
 */
function showSearch(query = "") {
    return `https://api.tvmaze.com/search/shows?q=${encodeURI(query)}`;
}

/**
 * 
 * @param {number} showId Number value contained in a show's id field.
 * @returns {string} Formatted URL for getJSON call to TVMaze API.
 */
function showLookup(showId = 0) {
    return `https://api.tvmaze.com/shows/${showId}`;
}

/**
 * 
 * @param {number} showId Number value contained in a show's id field.
 * @returns {string} Formatted URL for getJSON call to TVMaze API.
 */
function episodeList(showId = 0) {
    return `https://api.tvmaze.com/shows/${showId}/episodes`;
}

/**
 * 
 * @param {number} showId Number value contained in a show's id field.
 * @param {number} seasonNum Number value of show's season
 * @param {number} episodeNum Number value of show's episode
 * @returns {string} Formatted URL for getJSON call to TVMaze API.
 */
function episodeByNumber(showId = 0, seasonNum = 1, episodeNum = 1) {
    return `https://api.tvmaze.com/shows/${showId}/episodebynumber?season=${seasonNum}&number=${episodeNum}`;
}

/**
 * MAY NOT GET USED BY LAUNCH
 */
function setGoogleCalendarURL(episode = {}) {
    const root = "https://www.google.com/calendar/render?action=TEMPLATE&text=";
    return `${root}`;
    // https://www.google.com/calendar/render?action=TEMPLATE&text=SHOW%20NAME&details=SEASON%20AND%20EPISODE.%20PORTION%20OF%20DESCRITPTION&location=SHOW%20URL%20MAYBE&dates=20210112T083000Z%2F20210115T040000Z&ctz=America%2FNew_York
}

function getHash() {
    return location.hash.slice(1);
}

/**
 * 
 * @param {string} hash The value to be assigned as the URL hash
 */
function setHash(hash = "") {
    location.hash = hash;
}

///////////////////////////////////////////////////////////////////////////////
//  LOCAL SETTINGS CONTROLS
///////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @returns {string} Value of preferred landing page from localStorage
 */
function getLandingPage() {
    return (localStorage.landingPage) ? localStorage.landingPage : "Home";
}

/**
 * 
 * @param {string} page Value of preferred landing page to be stored in localStorage
 */
function setLandingPage(page) {
    localStorage.setItem("landingPage", page);
}

function getSettingsFormValues() {
    const form = document.getElementById("settings-form");
    const settings = {
        couchTheme:  form["couch-theme-radio"].value,
        landingPage: form["landing-page-radio"].value
    }
    return settings;
}

function setSettingsFormValues() {
    const form = document.getElementById("settings-form");
    form["couch-theme-radio"].value = getTheme();
    form["landing-page-radio"].value = getLandingPage();
}
///////////////////////////////////////////////////////////////////////////////
//  API COMMUNICATION
///////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @param {string} url The location of data to be retrieved
 * @param {function} callback Optional. Function to process JSON after retrieval
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
    .then(data => {
        if (callback) {
            callback(data);
        } else {
            return data;
        }
    })
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
//  ENVIRONMENT CHECKING
///////////////////////////////////////////////////////////////////////////////

/**
 * 
 * @returns {string} Value of system color scheme, light|dark
 */
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
    setLandingPage(getLandingPage());
    setTheme(getTheme());
    setHash(getLandingPage());
}

init();