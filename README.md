# Regex Playground

React Next.js JAMstack hosted on Vercel.

Test a Regex pattern against test strings and see the match groups. App state is persisted to query params so your examples are shareable!

## [Visit the Demo](https://regex-playground.cloworm.vercel.app/)

## Screenshots

This example shows 3 different strings being tested against an email address regex pattern.

Since all playgrounds are shareable, [here's the link to see it for yourself](https://regex-playground.cloworm.vercel.app/?flags=g&matches%5B%5D=johnny.appleseed%40gmail.com&matches%5B%5D=i%20am%20not%20an%20email%20address&matches%5B%5D=i%20contain%20an%20email%40address.com%20but%20the%20regex%20has%20%5E%20and%20%24&pattern=%5E%5Ba-zA-Z0-9._%25-%5D%2B%40%5Ba-zA-Z0-9.-%5D%2B.%5Ba-zA-Z%5D%7B2%2C4%7D%24)

[<img width="500" alt="Example with 3 different strings tested against an email address regex" src="https://user-images.githubusercontent.com/5566310/103177378-f37f0d80-4847-11eb-8be6-2e850eb4b68a.png">](https://regex-playground.cloworm.vercel.app/?flags=g&matches%5B%5D=johnny.appleseed%40gmail.com&matches%5B%5D=i%20am%20not%20an%20email%20address&matches%5B%5D=i%20contain%20an%20email%40address.com%20but%20the%20regex%20has%20%5E%20and%20%24&pattern=%5E%5Ba-zA-Z0-9._%25-%5D%2B%40%5Ba-zA-Z0-9.-%5D%2B.%5Ba-zA-Z%5D%7B2%2C4%7D%24)

## Features

* Try out a regular expression against many test strings.
* App state is persisted to query params so your examples are shareable.
* Includes a reference of regexp special characters with usage examples.

## Technology Used

* [Next.js](https://nextjs.org/)
* [tailwindcss](tailwindcss)
* Hosted on [Vercel](https://vercel.com/)

## Development

1. Clone repo

      ```
      git clone https://github.com/cloworm/regex-playground-nextjs
      ```

2. Install Dependencies

      ```
      npm i
      ```

3. Run the dev server

      ```
      npm run dev
      ```
