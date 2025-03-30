🎉 Event Management - Student Portal
📌 Overview
The Event Management - Student Portal is a seamless platform where students can:

🎭 View all upcoming events

💳 Make secure payments via Stripe

🤖 Interact with an AI-powered Chatbot for event details

🎟️ Track purchased tickets and previous events

📋 Experience smooth pagination for event listings

Meanwhile, organizers/admins can effortlessly create and manage events. This project was built for a hackathon to ensure an efficient and user-friendly experience.

🚀 Features
🎓 Student Side
🔍 Explore Events: Browse through all available events.

✅ Google Login: Secure authentication via Google OAuth.

💰 Stripe Payment: Safe and fast transactions for ticket purchases.

🤖 Chatbot Support: Get event-related info instantly.

📜 View Past Events: Access previous purchases and ticket details.

📏 Pagination: Smooth browsing experience with paginated event listings.

🎟️ Organizer/Admin Side
📅 Create Events: Organizers can list new events with ease.

🔗 Webhooks Integration: Ensures real-time updates for events and payments.

📤 UploadThing: Easily manage event-related media uploads.

🛠️ Technologies Used
⚛️ Next.js - Fast & efficient frontend framework

🔐 Google OAuth - Secure authentication

💳 Stripe - Payment processing

🤖 Chatbot (Gemini AI) - AI-powered assistance

📜 Pagination - Better user experience

📂 UploadThing - File uploads made easy

🔄 Webhooks - Real-time event & payment updates

🧠 Gemini AI - AI-powered chatbot for enhanced interaction

⚡ Getting Started
Follow these steps to set up the project locally:

1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-repo/event-management.git
cd event-management
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env.local file in the root directory and add the following:

makefile
Copy
Edit
MONGODB_URI=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
WEBHOOK_SECRET=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
GEMINI_API_KEY=
EMAIL_USER=
EMAIL_PASS=
4️⃣ Start the Development Server
bash
Copy
Edit
npm run dev
The app will be live at http://localhost:3000

📦 Code Structure
bash
Copy
Edit
📦 event-management-student
├── 📂 components      # Reusable UI components
├── 📂 pages           # Application pages
├── 📂 utils           # Helper functions
├── 📂 hooks           # Custom React hooks
├── 📂 public          # Static assets
├── 📂 styles          # Global styles
├── 📄 .env.local      # Environment variables
├── 📄 package.json    # Dependencies and scripts
└── 📄 README.md       # Project documentation
🎭 Event Listing	💳 Payment Page
	
👨‍💻 Built By
Aryan Singh

Deo Sagar

Romit Dey

🚀 Built with passion for Hackathons! Happy Coding! 💙
