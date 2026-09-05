# EcoLens AI — Intelligent Recyclability & Circular Economy Scanner

EcoLens AI is an AI-assisted waste audit and recycling scanner that classifies packaging materials, calculates circular economy scrap rates (₹/kg), provides step-by-step segregation guidance, and connects users to verified local recycling hubs.

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js**: v18 or newer
- **npm** or **bun** / **yarn**

### 2. Installation
```bash
# Extract the ZIP archive
cd ecolens-ai

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy the sample environment file and add your Gemini API key (optional — rich intelligent fallback is active even without a key):
```bash
cp .env.example .env
```
Inside `.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 4. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Build & Production
```bash
# Build the Vite frontend and Express server bundle
npm run build

# Start the production server
npm run start
```

---

## 🌟 Key Features
- **AI Camera & Image Waste Scanner**: Live camera capture or drag-and-drop packaging photo analysis.
- **Multimodal AI Waste Classification**: Identifies polymer resin codes (#1 PET, #2 HDPE, etc.), glass, cardboard, aluminium, and multilayer composites.
- **Scrap Value Calculator**: Real-time estimated local market rate (₹/kg) and per-item resale estimate.
- **Segregation Guidance**: Step-by-step instructions for proper cleaning, flattening, and sorting.
- **Verified Local Recycler Directory**: Nearby municipal and private dry-waste collection centers with hours and phone contacts.
- **Eco Passport & Footprint**: Tracks items diverted from landfills, CO₂ emissions prevented, and earned reward points.
