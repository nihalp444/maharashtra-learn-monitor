# Maharashtra Learning Insights

Build a complete professional government-style MIS web application called:

"Maharashtra Digital Learning & Engagement MIS"

Subtitle:

"Student Learning & Engagement Monitoring Dashboard"

IMPORTANT:

This is a proposal/demo application for government authorities. It must look like a real, production-quality government MIS, NOT a generic SaaS dashboard and NOT an EdTech landing page.

TECH STACK:

- If working inside my existing Angular project, use Angular + TypeScript and preserve the existing project structure.

- Backend architecture should be Node.js-ready.

- Do NOT add Supabase, Firebase, authentication, admin management, or complex backend infrastructure.

- Use local mock/dummy data through clean services/interfaces so the backend can later be connected to Node.js APIs.

- Keep the architecture clean and easy to modify locally after export.

- Do not create an Admin page.

CORE PURPOSE:

The system monitors digital learning engagement of students across Maharashtra.

The available learning programs are:

1. AI & ML

2. NEET Preparation

3. JEE Preparation

These learning programs are provided through our content/OEM partner Klassroom.

The MIS should allow authorities to understand:

- total students

- active students

- learning hours

- engagement percentage

- course participation

- district-wise engagement

- taluka-wise engagement

- areas with low engagement

- districts requiring attention

- course-wise performance

- engagement trends

- reports and insights

IMPORTANT:

All data is dummy/demo data only.

Make the UI appear completely dynamic by making filters update KPIs, charts, tables and insights using predefined mock datasets.

--------------------------------------------------

DESIGN / VISUAL STYLE

--------------------------------------------------

Create a premium, clean and highly professional LIGHT THEME.

The design should visually feel appropriate for:

- Maharashtra Government

- Government MIS

- Education department

- Official monitoring dashboard

- Large-screen presentations

Use:

- White backgrounds

- Very light grey/blue-grey page background

- Dark navy text

- Maharashtra government-inspired maroon/red as the primary accent

- Subtle blue accents

- Green for positive/high engagement

- Amber/orange for medium engagement

- Red for low engagement

- Very subtle shadows

- Thin borders

- Medium rounded corners

- Excellent spacing

- Professional sans-serif typography

- Strong visual hierarchy

Avoid:

- Dark mode

- Neon colors

- Excessive gradients

- Glassmorphism

- Excessive animations

- Gaming/EdTech styling

- Huge decorative illustrations

- Excessive rounded/pill UI

- Unnecessary fancy effects

Use a professional font such as Inter or a similar clean government/enterprise font.

The UI must be responsive but prioritize desktop/laptop screens because this is an MIS used by authorities.

--------------------------------------------------

BRANDING

--------------------------------------------------

Header branding:

Government of Maharashtra

महाराष्ट्र शासन

Main title:

Maharashtra Digital Learning & Engagement MIS

Subtitle:

Student Learning & Engagement Monitoring Dashboard

Small supporting text:

Empowering Students for a Brighter Maharashtra

Show partner information discreetly on the right side:

Learning Content Partner

Klassroom

Technology Partner

Arceus InfoTech

Do NOT make Arceus InfoTech the main product name.

--------------------------------------------------

LAYOUT

--------------------------------------------------

Use a left sidebar navigation with:

1. Dashboard

2. District Analytics

3. Learning Programs

4. Reports

At the bottom of the sidebar:

Settings

Admin/Profile

Do NOT create an Admin page.

Settings can be a simple placeholder navigation item or small modal/page if required, but it should not be a major part of the demo.

Do NOT add a separate Students page in this first version.

--------------------------------------------------

PAGE 1: DASHBOARD

--------------------------------------------------

Create the main dashboard as the most polished page.

Top header:

Title + subtitle + last updated timestamp + notification icon + user/profile.

Below the header create a FILTER BAR:

District

[All Districts]

Taluka

[All Talukas]

Learning Program

[All Programs]

Student Type

[All Students]

Time Period

[Last 30 Days]

Buttons:

[Apply Filters]

[Reset]

Filters MUST actually update the dummy dashboard values.

Create 6 KPI cards:

1. Total Students

Example: 1,24,580

2. Active Students

Example: 82,430

3. Total Learning Hours

Example: 3,84,210

4. Average Engagement

Example: 66.2%

5. Low Engagement Students

Example: 18,450

6. Course Completion

Example: 54.8%

Each KPI should have:

- icon

- value

- small comparison percentage

- previous-period text

Example:

↑ 8.4% vs previous period

Use appropriate colors but keep them subtle and professional.

--------------------------------------------------

