// Function to get user location
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);    
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};
let stops = [];

// Function to add a stop
const addStop = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showStop, showError);    
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};
const updateMap = () => {
    let mapContent = `<iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=`;
    
    // Adding user's location
    if (stops.length > 0) {
        const user = stops[0];
        mapContent += `${user.lng-0.01}%2C${user.lat-0.01}%2C${user.lng+0.01}%2C${user.lat+0.01}&amp;layer=mapnik&amp;marker=${user.lat}%2C${user.lng}`;
    }
    
    // Adding stops
    for (let i = 1; i < stops.length; i++) {
        const stop = stops[i];
        mapContent += `&amp;marker=${stop.lat}%2C${stop.lng}`;
    }

    mapContent += `"></iframe>`;
    
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = mapContent;
};



const showStop = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    stops.push({lat, lng});
    updateMap();
};
// Function to display user's position and update map
const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const des = document.getElementById("coordinates");
    des.innerHTML = `Latitude: ${lat}<br>Longitude: ${lng}`;

    // Update map center and add marker
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = `<iframe width="100%" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&amp;layer=mapnik&amp;marker=${lat}%2C${lng}"></iframe>`;
};

// Function to handle errors
const showError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        default:
            alert("An unknown error occurred.");
    }
};
