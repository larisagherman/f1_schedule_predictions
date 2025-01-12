import functions from "firebase-functions";
import admin from "firebase-admin";
import nodemailer from "nodemailer";

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.database();

// Configure the email transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amihut12@gmail.com", // Replace with your actual email
    pass: "ceqx oegs aini asdu",   // Replace with a secure password or App Password
  },
});

// Cloud Function to notify users when a race ends
export const notifyRaceEnd = functions.database
  .ref("/races/{round}/isEnded")
  .onUpdate(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();

    if (before === 0 && after === 1) {
      const round = context.params.round;

      try {
        // Fetch user UIDs from the database
        const usersSnapshot = await db.ref("/users").once("value");
        const users = usersSnapshot.val();

        if (!users) {
          console.error("No users found in the database.");
          return;
        }

        // Retrieve email addresses for all users
        const userEmails = Object.keys(users)
          .map((uid) => users[uid]?.email)
          .filter(Boolean); // Exclude undefined/null emails

        if (userEmails.length === 0) {
          console.error("No email addresses found for users.");
          return;
        }

        // Prepare and send emails
        const emailPromises = userEmails.map((email) => {
          const mailOptions = {
            from: "amihut12@gmail.com", // Replace with your email
            to: email,
            subject: `Race Round ${round} Has Ended`,
            text: `The race for Round ${round} has ended. Check the results now!`,
          };
          return transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);
        console.log(`Email notifications sent for Round ${round}.`);
      } catch (error) {
        console.error("Error sending notifications:", error);
      }
    }
  });
