import { NextResponse } from "next/server";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3005").replace(/\/+$/, "");

function normalizePayload(data: unknown): Record<string, unknown> | null {
  if (!data || typeof data !== "object") return null;
  const payload = data as Record<string, unknown>;

  if (Array.isArray(payload)) {
    return payload.length > 0 ? (payload[0] as Record<string, unknown>) : null;
  }

  if (payload.data && typeof payload.data === "object") {
    if (Array.isArray(payload.data)) {
      return payload.data.length > 0 ? (payload.data[0] as Record<string, unknown>) : null;
    }
    return payload.data as Record<string, unknown>;
  }

  return payload;
}

function normalizeImageUrl(value: unknown): string {
  if (!value || typeof value !== "string") return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${API_BASE_URL}${value}`;
  return `${API_BASE_URL}/${value}`;
}

export async function GET() {
  try {
    const res = await fetch(`${API_BASE_URL}/setting/website`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ logo: "", abhimaGroupLogo: "" });
    }

    const data = await res.json();
    const raw = normalizePayload(data);

    return NextResponse.json({
      logo: normalizeImageUrl(raw?.logo),
      abhimaGroupLogo: normalizeImageUrl(raw?.abhima_group_logo ?? raw?.abhimaGroupLogo),
    });
  } catch (error) {
    console.error("Failed to fetch setting logos:", error);
    return NextResponse.json({ logo: "", abhimaGroupLogo: "" });
  }
}
