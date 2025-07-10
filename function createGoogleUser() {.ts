function createGoogleUser() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User Onboarding");
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const status = row[7];

    if (status !== "Created") {
      const firstName = row[0];
      const lastName = row[1];
      const username = firstName + "." + lastName;
      const email = username + "@companydomain.com"; // Replace with generic domain

      function generatePassword(length = 12) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let pass = '';
        for (let i = 0; i < length; i++) {
          pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return pass;
      }

      const password = generatePassword();

      sheet.getRange(i + 1, 5).setValue(password);

      try {
        AdminDirectory.Users.insert({
          primaryEmail: email,
          name: {
            givenName: firstName,
            familyName: lastName
          },
          password: password,
          changePasswordAtNextLogin: true
        });

        sheet.getRange(i + 1, 3).setValue(username);
        sheet.getRange(i + 1, 4).setValue(email);
        sheet.getRange(i + 1, 7).setValue("Created");
      } catch (e) {
        sheet.getRange(i + 1, 7).setValue("Error: " + e.message);
      }
    }
  }
}

function sendSlackInvites() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User Onboarding");
  const data = sheet.getDataRange().getValues();
  const slackInviteLink = "https://your-slack-invite-link.com"; // Replace with generic URL

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const invite = row[7];
    const status = row[8];

    if (invite === "Yes" && status !== "Invited") {
      const firstName = row[0];
      const username = row[2];
      const email = username + "@companydomain.com"; // Generic domain

      const subject = "Welcome to Slack!";
      const body = Hi ${firstName},

You're invited to join our Slack workspace.

Click here to join: ${slackInviteLink}

Best regards,
IT Team;

      try {
        GmailApp.sendEmail(email, subject, body);
        sheet.getRange(i + 1, 8).setValue("Invited");
      } catch (e) {
        sheet.getRange(i + 1, 8).setValue("Error: " + e.message);
      }
    }
  }
}

function sendBitdefenderInvites() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("User Onboarding");
  const data = sheet.getDataRange().getValues();

  const windowsLink = "https://bitdefender-link.com/windows";
  const macLink = "https://bitdefender-link.com/mac";
  const linuxLink = "https://bitdefender-link.com/linux";

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const sentStatus = row[10];

    if (sentStatus !== "Sent") {
      const firstName = row[0];
      const username = row[2];
      const email = username + "@companydomain.com";

      const subject = "Install Antivirus on Your Device";
      const body = Hi ${firstName},

To secure your device, please install our antivirus solution using the appropriate link for your OS:

- Windows: ${windowsLink}
- macOS: ${macLink}
- Linux: ${linuxLink}

Let us know once installation is complete.

Thanks,
IT Team;

      try {
        GmailApp.sendEmail(email, subject, body);
        sheet.getRange(i + 1, 9).setValue("Sent");
      } catch (e) {
        sheet.getRange(i + 1, 9).setValue("Error: " + e.message);
      }
    }
  }
}