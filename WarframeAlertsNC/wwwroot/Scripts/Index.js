/**
 * \file Index.js
 * \author Arnold N
 * 
 * The main javascript file for the index page.
 */

var worldstateDirectUrl = "https://ws.warframestat.us/pc";
var worldstateServerUrl = "/WorldState/State";

// TODO: Fix edge case where alert is expired but the alert still exists in warframes api
//  Sympton: Timer dissapears from screen on refresh/worldstate fetching.

$(document).ready(function () {
    IndexView.initialize('.alerts', '.invasions', '.syndicates');
    IndexViewModel.initialize();

    let worldStateCache = { str: "" };

    fetchWorldState(worldStateCache);
});

function fetchWorldState(worldStateCache) {
    $.ajax({
        url: worldstateServerUrl,
        method: 'post',
        dataType: 'json',

        success: function (jsonData) {
            console.log("ajax succeeded");
            console.log("data: " + jsonData);

            if (jsonData !== worldStateCache.str) {
                console.log(jsonData);
                IndexViewModel.parseModelData(jsonData);
                IndexView.populateListView(IndexViewModel);

                worldStateCache.str = jsonData;
            }

            setTimeout(function () {
                fetchWorldState(worldStateCache);
            }, 2 * 60 * 1000);
        },

        error: function (xhrErr, error, errorStr) {
            console.log(xhrErr);
            console.log(error);
            console.log(errorStr);
            console.log("fetching worldstate failed");
        }
    });
}