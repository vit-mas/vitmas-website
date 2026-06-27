# 💫 Premium 3D Roll-Over Team Page Component

This folder contains a fully isolated, self-contained, and interactive **Team Page Component** featuring real-time perspective tilt and cinematic 3D scrolling grid effects (Codrops Grid & Jitter Inspired). 

You can easily copy this folder (`/team-page`) directly into your own project or push it separately to GitHub!

---

## 📦 What's Inside This Folder?

1. **`TeamSection.tsx`**: The complete, standalone React component utilizing **Framer Motion** for spring physics, mouse tracking, and 3D scrolling transform layers.
2. **`team-styles.css`**: The design token definitions, Poppins & Space Grotesk elegant typography mappings, customized glassmorphism classes, and responsive grids.

---

## 🚀 Easy 2-Step Integration

### Step 1: Install Dependencies
Make sure you have `framer-motion` (or `motion`) and the icon set installed in your target project package settings:

```bash
npm install motion lucide-react
# or if using legacy framer-motion:
npm install framer-motion lucide-react
```

### Step 2: Import & Use
Simply drag and drop this entire `/team-page` directory into your components directory, and import it inside your React layout:

```tsx
import React from "react";
import TeamSection from "./team-page/TeamSection";

export default function App() {
  return (
    <main className="min-h-screen bg-[#11001b]">
      <TeamSection />
    </main>
  );
}
```

---

## 💡 Key Architectural Details

- **Responsive Grid**: Automatically shifts between 1-column on mobile, 2-columns on tablets, and 3-columns on desktop.
- **Cinematic Spring Physics**: Scroll interactions are smoothed out using low-friction mass-spring systems so that they glide cleanly even with slow scrolling.
- **Micro-interactions**: Hovering any card triggers selective scaling, 3D float depth elevations, custom box-shadow casting, and mathematical particle rotations!
