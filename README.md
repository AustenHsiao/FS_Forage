# FS_Forage

Secret Spot -- originally ForageApp, is developed by Austen Hsiao, Sandy Wood, and Travis McGowan using techniques learned in CS 465P/565 at Portland State University.
The application is deployed on Heroku (https://forage-app-pdx.herokuapp.com/) and is designed to hold information about a user's foraging locations. A user is able to
create and delete new spots with an interactive map. Weather data is also supplied for each location, providing a wealth of information to plan foraging trips.

There are two variants of the application-- desktop and mobile. The functionality for both are equivalent but the displays are altered for screen size.
Each page includes a nav bar with links to the 'main' page, 'add spot' page, and 'about' page. Details on each page is included below:

## MAIN PAGE:
  The main page holds data for each location that the user has supplied. If no locations have been added, this page does not hold any information. The desktop site
  includes a map provided by Google Maps API with markers corresponding to each saved location. Every saved location has 2 associated buttons-- "center" and 
  "delete spot". "Center" centers the map on the corresponding marker and populates weather information with a 7-day forecast provided by OpenWeather API. "Delete spot" 
  removes the location from the map and the session history such that references to the location are no longer displayed when the page is refreshed. Each saved location
  displays the user supplied name, species found, details, and the latitude/longitude.

## ADD SPOT:
  The add spot page provides a form for users to create a new foraging location. Name, species found, and spot location are required fields; spot details are optional.
  The interactive Google Map allows users to click on a specific location to save. Adding a marker on the map automatically centers the map on the new location.
  The "create new spot" button writes all fields to session data and redirects the user back to the main page where it is parsed and displayed.
  
## ABOUT:
  The about page includes a brief description of the app and the developers.
