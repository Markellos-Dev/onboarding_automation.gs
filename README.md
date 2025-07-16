# User Onboarding Automation with Google Workspace and Slack

This project contains a Google Apps Script designed to automate parts of the IT onboarding process. It streamlines user account creation, Slack invitations, and antivirus setup by integrating Google Workspace Admin SDK, Slack, and Gmail.

## Features

- Create Google Workspace users automatically from a Google Sheet.
- Send Slack invitations via email with pre-configured links.
- Distribute Bitdefender installation instructions for Windows, macOS, and Linux.
- Track statuses within the same Google Sheet to avoid duplication.

## How It Works

1. **Google Sheet Setup**:
   - Create a sheet named **User Onboarding** with columns like:
     - First Name, Last Name, Username, Email, Password, Status, Invite to Slack, Slack Status, Bitdefender Status

2. **Scripts**:
   - `createGoogleUser()`: Creates users in Google Workspace.
   - `sendSlackInvites()`: Sends preconfigured Slack invite links via Gmail.
   - `sendBitdefenderInvites()`: Sends antivirus installation links based on OS.

3. **Status Tracking**:
   - Marks each user as "Created", "Invited", or "Sent" after successful steps.

## Configuration

- Replace `@companydomain.com` with your organization's domain.
- Replace Slack invite and antivirus URLs with your actual links.
- Ensure Admin SDK is enabled in your Apps Script project.

## Deployment

- Open [Google Apps Script](https://script.google.com/).
- Paste the code and link it to your onboarding sheet.
- Set triggers to run the functions on demand or on form submissions.

## Disclaimer

This script is a generalized version of a tool developed during IT admin work. All domains and links are placeholders. Replace them accordingly for your environment.

---