LEARNING PROGRAMS SECTION ON DASHBOARD

--------------------------------------------------

Create a prominent section:

Learning Programs

Subtitle:

"Access digital learning content through our partner Klassroom and track student engagement across Maharashtra."

Create exactly 3 large horizontal cards:

CARD 1:

AI & ML

Artificial Intelligence & Machine Learning

12,450 Enrolled Students

68% Engagement

Button:

Explore on Klassroom →

CARD 2:

NEET Preparation

18,720 Enrolled Students

72% Engagement

Button:

Explore on Klassroom →

CARD 3:

JEE Preparation

15,860 Enrolled Students

69% Engagement

Button:

Explore on Klassroom →

Use professional realistic education-related imagery/icons.

The Explore buttons should be external-link-ready and use placeholder URLs/constants that can easily be replaced locally with the actual Klassroom URLs.

Do not hardcode URLs throughout components.

Create a central configuration/service for external program links.

--------------------------------------------------

DISTRICT-WISE ENGAGEMENT

--------------------------------------------------

Create a large analytics section.

Left:

"Maharashtra District-wise Student Engagement"

Show a Maharashtra district map visualization.

Use dummy district engagement values.

Legend:

Green = High Engagement >= 70%

Yellow/Orange = Medium Engagement 50%-70%

Red = Low Engagement < 50%

Hover/click a district and show:

District Name

Total Students

Active Students

Engagement %

Learning Hours

Example:

Nandurbar

Students: 8,240

Active Students: 3,910

Engagement: 47.4%

Show a "Low Engagement" indicator when appropriate.

If a real Maharashtra map library is not practical, create a polished representative Maharashtra district visualization using a suitable SVG/chart approach.

Do NOT spend time integrating external map APIs.

--------------------------------------------------

STUDENT ENGAGEMENT TREND

--------------------------------------------------

Create a professional line chart:

Student Engagement Trend

Show the last 6 months.

Three series:

AI & ML

NEET

JEE

Add a period selector:

Last 6 Months / Last 12 Months

Changing filters should update the chart using mock data.

--------------------------------------------------

COURSE-WISE ENGAGEMENT

--------------------------------------------------

Create a card:

Course-wise Engagement

Show horizontal progress/bar charts:

AI & ML

12,450 students

68%

NEET

18,720 students

72%

JEE

15,860 students

69%

Make this visually clean and easy to understand.

--------------------------------------------------

DISTRICT PERFORMANCE TABLE

--------------------------------------------------

Create:

District Performance

Columns:

#

District

Total Students

Active Students

Engagement

Learning Hours

Status

Use dummy records such as:

Mumbai

Pune

Nashik

Nandurbar

Gadchiroli

Washim

Nagpur

Aurangabad / Chhatrapati Sambhajinagar

Thane

Kolhapur

Use status:

High

Medium

Low

Color the status subtly.

Allow:

- search

- sorting

- pagination or simple "View All"

Clicking a district should navigate to District Analytics with that district selected.

--------------------------------------------------

AREAS REQUIRING ATTENTION

--------------------------------------------------

This is an important section.

Title:

Areas Requiring Attention

Create two professional panels:

1. Low Engagement Districts

Example:

Nandurbar - 47.4%

Gadchiroli - 42.7%

Washim - 43.7%

Hingoli - 45.1%

2. Low Student Participation

Show districts with lower active-student participation.

Also create a small summary:

Focus Areas

3 districts have engagement below 50%

8 districts have low student participation

5 districts show declining engagement

6 districts show improving engagement

Button:

View Detailed Analysis →

This section should visually communicate WHERE authorities may need to focus.

--------------------------------------------------

PAGE 2: DISTRICT ANALYTICS

--------------------------------------------------

Create a complete District Analytics page.

Header:

District Analytics

Subtitle:

"Analyze student participation and learning engagement across districts and talukas."

Filters:

District

Taluka

Learning Program

Time Period

Show KPI cards:

Total Students

Active Students

Engagement

Learning Hours

Then show:

1. Maharashtra Engagement Map

2. District Engagement Comparison

3. Taluka-wise Engagement

4. Course-wise Engagement for selected district

5. 6-month engagement trend

6. District performance table

When a district is selected, show a detailed district summary.

Example:

Nandurbar District

Total Students: 8,240

Active Students: 3,910

Engagement: 47.4%

Learning Hours: 12,240

Taluka examples:

Nandur

Shahada

Akkalkuwa

Taloda

Clicking different districts should change the dummy values.

--------------------------------------------------

PAGE 3: LEARNING PROGRAMS

--------------------------------------------------

