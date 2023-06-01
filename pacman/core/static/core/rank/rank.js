var maps = []

function Sort_maps_by_rating() {
    fetch('get_maps_sorted_by_approval/')
    .then(response => response.json())
    .then(data => {
    maps = data;
    var map_list = document.getElementById("map-list");
    map_list.innerHTML = "<ul>";
    for (var i = 0; i < maps.length; i++) {
        map_list.innerHTML += "<li>" + "<button onclick=\"location.href = '..';\" class=\"rank-button\">" + maps[i].name + "</li>";
    }
    map_list.innerHTML += "</ul>";
    console.log(data);
  })
    .catch(error => {
    console.error(error);
  });    
}

function Sort_maps_by_name() {
    fetch('get_maps_sorted_by_name/')
    .then(response => response.json())
    .then(data => {
    maps = data;
    var map_list = document.getElementById("map-list");
    map_list.innerHTML = "<ul>";
    for (var i = 0; i < maps.length; i++) {
        map_list.innerHTML += "<li>" + "<button onclick=\"location.href = '..';\" class=\"rank-button\">" + maps[i].name + "</li>";
    }
    map_list.innerHTML += "</ul>";
    console.log(data);
  })
    .catch(error => {
    console.error(error);
  });    
}

function Sort_maps_by_date() {
    fetch('get_maps_sorted_by_date/')
    .then(response => response.json())
    .then(data => {
    maps = data;
    var map_list = document.getElementById("map-list");
    map_list.innerHTML = "<ul>";
    for (var i = 0; i < maps.length; i++) {
        map_list.innerHTML += "<li>" + "<button onclick=\"location.href = '..';\" class=\"rank-button\">" + maps[i].name + "</li>";
    }
    map_list.innerHTML += "</ul>";
    console.log(data);
  })
    .catch(error => {
    console.error(error);
  });    
}


function get_maps() {
    fetch('get_public_maps/')
    .then(response => response.json())
    .then(data => {
    maps = data;
    var map_list = document.getElementById("map-list");
    map_list.innerHTML = "<ul>";
    for (var i = 0; i < maps.length; i++) {
        map_list.innerHTML += "<li>" + "<button onclick=\"location.href = '..';\" class=\"rank-button\">" + maps[i].name + "</li>";
    }
    map_list.innerHTML += "</ul>";
    console.log(data);
  })
    .catch(error => {
    console.error(error);
  });    
}

get_maps()