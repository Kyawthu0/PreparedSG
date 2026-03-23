# PreparedSG – Mobile Application for Local Disaster Preparedness and Response

## Overview
PreparedSG is a mobile application developed to support disaster preparedness and basic emergency response. The application is designed to provide users with clear, accessible, and dependable support through a combination of offline emergency guidance, preparedness information, emergency contacts, and a location-aware offline map. In addition, the application includes an alerts and advisories section that links users to authoritative online information sources when connectivity is available.

A central design principle of the application is the separation between offline core functionality and online supplementary content. This allows the most essential features of the system to remain accessible even when internet connectivity is weak or unavailable.

## Implemented Features
The current version of PreparedSG includes the following features:

- **Emergency Guidance**  
  Step-by-step guidance for selected disaster scenarios, including floods, earthquakes, and fires.

- **Preparedness Checklist**  
  A general checklist of preparedness items intended to support readiness before an emergency occurs.

- **Emergency Contacts**  
  A simple and accessible module for viewing important emergency-related contact information.

- **Offline Map**  
  A map-based feature that displays nearby safe zones using locally stored coordinate data and on-device distance calculation.

- **Alerts & Advisories**  
  A section that directs users to authoritative external sources for emergency-related updates and advisories.

## Technologies Used
The project was developed using the following technologies:

- React Native
- Expo
- TypeScript
- react-native-maps
- expo-location
- AsyncStorage

## System Requirements
Before running the application, ensure that the following are available:

- Node.js
- npm
- Expo Go on a physical mobile device, or an Android/iOS emulator

## Installation
Install the project dependencies using the following command:

```bash
npm install
npx expo start
