import axios from 'axios';

const baseApiUrl = 'http://localhost:8080/chat'; // Update with your server URL

export const reverseGeocode = async (latitude, longitude) => {
  const apiKey = 'bdc_aedc5e6487e14c80b9e66c1c9ca811c5'; // Replace with your actual BigDataCloud API key
  const reverseGeocodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${apiKey}`;

  try {
    const response = await axios.get(reverseGeocodeUrl);
    const city = response.data.locality;
    return city;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};

export const sendMessageToAI = async (messages, setMessages, message, userLocation) => {
  try {
    // Make a POST request to the API endpoint
    const response = await axios.post(baseApiUrl, { messages, message, location: userLocation });

    // Assuming the API response contains the AI's message, update the state
    const aiMessage = { sender: 'AI', content: response.data.reply };

    // Reverse geocode the queried location
    const queriedLocation = await reverseGeocode(userLocation.latitude, userLocation.longitude);

    setMessages([...messages, { sender: 'user', content: message, location: queriedLocation }, aiMessage]);

    return response.data; // Return the entire response for additional checks if needed
  } catch (error) {
    throw error; // Throw the error so that it can be caught in the component
  }
};
