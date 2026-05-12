// Dependencies
const fs = require('fs');
const axios = require('axios');

// Add your Strava app credentials
const clientId = '';
const clientSecret = '';
const refreshToken = '';

// Optional: Add a goal for the current year
const goal = '';

// Strava API functions
async function getAccessToken() {
  const res = await axios.post('https://www.strava.com/oauth/token', {
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  });
  return res.data.access_token;
}
async function getAthleteId(accessToken) {
  const res = await axios.get('https://www.strava.com/api/v3/athlete', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data.id;
}
async function run() {
  try {
    const accessToken = await getAccessToken();
    const athleteId = await getAthleteId(accessToken);

    const stats = await axios.get(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const meters = stats.data.ytd_ride_totals.distance;
    const km = Math.floor(meters / 1000);
    const percent = ((km / goal) * 100).toFixed(1);
    let output = `${km} km`;

    if (goal) {
      const percent = ((km / goal) * 100).toFixed(1);
      output += `\n${percent}% of ${goal} km`;
    }

    // Write output to .txt file
    fs.writeFileSync('stravakms.txt', output);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

run();
