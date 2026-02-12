import React from 'react';
import { ArrowLeft, Shield, Eye, Database, Globe, UserCheck, Trash2, Bell, Mail } from 'lucide-react';

const PrivacyView: React.FC = () => {
  const lastUpdated = 'February 12, 2026';

  const sections = [
    {
      icon: <Database size={20} />,
      title: '1. Information We Collect',
      content: `We collect information to provide and improve our Service. The types of information we collect include:

**Account Information:** When you create an account, we collect your name, email address, password, and property details (property name, address, unit count).

**Property Data:** Information you upload to configure your AI agent, including knowledge base documents, property descriptions, policies, pricing, tour instructions, and contact information for your staff.

**Call Data:** When your AI agent handles calls, we collect call recordings, transcripts, caller phone numbers, call duration, and the AI agent's responses. We also collect lead information captured during calls (name, email, phone, move-in date, preferences).

**Usage Data:** We automatically collect information about how you use the dashboard, including pages visited, features used, and interaction patterns.

**Device & Technical Data:** Browser type, IP address, device type, and operating system. We use this for security, analytics, and to improve the Service.`,
    },
    {
      icon: <Eye size={20} />,
      title: '2. How We Use Your Information',
      content: `We use the information we collect for the following purposes:

**To Provide the Service:** Operating your AI agent, handling calls, capturing leads, scheduling tours, and managing your properties through the dashboard.

**To Improve the Service:** Analyzing usage patterns and call outcomes to improve AI accuracy and develop new features. When used for AI improvement, data is anonymized and aggregated.

**To Communicate with You:** Sending service-related emails (account confirmations, security alerts, feature updates). We do not send marketing emails without your consent.

**To Ensure Security:** Detecting and preventing fraud, abuse, and unauthorized access to your account and data.

**To Comply with Law:** Responding to legal requests and fulfilling our legal obligations.`,
    },
    {
      icon: <Globe size={20} />,
      title: '3. How We Share Your Information',
      content: `We do not sell your personal information. We share information only in the following circumstances:

**Service Providers:** We use trusted third-party providers to operate the Service:
- **Supabase** — Authentication and database hosting
- **Twilio** — Telephony and phone number provisioning
- **ElevenLabs** — AI voice synthesis
- **Vercel** — Website and API hosting
- **Stripe** — Payment processing (when applicable)

Each provider processes data according to their own privacy policies and our data processing agreements with them.

**Legal Requirements:** We may disclose information if required by law, subpoena, court order, or government request.

**Business Transfers:** If Voiceptionist is acquired, merged, or sells assets, your data may be transferred as part of that transaction. We will notify you before your data is subject to a different privacy policy.

**With Your Consent:** We may share information with third parties when you explicitly authorize us to do so.`,
    },
    {
      icon: <Shield size={20} />,
      title: '4. Data Security',
      content: `We take the security of your data seriously and implement industry-standard measures to protect it:

- All data is encrypted in transit (TLS/SSL) and at rest
- Authentication is handled through Supabase with secure session management
- Server-side operations use isolated service role keys that are never exposed to client-side code
- We use Row Level Security (RLS) policies to ensure users can only access their own property data
- Regular security reviews of our codebase and infrastructure

**Call Recordings:** Call recordings are stored securely and are accessible only to authenticated users associated with the relevant property. Recordings are retained according to your account settings and applicable law.

While we strive to protect your data, no method of electronic transmission or storage is 100% secure. If you discover a security vulnerability, please contact us immediately at support@voiceptionist.com.`,
    },
    {
      icon: <UserCheck size={20} />,
      title: '5. Your Rights & Choices',
      content: `You have the following rights regarding your personal information:

**Access:** You can access your account data, call recordings, transcripts, and lead information through the dashboard at any time.

**Correction:** You can update your account information, property details, and knowledge base content through the dashboard.

**Deletion:** You can request deletion of your account and all associated data by contacting us at support@voiceptionist.com. Upon request, we will delete your data within 30 days, except where retention is required by law.

**Data Export:** You can request a copy of your data in a portable format by contacting us.

**Call Recording Consent:** You are responsible for configuring your AI agent to disclose call recording to callers, as required by the laws of your jurisdiction. Voiceptionist provides tools to enable recording disclosure but cannot provide legal advice on compliance.

**Opt-Out of Communications:** You can unsubscribe from non-essential emails at any time. Service-critical communications (security alerts, Terms updates) cannot be opted out of while your account is active.`,
    },
    {
      icon: <Trash2 size={20} />,
      title: '6. Data Retention',
      content: `We retain your data for as long as your account is active and as needed to provide the Service:

**Account Data:** Retained while your account is active. Deleted within 30 days of account termination.

**Call Recordings & Transcripts:** Retained according to your account settings. Default retention period is 90 days. You can request earlier deletion.

**Lead Data:** Retained while your account is active. Deleted within 30 days of account termination.

**Usage & Analytics Data:** Aggregated and anonymized data may be retained indefinitely for product improvement purposes. This data cannot be linked back to individual users.

**Backups:** Database backups that may contain your data are retained for up to 30 days after the data is deleted from the live system.`,
    },
    {
      icon: <Bell size={20} />,
      title: '7. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.

**How we notify you:** For material changes, we will notify you via email and/or a prominent notice on the Service at least 14 days before the changes take effect.

**Your continued use:** Your continued use of the Service after changes take effect constitutes acceptance of the updated Privacy Policy. If you do not agree with the changes, you may close your account.

**Previous versions:** We will maintain a record of previous versions of this Privacy Policy and make them available upon request.`,
    },
    {
      icon: <Mail size={20} />,
      title: '8. Contact Us',
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**Email:** support@voiceptionist.com
**Location:** Ann Arbor, Michigan

We aim to respond to all privacy-related inquiries within 5 business days.

**For EU/EEA Residents:** If you believe we have not adequately addressed your data protection concerns, you have the right to lodge a complaint with your local data protection authority.

**For California Residents:** Under the California Consumer Privacy Act (CCPA), you have additional rights regarding your personal information, including the right to know, delete, and opt-out of the sale of personal information. We do not sell personal information.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="bg-[#171717] text-white">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          <a href="/" className="inline-flex items-center space-x-1.5 text-gray-400 hover:text-white mb-10 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Voiceptionist</span>
          </a>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#abc2fe]/20 flex items-center justify-center">
              <Shield size={24} className="text-[#abc2fe]" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Legal</p>
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            How Voiceptionist collects, uses, and protects your data.
          </p>
          <p className="text-sm text-gray-500 mt-6">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-12">
          <p className="text-gray-600 leading-relaxed">
            This Privacy Policy describes how Voiceptionist Inc. ("Voiceptionist", "we", "us", or "our") collects, uses, shares, and protects your personal information when you use our AI-powered leasing assistant platform ("Service"). By using the Service, you agree to the practices described in this policy.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            This policy applies to all users of the Service, including property managers, property staff, and any individuals whose information is collected through the Service (such as callers and leads).
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                  {section.content.split('**').map((part, i) =>
                    i % 2 === 1
                      ? <strong key={i} className="text-gray-900">{part}</strong>
                      : <span key={i}>{part}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pb-8 text-center">
          <p className="text-xs text-gray-400">
            This Privacy Policy was last updated on {lastUpdated}. See our <a href="/terms" className="underline hover:text-gray-600">Terms of Service</a> for additional legal information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyView;
