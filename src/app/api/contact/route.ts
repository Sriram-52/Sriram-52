import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
	name?: string;
	email?: string;
	message?: string;
};

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
	// Simple RFC 5322-ish check; keep lightweight
	return /.+@.+\..+/.test(value);
}

function requiredEnv(name: string): string {
	const v = process.env[name];
	if (!v) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return v;
}

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as ContactPayload;

		const name = isNonEmptyString(body.name) ? body.name.trim() : "";
		const email = isNonEmptyString(body.email) ? body.email.trim() : "";
		const message = isNonEmptyString(body.message) ? body.message.trim() : "";

		if (!name || !email || !message) {
			return Response.json(
				{ error: "All fields (name, email, message) are required." },
				{ status: 400 }
			);
		}
		if (!isValidEmail(email)) {
			return Response.json(
				{ error: "Invalid email address." },
				{ status: 400 }
			);
		}

		const host = requiredEnv("SMTP_HOST");
		const port = Number(requiredEnv("SMTP_PORT"));
		const user = requiredEnv("SMTP_USER");
		const pass = requiredEnv("SMTP_PASS");
		const to = requiredEnv("CONTACT_TO");
		const from = process.env.CONTACT_FROM || user;

		const transporter = nodemailer.createTransport({
			host,
			port,
			secure: port === 465,
			auth: { user, pass },
		});

		const subject = `Portfolio contact from ${name}`;
		const text = `${message}\n\nFrom: ${name} <${email}>`;
		const html = `
      <div>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr/>
        <p>From: <strong>${name}</strong> &lt;${email}&gt;</p>
      </div>
    `;

		await transporter.sendMail({
			from,
			to,
			subject,
			text,
			html,
			replyTo: email,
		});

		return Response.json({ ok: true });
	} catch (error) {
		console.error("/api/contact POST error", error);
		return Response.json(
			{ error: "Failed to send message. Please try again later." },
			{ status: 500 }
		);
	}
}
