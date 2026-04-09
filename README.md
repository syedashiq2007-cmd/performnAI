# PerfIQ — AI-Powered Performance Management System

> A smart performance management system that standardizes evaluation criteria and generates AI-powered reviews. It helps organizations make fair, data-driven talent decisions with built-in bias detection.

---

## 📌 Project Overview

**PerfIQ** is a full-stack web application designed to automate and standardize the entire employee performance review lifecycle. It aggregates 360° feedback from multiple sources, analyzes performance data, and generates consistent, unbiased reviews using AI — eliminating the subjectivity and inefficiency of traditional performance management.

---

## 🚨 Problem Statement

Traditional performance reviews suffer from:

- **Recency Bias** — managers overweight recent events and forget full-year contributions
- **Halo Effect** — one strong trait inflates ratings across all competencies
- **Manager Subjectivity** — inconsistent standards across teams and departments
- **Lack of Calibration** — no mechanism to compare ratings fairly across the org
- **Gender & Racial Bias** — vague language like "attitude" or "cultural fit" masks discrimination
- **Time-Consuming Process** — manual review writing is slow and low quality under pressure

**PerfIQ solves all of these** with structured rubrics, multi-source feedback, automated bias detection, and AI-generated reviews grounded in evidence.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 📋 Standardized Evaluations | 8-competency rubric with 1–5 ratings and evidence fields |
| 🔄 360° Feedback | Aggregates self, manager, and peer assessments with weighted scoring |
| 🤖 AI Review Generator | Generates structured, bias-checked performance reviews automatically |
| 🎯 Goal Setting | SMART goal tracker with Kanban board and progress monitoring |
| 📈 Development Plans | Individual Development Plans (IDPs) with milestones and resources |
| 📊 Performance Analytics | Charts for trends, distributions, and team comparisons |
| ⚠️ Bias Detection | Flags vague language, rating inconsistencies, and demographic gaps |
| 🔐 Role-Based Access | Employee, Manager, and HR Admin views |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js / Antigravity |
| Styling | Tailwind CSS |
| AI Engine | Claude API (Anthropic) |
| Backend | Node.js / Supabase |
| Database | PostgreSQL |
| Auth | Supabase Auth (Role-Based) |
| Charts | Recharts / Chart.js |
| Export | PDF generation |

---

## 📁 Project Structure

```
perfiq/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx          # Overview metrics and review cycle progress
│   │   ├── Employees.jsx          # Employee directory with filters
│   │   ├── Evaluations.jsx        # Competency rating forms
│   │   ├── Feedback360.jsx        # Multi-source feedback aggregation
│   │   ├── Analytics.jsx          # Performance charts and bias panel
│   │   ├── GoalSetting.jsx        # SMART goal Kanban board
│   │   ├── DevelopmentPlan.jsx    # Individual Development Plans
│   │   └── ReviewGenerator.jsx    # AI-powered review output
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── EmployeeCard.jsx
│   │   ├── CompetencyForm.jsx
│   │   ├── GoalCard.jsx
│   │   ├── BiasPanel.jsx
│   │   └── AIReviewOutput.jsx
│   ├── hooks/
│   ├── utils/
│   └── api/
├── public/
├── README.md
└── package.json
```

---

## 👤 User Roles

### Employee
- View their own profile, goals, and development plan
- Submit self-assessment feedback
- Track personal goal progress

### Manager
- Access all direct reports' profiles and evaluations
- Submit competency ratings and written feedback
- Approve and co-create employee goals
- Generate AI reviews for their team

### HR Admin
- Full access to all employees, analytics, and reports
- Run bias detection checks across the organization
- Manage review cycles and calibration
- Export reviews as PDF

---

## 📊 Evaluation Competencies

Each employee is rated 1–5 across 8 standardized competencies:

1. **Communication** — clarity, listening, written and verbal expression
2. **Collaboration** — teamwork, cross-functional partnership
3. **Technical Skills** — role-specific expertise and proficiency
4. **Initiative** — proactivity, ownership, going beyond the role
5. **Delivery Quality** — accuracy, reliability, meeting deadlines
6. **Leadership** — influence, mentoring, decision-making
7. **Problem Solving** — analytical thinking, creativity, resilience
8. **Adaptability** — response to change, learning agility

**Rating Scale:**
- 1 = Below Expectations
- 2 = Developing
- 3 = Meets Expectations
- 4 = Exceeds Expectations
- 5 = Outstanding

---

## 🔄 360° Feedback Weighting

| Source | Weight |
|---|---|
| Manager Review | 50% |
| Self Assessment | 25% |
| Peer Feedback (avg) | 25% |

> ⚠️ Any score gap greater than **1.5 points** between sources triggers a calibration alert.

---

## 🤖 AI Review Structure

When "Generate Review" is triggered, the AI produces:

1. **Overall Performance Summary** — 2–3 sentence overview
2. **Key Strengths** — 3 evidence-based bullet points
3. **Areas for Growth** — 3 constructive, actionable points
4. **Goal Achievement Assessment** — progress against set objectives
5. **Development Recommendations** — 2–3 concrete next steps
6. **Final Rating** — numeric score with label

All output is checked for bias before display.

---

## ⚠️ Bias Detection Checks

| Check | Trigger |
|---|---|
| Language Bias | Flags terms like "attitude", "aggressive", "cultural fit" |
| Rating Consistency | Manager scores 20%+ above/below org average |
| Demographic Disparity | Any group averages 0.5+ points below org average |
| Recency Bias | All written examples from last 30 days only |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/perfiq.git

# Install dependencies
cd perfiq
npm install

# Set environment variables
cp .env.example .env
# Add your Anthropic API key and Supabase credentials

# Run development server
npm run dev
```

---

## 🔑 Environment Variables

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📅 Review Cycle

PerfIQ supports the following review cycles:
- Q1 · Q2 · Q3 · Q4 (Quarterly)
- Mid-Year Review
- Annual Review

All data — goals, evaluations, feedback, and reviews — is scoped to the selected cycle.

---

## 📄 License

MIT License © 2026 PerfIQ. All rights reserved.

---

## 🙌 Built With

- [Anthropic Claude API](https://anthropic.com) — AI review generation
- [Antigravity](https://antigravity.ai) — No-code frontend builder
- [Supabase](https://supabase.com) — Backend and authentication
- [Recharts](https://recharts.org) — Data visualization

---

> **PerfIQ** — Fair reviews. Clear growth. Better teams.
