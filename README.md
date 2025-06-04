
## 📽️ **Cinemate** – The Ultimate Movie Detail Experience

> A polished, modern movie detail page built with React + Tailwind CSS + TMDB, featuring smart state management, bookmarking, native & social sharing, and trailer support — all with Netflix-level finesse.

---

### ⚙️ Tech Stack

| Tech               | Purpose                          |
| ------------------ | -------------------------------- |
| **React**          | Core UI library                  |
| **React Router**   | Navigation + routing             |
| **Tailwind CSS**   | Utility-first styling            |
| **TMDB API**       | Movie metadata + media           |
| **React Icons**    | Feather + Brand iconography      |
| **Custom Context** | App-wide state (e.g., bookmarks) |

---

### 🧠 Features

#### ✅ Movie Details

* Dynamic routing using `/movies/:id`
* Fallback state via React Router’s `location.state` or context
* Poster, title, release year, runtime, genres, overview, production logos

#### 🎬 Trailer Support

* Embedded **YouTube trailer player**
* Fetches using a custom `useTrailer()` hook
* Handles trailer loading states and no-trailer fallback messages

#### ⭐ RateIt Component

* Users can rate movies locally
* Clean, non-intrusive UI for rating (ideal for future backend integration)

#### 🔖 Bookmarking

* Add/remove bookmarks per movie
* Bookmark state stored in global context (`AppContext`)
* Conditional styling for bookmarked movies

#### 📤 Share Functionality

* Native sharing via Web Share API (mobile & modern browsers)
* Fallback: Copy to clipboard + social platforms:

  * WhatsApp
  * Telegram
  * X (Twitter)
  * Facebook
* Beautiful floating popover with smooth UX

#### 🔗 Related Movies

* Shows a curated list of related movies based on the selected film
* Built as a separate `<RelatedMovies />` component

#### ⬆️ Auto Scroll To Top

* Smooth scroll to top when navigating between routes
* Hook-based implementation for automatic trigger

---

### 🚀 How It Works

#### 📁 File Structure Overview

```bash
/src
│
├── components/
│   ├── RateIt.jsx
│   ├── RelatedMovies.jsx
│   └── SharePopover.jsx
│
├── contexts/
│   └── AppContext.jsx        // Global app state for bookmarks etc.
│
├── hooks/
│   ├── useTrailer.js         // Trailer fetch logic
│   └── useScrollToTop.js     // Auto scroll to top hook
│
├── pages/
│   └── MovieDetail.jsx       // Main detail view logic
│
└── App.jsx / main.jsx        // Router setup, App wrapper
```

---

### 🧩 Notable Components

#### `SharePopover.jsx`

A reusable, accessible share widget:

* Uses `navigator.share()` when supported
* Falls back to smart social link buttons
* Copy to clipboard with feedback

#### `useScrollToTop.js`

```js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
}
```

Call it in your root `App.jsx` to auto-scroll on navigation.

---

### 💅 UI/UX Notes

* Dark mode–ready with custom accent colors
* Responsive and mobile-friendly out of the box
* Smooth transitions on hover, modal interactions, and trailer loads
* Placeholder fallback for broken poster images

---

### 🧪 Future Improvements

* Persist bookmarks in localStorage
* Add more social sharing platforms (e.g., WhatsApp, Twitter, Facebook)

---

### 🧠 Credits

* **TMDB** for the movie API
* **React Icons** for beautiful, lightweight icon sets
* **Inspired by** modern streaming platforms like Netflix, Hulu, and Max

---

### 🔐 License

MIT — use it, remix it, deploy it.
Just don’t forget to [star the repo ⭐](#) and give credit where it’s due.

---
<p align="right">
  <b>— Nnodimele Udodirim</b>
</p>

