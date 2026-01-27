import { google } from "googleapis";

// Config
// GOOGLE_SHEETS_CREDENTIALS must be the JSON content of the service account key
// GOOGLE_SHEET_ID is the ID of the sheet (from the URL)

export async function appendRowToSheet(data) {
  try {
    if (
      !process.env.GOOGLE_SHEETS_CREDENTIALS ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      console.warn(
        "Google Sheets credentials or ID not found. Skipping Sheet append.",
      );
      return false;
    }

    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Map data to row
    // Order: name, hq, employeeId, smName, zbmName, drName, drEmail, drMobile, jerseySize, nameToPrint, numberToPrint, selectedTeamCode, drCategory
    const row = [
      data.name || "",
      data.hq || "",
      data.employeeId || "",
      data.smName || "",
      data.zbmName || "",
      data.drName || "",
      data.drEmail || "",
      data.drMobile || "",
      data.jerseySize || "",
      data.nameToPrint || "",
      data.numberToPrint || "",
      data.selectedTeamCode || "",
      data.drCategory || "",
    ];

    // Append to "Sheet1" (default) or make it configurable if needed
    const range = "Sheet1!A1";

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log(
      "Appended to Google Sheet:",
      response.data.updates.updatedRange,
    );
    return true;
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    // Don't throw, just log failure so form submission (MongoDB) doesn't fail
    return false;
  }
}

export async function appendRowsToSheet(dataArray) {
  try {
    if (
      !process.env.GOOGLE_SHEETS_CREDENTIALS ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      console.warn(
        "Google Sheets credentials or ID not found. Skipping Sheet append.",
      );
      return false;
    }

    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const rows = dataArray.map((data) => [
      data.name || "",
      data.hq || "",
      data.employeeId || "",
      data.smName || "",
      data.zbmName || "",
      data.drName || "",
      data.drEmail || "",
      data.drMobile || "",
      data.jerseySize || "",
      data.nameToPrint || "",
      data.numberToPrint || "",
      data.selectedTeamCode || "",
      data.drCategory || "",
    ]);

    const range = "Sheet1!A1";

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: rows,
      },
    });

    console.log(
      `Appended ${rows.length} rows to Google Sheet. Range: ${response.data.updates.updatedRange}`,
    );
    return true;
  } catch (error) {
    console.error("Error appending rows to Google Sheet:", error);
    return false;
  }
}
