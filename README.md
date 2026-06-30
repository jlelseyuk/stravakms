# stravakms.js

A simple Node.js script that pulls your yearly cycling distance from the Strava API and writes it to a `.txt` file. This file can then be used to drive custom displays (LED screens, dashboards, Raspberry Pi projects, etc).

## What it does

- Authenticates with the Strava API using OAuth refresh tokens
- Fetches your athlete stats
- Extracts your year-to-date ride distance
- Converts meters → kilometres
- Optionally compares progress against a yearly goal
- Outputs a simple text file like:

**1240 km (62.0% of 2000 km)**

---

## Requirements

- Node.js
- A Strava API application (free)
- Axios HTTP client for JavaScript (installed via npm)

Install dependencies:

```
npm install
```

---

## Setup

### 1. Create a Strava API App

Go to the [Strava API Settings](https://www.strava.com/settings/api) page to create an application.

You'll get:
- Client ID
- Client Secret

### 2. Get a Refresh Token

You'll need to complete the OAuth flow once to obtain a refresh token. You can do this via an API platform or a simple OAuth script (not provided).

- Replace `CLINET_ID` and visit the URL: `https://www.strava.com/oauth/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost&approval_prompt=force&scope=read,activity:read_all`
- Log into Strava and Authorize the application
- You'll be redirected to something like: `http://localhost/?code=AUTH_CODE_HERE&scope=read,activity:read_all`
- Copy the `code`, use this to obtain a Refresh Token

```
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=CLIENT_ID \
  -d client_secret=CLIENT_SECRET \
  -d code=AUTH_CODE \
  -d grant_type=authorization_code
```
The `refresh_token` is the one you need from the output.

### 3. Configure the Script

Edit `stravakms.js`:

```
const clientId = '';
const clientSecret = '';
const refreshToken = '';
```

Optional yearly goal:

```
const goal = '2000';
```

---

## Usage

Run manually:
```
node stravakms.js
```

This generates:

`stravakms.txt`

You can use this with:

- LED matrix displays
- Raspberry Pi dashboards
- Smart mirrors
- Custom widgets
- Whatever you like!

---

## Notes

- Uses `ytd_ride_totals` from the Strava API
- Only cycling distance is included
- Distance is converted from meters → km (rounded down)
- Keep your credentials private (consider using an `.env` file)

---

## License

MIT
