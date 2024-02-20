# Overview

The project is web interface for displaying and managing Spotify playback. To do so, it can connect to Spotify Web API or locally running Spotify Desktop, or both in the same time. If both sources are enabled, player will prioritize Spotify Desktop fetching and address Spotify Web API only for endpoints not present in Spotify Desktop.

This player looks like this:

![Interface Example](/readme/interface.png)

App supports: _controlling playback_, _queue navigation_, and _likes management_. Basically it is possible via _Spotify WebAPI_, _Spotify Desktop_ (macOs only), or via _both_.

Additionally, frontend modules provide _dynamic color themes_ based on the album cover for current track and _clearance of the fetched data_ for better user experience.

![Colors Example](/readme/colors.png)

Also pay attention to the _order_ in which the tracks are displayed in the queue.

![Queue Example](/readme/order.png)

# Motivation

This project is a blueprint for future Übersicht desktop plugin, for which frontend part of this application should be rewritten into more low-level code. So stay tuned if you're interested in such plugin.

# Installation

Project is composed of two parts: _backend_, which connects to Spotify Desktop and Spotify OAUTH2, and _frontend_, which executes client code in the browser. You will need them both. They can be installed and deployed with a help of Docker containers, or, alternatively, set up manually on the host.

## Docker

You can simply mount and run application inside Docker containers. This is prefered and most simple way to use this repository.

First of all, сreate .env file with `FRONTEND_HOST`, `FRONTEND_PORT`, `BACKEND_HOST`, `BACKEND_PORT`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` in the root directory (the one with `docker-compose.yml` inside), like this:

```
ENABLE_DOCKER_DESKTOP=1
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
FRONTEND_HOST=0.0.0.0
FRONTEND_PORT=5000

SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
```

You can get Spotify keys following [this instruction](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) and using `REDIRECT_URI=http://{your_backend_host}:{your_backend_port}/auth/callback` during this configuration, e.g.: `http://0.0.0.0:8000/auth/callback`.

Also you can read about `ENABLE_DOCKER_DESKTOP` option in "Backend installation / Spotify Desktop" section of this readme.

Then run these commands:

```
docker-compose build
docker-compose up
```

Backend will be started with `uvicorn` and frontend with `nginx` servers.

## Backend

Project includes `pyproject.toml` with Poetry as installer, so you can directly install it on your host. You can choose to control playback by Spotify Web API, by Spotify Desktop app, or by both. Spotify Web API gives more information, but also a larger overhead. If both enabled, main fetches will be done with Spotify Desktop and additional fetches with Spotify Web API.

### Spotify Web API

If you want to enable Spotify Web API integration, you will need `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.

You can get Spotify keys following [this instruction](https://developer.spotify.com/documentation/web-api/tutorials/getting-started) and using `REDIRECT_URI=http://{your_backend_host}:{your_backend_port}` during this configuration, e.g.: `http://0.0.0.0:8000`.

### Spotify Desktop

_Only available for macOS now_.

If you want to enable Spotify Desktop interaction, you need a running Spotify Desktop application on you backend host.

By default, you can't control host application, such as Spotify Desktop by a process inside Docker container, so these endpoints are deactivated.

Whatsoever, if you run backend from inside Docker container, you also need to provide `ENABLE_SPOTIFY_DESKTOP=1` environment variable and set up SSH connection to your host.

**NB**: Basically establishing SSH connection between Docker container and host is not the best idea due to security concerns. However, if you are sure in your environment, actions and consequences, you can SSH with preinstalled `ssh-client` and `set-up` docker-compose helper service (uncomment it in `docker-compose.yml`).

### Poetry installation

To configure backend server with Poetry (python>=3.12.1 needed), just:

```
cd ./backend
poetry install
```

to provide envs, you can create .env file like this in the root directory (one level up from backend folder):

```
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8000
FRONTEND_HOST=0.0.0.0
FRONTEND_PORT=3000

SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx
```

Or you can pass these variables any other way you like. Some of these envs will also be available for frontend app, so you won't need to set it up twice. By default: `BACKEND_HOST=0.0.0.0`, `BACKEND_PORT=8000`, `FRONTEND_HOST=0.0.0.0`, `FRONTEND_PORT=3000`.

If Spotify keys are not provided, backend endpoints responsible for SpotifyAPI authorization and fetching are disabled.

Finally, you can start `uvicorn` server with:

```
poetry run start
```

## Frontend

To start dev server:

```
cd ./frontend
npm run start
```

To build `bundle.js`:

```
cd ./frontend
npm run build
```

Then serve generated `bundle.js` any way you like.

# Start

You may need to go to `http://{BACKEND_HOST}:{BACKEND_PORT}/auth/login` to authenticate backend for SpotifyAPI. Give all permissions needed.

If the application is not used for a long time, the procedure will have to be repeated.

# Settings

You can configure the app inside frontend interface:

![Settings Example](/readme/settings.png)

- Refetch Intevals

Spotify doesn't provide webhook for its API, so the player uses three long polling loops to do so. Reasonable values provided by default, but you can adjust theirs interval due to your requirements. Smaller intervals give more responsive experience, although there will be more request and higher risk of throttling triggering.

- Allow Queue Navigation

Spotify API sometimes returns queue different from the one in Spotify applications. So in some cases queue navigation will not work correctly. You can disable this functionality if this behaviour disorients you.

- Allow fetching from API / desktop app

Select the option where the information will be supplied from, or both. Note that desktop app fetching will work, only if also enabled at backend side.
