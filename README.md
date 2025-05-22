
# Tax Optimisation Tool

This project is a React-based tool to help visualize and understand the impact of tax-loss harvesting on capital gains. It displays your holdings, their potential short-term and long-term gains/losses, and allows you to simulate selling these holdings to see the after-harvesting capital gains and potential tax savings.

## Features

* **Pre Harvesting View:** Shows your initial capital gains (short-term and long-term profits and losses).
* **Holdings Table:** Lists your assets with their holdings, current price, and potential short-term and long-term gains/losses.
* **Selectable Holdings:** Allows you to select holdings to simulate selling them.
* **Amount to Sell:** You can specify the amount of each selected holding you want to sell.
* **After Harvesting View:** Displays the calculated capital gains after considering the simulated sales.
* **Potential Savings:** Shows the potential tax savings based on the difference between pre and after harvesting capital gains.
* **Loss Opportunity Highlighting:** Rows in the holdings table with potential losses are visually highlighted.

## Getting Started

1.  **Clone the repository** (if you have one, otherwise just proceed to the next steps if you have the project files locally).
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies.**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server.**
    ```bash
    npm start
    # or
    yarn start
    ```

    This will start the application in your browser, usually at `http://localhost:3000`.

## Data

The application uses the following data files:

* `src/data/capitalGainsData.js`: Contains the initial pre-harvesting capital gains (short-term and long-term profits and losses).
* `src/data/holdingsData.js`: Contains the data for your various holdings, including coin details, holding amounts, current prices, and potential gains/losses.

You can modify these files to reflect your actual financial data.

## Components

* `src/App.js`: The main component that manages the state and logic for the application.
* `src/components/CapitalGainsCard.js`: Displays the "Pre Harvesting" and "After Harvesting" capital gains information.
* `src/components/HoldingsTable.js`: Renders the table of your holdings and allows for selection and specifying amounts to sell.

## Functionality

* Selecting a holding in the table (by checking the checkbox) simulates selling that entire holding for tax-loss harvesting if no specific "Amount to Sell" is entered.
* Entering an "Amount to Sell" for a selected holding calculates the after-harvesting gains based on that sold amount.
* The "After Harvesting" section updates to reflect the impact of these simulated sales on your capital gains.
* If the "After Harvesting" capital gains are lower than the "Pre Harvesting" gains, a message indicating potential savings is displayed.
