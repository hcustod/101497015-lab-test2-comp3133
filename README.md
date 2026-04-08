# 101497015-lab-test2-comp3133

Angular COMP3133 lab app based on the SpaceX Mission theme. This project uses the SpaceX REST API and Angular Material to display launches, filter by launch year, and view mission details by flight number.

## Features

- Mission list page with SpaceX launch cards
- Launch year filter using Reactive Forms
- Mission details page with route parameter support
- Loading, error, and empty states
- Angular Material UI with cards, buttons, toolbar, select, and spinner

## Tech Stack

- Angular 21
- Angular Material
- TypeScript
- SpaceX REST API v3

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open the app in the browser:

```text
http://localhost:4200/
```

## Build

Run a production build:

```bash
npm run build
```

## API Information

This app uses the public SpaceX REST API:

- Base endpoint: `https://api.spacexdata.com/v3/launches`
- All launches: `GET /v3/launches`
- Launches by year: `GET /v3/launches?launch_year=2020`
- Launch by flight number: `GET /v3/launches/:flight_number`

The Angular service for API access is located at `src/app/network/spacexapi.service.ts`.

## App Structure

- `src/app/missionlist` - mission list view and filtering integration
- `src/app/missionfilter` - launch year filter component
- `src/app/missiondetails` - routed mission details page
- `src/app/models/mission.ts` - mission data interface
- `src/app/network/spacexapi.service.ts` - SpaceX REST API service

## Notes

- The project uses a classic NgModule-based Angular setup.
- Angular build currently passes successfully.
- Angular may report a bundle budget warning during build, but the application compiles without errors.
# 101497015-lab-test2-comp3133