Create a clean Learning Programs page.

Show exactly three programs:

AI & ML

NEET Preparation

JEE Preparation

Each program should show:

- image/icon

- description

- enrolled students

- active students

- engagement percentage

- completion percentage

- learning hours

- Explore on Klassroom button

The Explore buttons should use centralized external-link configuration.

Do NOT create course-management/admin functionality.

--------------------------------------------------

PAGE 4: REPORTS

--------------------------------------------------

Create:

Reports & Insights

Subtitle:

"Generate and review learning engagement reports."

Create filter controls:

Report Type

District

Learning Program

Time Period

Report options:

District Engagement Report

Course-wise Engagement Report

Low Engagement Areas Report

Student Participation Summary

Monthly Engagement Summary

Buttons:

View Report

Export PDF

Export Excel

For this demo, the report generation can use mock data and demonstrate the UI only.

Do not build a real reporting backend.

If export implementation is easy, create a simple demo CSV/Excel-style export; otherwise leave the buttons UI-ready.

--------------------------------------------------

SETTINGS

--------------------------------------------------

Do not create an Admin page.

Settings should be minimal.

If implemented, include only:

Profile

Notification Preferences

Dashboard Preferences

No user-management functionality.

--------------------------------------------------

DATA / MOCK ARCHITECTURE

--------------------------------------------------

This is extremely important.

Create a centralized mock data layer/service.

Do NOT scatter dummy values throughout the UI.

Use structured interfaces/models such as:

StudentMetrics

District

Taluka

LearningProgram

EngagementData

ReportSummary

Create mock data arrays/services.

All dashboard components should consume data through services.

The architecture should make it easy for me to replace mock services later with Node.js REST APIs.

Example future structure:

Angular Frontend

      ↓

Services

      ↓

REST API

      ↓

Node.js Backend

      ↓

PostgreSQL

For now:

Angular Frontend

      ↓

Mock Data Services

Do NOT create the actual database.

--------------------------------------------------

INTERACTIONS

--------------------------------------------------

Make the prototype feel dynamic.

Required interactions:

- Sidebar navigation works

- Dashboard filters update displayed data

- Reset filters works

- District selection updates dashboard

- Course selection updates charts/cards

- District table rows are clickable

- District Analytics receives selected district

- Learning Program cards work

- Klassroom buttons are external-link-ready

- Reports filters work visually

- Search and sorting work where appropriate

- Hover states for charts/maps/cards

- Tooltips on charts

- Responsive sidebar behavior

Do not create unnecessary animations.

--------------------------------------------------

IMPORTANT DEMO DATA

--------------------------------------------------

Use realistic dummy data.

Example overall data:

Total Students: 124,580

Active Students: 82,430

Learning Hours: 384,210

Average Engagement: 66.2%

Low Engagement Students: 18,450

Course Completion: 54.8%

Programs:

AI & ML:

12,450 students

68% engagement

NEET:

18,720 students

72% engagement

JEE:

15,860 students

69% engagement

Districts should have varying engagement values so the map, charts and attention sections look meaningful.

Include both high-performing and low-engagement districts.

--------------------------------------------------

IMPORTANT VISUAL REQUIREMENT

--------------------------------------------------

The dashboard should look close to a premium Maharashtra Government MIS.

It should be:

Professional

Clean

Trustworthy

Data-focused

Modern

Light

Minimal

Presentation-ready

It should NOT look like:

Netflix

A gaming dashboard

A startup SaaS dashboard

A colorful EdTech website

A generic admin template

The primary visual focus should be:

DATA → ANALYSIS → DISTRICT INSIGHT → ACTION

--------------------------------------------------

PERFORMANCE / CODE QUALITY

--------------------------------------------------

Keep the implementation simple and maintainable.

Do not install unnecessary libraries.

Use reusable components.

Avoid duplicate code.

Use clean TypeScript interfaces.

Keep all mock data centralized.

Keep all external URLs centralized.

Use responsive CSS.

Avoid overengineering.

IMPORTANT:

This is a DEMO/PROPOSAL version.

Do not spend implementation effort on authentication, database setup, admin management, real API integrations, real-time data, or complex backend infrastructure.

Prioritize:

1. Excellent UI

2. Complete navigation

3. Working dummy filters

4. Working charts

5. District analytics

6. Professional presentation quality

7. Clean code that can later be connected to Node.js/PostgreSQL

Do not ask me unnecessary clarification questions. Make sensible professional decisions and build the complete first version in one pass.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://maharashtra-learn-monitor.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/37cf4b4f-2bf7-4fa8-8c11-f990e0003c9e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
