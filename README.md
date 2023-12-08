# Brest Bar - Discover Bars in Brest

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), designed to help users discover and learn more about bars in Brest. It features an interactive map, detailed information about each bar, and user location services.

This is a copy of brest.bar by Lumy. This repository is intended for recruitment process.

## Features

- **Interactive Map**: Utilizes Mapbox GL JS to provide an interactive map experience.
- **Bar Information**: Displays detailed information about each bar, including address, rating, and opening hours.
- **Location Services**: Integrates geolocation to display bars near the user's current location.
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.
- **Font Optimization**: Uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) for optimized loading of the Inter Google Font.

### Prerequisites

- Node.js
- npm/yarn/pnpm/bun

## Getting Started

Clone the repo:

```bash
git clone https://your-repository-url
```

Next, install NPM Package:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Or run deployement server:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js and libs used take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Mapbox gl js](https://docs.mapbox.com/mapbox-gl-js/guides/) - Mapbox docs for the maps
- [Tailwind](https://tailwindcss.com/) & [tailwind UI](https://tailwindui.com/) - A way to extend css possibility

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Notes

- **Responsive Design**: The responsiveness is not fully implemented yet. Specifically, the functionality to close the drawer menu is missing.
- **Testing and Documentation**: As this project is part of a recruitment process and not a production project, unit tests and extensive documentation are not included. However, the code is well-commented to facilitate understanding and further development.
- **Security**: An XSS vulnerability identified in the Mapbox documentation has been addressed and corrected in this application.

## Credits

Thank to Lumy for allowing me replicate brest.bar