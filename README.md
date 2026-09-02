Sports Management System

Sports Management System is a role-based sports tournament management platform designed for university and institutional sports organizations. The system enables administrators to govern the platform, organizers to manage their assigned tournaments end to end, players to register with teams and track their matches, and viewers to follow live scores and standings.

This repository contains the UI/UX design specification and an interactive front-end prototype used to inform the Figma design system. Backend and API implementation are not yet included.

1. Overview

The system is built on the principle of Role-Based Access Control (RBAC). Each of the four defined user roles is presented only with the navigation, screens, and actions applicable to that role.

Role	Description
Admin	Full system access. Manages users, creates and controls tournaments, and oversees all platform activity.
Organizer	Manages the tournament(s) assigned by an Admin, including teams, players, fixtures, live scoring, and results.
Player	Manages a personal account, joins a team, follows fixtures and results, and submits objections.
Viewer	Read-only access to live scores, fixtures, results, and standings.

<img width="628" height="442" alt="image" src="https://github.com/user-attachments/assets/02089ea3-0e08-4dfa-9369-573587e61d5d" />
<img width="623" height="438" alt="image" src="https://github.com/user-attachments/assets/bd180aee-dff5-425f-a4e2-15716a7ff711" />
<img width="622" height="448" alt="image" src="https://github.com/user-attachments/assets/6b7fa90a-64d3-4376-b853-439b3d1d88ab" />
<img width="627" height="445" alt="image" src="https://github.com/user-attachments/assets/f0c1de98-7143-41f1-a945-058720914534" />
<img width="623" height="437" alt="image" src="https://github.com/user-attachments/assets/19b68d97-faa0-42f3-bedd-c9854d02d05c" />
<img width="626" height="443" alt="image" src="https://github.com/user-attachments/assets/1a13fbfb-7503-4557-a145-201ce13438f9" />
<img width="626" height="442" alt="image" src="https://github.com/user-attachments/assets/79507f48-5730-4a5b-a8cb-23f73be5ccc6" />
<img width="623" height="433" alt="image" src="https://github.com/user-attachments/assets/8ae97597-63c6-460a-938e-ba58347783d0" />
<img width="624" height="437" alt="image" src="https://github.com/user-attachments/assets/fb6d29db-8cfd-40c4-a93f-cf845547c68f" />
<img width="1252" height="887" alt="image" src="https://github.com/user-attachments/assets/7b72ae8f-365a-4fa6-935a-f419d39d41a2" />
<img width="1243" height="889" alt="image" src="https://github.com/user-attachments/assets/661daff9-44a0-4c71-ac82-b5865baff69f" />
<img width="1248" height="878" alt="image" src="https://github.com/user-attachments/assets/6a9fe747-b4a6-48c9-841c-6a3dc446213f" />
<img width="1241" height="875" alt="image" src="https://github.com/user-attachments/assets/3f3d0c63-5359-41d3-bd74-48eb58b42277" />
<img width="1419" height="878" alt="image" src="https://github.com/user-attachments/assets/eb95c959-fc7e-4524-a32f-18b9d7caed4b" />
<img width="1402" height="829" alt="image" src="https://github.com/user-attachments/assets/a562c472-f093-4b95-b08e-95e58ff80f25" />
<img width="1417" height="892" alt="image" src="https://github.com/user-attachments/assets/32705751-00d8-473f-aa83-b2969939ee5b" />
<img width="1407" height="894" alt="image" src="https://github.com/user-attachments/assets/a3d7f842-9d08-4cb9-8394-580d1ecf6a36" />
<img width="1411" height="881" alt="image" src="https://github.com/user-attachments/assets/14b5ee72-400d-4cc3-8f54-404cc4fae3a0" />









2. Feature Summary

2.1 Authentication
Login with show/hide password and "remember me" functionality
Forgot password and reset password flows, including a password strength indicator
Forced password change on first login

2.2 Administrator
Dashboard presenting tournament, organizer, and player summary statistics, and a tournament status overview (Locked, Scheduled, Open, Live, Completed)
Full user management, including role assignment, access control, password resets, and account activation
Tournament creation and lifecycle management: Created -> Locked -> Scheduled -> Opened -> Live -> Completed
Confirmation modals for critical actions, such as opening or locking a tournament

2.3 Organizer
Dashboard scoped to the organizer's assigned tournament
Team and player management, including the ability to ban or unban players
Fixture creation and management, with list and calendar views
Live match console supporting real-time score updates, an event timeline (goals, cards), and undo/save/end-match controls
Match result publication, including statistics, scorers, cards, and Man of the Match
Review and resolution of submitted objections

