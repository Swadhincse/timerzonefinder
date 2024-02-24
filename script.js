function getCurrentTimezone() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    fetchTimezoneByCoordinates(latitude, longitude, displayCurrentTimezone);
}

function error() {
    alert("Unable to retrieve your location. Please enter an address.");
}

function fetchTimezoneByCoordinates(latitude, longitude, callback) {
    fetch(`https://api.geoapify.com/v1/timezone/geojson?lat=${latitude}&lon=${longitude}&apiKey=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => callback(data.properties.timezone))
        .catch(error => console.log('Error:', error));
}

function displayCurrentTimezone(timezone) {
    document.getElementById('current-timezone').innerText = `Your current timezone: ${timezone}`;
}

function getTimezone() {
    const address = document.getElementById('address').value;
    if (address.trim() === '') {
        alert("Please enter a valid address.");
        return;
    }
    
    fetchCoordinatesByAddress(address);
}

function fetchCoordinatesByAddress(address) {
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                const coordinates = data.features[0].geometry.coordinates;
                const latitude = coordinates[1];
                const longitude = coordinates[0];
                fetchTimezoneByCoordinates(latitude, longitude, displayAddressTimezone);
            } else {
                alert("Invalid address. Please try again.");
            }
        })
        .catch(error => console.log('Error:', error));
}

function displayAddressTimezone(timezone) {
    document.getElementById('address-timezone').innerText = `Timezone for entered address: ${timezone}`;
}
