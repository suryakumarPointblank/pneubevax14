import { getDatabase } from "@/lib/mongodb";
import { appendRowsToSheet } from "@/lib/google-sheets";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensure it's not cached

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection("form_submissions");

    // Fetch all submissions sorted by creation time (optional, but good for consistent order)
    const submissions = await collection
      .find({})
      .sort({ createdAt: 1 })
      .toArray();

    if (submissions.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No submissions found to sync.",
      });
    }

    const success = await appendRowsToSheet(submissions);

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Successfully synced ${submissions.length} records to Google Sheet.`,
        count: submissions.length,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to sync records to Google Sheet. Check server logs.",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error syncing sheets:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during sync.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
