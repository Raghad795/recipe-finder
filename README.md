# Recipe Finder

A simple web application that allows users to search for recipes and view detailed information about each meal.

## Live Demo

https://raghad795.github.io/recipe-finder/

## Features

* Search for recipes by name
* Display multiple recipe results
* View recipe images and categories
* View full recipe details
* Display ingredients and measurements
* Display cooking instructions
* Handle empty searches
* Handle recipes that are not found
* Handle API request errors

## Technologies Used

* HTML
* CSS
* JavaScript
* TheMealDB API

## How It Works

1. The user enters a recipe name.
2. The application sends a request to TheMealDB API.
3. The API returns an array of matching recipes.
4. The application dynamically creates recipe cards using JavaScript.
5. When the user clicks **View Recipe**, another API request retrieves the full recipe details.
6. Ingredients, measurements, and cooking instructions are displayed on the page.

## API

This project uses **TheMealDB API** for recipe data.

The application uses two API endpoints:

* Search meals by name
* Look up meal details by ID

## What I Learned

Through this project, I practiced:

* Working with REST APIs
* Using `fetch()`
* Using `async/await`
* Handling JSON responses
* Working with arrays and objects
* Creating DOM elements dynamically
* Handling API errors with `try/catch`
* Transforming API data into a cleaner structure
* Separating JavaScript code into reusable functions
* Working with multiple API endpoints

## Project Structure

```text
recipe-finder/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── index.js
└── README.md
```

## Run Locally

1. Clone or download the project.
2. Open the project folder in VS Code.
3. Open `index.html` using Live Server.
4. Search for a recipe and explore the results.
