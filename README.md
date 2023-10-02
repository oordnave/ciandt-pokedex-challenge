# Pokédex App

``![Simple Pokémon App](https://cloud.githubusercontent.com/assets/711743/25648417/57cd2c0c-2fe9-11e7-8753-b60ea2656faf.png)``

Welcome to the Pokédex App! This React-based web application allows you to explore and discover information about all your favorite Pokémon from the PokéApi. With a user-friendly interface and several exciting features, you can filter Pokémon by their types, search for specific monsters, view detailed information about each Pokémon, and even save your favorite ones to your LocalStorage.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Description

The Pokédex App is an interactive web application that leverages React, async/await, promises, React Hooks, Tailwind CSS, ESLint, Prettier, and Vite for an optimal development experience. It provides the following key functionalities:

- **Pokémon Filtering**: You can filter Pokémon by their types, making it easy to find Pokémon of a specific element, such as Fire, Water, or Grass.

- **Search Feature**: The search functionality allows you to quickly locate a specific Pokémon by name. It uses asynchronous requests to fetch data efficiently from the PokéApi.

- **Detailed Pokémon Information**: Click on a Pokémon card to access detailed information about that specific Pokémon, including base stats.

- **Favorites with LocalStorage**: Love a Pokémon? You can add it to your favorites list, which is stored locally in your browser using LocalStorage. Your favorite Pokémon will be accessible every time you visit the app.

## Installation

To run this application locally on your machine, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/oordnave/ciandt-pokedex-challenge
   ```

2. Navigate to the project directory:

   ```bash
   cd pokemon-explorer-app
   ```

3. Install project dependencies using [Node.js](https://nodejs.org/):

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and access the app at `http://localhost:5173`.

## Features

- **Pokémon Type Filtering**: Filter Pokémon by type, making it easy to explore Pokémon of a specific element.

- **Search Functionality**: Search for Pokémon by name using the search bar.

- **Detailed Pokémon Information**: Access detailed information about each Pokémon, including its abilities, types, and base stats.

- **Add to Favorites**: Save your favorite Pokémon to your favorites list using LocalStorage for easy access.

## Usage

1. Launch the Pokédex App by following the installation instructions.

2. Explore Pokémon:
   - Filter Pokémon by selecting the button.
   - Search for Pokémon by name using the search bar.
   - Click on a Pokémon card to view detailed information.

3. Favorite Pokémon:
   - To add a Pokémon to your favorites, click the button icon on the Pokémon card.
   - Access your favorite Pokémon by clicking the "Favorites" link in the navigation menu.

## Technologies Used

- React
- Async/Await and Promises
- React Hooks
- Tailwind CSS
- ESLint and Prettier
- Vite

## Contributing

Contributions to the Pokédex App are welcome! Feel free to open issues or submit pull requests to help improve the app. Make sure to follow the [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code for personal or commercial projects.
