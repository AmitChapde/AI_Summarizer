# AI Notes

---

## 🧠 Tools Used

* ChatGPT (mostly for planning and fixing bugs)
* Sometimes used it to think about tricky problems

LLM used in the app:

* Google Gemini API (to create research briefs)

---

## 🛠️ How I Used AI During Development

### 1. Planning the App

I used AI to:

* Plan the backend steps (scrape → clean → summarize → save)

I still implemented the actual structure manually.

---

### 2. Fixing Problems

AI helped with:

* Scraper not working
* Dealing with websites that load content dynamically
* Making sure the app works even if some links fail

I always tested the fixes myself.

---

### 3. Weighing Options

Some examples where AI helped:

* When to fail vs when to partially succeed
* How to handle skipped sources
* Whether to prioritize UI polish vs stability
* How much validation is “enough” for a take-home

These were more like discussions than code generation.

---

### 4. Writing Structured Docs

AI helped me:

* Draft README structure
* Organize ideas clearly
* Ensure I didn’t miss required sections


---

## 🔍 What I Verified Myself

I made sure to manually verify:

* All core backend logic
* Scraper behavior with real sites
* Partial failure handling
* Mongo persistence
* API contracts between frontend and backend

I also did multiple manual tests with messy real-world inputs.

---

## 🤖 Why I Chose Gemini

I chose Gemini mainly because:

* Easy API setup
* Good structured JSON output
* Generous free tier for testing
* Enough for a small project


---

## 🧠 Philosophy While Using AI

I tried to use AI like:

* A rubber duck
* A second brain for brainstorming
* A debugging assistant

But I avoided:

* Blind copy-paste
* Huge generated files without understanding
* Over-engineering just because AI suggested it

Whenever I used generated code, I:

* Simplified it
* Removed unnecessary abstractions
* Made it match the rest of the codebase

---

## 📌 Final Thought

AI definitely sped up development, but the main focus was:

* Understanding what’s being built
* Keeping it simple

