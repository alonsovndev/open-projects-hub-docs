# Open Projects Hub: demo video script

Target length: about 7 minutes. Written for API v0.2.0 and web v0.3.0 (2026-10-28).

The steps follow the documented flows and the fictional "client contact form" example in the [reviewer guide](https://oph-docs.alonsovndev.com/docs/00-context/reviewer-guide). The script was written from the code and the documentation, not from a recorded run, so check the button labels while rehearsing.

## Before recording

- Use a fresh account so the first-use welcome shows, or use Settings > Reset onboarding.
- Use a real inbox you can open. The emailed code expires in 5 minutes, and the email also has a link that pre-fills it.
- Each refinement spends one of the account's 5 free credits, so do not rehearse on the recording account.
- A real AI response takes about 10 to 45 seconds. Cut the wait in editing.
- Record at 1080p with the browser zoom at 110% and bookmarks hidden. Open a private window for Client Review.
- Use only synthetic data. Do not show passwords, API keys or the test user's credentials.

## Scenes

### 1. Problem and idea (0:00-0:45)

**Screen:** title slide, the problem slide, then the five-step workflow slide.

**Say:** "Client requirements arrive as emails, calls and lists of ideas. Open Projects Hub is for freelancers who need to turn that into something both sides agree on. The idea is simple: AI proposes, the freelancer decides. Nothing reaches the backlog, or the client, without explicit human approval."

### 2. Sign-up (0:45-1:45)

**Screen:** open `https://oph.alonsovndev.com`. Hover the header, then click **Create Account**. Fill in the form and submit. Open the inbox and enter the code, or click the link in the email.

**Say:** "From the landing page, Create Account goes straight to registration. Each sign-up creates its own workspace with me as the administrator. I verify my email with a six-character code that expires in five minutes, and I cannot sign in until it is verified."

**Edit:** cut the time spent waiting for the email.

### 3. First sign-in and welcome (1:45-2:15)

**Screen:** sign in. The dashboard shows the welcome. Read it, click **Got it**, then reload to show it stays hidden.

**Say:** "The first time an administrator signs in there is a short welcome with the suggested first steps. Dismissing it is saved on the server, so it does not come back. I can bring it back later from Settings."

### 4. Client and project (2:15-2:55)

**Screen:** create the client "Cedar Studio", then the project "Website enquiry form".

**Say:** "I organize work per client. A workspace is limited to three active projects, which keeps the scope small."

### 5. AI refinement (2:55-4:25)

This is the core of the demo.

**Screen:** open Refinement and select the project. Paste the three-line note from the reviewer guide:

```text
Visitors should be able to send us an enquiry from our website.
Ask for their name, email address, and message. Notify us when it arrives.
Show visitors whether their enquiry was sent successfully.
```

Show the provider choice (platform credits) and generate. Show the candidate story. Edit one acceptance criterion, approve it, and discard another draft.

**Say:** "I paste the client's own words, up to 5,000 characters. I can use the platform's free credits or my own Gemini, OpenAI or DeepSeek key. The model proposes user stories with acceptance criteria. These are drafts, kept only in this browser tab. I edit one, approve one and discard another. Only approved stories are stored. The AI can be wrong, which is why a person approves each story."

### 6. Backlog and export (4:25-5:05)

**Screen:** open the project's backlog, which shows only the approved story. Click Export and show the Markdown file.

**Say:** "The backlog holds only what was agreed. I can export a project's scope to Markdown for a proposal or a repository."

### 7. Client Review (5:05-6:00)

**Screen:** open the project's edit dialog and use **Copy client link**. Switch to the private window, paste the link and show the read-only page. Back in the app, regenerate the access code. Reload the old link and show that it no longer works.

**Say:** "The client does not need an account. I share one access code per project, and they see approved stories only, never my workspace. If I regenerate the code, the old one stops working."

### 8. Under the hood (6:00-6:40)

**Screen:** the architecture slide, then the production slide.

**Say:** "The API is a modular monolith with Clean Architecture: eleven feature slices, each with domain, application and infrastructure layers. In production the web app runs on Cloudflare, and the API runs in Docker on one EC2 host behind it. Releases are tagged, built into an image and deployed with a script."

### 9. Limits and close (6:40-7:15)

**Screen:** the evidence slide, then the thank-you slide with the links.

**Say:** "I want to be clear about what is not proven. There is no user study yet, no automated database backups, and the end-to-end tests are not run in CI. The next steps are testing with real freelancers, backups, and those tests. The application, the documentation and the four repositories are linked here. Thank you."

## Do not say

- That the tool saves time. No time saving has been measured.
- That the app is accessible to WCAG. No audit has been done.
- That email delivery is guaranteed. Delivery has not been measured.

## Three-minute version

Keep scenes 1, 2 (shortened), 5, 7 and 9.

## After recording

1. Replace `TBD` in the "Demo video" row of the repository `README.md` with the link.
2. Optionally add the link under "TRY IT" on the last slide of `open-projects-hub-tfm.pptx`.
