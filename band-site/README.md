# The Steady States - Band Website

A modern, single-page band website built with React and Vite.

## 🚀 Running Locally

### Prerequisites
- Node.js (version 20 or higher)
- npm

### Setup & Development

1. **Navigate to the project directory:**
   ```bash
   cd band-site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   The site will be available at `http://localhost:5173/` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 👥 Adding/Updating Band Members

Members are managed through a JSON file. No coding required!

### Steps:

1. **Open the members file:**
   ```
   band-site/src/content/members.json
   ```

2. **Edit the member information:**
   ```json
   {
     "name": "Your Name",
     "role": "Your Instrument/Role",
     "bio": "A few sentences about you. What's your story?",
     "img_path": "/members/yourname.jpg"
   }
   ```

3. **Add your profile photo:**
   - Place your photo in `band-site/public/members/`
   - Name it with lowercase (e.g., `oscar.jpg`, `charlotte.jpg`)
   - Recommended: Square images work best (e.g., 400x400px)
   - Update the `img_path` in members.json to match your filename

4. **Preview your changes:**
   - Save the files
   - Refresh your browser (if dev server is running)
   - Your profile should appear automatically

**Note:** If no image is found, a default profile icon will be shown.

## 🎸 Adding Gigs

Gigs are also managed through a JSON file!

### Steps:

1. **Open the gigs file:**
   ```
   band-site/src/content/gigs.json
   ```

2. **Add a new gig:**
   ```json
   {
     "date": "2026-02-15",
     "venue": "The Rock Venue",
     "city": "Amsterdam, NL",
     "details": "Doors open at 8 PM",
     "ticketUrl": "https://tickets.example.com"
   }
   ```

3. **Field explanations:**
   - `date`: Format as YYYY-MM-DD
   - `venue`: Name of the venue
   - `city`: City and country
   - `details`: (Optional) Additional info
   - `ticketUrl`: (Optional) Link to buy tickets. If empty, shows "Details soon"

4. **Order:**
   - Gigs appear in the order they're listed in the file
   - Recommended: Keep them in chronological order

5. **Preview:**
   - Save the file
   - Refresh your browser to see the new gig

## 🎨 Customizing Content

### Hero Section
Edit `band-site/src/pages/Home.jsx` to change the main title.

### About Us Text
Edit `band-site/src/pages/About.jsx` to update the band story.

### Background Image
Replace `band-site/public/hero.jpg` with your own image.

## 📦 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

### Manual Deployment
```bash
npm run deploy
```

## 🛠️ Tech Stack

- React 18
- Vite
- React Router DOM
- CSS3 with custom properties

## 📝 File Structure

```
band-site/
├── public/
│   ├── hero.jpg          # Background image
│   └── members/          # Member profile photos
├── src/
│   ├── components/
│   │   └── Nav.jsx       # Navigation component
│   ├── content/
│   │   ├── gigs.json     # Gig listings
│   │   └── members.json  # Band member info
│   ├── pages/
│   │   ├── About.jsx     # About section
│   │   ├── Gigs.jsx      # Gigs section
│   │   └── Home.jsx      # Hero section
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── styles.css        # All styles
└── package.json
```

## 🤝 Contributing

1. Make your changes locally
2. Test them with `npm run dev`
3. Commit and push to trigger automatic deployment

## 📧 Questions?

Contact the band or check the code - it's all there! 🎵
