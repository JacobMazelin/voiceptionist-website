import React from 'react';
import { ArrowLeft, Shield, Scale, Eye, Bell, FileText, Users, AlertTriangle, Mail } from 'lucide-react';

const TermsView: React.FC = () => {
  const lastUpdated = 'February 11, 2026';

  const sections = [
    {
      icon: <FileText size={20} />,
      title: '1. Service Description',
      content: `Voiceptionist provides an AI-powered virtual leasing assistant platform ("Service") designed for property management companies and landlords. The Service includes:

- An AI voice agent that answers inbound phone calls on behalf of your property
- Automated lead capture, tour scheduling, and caller inquiry handling
- A web-based dashboard for managing calls, leads, tours, and property settings
- Knowledge base integration so your agent can answer property-specific questions
- Phone number provisioning and management through our telephony partners

The Service is intended to supplement — not replace — human property management staff. The AI agent will escalate complex or sensitive inquiries to designated human contacts.`,
    },
    {
      icon: <Users size={20} />,
      title: '2. Account & Eligibility',
      content: `To use the Service, you must:

- Be at least 18 years old and legally able to enter into a binding agreement
- Provide accurate and complete registration information including a valid email address and property details
- Maintain the confidentiality of your account credentials
- Be authorized to act on behalf of the property or properties you register

You are responsible for all activity that occurs under your account. If you suspect unauthorized access, notify us immediately at support@voiceptionist.com.

Each account is tied to one or more properties. You may add additional properties through the dashboard or by contacting our team.`,
    },
    {
      icon: <Scale size={20} />,
      title: '3. Acceptable Use',
      content: `You agree to use the Service lawfully and in accordance with these Terms. You may not:

- Use the Service for any purpose that violates applicable local, state, national, or international law
- Provide false, misleading, or discriminatory information to callers through the AI agent's knowledge base
- Attempt to reverse-engineer, decompile, or extract the source code of our AI models or systems
- Use the Service to harass, abuse, or harm any person
- Interfere with or disrupt the integrity or performance of the Service
- Upload malicious content, viruses, or harmful code to the platform

You are solely responsible for the accuracy and legality of the content you upload to your agent's knowledge base, including property descriptions, pricing, policies, and any other materials. Your AI agent's responses are generated based on the information you provide.`,
    },
    {
      icon: <Shield size={20} />,
      title: '4. Data & Privacy',
      content: `We take data privacy seriously. Here's how we handle your information:

**Data we collect:** Property details you provide, call recordings and transcripts, lead information captured by the AI agent, usage analytics, and account information.

**How we use it:** To operate and improve the Service, to train and improve our AI models (using anonymized and aggregated data only), to provide customer support, and to send service-related communications.

**Data storage:** All data is stored securely using industry-standard encryption. Call recordings and transcripts are stored in compliance with applicable recording consent laws.

**Third-party services:** We use trusted third-party providers for telephony (Twilio), AI processing (ElevenLabs), authentication (Supabase), and payment processing (Stripe). Each provider has their own privacy policy and data handling practices.

**Your rights:** You may request access to, correction of, or deletion of your personal data at any time by contacting us. Upon account termination, we will delete your data within 30 days, except as required by law.

**Call recording disclosure:** The AI agent can be configured to disclose that calls may be recorded. You are responsible for compliance with call recording consent laws in your jurisdiction.`,
    },
    {
      icon: <Bell size={20} />,
      title: '5. Service Availability & Support',
      content: `We strive to maintain 99.9% uptime for the Service, but we do not guarantee uninterrupted availability. The Service may be temporarily unavailable due to:

- Scheduled maintenance (we will provide advance notice when possible)
- Unplanned outages from our infrastructure providers
- Force majeure events beyond our reasonable control

**Support:** We provide email support at support@voiceptionist.com during business hours (Monday–Friday, 9 AM–6 PM ET). We aim to respond to all inquiries within one business day.

**Updates:** We may update, modify, or discontinue features of the Service at any time. Material changes will be communicated via email or in-app notification with reasonable advance notice.`,
    },
    {
      icon: <Eye size={20} />,
      title: '6. AI Transparency & Limitations',
      content: `Our AI agent is designed to be helpful, accurate, and professional. However, you should be aware of the following:

**AI-generated responses:** The agent generates responses based on your uploaded knowledge base and its training data. Responses may occasionally be inaccurate, incomplete, or inappropriate. You should regularly review call transcripts and update your knowledge base to ensure accuracy.

**No legal, financial, or medical advice:** The AI agent is not a substitute for professional legal, financial, or medical advice. It should not be used to provide guidance on Fair Housing compliance, lease interpretation, or other matters requiring professional judgment.

**Caller awareness:** We recommend enabling the AI disclosure feature so callers are aware they are speaking with an AI assistant. This is required by law in certain jurisdictions.

**Escalation:** The agent is programmed to escalate to a human when it encounters questions it cannot answer confidently, when a caller requests to speak with a human, or when sensitive situations arise (e.g., emergencies, complaints, legal matters).`,
    },
    {
      icon: <AlertTriangle size={20} />,
      title: '7. Limitation of Liability',
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.

Voiceptionist shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising out of or in connection with your use of the Service.

Our total aggregate liability for any claims arising from your use of the Service shall not exceed the amounts you have paid to us in the twelve (12) months preceding the claim.

You agree to indemnify and hold harmless Voiceptionist and its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Service, your violation of these Terms, or your violation of any third-party rights.`,
    },
    {
      icon: <Mail size={20} />,
      title: '8. Termination',
      content: `**By you:** You may cancel your account at any time through the dashboard or by contacting us at support@voiceptionist.com. Upon cancellation, your phone number will be released and your AI agent will be deactivated.

**By us:** We may suspend or terminate your account if you violate these Terms, if your payment method fails and is not updated within 7 days, or if we reasonably believe your use of the Service poses a risk to other users or our infrastructure.

**Effect of termination:** Upon termination, your right to use the Service ceases immediately. We will retain your data for 30 days to allow for account recovery, after which it will be permanently deleted. Phone numbers provisioned through the Service will be released back to our telephony provider.

**Survival:** Sections relating to Limitation of Liability, Data & Privacy, and Governing Law survive termination of these Terms.`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Hero header */}
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
          <h1 className="text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            The rules and guidelines that govern your use of Voiceptionist's AI leasing assistant platform.
          </p>
          <p className="text-sm text-gray-500 mt-6">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-12">
          <p className="text-gray-600 leading-relaxed">
            Welcome to Voiceptionist. These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer", "you", or "your") and Voiceptionist Inc. ("Voiceptionist", "we", "us", or "our"). By creating an account or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms, and "you" refers to both you individually and the organization.
          </p>
        </div>

        {/* Sections */}
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

        {/* Governing law & contact */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="font-bold text-gray-900 mb-3">Governing Law</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of the State of Michigan, without regard to conflict of law principles. Any disputes shall be resolved in the state or federal courts located in Washtenaw County, Michigan.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h3 className="font-bold text-gray-900 mb-3">Contact Us</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Questions about these Terms? We're here to help.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="text-gray-400">Email:</span>{' '}
                <a href="mailto:support@voiceptionist.com" className="text-[#abc2fe] hover:underline">support@voiceptionist.com</a>
              </p>
              <p className="text-gray-600">
                <span className="text-gray-400">Location:</span> Ann Arbor, Michigan
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 pb-8 text-center">
          <p className="text-xs text-gray-400">
            These Terms of Service were last updated on {lastUpdated}. We may update these Terms from time to time.
            Material changes will be communicated via email or in-app notification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsView;
