import PageTransition from '@/components/ui-custom/PageTransition';

export default function Privacy() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        <div className="gradient-hero py-16 text-center text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl font-black mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>Privacy Policy</h1>
            <p className="text-white/70">Last updated: May 20, 2025</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-card rounded-3xl p-8 border border-gray-100 prose prose-lg max-w-none">
            {[
              { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, join communities, post content, or communicate with us. This includes your name, email address, profile information, content you post, and communications with other users. We also automatically collect certain technical information when you use our platform, including IP address, browser type, device identifiers, and usage patterns.' },
              { title: '2. How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our services; process transactions and send related information; send promotional communications (with your consent); monitor and analyze trends and usage; detect and prevent fraudulent or illegal activity; and comply with legal obligations. We process your data in accordance with the India Personal Data Protection Bill (PDPB).' },
              { title: '3. Information Sharing', content: 'We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, when required by law, or in connection with a business transaction such as a merger or acquisition. Community information that you choose to make public is visible to other users of our platform.' },
              { title: '4. Data Storage & Security', content: 'Your data is stored on secure servers located in India. We implement industry-standard security measures including encryption at rest and in transit, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.' },
              { title: '5. Your Rights', content: 'You have the right to access, update, or delete your personal information at any time through your account settings. You may also opt out of marketing communications, request data portability, and lodge complaints with relevant data protection authorities. To exercise any of these rights, contact us at privacy@togethers.in.' },
              { title: '6. Cookies', content: 'We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our service may not function properly.' },
              { title: '7. Contact Us', content: 'If you have questions about this Privacy Policy, please contact our Data Protection Officer at privacy@togethers.in or at TOGETHERS Technologies Pvt. Ltd., BKC, Mumbai - 400051, India.' },
            ].map(section => (
              <div key={section.title} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