2.4 Player
Personal dashboard displaying team affiliation, upcoming matches, and recent results
Ability to browse and join available teams, with a confirmation step prior to joining
Tournament information hub covering Overview, Teams, Fixtures, Results, Standings, and Rules
Submission and tracking of objections

2.5 Viewer
Live match scoreboard
Upcoming matches and recent results
Tournament standings
Read-only access with no editing controls
2.6 Shared Functionality
Notification center
Profile and account settings
A complete set of interface states, including empty, loading, error, permission denied, session expired, success/failure, and confirmation states for delete and ban actions

3. Design System

The visual design follows a modern, professional SaaS dashboard aesthetic with a sports-oriented identity.

Primary color: Deep navy, used for structural and navigational elements
Accent color: Amber, applied selectively to primary calls to action and live-status indicators
Status colors: Success (green), Warning (amber), Error (red), Information (blue)
Typography: Uppercase, letter-spaced labels for section headers; monospaced numerals for scores, timers, and statistics
Layout: 8px spacing grid, 8-12px corner radius, left-hand sidebar navigation with a top header on desktop, with responsive adaptation to tablet and mobile breakpoints (collapsible navigation, stacked cards)

A reusable component library is defined, comprising buttons, input fields, dropdowns, checkboxes and radio buttons, tabs, tables, cards, badges, avatars, navigation elements, modals, toast notifications, pagination controls, and status, empty, loading, and error states.

4. Prototype

An interactive front-end prototype (sports_management_system_prototype.jsx), built with React, demonstrates the core RBAC flows and representative screens for each role:

Role-based login and authentication flow
Administrator dashboard, tournament management, and user management
Organizer dashboard, team management, fixture management, and a live scoring console
Player dashboard, team-joining flow, and objection submission
Viewer dashboard and tournament standings

This prototype serves as a functional reference for the Figma design and is not intended for production use.

5. Repository Structure

   
├── design/
│   └── sports-tms-figma-brief.md      # Full Figma UI design specification
├── prototype/
│   └── sports_management_system_prototype.jsx       # Interactive front-end reference prototype
├── planning/
│   └── figma_trello_board.md          # Design task board
└── README.md

7. User Flows
Administrator: Login -> Dashboard -> Tournament Management -> Create Tournament -> Assign Organizer -> Lock Tournament -> Schedule Opening -> Open Tournament
Organizer: Login -> Dashboard -> Team Management -> Create Team -> Add Players -> Fixtures -> Schedule Match -> Live Match -> Update Score -> End Match -> Publish Result
Player: Login -> Dashboard -> Available Teams -> Select Team -> Join Team -> My Team -> Tournament -> Fixtures -> Match Details -> Submit Objection
Viewer:  Dashboard -> Live Matches -> Match Details -> Results -> Standings -> Teams

8. Technology Stack (Prototype)
React — component-based user interface
Tailwind CSS — utility-first styling and design tokens
lucide-react — icon library

The production technology stack, including backend services, database, authentication, and real-time scoring infrastructure, has not yet been finalized and is outside the current scope of this repository.

8.1 Project Planning

Design and implementation tasks are tracked in planning/figma_trello_board.md, organized into the following categories: Backlog, Design System, Authentication, Administrator, Organizer, Player, Viewer, Shared Functionality, Interface States, Responsive Design, Prototype Flows, and Quality Assurance.
USED TRELO TO TRACK THE FLOW:
<img width="1092" height="543" alt="image" src="https://github.com/user-attachments/assets/d53f7584-87e8-4393-bc4d-df22e68ca771" />
<img width="1112" height="556" alt="image" src="https://github.com/user-attachments/assets/126a5f12-3e6e-4017-8d2f-79acee4e4111" />
<img width="1122" height="550" alt="image" src="https://github.com/user-attachments/assets/91403d2b-30d5-4148-8c1c-713b5520177c" />
<img width="1086" height="539" alt="image" src="https://github.com/user-attachments/assets/49d54277-39ad-4858-b831-7c64d458aee1" />
<img width="1106" height="542" alt="image" src="https://github.com/user-attachments/assets/302875fc-d54f-4d3e-af58-91de07a23ba1" />
<img width="1438" height="706" alt="image" src="https://github.com/user-attachments/assets/d581b1ed-f1e0-4508-b33b-0f0576896d5b" />
<img width="1439" height="739" alt="image" src="https://github.com/user-attachments/assets/64b1acc2-fdf5-4b5e-bca1-977c0daf0a9c" />



9. Contributing

This project is currently in the design and prototyping phase. Contributions to the design system, screen coverage, or prototype functionality are welcome. Please open an issue describing the proposed change prior to submitting a pull request.# SPORTS-MANAGEMENT-SYSTEM
