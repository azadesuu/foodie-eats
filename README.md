# COMP30022 IT Project

## Table of Contents

- [About our project](#about-our-project)
- [Application preview](#application-preview)
- [Built with](#built-with)
- [Run project](#run-project)
- [Project history](#project-history)
  - [Sprint 1](#sprint-1)
  - [Sprint 2](#sprint-2)
  - [Sprint 3](#sprint-3)
- [Test Cases](#test-cases)
- [Contributors](#contributors)

## About our project

FoodieEats is a web application that consolidates reviews of restaurants from users, mostly for personal use. After users log in using their email and password, they are able to create reviews, view other users' reviews, and bookmark specific reviews. Users can also visit the Community page, which displays the most recent reviews and the top recommended restaurants, based on the user’s current location. As an additional feature, users are also able to choose from a list of color themes for the website.

## Application preview

![alt text](github-images/community.png)
![alt text](github-images/my-reviews.png)
![alt text](github-images/post-a-review.png)
![alt text](github-images/profile.png)

## Built with

- MongoDB
- Express.js
- React
- Node.js

## Run project

1. Install Node.js and npm
2. Go to server directory ('cd server'), install dependencies ('npm install'), run server ('npm run start')
3. Go to client directory ('cd client'), install dependencies ('npm install'), run client ('npm run start')

## Project history

### Sprint 1

- Designed logo
- Created wireframe of website using Figma
- Created Navigation Bar, Login page, Register page
- Pull users’information for Profile page
- Pull review information for Community page

### Sprint 2

- Implemented a wide range of features:
  - Login/Signup/ResetPassword
  - Create/EditReview
  - View/Edit MyProfile
  - Change Theme/Password
  - Authenticated (Private) Routes

### Sprint 3

- Focusing on CSS, unit/integration testing(MochaJS), front-end testing(Cypress)
- Implementing last few features (toggleLike/Bookmark/flag, filter/search, deletereview, upload images)

## Test Cases

- Frontend Cypress testing and backend MochaJS testing integrated in CI/CD through GitHub actions
- Cypress test cases in client/cypress
- MochaJS test cases in server/mochaawesome-report/testReport.html
  - Final MochaJS report will be added to confluence

## Contributors

| Name                     | GitHub ID   | Role                 |
| ------------------------ | ----------- | -------------------- |
| Ying Shan Saw (Celene)   | azadesuu    | Full-Stack Developer |
| Joeann Chong             | joeannc     | Front-end Developer  |
| Claudya Laurance Cahyadi | ccahyadi    | Back-end Developer   |
| Anthony Ouch             | anthonyouch | Full-Stack Developer |
| Sandeepa Andra Hennadige | Lakvinu     | Full-Stack Developer |
