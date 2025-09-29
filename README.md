# Spotify AI Dashboard

A full-stack, responsive web application that provides users with a deep analysis of their Spotify listening habits, powered by the OpenAI API.

[**Live Demo**](https://spotify-ai-dashboard.vercel.app/)


![forgit](https://github.com/user-attachments/assets/5d24a376-eea4-42fe-b43d-e1039fc51f84)

## About The Project

This project is a feature-rich dashboard that visualizes a user's Spotify data in a clean, modern interface inspired by the official Spotify web player. It uses the Spotify API for secure user authentication and data retrieval, displaying personalized information like top artists and tracks.

The standout feature is a custom AI music analysis tool. By sending a user's listening data to the OpenAI API (`gpt-4o`), the application generates a sophisticated, beautifully worded narrative of their unique musical taste, offering insights that go beyond simple statistics.

This application was built from the ground up and successfully deployed to Vercel, demonstrating a complete development lifecycle from concept to a live, production-ready product.

---

## Key Features

* **Secure Spotify Authentication:** Full OAuth 2.0 implementation using NextAuth.js for safe and secure user login.
* **Personalized Data Visualization:** Dynamically fetches and displays the user's profile, top 5 artists, and top 5 tracks.
* **AI-Powered Music Analysis:** Integrates with the OpenAI API to provide users with a unique, narrative-based summary of their listening habits.
* **Fully Responsive Design:** A polished and intuitive user interface built with Tailwind CSS that works seamlessly across desktop and mobile devices.
* **Clean, Type-Safe Codebase:** Built with TypeScript to ensure maintainability and scalability.

---

## Tech Stack

This project was built with a modern, full-stack tech stack:

* **Framework:** [Next.js](https://nextjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **AI Integration:** [OpenAI API](https://openai.com/api/)
* **Spotify Integration:** [Spotify Web API](https://developer.spotify.com/documentation/web-api)
* **Deployment:** [Vercel](https://vercel.com/)

---

## Setup and Installation

To run this project locally, you will need to create a `.env.local` file in the root of the project and add the following environment variables:

```bash
# Spotify API Credentials
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a_long_random_string_for_session_encryption

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key
