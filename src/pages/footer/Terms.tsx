import PageTransition from '@/components/ui-custom/PageTransition';

export default function Terms() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        <div className="gradient-hero py-16 text-center text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-4xl font-black mb-3" style={{ fontFamily: 'Plus Jakarta Sans' }}>Terms & Conditions</h1>
            <p className="text-white/70">Last updated: May 20, 2025</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-card rounded-3xl p-8 border border-gray-100">
            {[
              { title: '1. Acceptance of Terms', content: 'By accessing or using TOGETHERS, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform. These terms govern your use of TOGETHERS and form a legally binding agreement between you and TOGETHERS Technologies Pvt. Ltd.' },
              { title: '2. User Accounts', content: 'You must be at least 13 years of age to use TOGETHERS. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account. You may not use another person\'s account without permission.' },
              { title: '3. Community Guidelines', content: 'Users must respect all community members and follow our content policies. Prohibited content includes: hate speech, harassment, spam, misinformation, illegal content, and content that violates third-party rights. TOGETHERS reserves the right to remove content and terminate accounts that violate these guidelines without notice.' },
              { title: '4. Creator Content & Monetization', content: 'Creators retain ownership of their original content. By posting on TOGETHERS, you grant us a non-exclusive license to display your content on our platform. Creator earnings are processed within 7 business days. TOGETHERS retains a platform fee of 8-15% on monetized content. Creators are responsible for their own tax obligations.' },
              { title: '5. Subscription & Payments', content: 'Paid subscriptions are billed monthly or annually. All prices are in Indian Rupees and inclusive of applicable GST. Subscriptions automatically renew unless cancelled. Refunds are available within 7 days of initial purchase for annual plans. Monthly plans are non-refundable. Cancel anytime through your account settings.' },
              { title: '6. Intellectual Property', content: 'The TOGETHERS platform, brand, and technology are owned by TOGETHERS Technologies Pvt. Ltd. and protected by intellectual property laws. You may not copy, reproduce, or distribute our proprietary technology or branding without written permission.' },
              { title: '7. Limitation of Liability', content: 'TOGETHERS is provided "as is" without warranties of any kind. We shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.' },
              { title: '8. Governing Law', content: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.' },
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
