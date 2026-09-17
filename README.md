# Random Quote Machine

A React-based Random Quote Machine that fetches random quotes from the
DummyJSON Quotes API and displays them with the author. Each new quote
also changes the page's primary color.

## Live Project

**Live URL:**\
`https://codesandbox.io/p/sandbox/fcc-random-quote-machine-n2943w`

## GitHub Repository

**GitHub:**\
`https://github.com/satyam-7777/Random-Quote-Machine-FCC`

## Features

- Fetches a random quote from the DummyJSON Quotes API
- Displays the quote and author
- Generates a new quote on button click
- Changes the primary color with each new quote
- Shows a loading state while fetching a quote
- Shows an error message with a retry option if the API request fails
- Share quotes on:
  - X / Twitter
  - Threads
  - Reddit
- Responsive and simple user interface

## Tech Stack

- React
- JavaScript
- CSS
- Fetch API
- React Icons
- DummyJSON Quotes API

## How It Works

When the application loads, it automatically fetches a random quote.

A random number is generated within the available quote range and used
to request a quote from the API:

```text
https://dummyjson.com/quote/{quoteId}
```

The returned quote and author are displayed in the quote box.

A random color is also selected from the application's `colorData.js`
file and assigned to the CSS custom property:

```text
--primary-color
```

Clicking **New Quote** repeats the same process and displays another
quote with a new color.

## Social Sharing

The application creates shareable links using the current quote and
author.

### Twitter / X

Creates a tweet intent URL containing the quote.

### Threads

Creates a Threads post URL containing the quote.

### Reddit

Creates a Reddit submission URL with the quote and author.

The quote text is URL encoded before being added to the sharing links.

## Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Move into the project directory:

```bash
cd random-quote-machine
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will open at:

```text
http://localhost:3000
```

## Project Structure

```text
src/
├── App.js
├── colorData.js
├── index.js
└── styles.css
```

## Author

**Satyam Patel**

This project was created as part of my FreeCodeCamp Front End
Development Libraries certification.
