# Pokemon Explorer (React + Vite)

A responsive Pokemon explorer built with React and Vite, powered by the PokeAPI. The app focuses on clean state-driven UI with practical hooks-based features such as search, pagination, favorites, and local persistence.

Live demo-"https://pokemonee1.netlify.app/"

## Features

- Pokemon listing with detailed card data (image, type, height, weight, speed, attack, experience, abilities)
- Search by name
- Recent search history (persisted in localStorage)
- Favorites toggle per Pokemon (persisted in localStorage)
- Filter to show only favorite Pokemon
- Client-side pagination
- Loading and error states
- Responsive layout for desktop and mobile

## Tech Stack

- React 19
- Vite 8
- JavaScript (ES Modules)
- CSS
- PokeAPI: https://pokeapi.co/

## Project Structure

```text
src/
	App.jsx
	Pokemon.jsx
	PokemonCard.jsx
	Favourite.jsx
	SearchHistory.jsx
	Pagination.jsx
	index.css
	main.jsx
```

## Getting Started

### 1) Clone the repository

```bash
git clone <your-repository-url>
cd pokemon_niraj_react
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start the development server

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev`: starts Vite development server
- `npm run build`: builds production assets
- `npm run preview`: previews the production build locally
- `npm run lint`: runs ESLint

## State Management Notes

The app currently uses `useState` and `useEffect` for:

- API data fetching
- Search input and filtering
- Search history persistence
- Favorites persistence
- Pagination control
- Loading and error handling

## API

Data source used in the app:

- `https://pokeapi.co/api/v2/pokemon?limit=124&offset=24`

Each Pokemon detail URL returned by the list endpoint is fetched to render richer card information.

## Future Improvements

- Type-based filtering
- Sort controls (name, weight, experience)
- Detail modal page per Pokemon
- Unit tests for core UI behavior
- Better accessibility audit and keyboard interaction refinements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request with a clear description

## License

No license file has been added yet. Add a `LICENSE` file if you plan to make usage terms explicit.
