
import React from 'react';
import { Linkedin } from 'lucide-react';

const team = [
  {
    name: 'Jacob Mazelin',
    role: 'Co-Founder',
    school: 'University of Michigan',
    focus: 'Robotics, CS & Entrepreneurship',
    linkedin: 'https://www.linkedin.com/in/jacobmazelin/',
    photo: '/team/jacob.jpeg',
  },
  {
    name: 'Ethan Wang',
    role: 'Co-Founder',
    school: 'Purdue University',
    focus: 'Computer Science',
    linkedin: 'https://www.linkedin.com/in/ethanwang57/',
    photo: '/team/ethan.jpeg',
  },
];

const TeamView: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="hero-gradient pt-40 pb-24 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-[48px] md:text-[72px] font-medium tracking-tighter leading-[1.05]">
            Building the future<br />of property operations.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            We believe property teams deserve better tools. Voiceptionist is an AI receptionist
            that handles calls, books tours, and supports residents — so your team never misses a beat.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-8">
            <span className="text-[#5f5f5f] font-semibold uppercase tracking-[0.15em] text-xs">Our Mission</span>
            <p className="text-[28px] md:text-[36px] font-medium text-black tracking-tight leading-snug">
              Every missed call is a missed opportunity. We're building AI that ensures property teams
              never lose a lead, a resident request, or an emergency — no matter the time of day.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 space-y-4">
            <span className="text-[#5f5f5f] font-semibold uppercase tracking-[0.15em] text-xs">The Team</span>
            <h2 className="text-[42px] font-medium text-black tracking-tight leading-none">Meet the founders</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                {/* Photo */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[15px] font-semibold text-ramp-lime mb-4">{member.role}</p>

                <div className="space-y-1 mb-6">
                  <p className="text-sm text-gray-500">{member.school}</p>
                  <p className="text-sm text-gray-400">{member.focus}</p>
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 space-y-4">
            <span className="text-[#5f5f5f] font-semibold uppercase tracking-[0.15em] text-xs">What Drives Us</span>
            <h2 className="text-[42px] font-medium text-black tracking-tight leading-none">Our principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Ship fast, iterate faster',
                desc: 'We build, test, and learn in tight cycles. Speed is a feature.',
              },
              {
                title: 'Honesty over hype',
                desc: 'We only promise what we can deliver. Our product speaks for itself.',
              },
              {
                title: 'Automate the mundane',
                desc: 'Property teams should focus on people, not phone calls. AI handles the rest.',
              },
            ].map((v) => (
              <div key={v.title} className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamView;
