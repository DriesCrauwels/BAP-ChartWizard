# Interactive Chart Wizard for the Web

![alt text](http://i.imgur.com/t9n96GO.jpg?1 "Poster")


## Introduction
This is the repository of an interactive chart wizard application for the web written by Dries Crauwels for his bachelor assignment. It reads simple .CSV files and visualizes this data into charts using the popular D3.JS library. These charts are built in pure HTML using SVG elements and can be exported as SVG, HTML or PNG to use in your own documents. The whole application uses only web standards.

## Setting things up
The easiest way to get the website up and running is to pull the source code and place it into the root folder of your local web server. There are many ways of doing this.
### For Windows
...
### For Linux
...
### For Mac
...

## Architecture
All the main D3 code is located in the chartwizard-library.js file. The remaining code is in the HTML file itself of each wizard.

...


## TO DO
Below will be a list of things to do to expand this application and improve the overall quality and its capabilities.
### General
* Add the remaining basic chart wizards
* Add more customization features to every basic chart wizard
* Add complex chart wizards
* Improve the infographics wizard
  * Add each miniwizard for every basic chart
  * Make it possible to select each element individually
  * Add a function to sort out the DIV and SVG elements to re-arrange them according to the Z-index
  * Add the export function
* Add custom input fields for the user to fill in all the values so you don't need a CSV file to build a chart.

...

### Code
* Change every .Generate function of each chart by adding all the needed parameters so when we upload new data the previous values such as color and scale for example don't get resetted.
* Put all the D3 code of the infographic wizard in the chartwizard-library.js library.


...
