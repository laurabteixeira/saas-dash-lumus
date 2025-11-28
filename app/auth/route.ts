import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const DASHBOARD_JWT_SECRET = process.env.DASHBOARD_JWT_SECRET || "";

export async function GET(req: NextRequest) {
  if (!DASHBOARD_JWT_SECRET) {
    console.error("DASHBOARD_JWT_SECRET não configurado na dashboard");
    return NextResponse.json(
      { error: "SSO not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing token" },
      { status: 400 }
    );
  }

  try {
    const payload = jwt.verify(token, DASHBOARD_JWT_SECRET) as {
      merchantId: string;
      shopId: string;
      shopDomain: string;
      platform: string;
      iat: number;
      exp: number;
    };

    const response = NextResponse.redirect(new URL("/", req.url));

    response.cookies.set("merchantId", payload.merchantId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set("apiToken", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error("[/auth] Invalid or expired token:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
