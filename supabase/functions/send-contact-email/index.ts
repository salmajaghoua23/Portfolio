import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const readRecipients = (value: unknown): string[] => {
  if (typeof value !== "object" || value === null || !("emails" in value)) return [];
  const emails = (value as { emails: unknown }).emails;
  if (!Array.isArray(emails)) return [];
  return emails.filter((email): email is string => typeof email === "string" && email.includes("@"));
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as { message_id?: unknown };
    if (typeof body.message_id !== "string" || !UUID_PATTERN.test(body.message_id)) {
      return jsonResponse({ error: "Invalid message id" }, 400);
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      return jsonResponse({ error: "Email service is not configured" }, 500);
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: message, error: messageError } = await admin
      .from("messages")
      .select("id, name, email, subject, message, email_sent_at")
      .eq("id", body.message_id)
      .maybeSingle();
    if (messageError) throw messageError;
    if (!message) return jsonResponse({ error: "Message not found" }, 404);
    if (message.email_sent_at) return jsonResponse({ ok: true, alreadySent: true });

    const { data: contactSetting, error: settingError } = await admin
      .from("settings")
      .select("value")
      .eq("key", "contact")
      .maybeSingle();
    if (settingError) throw settingError;

    const recipients = readRecipients(contactSetting?.value);
    if (recipients.length === 0) {
      return jsonResponse({ error: "No notification recipients are configured" }, 500);
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: recipients,
        reply_to: message.email,
        subject: `Portfolio contact: ${message.subject ?? message.name}`,
        text: `From: ${message.name} <${message.email}>\n\n${message.message}`,
      }),
    });

    if (!resendResponse.ok) {
      console.error("Resend rejected the notification", resendResponse.status, await resendResponse.text());
      return jsonResponse({ error: "The email provider rejected the notification" }, 502);
    }

    const { error: updateError } = await admin
      .from("messages")
      .update({ email_sent_at: new Date().toISOString() })
      .eq("id", message.id);
    if (updateError) throw updateError;

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error("send-contact-email failed", err);
    return jsonResponse({ error: "Unexpected error while sending the notification" }, 500);
  }
});
