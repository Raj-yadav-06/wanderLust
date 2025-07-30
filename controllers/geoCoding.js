// Geocoding Helper Function
const axios = require('axios');

// Function to get coordinates from location name
async function getCoordinates(location, country) {
    try {
        // Add validation for empty inputs
        if (!location || !country) {
            console.log('Missing location or country data');
            return {
                type: 'Point',
                coordinates: [78.9629, 20.5937]
            };
        }

        const address = `${location}, ${country}`;
        const encodedAddress = encodeURIComponent(address);
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;
        
        console.log(`Geocoding: ${address}`);
        console.log(`URL: ${geocodeUrl}`);
        
        const response = await axios.get(geocodeUrl, {
            headers: {
                'User-Agent': 'WanderlustApp/1.0'
            },
            timeout: 10000 // 10 second timeout
        });
        
        console.log(`API Response for "${address}":`, response.data);
        
        if (response.data && response.data.length > 0) {
            const lat = parseFloat(response.data[0].lat);
            const lon = parseFloat(response.data[0].lon);
            
            console.log(`Found coordinates for ${address}: [${lon}, ${lat}]`);
            
            // Return GeoJSON Point format
            return {
                type: 'Point',
                coordinates: [lon, lat]
            };
        } else {
            console.log(`No results for "${address}", trying country only: ${country}`);
            
            // Fallback: try country only
            const countryUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(country)}&limit=1`;
            console.log(`Country URL: ${countryUrl}`);
            
            const countryResponse = await axios.get(countryUrl, {
                headers: {
                    'User-Agent': 'WanderlustApp/1.0'
                },
                timeout: 10000
            });
            
            console.log(`Country API Response for "${country}":`, countryResponse.data);
            
            if (countryResponse.data && countryResponse.data.length > 0) {
                const lat = parseFloat(countryResponse.data[0].lat);
                const lon = parseFloat(countryResponse.data[0].lon);
                
                console.log(`Found country coordinates for ${country}: [${lon}, ${lat}]`);
                
                return {
                    type: 'Point',
                    coordinates: [lon, lat]
                };
            }
        }
        
        console.log(`No coordinates found for "${address}" or "${country}", using default`);
        
        // Default coordinates if geocoding fails
        return {
            type: 'Point',
            coordinates: [78.9629, 20.5937]
        };
        
    } catch (error) {
        console.error(`Geocoding error for "${location}, ${country}":`, error.message);
        
        // Check if it's a rate limiting issue
        if (error.response && error.response.status === 429) {
            console.log('Rate limited by Nominatim. Adding delay...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Retry once after delay
            try {
                return await getCoordinates(location, country);
            } catch (retryError) {
                console.error('Retry failed:', retryError.message);
            }
        }
        
        // Return default coordinates
        return {
            type: 'Point',
            coordinates: [78.9629, 20.5937]
        };
    }
}

// Alternative function using a different geocoding service (MapBox - requires API key)
async function getCoordinatesMapbox(location, country, accessToken) {
    try {
        const query = encodeURIComponent(`${location}, ${country}`);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=1`;
        
        const response = await axios.get(url);
        
        if (response.data.features && response.data.features.length > 0) {
            const coordinates = response.data.features[0].geometry.coordinates;
            return {
                type: 'Point',
                coordinates: coordinates // MapBox already returns [lon, lat]
            };
        }
        
        return {
            type: 'Point',
            coordinates: [78.9629, 20.5937]
        };
        
    } catch (error) {
        console.error('MapBox geocoding error:', error);
        return {
            type: 'Point',
            coordinates: [78.9629, 20.5937]
        };
    }
}

module.exports = { getCoordinates, getCoordinatesMapbox };