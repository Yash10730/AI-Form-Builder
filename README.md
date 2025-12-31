# AI-Form-Builder
AI-Powered Drag & Drop Form Builder
📌 Project Description

This project is a full-stack AI-powered Form Builder that allows users to dynamically generate forms using AI suggestions, rearrange fields via drag-and-drop, collect responses, and view analytics dashboards.

The application demonstrates how AI can assist in form creation while maintaining a clean separation between frontend, backend, database, and analytics layers.

🎯 Key Features
✅ AI-Assisted Form Generation

User enters a form purpose (e.g., Employee Feedback, Customer Survey)

AI suggests:

Question phrasing

Field types (text, radio, etc.)

Uses a free rule-based AI fallback



✅ Drag & Drop Form Builder

Built using React + react-grid-layout

Fields can be:

Reordered visually

Dragged to change layout

Demonstrates interactive UI behavior

✅ MongoDB Storage

Form configurations stored in MongoDB

User responses stored with timestamps

Enables persistent data and historical analytics

✅ Response Collection

Users can fill generated forms

Responses are submitted through REST APIs

Supports multiple submissions per form

✅ Analytics Dashboard

Visual summary of responses

Bar charts showing response distribution

Analytics available for:

Individual forms

Overall responses

✅ Example AI-Generated Forms (Demo)

Previously generated forms are listed

Users can select any saved form

View collected responses and analytics

Satisfies demo & evaluation requirements

🧰 Tech Stack
Frontend

React.js

react-grid-layout

Chart.js

Axios

Backend

Node.js

Express.js

Database

MongoDB

Mongoose

AI Integration

Claude API (optional)

Free rule-based AI fallback (default)

📁 Project Structure
ai-form-builder/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
│
└── README.md

⚙️ Setup Instructions
1️⃣ Backend Setup
cd backend
npm install
node server.js


Create .env file:

MONGO_URI=mongodb://127.0.0.1:27017/aiformbuilder
AI_MODE=FREE

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🤖 AI Integration Note (Important)

This project supports Claude AI for intelligent form generation.

To avoid paid API usage during evaluation, a free rule-based AI fallback is enabled by default.

Claude can be enabled by setting:

AI_MODE=CLAUDE
CLAUDE_API_KEY=your_api_key_here


The system is designed to be AI-provider agnostic, similar to real-world production systems.

🔌 Backend API Endpoints
Method	Endpoint	Description
POST	/api/ai/suggest	Generate AI form fields
POST	/api/forms	Save form configuration
GET	/api/forms	Fetch all forms
POST	/api/responses/:formId	Submit responses
GET	/api/analytics/:formId	Form-specific analytics
GET	/api/analytics	Overall analytics
🧪 Demo Flow

Enter form purpose

Generate AI-based form

Reorder fields using drag & drop

Submit responses

Select a saved form

View analytics dashboard

📈 Learning Outcomes

Full-stack MERN development

AI integration design (free + paid modes)

REST API development

MongoDB schema modeling

Drag-and-drop UI implementation

Analytics visualization

🏁 Conclusion

This project fulfills all required deliverables:

AI-assisted form creation

Drag-and-drop form builder

MongoDB persistence

Response analytics dashboard

Demo-ready implementation