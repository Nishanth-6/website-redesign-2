# Website Setup Guide for Professor Nadarajah

This guide will help you set up and manage your academic website using Sveltia CMS.

## What Changed?

Your website has been migrated from an **API-based system** to a **static, file-based system**:

✅ **Before**: Content stored in external database (Base44 API)
✅ **After**: Content stored as JSON files in your GitHub repository

✅ **Before**: Required external services and API keys
✅ **After**: Everything lives in your GitHub repo - no external dependencies

✅ **Before**: Complex setup and maintenance
✅ **After**: Simple, lightweight, and easy to manage

---

## One-Time Setup (Do This Once)

### Step 1: Create a GitHub Personal Access Token

This allows Sveltia CMS to read and write to your GitHub repository.

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Sveltia CMS Token`
4. Set expiration: **No expiration** (or choose a long duration)
5. Check **only** this permission: ✅ **repo** (this gives full control of private repositories)
6. Scroll down and click **"Generate token"**
7. **IMPORTANT**: Copy the token immediately (it looks like `ghp_xxxxxxxxxxxx`)
8. Save it somewhere safe - you'll need it to login to the CMS

---

### Step 2: Copy This Code to Your Repository

1. Clone your repository (or download it):
   ```bash
   git clone https://github.com/selva-nadarajah/selva-nadarajah.github.io.git
   cd selva-nadarajah.github.io
   ```

2. Copy all files from `selva-cms-local` folder to your repository

3. Push to GitHub:
   ```bash
   git add .
   git commit -m "Migrate to static CMS with Sveltia"
   git push origin main
   ```

---

## How to Edit Content

### Option 1: Using Sveltia CMS (Recommended - Easy UI)

1. **Visit the admin page**: Go to `https://selva-nadarajah.com/admin` (or `http://localhost:3000/admin` if running locally)

2. **Login**:
   - Click **"Login with GitHub"**
   - Paste the Personal Access Token you created earlier
   - Click **"Authenticate"**

3. **Edit content**:
   - Click on the section you want to edit (Publications, Courses, Students, etc.)
   - Make your changes in the form
   - Click **"Save"**
   - The CMS will commit the changes to GitHub
   - GitHub Pages will automatically rebuild your site

### Option 2: Edit JSON Files Directly on GitHub

1. Go to your repository on GitHub
2. Navigate to `public/content/`
3. Click on any JSON file (e.g., `publications.json`)
4. Click the pencil icon (✏️) to edit
5. Make your changes
6. Scroll down, add a commit message, and click **"Commit changes"**

---

## Content Files Explained

All your content is stored in `public/content/`:

- **`publications.json`** - All your research publications
- **`courses.json`** - Teaching history
- **`students.json`** - Current and former students
- **`research-areas.json`** - Your research focus areas
- **`site-content.json`** - Profile, bio, awards, notes to students

---

## Adding New Publications (Example)

### Using Sveltia CMS:
1. Go to `/admin`
2. Click **"Publications"**
3. Click **"Add Publication"**
4. Fill in the form
5. Click **"Save"**

### Using GitHub (Manual):
1. Open `public/content/publications.json`
2. Add a new entry at the top:
   ```json
   {
     "id": "pub-035",
     "title": "Your Paper Title",
     "authors": "Author 1, Author 2",
     "year": 2025,
     "category": "journal",
     "type": "journal",
     "venue": "Journal Name, Volume(Issue)",
     "abstract": "Paper abstract here",
     "link": "https://link-to-paper.com"
   }
   ```
3. Commit the changes

---

## Local Development (Optional)

If you want to preview changes locally before pushing:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000` to see your site
4. Visit `http://localhost:3000/admin` to use the CMS locally

---

## Deployment

### Automatic Deployment (Recommended)
- Push to GitHub → Site automatically updates
- No manual deployment needed
- Takes 1-2 minutes to update

### Manual Deployment
If you need to deploy manually:
```bash
npm run build
npm run deploy
```

---

## Troubleshooting

### CMS Won't Load
- Clear your browser cache
- Make sure you're using the correct Personal Access Token
- Check that the token has **repo** permissions

### Changes Not Showing Up
- Wait 2-3 minutes for GitHub Pages to rebuild
- Clear browser cache and hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Image Not Loading
- Make sure the image URL is correct in the JSON file
- Use full URLs like `https://selvan.people.uic.edu/image.jpg`

---

## Quick Reference

| Task | How to Do It |
|------|--------------|
| Add publication | `/admin` → Publications → Add New |
| Update bio | `/admin` → Site Content → Edit "Background" |
| Add student | `/admin` → Students → Add New |
| Change profile picture | `/admin` → Site Content → Edit "profile" → Update "Image URL" |
| View live site | https://selva-nadarajah.com |
| Edit content | https://selva-nadarajah.com/admin |

---

## Need Help?

Contact Nishanth for assistance with:
- Technical issues
- Adding new features
- Questions about the CMS

---

## Summary

**What you need to remember**:
1. Content is in JSON files in `public/content/`
2. Use `/admin` to edit with a nice UI (easier)
3. Or edit JSON files directly on GitHub (more control)
4. Changes push to GitHub → Site auto-updates in 1-2 minutes
5. **No external services** - everything is in your GitHub repo!

That's it! Your website is now simple, fast, and easy to maintain. 🎉
