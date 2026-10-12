# Martiqaad - Event Ticketing & Wedding Platform 🎟️✨

A modern, full-featured web platform for discovering events, purchasing digital tickets, and coordinating wedding services across major Somali metropolitan cities (**Mogadishu**, **Hargeisa**, **Garowe**, and **Kismayo**).

---

## 🌟 Overview

**Martiqaad** (Somali for *Invitation*) bridges event organizers, wedding planners, service vendors, and attendees into a unified, high-performance web experience. The platform supports instant digital pass generation with secure QR codes, integration with popular Somali mobile money operators (**EVC Plus**, **Zaad**, **Sahal**, **eDahab**), a gate attendant QR scanner, a digital wedding invitation maker, and a comprehensive wedding vendor marketplace.

---

## 🚀 Key Features

### 1. 🎟️ Digital Ticket Booking & Issuance
* **Multi-Tier Ticketing**: Support for Standard (*Caadi*), VIP, and VVIP / Private Table bookings with explicit pricing and tier privileges.
* **Instant Digital Passes**: Real-time pass generator featuring unique QR codes, seat allocation, attendee details, and downloadable ticket cards.
* **My Tickets Portal**: A central hub where users can view active tickets, reprint passes, and inspect their purchase history.

### 2. 📱 Somali Mobile Money Payment Integration
* Simulated instant checkout supporting native Somali telecom payment workflows:
  * **EVC Plus** (Hormuud)
  * **ZAAD Service** (Telesom)
  * **SAHAL** (Golis)
  * **eDahab** (Dahabshiil)
* Instant receipt verification and dynamic seat availability deductions.

### 3. 🔍 Live Gate QR Code Scanner
* Built-in ticket verification tool designed for event door staff and security.
* Live camera simulation / QR validation to check tickets, display attendee credentials, and prevent duplicate admissions.

### 4. 💍 Wedding Hub & Vendor Directory
* **Wedding Venues & Convention Centers**: Detailed listings for luxury halls and event grounds, complete with capacity, pricing, amenities, and photo galleries.
* **Photography & Videography**: Certified wedding photographers and cinematic video crews.
* **Catering & Custom Cakes**: Premier catering services and dessert artisans.
* **Stage & Hall Decoration**: Floral artists, traditional bridal decor (*Aroos Soomaali*), and stage lighting specialists.

### 5. 💌 Digital Invitation Studio
* An interactive invitation card builder allowing users to design, customize, and preview digital wedding and event invitation cards with custom themes, bride & groom names, venues, and date schedules.

### 6. 🏙️ City & Category Filtering
* Filter events and vendors seamlessly by city:
  * **Mogadishu** (*Muqdisho*)
  * **Hargeisa** (*Hargeysa*)
  * **Garowe** (*Garoowe*)
  * **Kismayo** (*Kismaayo*)
* Category filters: Conferences & Summits, Weddings & Galas, Culture & Arts, Sports, and Expos.

### 7. ⭐ Community Reviews & Star Ratings
* Interactive review and rating system allowing verified attendees and couples to rate venues and events (1–5 stars) with instant average recalculations.

### 8. 🎨 Royal Themes & Dark Mode
* Switch effortlessly between three handcrafted luxury themes:
  * **Royal Gold & Midnight Navy** (*Dahab & Boqortooyo*)
  * **Deep Emerald & Gold** (*Aroos & Barwaaqo*)
  * **Modern Indigo & Sapphire** (*Casri & Xarrago*)
* Full **Dark Mode** toggle with persistent user preferences in `localStorage`.

---

## 🛠️ Tech Stack

* **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tooling**: [Vite 8](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Animations**: [Motion](https://motion.dev/)
* **Server**: Node.js + Express (serving assets and dev middlewares)

---

## 📂 Project Structure

```text
├── index.html                       # HTML5 entry point & typography
├── metadata.json                    # Application metadata and runtime permissions
├── package.json                     # NPM packages & build scripts
├── tsconfig.json                    # Strict TypeScript compiler options
├── vite.config.ts                   # Vite & Tailwind configuration
├── README.md                        # Documentation
└── src/
    ├── main.tsx                     # React root initialization
    ├── App.tsx                      # Primary application shell & modal states
    ├── index.css                    # Global design tokens, color variables & fonts
    ├── data/
    │   └── eventsData.ts            # Mock data models (events, vendors, tickets, reviews)
    ├── types/
    │   └── theme.ts                 # Theme TypeScript definitions
    └── components/
        ├── Navbar.tsx               # Header with navigation, city selector & quick actions
        ├── Hero.tsx                 # Hero section with featured event spotlight
        ├── EventCard.tsx            # Event listing card with pricing & tier badges
        ├── VendorCard.tsx           # Wedding vendor card with rating & starting price
        ├── TicketBookingModal.tsx   # Mobile money checkout modal
        ├── TicketPassView.tsx       # Printable digital pass with QR code
        ├── MyTicketsModal.tsx       # Saved tickets management modal
        ├── QrScannerModal.tsx       # Gate ticket validation scanner
        ├── VendorDetailModal.tsx    # Comprehensive vendor showcase modal
        ├── InvitationStudioModal.tsx# Digital wedding card designer
        ├── HostEventModal.tsx       # New event registration modal
        ├── ReviewModal.tsx          # Star rating and feedback submission modal
        ├── ThemeBar.tsx             # Floating theme palette switcher
        ├── PlaceholderMap.tsx       # Venue map location view
        └── Footer.tsx               # Footer with links and branding
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or newer) and `npm` installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 3. Build for Production
```bash
npm run build
```

---

## 📄 License

This project is licensed under the MIT License. Copyright © 2026 **Martiqaad Inc.**
