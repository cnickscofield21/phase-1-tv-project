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



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  VIEW - This section will display our data in the DOM.
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function renderShow() {

}

function renderPerson() {
    
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

function attachListeners() {
    window.addEventListener("hashchange", /*TBD*/);
}
///////////////////////////////////////////////////////////////////////////////
//  EVENT HANDLERS
///////////////////////////////////////////////////////////////////////////////

// TBD

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

function getHash() {
    const hash = location.hash;

}

function setHash() {

    location.hash = "";
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