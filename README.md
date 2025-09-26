# SkillSwap MVP

A React Native (Expo) prototype of **SkillSwap** — a peer-to-peer skill exchange app where students can trade skills (e.g., tutoring, design help, music lessons) without money.

## Features
- **Authentication flow**: Login and Signup with simple mock accounts
- **Home feed**: Search and filter skill offers by keyword or category
- **Offer details**: View details, see available slots, and book a session
- **Create offer**: Post a new skill you want to share
- **Profile**: View your info, your offers, booked sessions, and logout

## Screens
1. **Login / Signup**
2. **Home Feed**
3. **Offer Details**
4. **Create Offer**
5. **Profile**

## Tech Stack
- [Expo](https://expo.dev/) (React Native runtime)
- [React Navigation](https://reactnavigation.org/) (stack + bottom tabs)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/) (icons)

## Installation

1. Install Expo CLI (if not already):
   ```bash
   npm install -g expo-cli
Clone this repo:


git clone https://github.com/your-username/skillswap-mvp.git
cd skillswap-mvp
Install dependencies:


npm install
If you created a fresh Expo project, also run:

npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-safe-area-context react-native-screens @expo/vector-icons
Start the app:

npx expo start
This will open the Expo Dev Tools. Scan the QR code with the Expo Go app on your phone, or run on an emulator.

Usage
Log in with default credentials:

Email: test@student.com

Password: 12345

Or sign up with a new mock account.

Explore the Home feed, filter by category, and open offers.

Book sessions, create offers, and manage everything from your Profile.

Use the Logout button in Profile to return to the auth flow.

Project Structure

Frontend_MVP/             # Main React Native app (5 screens)
Screenshots/
README.md           # This file
SRS.docx         # Software Requirements Specification
UML_Diagrams  # UML diagrams (use case, class)
Notes
This is an MVP prototype with in-memory data (no backend).

Sessions and offers reset when the app restarts.

You can extend it with Firebase or a Node.js backend to persist data.

👩‍💻 Built for Assignment 1: Skillswap System (SRS, UML, MVP Frontend).
