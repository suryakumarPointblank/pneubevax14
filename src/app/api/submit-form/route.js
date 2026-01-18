import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const db = await getDatabase();
    const collection = db.collection("form_submissions");

    const submission = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      userAgent: request.headers.get("user-agent") || "",
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "",
    };

    const result = await collection.insertOne(submission);

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection("form_submissions");

    const submissions = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch submissions",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
