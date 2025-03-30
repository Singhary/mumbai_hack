<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Management - Student Portal</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
        }
        h1, h2, h3 {
            color: #2563eb;
        }
        h1 {
            text-align: center;
            margin-bottom: 10px;
        }
        .links-container {
            background-color: #dbeafe;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 30px;
            border-left: 5px solid #3b82f6;
        }
        .links-container p {
            margin: 8px 0;
            font-weight: 500;
        }
        .emoji-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        .emoji-title span {
            font-size: 1.5rem;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .feature-section {
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .feature-item {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
            align-items: center;
        }
        .tech-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
        }
        .tech-badge {
            background-color: #e0f2fe;
            color: #0369a1;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        code {
            background-color: #f1f5f9;
            padding: 2px 5px;
            border-radius: 4px;
            font-family: monospace;
            color: #0f172a;
            font-size: 0.9rem;
        }
        pre {
            background-color: #1e293b;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
        }
        pre code {
            background-color: transparent;
            color: inherit;
            padding: 0;
            display: block;
        }
        .code-header {
            display: flex;
            justify-content: space-between;
            background-color: #0f172a;
            padding: 10px 15px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            color: #e2e8f0;
            font-size: 0.9rem;
        }
        .code-header + pre {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            margin-top: 0;
        }
        .btn {
            background-color: #e2e8f0;
            border: none;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            cursor: pointer;
            color: #475569;
        }
        .btn:hover {
            background-color: #cbd5e1;
        }
        .team {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
            flex-wrap: wrap;
        }
        .team-member {
            text-align: center;
        }
        .team-member img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Event Management - Student Portal</h1>
        
        <div class="links-container">
            <p>🔗 Student Portal Deployed Link: <a href="#">link here</a></p>
            <p>🔗 Admin Portal Deployed Link: <a href="#">link here</a></p>
            <p>🎬 YouTube Video Link: <a href="#">link here</a></p>
        </div>

        <h2 class="emoji-title"><span>📌</span> Overview</h2>
        <p>
            The Event Management - Student Portal is a seamless platform where students can:
        </p>
        <ul>
            <li>🎭 View all upcoming events</li>
            <li>💳 Make secure payments via Stripe</li>
            <li>🤖 Interact with an AI-powered Chatbot for event details</li>
            <li>🎟️ Track purchased tickets and previous events</li>
            <li>📋 Experience smooth pagination for event listings</li>
        </ul>
        <p>
            Meanwhile, organizers/admins can effortlessly create and manage events. This project was built for a hackathon to ensure an efficient and user-friendly experience.
        </p>

        <h2 class="emoji-title"><span>🚀</span> Features</h2>
        <div class="features">
            <div class="feature-section">
                <h3>🎓 Student Side</h3>
                <div class="feature-item">
                    <span>🔍</span>
                    <div><strong>Explore Events:</strong> Browse through all available events.</div>
                </div>
                <div class="feature-item">
                    <span>✅</span>
                    <div><strong>Google Login:</strong> Secure authentication via Google OAuth.</div>
                </div>
                <div class="feature-item">
                    <span>💰</span>
                    <div><strong>Stripe Payment:</strong> Safe and fast transactions for ticket purchases.</div>
                </div>
                <div class="feature-item">
                    <span>🤖</span>
                    <div><strong>Chatbot Support:</strong> Get event-related info instantly.</div>
                </div>
                <div class="feature-item">
                    <span>📜</span>
                    <div><strong>View Past Events:</strong> Access previous purchases and ticket details.</div>
                </div>
                <div class="feature-item">
                    <span>📏</span>
                    <div><strong>Pagination:</strong> Smooth browsing experience with paginated event listings.</div>
                </div>
            </div>
            <div class="feature-section">
                <h3>🎟️ Organizer/Admin Side</h3>
                <div class="feature-item">
                    <span>📅</span>
                    <div><strong>Create Events:</strong> Organizers can list new events with ease.</div>
                </div>
                <div class="feature-item">
                    <span>🔗</span>
                    <div><strong>Webhooks Integration:</strong> Ensures real-time updates for events and payments.</div>
                </div>
                <div class="feature-item">
                    <span>📤</span>
                    <div><strong>UploadThing:</strong> Easily manage event-related media uploads.</div>
                </div>
            </div>
        </div>

        <h2 class="emoji-title"><span>🛠️</span> Technologies Used</h2>
        <div class="tech-container">
            <div class="tech-badge"><span>⚛️</span> Next.js</div>
            <div class="tech-badge"><span>🔐</span> Google OAuth</div>
            <div class="tech-badge"><span>💳</span> Stripe</div>
            <div class="tech-badge"><span>🤖</span> Chatbot (Gemini AI)</div>
            <div class="tech-badge"><span>📜</span> Pagination</div>
            <div class="tech-badge"><span>📂</span> UploadThing</div>
            <div class="tech-badge"><span>🔄</span> Webhooks</div>
            <div class="tech-badge"><span>🧠</span> Gemini AI</div>
        </div>

        <h2 class="emoji-title"><span>⚡</span> Getting Started</h2>
        <p>Follow these steps to set up the project locally:</p>
        
        <h3>1️⃣ Clone the Repository</h3>
        <div class="code-header">
            <span>bash</span>
            <div>
                <button class="btn">Copy</button>
                <button class="btn">Edit</button>
            </div>
        </div>
        <pre><code>git clone https://github.com/your-repo/event-management.git
cd event-management</code></pre>
        
        <h3>2️⃣ Install Dependencies</h3>
        <div class="code-header">
            <span>bash</span>
            <div>
                <button class="btn">Copy</button>
                <button class="btn">Edit</button>
            </div>
        </div>
        <pre><code>npm install</code></pre>
        
        <h3>3️⃣ Set Up Environment Variables</h3>
        <p>Create a .env.local file in the root directory and add the following:</p>
        <div class="code-header">
            <span>makefile</span>
            <div>
                <button class="btn">Copy</button>
                <button class="btn">Edit</button>
            </div>
        </div>
        <pre><code>MONGODB_URI=
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
EMAIL_PASS=</code></pre>
        
        <h3>4️⃣ Start the Development Server</h3>
        <div class="code-header">
            <span>bash</span>
            <div>
                <button class="btn">Copy</button>
                <button class="btn">Edit</button>
            </div>
        </div>
        <pre><code>npm run dev</code></pre>
        <p>The app will be live at <a href="http://localhost:3000">http://localhost:3000</a></p>
        
        <h2 class="emoji-title"><span>📦</span> Code Structure</h2>
        <div class="code-header">
            <span>bash</span>
            <div>
                <button class="btn">Copy</button>
                <button class="btn">Edit</button>
            </div>
        </div>
        <pre><code>📦 event-management-student
├── 📂 components      # Reusable UI components
├── 📂 pages           # Application pages
├── 📂 utils           # Helper functions
├── 📂 hooks           # Custom React hooks
├── 📂 public          # Static assets
├── 📂 styles          # Global styles
├── 📄 .env.local      # Environment variables
├── 📄 package.json    # Dependencies and scripts
└── 📄 README.md       # Project documentation</code></pre>
        
        <div style="display: flex; justify-content: space-between; margin-top: 30px; gap: 20px;">
            <div style="flex: 1; text-align: center;">
                <h3>🎭 Event Listing</h3>
                <div style="background-color: #f1f5f9; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                    <p>Event listing screenshot here</p>
                </div>
            </div>
            <div style="flex: 1; text-align: center;">
                <h3>💳 Payment Page</h3>
                <div style="background-color: #f1f5f9; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                    <p>Payment page screenshot here</p>
                </div>
            </div>
        </div>
        
        <h2 class="emoji-title"><span>👨‍💻</span> Built By</h2>
        <div class="team">
            <div class="team-member">
                <img src="/api/placeholder/80/80" alt="Aryan Singh" />
                <h3>Aryan Singh</h3>
            </div>
            <div class="team-member">
                <img src="/api/placeholder/80/80" alt="Deo Sagar" />
                <h3>Deo Sagar</h3>
            </div>
            <div class="team-member">
                <img src="/api/placeholder/80/80" alt="Romit Dey" />
                <h3>Romit Dey</h3>
            </div>
        </div>
        
        <div class="footer">
            <p>🚀 Built with passion for Hackathons! Happy Coding! 💙</p>
        </div>
    </div>
</body>
</html>
