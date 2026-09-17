# Maharashtra Digital Learning & Engagement MIS

## Goal
Build a complete proposal-grade government education monitoring application with realistic centralized demo data, responsive navigation, interactive filters, district drill-downs, reports, and Klassroom program links.

## Pages and navigation
- Shared Maharashtra Government shell with desktop sidebar, mobile menu, official bilingual branding, partner attribution, alerts, profile, and minimal settings dialog.
- Dashboard at `/` with working filter bar, six KPIs, three learning-program summaries, district visualization, engagement trend, course bars, sortable/searchable district table, and attention insights.
- District Analytics at `/district-analytics`, accepting a selected district through the URL and updating district/taluka metrics and charts.
- Learning Programs at `/learning-programs` with exactly AI & ML, NEET Preparation, and JEE Preparation.
- Reports at `/reports` with working report filters, generated preview rows, CSV export, and demo PDF print flow.

## Data and interactions
- Define typed models and one centralized mock service/data layer for statewide metrics, districts, talukas, programs, trends, attention areas, and report summaries.
- Centralize replaceable Klassroom URLs in one configuration module.
- Derive visible values from district, taluka, program, student-type, and time-period selections; support reset, search, sorting, table navigation, chart tooltips, map selection, and trend-period switching.
- Keep all data in the frontend and avoid authentication, admin tools, databases, and external APIs.

## Visual direction
- Light, restrained Maharashtra Government MIS: white surfaces, blue-grey canvas, dark navy typography, maroon primary actions, blue analytical accents, and semantic green/amber/red status states.
- Thin borders, subtle shadows, modest corners, dense but readable desktop presentation, and responsive behavior for smaller screens.
- Use a polished representative Maharashtra district SVG visualization and Recharts for analytical charts.

## Technical details
- Implement in the existing TanStack Start + React + TypeScript structure rather than introducing an incompatible framework.
- Reuse the existing design-system controls and Lucide icons; add shared MIS components for the shell, filters, KPI cards, charts, map, tables, and program summaries.
- Add unique page metadata for every content route and validate the live desktop and mobile views after implementation.
