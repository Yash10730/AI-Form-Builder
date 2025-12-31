import { useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./App.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const API_BASE = "http://localhost:5002";

export default function App() {
  const [purpose, setPurpose] = useState("");
  const [fields, setFields] = useState([]);
  const [answers, setAnswers] = useState({});
  const [formId, setFormId] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [view, setView] = useState("builder"); // builder | analytics
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ===============================
  // Generate AI Form
  // ===============================
  const generateForm = async () => {
    if (!purpose.trim()) {
      alert("Please enter form purpose");
      return;
    }

    setLoading(true);

    const aiRes = await axios.post(`${API_BASE}/api/ai/suggest`, { purpose });
    const formRes = await axios.post(`${API_BASE}/api/forms`, {
      title: purpose,
      fields: aiRes.data
    });

    setFields(aiRes.data);
    setFormId(formRes.data._id);
    setAnswers({});
    setAnalytics(null);
    setSubmitted(false);
    setView("builder");
    setLoading(false);
  };

  // ===============================
  // Handle Input
  // ===============================
  const handleChange = (label, value) => {
    setAnswers(prev => ({ ...prev, [label]: value }));
  };

  // ===============================
  // Submit Response
  // ===============================
  const submitForm = async () => {
    await axios.post(`${API_BASE}/api/responses/${formId}`, answers);

    setSubmitted(true);
    setFields([]);
    setAnswers({});
    setPurpose("");
    setView("builder"); // stay on builder
  };

  // ===============================
  // Load Analytics
  // ===============================
  const loadAnalytics = async () => {
    const res = await axios.get(`${API_BASE}/api/analytics/${formId}`);
    setAnalytics(res.data);
    setView("analytics");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>AI Form Builder</h1>

        {/* NAV */}
        <div className="nav">
          <button onClick={() => setView("builder")}>Form Builder</button>
          <button onClick={loadAnalytics} disabled={!formId}>
            Analytics
          </button>
        </div>

        {submitted && (
          <div className="success">✅ Thank you for your feedback</div>
        )}

        {/* ================= FORM BUILDER ================= */}
        {view === "builder" && (
          <>
            <input
              className="purpose-input"
              placeholder="Enter form purpose (e.g. Employee Feedback)"
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
            />

            <button
              className="primary-btn"
              onClick={generateForm}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate with AI"}
            </button>

            {/* Render Form */}
            {fields.map((field, i) => (
              <div className="field-box" key={i}>
                <strong className="label-text">{field.label}</strong>

                {field.type === "text" && (
                  <input
                    className="field-input"
                    value={answers[field.label] || ""}
                    onChange={e =>
                      handleChange(field.label, e.target.value)
                    }
                  />
                )}

                {field.type === "radio" &&
                  field.options.map(opt => (
                    <label key={opt} className="radio-row">
                      <input
                        type="radio"
                        checked={answers[field.label] === opt}
                        onChange={() =>
                          handleChange(field.label, opt)
                        }
                      />
                      {opt}
                    </label>
                  ))}
              </div>
            ))}

            {fields.length > 0 && (
              <button className="submit-btn" onClick={submitForm}>
                Submit Response
              </button>
            )}
          </>
        )}

        {/* ================= ANALYTICS ================= */}
        {view === "analytics" && analytics && (
          <>
            <h2>Analytics Dashboard</h2>
            <p>Total Responses: {analytics.totalResponses}</p>

            {Object.entries(analytics.analytics).map(([question, stats]) => {
              const data = {
                labels: Object.keys(stats),
                datasets: [
                  {
                    label: "Responses",
                    data: Object.values(stats),
                    backgroundColor: "#2563eb"
                  }
                ]
              };

              return (
                <div className="analytics-box" key={question}>
                  <strong>{question}</strong>
                  <Bar data={data} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
