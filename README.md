# Local Explorer

A smart activity suggestion app that uses AI to suggest activities based on location, weather, and time of day.

## Table of Contents

* [About](#about)
* [Features](#features)
* [Screenshots](#screenshots)
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [License](#license)
* [Contributing](#contributing)

## About

Local Explorer uses the Gemini1.5-flash AI model, Google Maps API, and OpenWeather API to suggest activities based on your location, the current weather, and the time of day.

## Features

* Get activity suggestions based on your location, the current weather, and the time of day
* View suggestions on a map
* Filter suggestions by type (e.g. outdoor, indoor, food, etc.)
* View detailed information about each suggestion, including address, phone number, and hours of operation
* Get walking directions to each suggestion

## Screenshots

![Screenshot of Local Explorer](https://raw.githubusercontent.com/micahstern/local-explorer/master/screenshots/local-explorer-screenshot.png)

## Installation

1. Clone the repository: `git clone https://github.com/micahstern/local-explorer.git`
2. Install dependencies: `npm install`
3. Start the app: `npm start`
4. Open the app in your browser: `http://localhost:3000`

## Usage

1. create an account
2. click the button "Let's Explore!"
3. View suggestions on the map

## API

Local Explorer uses the following APIs:

* [Gemini1.5-flash](https://github.com/google/generative-ai): a smart AI model that suggests activities based on location, weather, and time of day
* [Google Maps API](https://developers.google.com/maps/): a mapping API that provides location-based information
* [OpenWeather API](https://openweathermap.org/api): a weather API that provides current weather information

## TODO

* Add the ability to filter activities categories
* Add the ability to favorite suggestions
* Add the ability to share suggestions with friends
