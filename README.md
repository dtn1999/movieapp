# Simple Nextjs App

This is a simple Next.js starter app to test Junior Frontend Developer candidates. The goal is to create a simple app
that fetches data from a public API and displays it in a user-friendly way.

## Requirements

- Node.js (v18 or later) [nvm](https://github.com/nvm-sh/nvm)
- Git

## Getting Started

In the assets folder, you will find pictures of the design, which can be found at the following
link: https://www.figma.com/community/file/1504425310188716454/movie-app

## Instructions

1. Clone the repository:

```bash
   git clone https://github.com/dtn1999/movieapp.git
   cd movieapp
```

2. Install dependencies:

```bash
   npm install # If you don't use npm, you can use yarn or pnpm
```

3. Run the development server:

```bash
   npm run dev
```

## API

```bash
# Search endpoint
curl --request GET \
     --url 'https://api.themoviedb.org/3/search/movie?query=manga&include_adult=false&language=en-US&page=1' \
     --header 'Authorization: Bearer ${API_TOKEN}' \
     --header 'accept: application/json'
     
# Movie details endpoint
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/238277?language=en-US' \
     --header 'Authorization: Bearer ${API_TOKEN}' \
     --header 'accept: application/json'
     
# Get people credited in a movie
curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/238277/credits?language=en-US' \
     --header 'Authorization: Bearer ${API_TOKEN}' \
     --header 'accept: application/json'
```

To get the image URL, add the following to the base URL:

```bash
https://image.tmdb.org/t/p/original/[poster_path]
```

## Tasks

- [ ] When the user types in the search bar, make a request to the TMDB API to get a list of movies that match the search term.
- [ ] Display the list of movies in a grid format, showing the movie title, poster image, release date, and vote average.
- [ ] When the user clicks on a movie, navigate to a details page that shows more information about the movie, including the overview, genres, and cast.
