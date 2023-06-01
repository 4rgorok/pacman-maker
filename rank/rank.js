var maps = []

function Sort_maps_by_rating() {
    // sort maps by wins and display in map-list div
    maps.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var map_list = document.getElementById("map-list");
    map_list.innerHTML = "<ul>";
    for (var i = 0; i < maps.length; i++) {
        map_list.innerHTML += "<li>" + "<button onclick=\"location.href = '..';\" class=\"rank-button\">" + maps[i].name + "</li>";
    }
    map_list.innerHTML += "</ul>";
}

function Sort_maps_by_games() {
    // sort maps by wins and display in map-list div
    maps.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var map_list = document.getElementById("map-list");
    map_list.innerHTML = "<ul>";
    for (var i = 0; i < maps.length; i++) {
        map_list.innerHTML += "<li>" + "<button onclick=\"location.href = '..';\" class=\"rank-button\">" + maps[i].name + "</li>";
    }
    map_list.innerHTML += "</ul>";
}

function Sort_maps_by_players() {
    // sort maps by players and display in map-list div
    maps.sort(function(a, b) {
        return b.players - a.players;
    });
    var map_list = document.getElementById("map-list");
    map_list.innerHTML = "<ul>";
    for (var i = 0; i < maps.length; i++) {
        map_list.innerHTML += "<li>" + "<button onclick=\"location.href = '..';\" class=\"rank-button\">" + maps[i].name + "</li>";
    }
    map_list.innerHTML += "</ul>";
}

function Sort_maps_by_wins() {
    // sort maps by wins and display in map-list div
    maps.sort(function(a, b) {
        return b.wins - a.wins;
    });
    var map_list = document.getElementById("map-list");
    map_list.innerHTML = "<ul>";
    for (var i = 0; i < maps.length; i++) {
        map_list.innerHTML += "<li>" + "<button onclick=\"location.href = '..';\" class=\"rank-button\">" + maps[i].name + "</li>";
    }
    map_list.innerHTML += "</ul>";
}


function get_maps() {
    // get maps from database
    maps = []
    var request = new XMLHttpRequest();
    
        
}

get_maps()