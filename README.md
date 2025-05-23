🌐 [Live Demo](https://medblocks-task1.vercel.app/)

## 🧩 Challenge Faced & How I Solved It

When a user added a new entry (e.g., patient info) in one browser tab, the changes were **not reflected in other open tabs** unless the page was manually refreshed. This broke the expected real-time behavior and led to data inconsistency across views.

### Solution

To address this, I implemented the [`BroadcastChannel`](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) API — a native browser feature that enables **real-time communication between tabs** of the same origin.

#### Implementation Overview

1. **Create a channel** shared across tabs:

   ```js
   const channel = new BroadcastChannel("entry-updates");
   ```

2. **Post a message** when a new entry is created:

   ```js
   channel.postMessage({ type: "NEW_ENTRY", payload: newEntry });
   ```

3. **Listen for updates** in all open tabs:

   ```js
   channel.onmessage = (event) => {
     if (event.data.type === "NEW_ENTRY") {
       updateEntries(event.data.payload);
     }
   };
   ```

4. **Cleanup** the channel on unmount:
   ```js
   channel.close();
   ```

This approach ensured that all open tabs instantly reflected changes, creating a seamless and dynamic experience for users.

---

## 🛠️ Getting Started

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Open multiple tabs at `http://localhost:5173` to test cross-tab syncing.

# 🛠️ Setup and Usage Instructions

This guide walks you through setting up and running the Medblocks Patient Registration App locally.

## 🔗 GitHub Repository

[https://github.com/madhuyadav022117/Medblocks_task1](https://github.com/madhuyadav022117/Medblocks_task1)

## 📦 Clone the Repository

```bash
git clone https://github.com/madhuyadav022117/Medblocks_task1.git
cd Medblocks_task1
```

## 📥 Install Dependencies

```bash
npm install
```

## 🚀 Run the Development Server

```bash
npm run dev
```

Once started, the app will be available at `http://localhost:5173`.

## 🛠 Build for Production

```bash
npm run build
```

The production build will be available in the `dist` folder.

## 🌍 Preview the Production Build Locally

```bash
npm run preview
```
