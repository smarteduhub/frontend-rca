import { NextRequest, NextResponse } from "next/server";

// Mock user profiles database
const MOCK_USER_PROFILES: Record<string, any> = {
  "1": {
    id: "1",
    email: "admin@smarteduhub.com",
    name: "Admin User",
    role: "admin",
    phone: "+250788123456",
    country: "Rwanda",
    created_at: "2024-01-01T00:00:00Z",
  },
  "2": {
    id: "2",
    email: "teacher@smarteduhub.com",
    name: "Teacher User",
    role: "teacher",
    phone: "+250788654321",
    country: "Rwanda",
    field_of_study: "Mathematics",
    created_at: "2024-01-02T00:00:00Z",
  },
  "3": {
    id: "3",
    email: "student@smarteduhub.com",
    name: "Student User",
    role: "student",
    phone: "+250788999888",
    country: "Rwanda",
    field_of_study: "Computer Science",
    created_at: "2024-01-03T00:00:00Z",
  },
  "4": {
    id: "4",
    email: "parent@smarteduhub.com",
    name: "Parent User",
    role: "parent",
    phone: "+250788777666",
    country: "Rwanda",
    created_at: "2024-01-04T00:00:00Z",
  },
};

// Mock endpoint to get user profile
export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - missing token" },
        { status: 401 }
      );
    }

    // Decode token to get user ID (simplified for mock)
    const token = authHeader.substring(7);
    try {
      // Extract payload from token (format: header.payload.signature)
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token format");
      }

      // Decode payload
      const payload = JSON.parse(
        Buffer.from(parts[1], "base64").toString("utf-8")
      );
      const userId = payload.id;

      // Get user profile from mock database
      const profile = MOCK_USER_PROFILES[userId];
      if (!profile) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(profile, { status: 200 });
    } catch (tokenError) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
