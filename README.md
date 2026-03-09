# Anonymous Message Board

A simple anonymous message board built as a **learning project for Passport.js authentication**.

## Overview

This application allows users to post messages anonymously on a shared message board. Messages are visible to everyone, but the **identity of the author is hidden unless the viewer is logged in**.

The main purpose of this project is to demonstrate how authentication works using **Passport.js with the Local Strategy** and how logged-in users can receive additional benefits compared to anonymous visitors.

## Features

- Anonymous message posting
- Public message board visible to all users
- Author identity hidden for non-logged-in users
- Login system using **Passport.js Local Strategy**
- User authentication with username/email and password
- Logged-in users can see **who wrote each message**
- Demonstrates protected user features after authentication

## Learning Goals

This project was created to practice and understand:

- Authentication using **Passport.js**
- Implementing **Local Strategy**
- Session-based authentication
- Protecting routes and content
- Showing different UI/content based on login status
- Basic user benefits after authentication

## Technologies Used

- Node.js
- TypeScript
- Express.js
- Passport.js
- Passport Local Strategy
- PostgreSQL 
- HTML / CSS / ejs

