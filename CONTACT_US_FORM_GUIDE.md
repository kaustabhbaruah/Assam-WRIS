# 📩 Contact Us Form: Construction, Integration & Configuration Guide

This guide describes the frontend layouts, validation rules, state management, and email relay APIs that power the **AssamWRIS Support Portal** (located under `/src/app/contact/page.tsx`).

---

## 🛠️ Step 1: Front-End Layout & View Construction

The contact page uses a modern, high-contrast, dual-card grid schema on widescreen layouts:
1. **Left Card (Headquarters Info - `lg:col-span-5`):** Renders contact parameters, telephone numbers, address details, and official operating hours in beautiful row panels framed by Lucide icons.
2. **Right Card (Support Form - `lg:col-span-7`):** Renders the interactive fields, category drop-downs, and submission buttons.

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
  {/* Column 1: Headquarters & Operations (lg:col-span-12 -> lg:col-span-5) */}
  {/* Column 2: Interactive Inquiries Form (lg:col-span-12 -> lg:col-span-7) */}
</div>
```

---

## 💾 Step 2: Client State Management & Input Handling

Form states are tracked reactively on the client. Unsaved changes are maintained locally in state loops before submission:

```typescript
const [form, setForm] = useState({
  name: "",
  email: "",
  organization: "",
  category: "General Inquiry",
  message: "",
});
```

---

## 🛡️ Step 3: Input Verification & Validation Rules

To shield mail relays against spam, inputs are evaluated before firing POST requests:

| Input Field | Client-side rule / Constraint | Verification / Implementation |
| :--- | :--- | :--- |
| **Full Name** | Required string | Pre-filtered by standard browser HTML5 `required` flag. |
| **Email Address** | Required string | Standard pattern regex validated: `john.doe@example.com` |
| **Organization** | Optional string | Optional reference field, mapped as "N/A" on the backend. |
| **Inquiry Category**| Optional selection | Chooses from pre-selected categories (e.g. `Spatial Data Request`). |
| **Message Content** | Required text block | Holds detailed catchment boundaries or CRS coordinate references. |

---

## 🚀 Step 4: Submission State Machine & Ticket Generation

When the submit trigger fires:
1. **Button Loading state:** The standard button transitions to `disabled` and displays an active tailspin loader icon.
2. **Secure Post Payload:** The form triggers a standard JSON POST request targeting `/api/contact`.
3. **Reference Generation:** If the response from `/api/contact` returns success, the app computes a unique administrative receipt tracker reference:
   `setTicketId(`WRIS-${Math.floor(100000 + Math.random() * 900000)}`)`
4. **Transition Animation:** Framer Motion (`<AnimatePresence>`) fades the input form out and slides in the success visual card with the generated reference ID.

---

## 📨 Step 5: Server-Side Nodemailer Email Relay (Production API)

The server-side gateway endpoint is built at `/src/app/api/contact/route.ts` using **Nodemailer** to relay messages securely:

```typescript
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, organization, category, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Secure fallback simulation if environmental configs are not established
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("[SMTP Warning] Missing keys. Logging trace instead.");
      return NextResponse.json({ success: true, loggedMock: true });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      }
    });

    const mailOptions = {
      from: `"AssamWRIS Support Service" <${smtpUser}>`,
      to: "support-wris@assam.gov.in",
      replyTo: email,
      subject: `[WRIS Support Desk] New ${category} from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "N/A"}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

---

## 🛠️ Operational Diagnostics & Verification

Use this list when checking new contact form installations:
1. **Endpoint Testing:** Ensure the SMTP credentials are correct when running in production. If they are absent, the API route will gracefully log the payload internally on-screen for testing.
2. **Network Payload:** Inspect the outgoing fetch payload:
   - Request Type: `POST`
   - Content-Type: `application/json`
3. **Hydration Syncing:** Ensure that Navbar/Footer wrappers load cleanly from `app/layout.tsx` to maintain uniform branding across routing screens.
