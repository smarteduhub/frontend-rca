import { NextRequest, NextResponse } from "next/server";

// Helper function to create a simple JWT-like token (base64 encoded JSON)
// Note: This is for development only. Use proper JWT in production.
function createMockToken(payload: any): string {
  const header = { alg: "HS256", typ: "JWT" };
  const expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours
  const tokenPayload = { ...payload, exp: expiresAt, iat: Math.floor(Date.now() / 1000) };
  
  // Create a simple base64 encoded token (not cryptographically signed, for dev only)
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");
  const encodedPayload = Buffer.from(JSON.stringify(tokenPayload)).toString("base64");
  const signature = "dev-signature"; // Placeholder signature
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Mock user database - use these credentials to login
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@smarteduhub.com",
    password: "password123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "teacher@smarteduhub.com",
    password: "password123",
    name: "Teacher User",
    role: "teacher",
  },
  {
    id: "3",
    email: "student@smarteduhub.com",
    password: "password123",
    name: "Student User",
    role: "student",
  },
  {
    id: "4",
    email: "parent@smarteduhub.com",
    password: "password123",
    name: "Parent User",
    role: "parent",
  },
];

// Mock login endpoint - validates credentials and returns token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user in mock database
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate mock token
    const token = createMockToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Create response with token
    const response = NextResponse.json(
      {
        access_token: token,
        token_type: "Bearer",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // Set token in HTTP-only cookie
    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
