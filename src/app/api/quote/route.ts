import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseAdmin } from "@/lib/supabase-server";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      company,
      email,
      phone,
      serviceInterested,
      additionalInfo,
    } = body as Record<string, string | undefined>;

    const first = typeof firstName === "string" ? firstName.trim() : "";
    const last = typeof lastName === "string" ? lastName.trim() : "";
    const comp = typeof company === "string" ? company.trim() : "";
    const em = typeof email === "string" ? email.trim() : "";
    const ph = typeof phone === "string" ? phone.trim() : "";
    const svc =
      typeof serviceInterested === "string" ? serviceInterested.trim() : "";
    const info =
      typeof additionalInfo === "string" ? additionalInfo.trim() : "";

    if (!first || !last || !comp || !em || !ph || !svc) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdmin();

    const { error: insertError } = await supabase.from("leads").insert({
      first_name: first,
      last_name: last,
      company: comp,
      email: em,
      phone: ph,
      service_interested: svc,
      additional_info: info || null,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        {
          success: false,
          error: "Could not save your request. Please try again or call us.",
        },
        { status: 500 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const notifyTo =
      process.env.LEAD_NOTIFICATION_EMAIL || "info@rscleaners.com";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const safe = {
        first: escapeHtml(first),
        last: escapeHtml(last),
        comp: escapeHtml(comp),
        em: escapeHtml(em),
        ph: escapeHtml(ph),
        svc: escapeHtml(svc),
        info: info ? escapeHtml(info) : "—",
      };

      const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #1a1a2e;">
  <h2 style="color: #14b8a6;">New quote request</h2>
  <table style="border-collapse: collapse; max-width: 520px;">
    <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Name</td><td>${safe.first} ${safe.last}</td></tr>
    <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Company</td><td>${safe.comp}</td></tr>
    <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Email</td><td><a href="mailto:${safe.em}">${safe.em}</a></td></tr>
    <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Phone</td><td><a href="tel:${safe.ph}">${safe.ph}</a></td></tr>
    <tr><td style="padding: 6px 12px 6px 0; font-weight: 600;">Service</td><td>${safe.svc}</td></tr>
    <tr><td style="padding: 6px 12px 6px 0; font-weight: 600; vertical-align: top;">Additional info</td><td>${safe.info.replace(/\n/g, "<br/>")}</td></tr>
  </table>
  <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">Sent from RS Cleaning website quote form.</p>
</body>
</html>`;

      const { error: emailError } = await resend.emails.send({
        from: "RS Cleaning Website <info@rscleaners.com>",
        to: [notifyTo],
        subject: `New Quote Request from ${first} ${last}`,
        html,
      });

      if (emailError) {
        console.error("Resend error:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY not set; skipping email notification.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/quote:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again or call 617-212-8717.",
      },
      { status: 500 }
    );
  }
}
