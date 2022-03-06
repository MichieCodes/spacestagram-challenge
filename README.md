<p align="center">
  <h1 align="center">Spacestagram</h1>

  <p align="center">
    A NASA Astronomy Photo of the Day Viewer
  </p>
  <br/>
</p>

## About The Project

A React site that utilizes NASA's Astronomy Photo of the Day (APOD) API to showcase astronomy photos as posts. The posts allow the user to like/unlike and share images that peak their interest. When a user likes a post, the action is persisted to local storage so that upon page refresh, the user is still able to see the posts that they have liked (or unliked). This project is part of Shopify's Frontend Developer Intern Challenge.
[Demo](https://michiecodes.github.io/spacestagram-challenge/) | [Requirements](https://github.com/MichieCodes/spacestagram-challenge/blob/master/Front%20End%20Developer%20Intern%20Challenge.pdf) 

## Built With

- [React](https://github.com/facebook/react)
- [React Router](https://github.com/remix-run/react-router)
- [NASA APOD API](https://api.nasa.gov/#apod)

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. If hosting to Github Pages, edit the homepage property of your `package.json` to reflect your domain
```json
"homepage": "https://<GITHUB_BASE_URL>/<GITHUB_REPO_NAME>"
```
2. Install NPM packages
```sh
npm i
```

## Usage

- Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. Thanks to Vite's hmr, the app will automatically reload if you change any of the source files.
- Run `npm run deploy` to easily deploy the site to github pages. Before running this command ensure that you have changed the homepage in your package.json
