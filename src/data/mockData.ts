import { Community, Event, Post } from '@/types';

export const COMMUNITIES: Community[] = [
  { id: '1', name: 'Bangalore Tech Hub', description: 'Connecting tech professionals in Bangalore', category: 'Technology', members: 12450, isPrivate: false, tags: ['tech', 'startup', 'coding'], organizer: 'Arjun Mehta', createdAt: '2024-01-10' },
  { id: '2', name: 'Mumbai Founders Circle', description: 'Startup founders and entrepreneurs community', category: 'Business', members: 8900, isPrivate: false, tags: ['startup', 'business', 'entrepreneur'], organizer: 'Priya Sharma', createdAt: '2024-02-05' },
  { id: '3', name: 'Delhi Design Collective', description: 'UI/UX designers and creative professionals', category: 'Design', members: 6700, isPrivate: false, tags: ['design', 'ui', 'creative'], organizer: 'Sneha Patel', createdAt: '2024-01-20' },
  { id: '4', name: 'India AI Research Group', description: 'Artificial intelligence researchers and enthusiasts', category: 'AI/ML', members: 15600, isPrivate: false, tags: ['ai', 'ml', 'research'], organizer: 'Ravi Kumar', createdAt: '2023-12-01' },
  { id: '5', name: 'Hyderabad Gaming Guild', description: 'Gamers, game developers, and esports fans', category: 'Gaming', members: 9800, isPrivate: false, tags: ['gaming', 'esports', 'gamedev'], organizer: 'Rahul Verma', createdAt: '2024-03-01' },
  { id: '6', name: 'Creators Collective India', description: 'Content creators building their audience', category: 'Content', members: 22000, isPrivate: false, tags: ['creator', 'content', 'influencer'], organizer: 'Arjun Mehta', createdAt: '2024-01-05' },
  { id: '7', name: 'Women in Tech India', description: 'Empowering women in technology', category: 'Technology', members: 11200, isPrivate: false, tags: ['women', 'tech', 'diversity'], organizer: 'Kavita Singh', createdAt: '2024-02-14' },
  { id: '8', name: 'Pune Startup Ecosystem', description: 'Startups, investors, and mentors in Pune', category: 'Business', members: 5400, isPrivate: true, tags: ['startup', 'investment', 'pune'], organizer: 'Aditya Joshi', createdAt: '2024-03-15' },
];

export const EVENTS: Event[] = [
  { id: '1', title: 'India Tech Summit 2025', description: 'The largest tech conference bringing together 5000+ tech professionals', date: '2025-06-15', time: '09:00 AM', location: 'HICC, Hyderabad', isVirtual: false, attendees: 4230, maxAttendees: 5000, category: 'Technology', organizer: 'Arjun Mehta', price: 999, tags: ['tech', 'conference', 'innovation'] },
  { id: '2', title: 'Creator Economy Workshop', description: 'Learn monetization strategies for content creators', date: '2025-06-22', time: '02:00 PM', location: 'Online', isVirtual: true, attendees: 890, maxAttendees: 1000, category: 'Creator', organizer: 'Priya Sharma', price: 299, tags: ['creator', 'monetization', 'workshop'] },
  { id: '3', title: 'Startup Pitch Night Mumbai', description: 'Present your startup to top investors in Mumbai', date: '2025-07-05', time: '06:00 PM', location: 'BKC, Mumbai', isVirtual: false, attendees: 234, maxAttendees: 300, category: 'Business', organizer: 'Sneha Patel', price: 499, tags: ['startup', 'pitch', 'investment'] },
  { id: '4', title: 'AI Hackathon 2025', description: '48-hour hackathon to build AI-powered solutions', date: '2025-07-12', time: '10:00 AM', location: 'IIT Delhi', isVirtual: false, attendees: 567, maxAttendees: 600, category: 'AI/ML', organizer: 'Ravi Kumar', price: 0, tags: ['ai', 'hackathon', 'ml'] },
  { id: '5', title: 'Women Leadership Summit', description: 'Empowering women leaders across industries', date: '2025-07-20', time: '10:00 AM', location: 'Taj Hotel, Bangalore', isVirtual: false, attendees: 345, maxAttendees: 500, category: 'Leadership', organizer: 'Kavita Singh', price: 799, tags: ['women', 'leadership', 'empowerment'] },
  { id: '6', title: 'Design Thinking Bootcamp', description: 'Intensive 3-day design thinking workshop', date: '2025-08-01', time: '09:00 AM', location: 'Online', isVirtual: true, attendees: 156, maxAttendees: 200, category: 'Design', organizer: 'Sneha Patel', price: 1499, tags: ['design', 'thinking', 'bootcamp'] },
];

export const POSTS: Post[] = [
  { id: '1', author: 'Arjun Mehta', authorAvatar: 'https://i.pravatar.cc/150?img=12', authorRole: 'creator', content: 'Just crossed 45K followers on TOGETHERS! Thank you all for the incredible support. Building this community has been the most rewarding journey. What should we do for our milestone celebration? #Grateful #Community #TOGETHERS', likes: 2340, comments: 187, shares: 89, createdAt: '2 hours ago', tags: ['milestone', 'community'], liked: false },
  { id: '2', author: 'Priya Sharma', authorAvatar: 'https://i.pravatar.cc/150?img=47', authorRole: 'admin', content: 'Big announcement: TOGETHERS is launching our Creator Monetization Program next month! Creators can now earn directly from their communities. Apply now with the link below. This is going to be a game-changer for the Indian creator economy!', likes: 5670, comments: 432, shares: 234, createdAt: '5 hours ago', tags: ['announcement', 'creator'], liked: true },
  { id: '3', author: 'Sneha Patel', authorAvatar: 'https://i.pravatar.cc/150?img=29', authorRole: 'organizer', content: 'Just finished organizing the Bangalore Tech Meetup with 500+ attendees! The energy was electric. Thank you to every speaker, sponsor, and participant. See you at the next one in July! #TechMeetup #Bangalore #Community', likes: 1234, comments: 98, shares: 45, createdAt: '1 day ago', tags: ['meetup', 'bangalore'], liked: false },
  { id: '4', author: 'Ravi Kumar', authorAvatar: 'https://i.pravatar.cc/150?img=33', authorRole: 'user', content: 'Day 30 of my #100DaysOfCode challenge! Today I built a real-time chat feature using WebSockets. The learning curve has been steep but every line of code feels like a win. Who else is on this journey?', likes: 789, comments: 67, shares: 23, createdAt: '1 day ago', tags: ['coding', 'challenge'], liked: true },
  { id: '5', author: 'Kavita Singh', authorAvatar: 'https://i.pravatar.cc/150?img=25', authorRole: 'team', content: 'Our team just shipped a major product update! 6 months of hard work, late nights, and countless cups of chai. Proud of everyone. This is what collaboration looks like. #TeamWork #ProductLaunch #Startup', likes: 2890, comments: 156, shares: 78, createdAt: '2 days ago', tags: ['team', 'product'], liked: false },
];

export const ANALYTICS_DATA = {
  weeklyUsers: [
    { day: 'Mon', users: 4200, engagement: 3100 },
    { day: 'Tue', users: 5800, engagement: 4200 },
    { day: 'Wed', users: 7200, engagement: 5400 },
    { day: 'Thu', users: 6100, engagement: 4800 },
    { day: 'Fri', users: 8900, engagement: 6700 },
    { day: 'Sat', users: 11200, engagement: 9100 },
    { day: 'Sun', users: 9800, engagement: 7600 },
  ],
  monthlyGrowth: [
    { month: 'Jan', communities: 120, users: 8900, revenue: 234000 },
    { month: 'Feb', communities: 145, users: 12400, revenue: 312000 },
    { month: 'Mar', communities: 178, users: 18700, revenue: 456000 },
    { month: 'Apr', communities: 210, users: 24300, revenue: 589000 },
    { month: 'May', communities: 256, users: 31200, revenue: 723000 },
    { month: 'Jun', communities: 298, users: 42100, revenue: 891000 },
  ],
  topCategories: [
    { name: 'Technology', value: 35, color: '#F97316' },
    { name: 'Business', value: 22, color: '#4F46E5' },
    { name: 'Design', value: 18, color: '#10B981' },
    { name: 'Gaming', value: 12, color: '#F59E0B' },
    { name: 'Others', value: 13, color: '#6B7280' },
  ],
};

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Community',
    price: 0,
    period: 'month',
    description: 'Perfect for getting started',
    color: 'border-gray-200',
    features: [
      'Join up to 5 communities',
      'Basic social feed',
      'Direct messaging (10/day)',
      'Event participation',
      'Mobile app access',
      'Basic analytics',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Creator Pro',
    price: 799,
    period: 'month',
    description: 'For creators building their audience',
    color: 'border-coral-500',
    features: [
      'Unlimited communities',
      'Premium content tools',
      'Unlimited messaging',
      'Event hosting (up to 100)',
      'Revenue analytics',
      'Verified creator badge',
      'Priority support',
      'Monetization access',
    ],
    cta: 'Start Creator Journey',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 2499,
    period: 'month',
    description: 'For teams and organizations',
    color: 'border-indigo-500',
    features: [
      'Everything in Creator Pro',
      'Team dashboards (unlimited)',
      'Advanced RBAC controls',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      'SLA 99.9% uptime',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const TESTIMONIALS = [
  { id: '1', name: 'Aditya Joshi', role: 'Startup Founder', location: 'Pune', avatar: 'https://i.pravatar.cc/150?img=15', rating: 5, text: 'TOGETHERS transformed how I connect with other founders. I found my co-founder, first 3 investors, and 50+ early users all through this platform. The community features are unmatched!' },
  { id: '2', name: 'Meera Nair', role: 'Content Creator', location: 'Kerala', avatar: 'https://i.pravatar.cc/150?img=35', rating: 5, text: 'As a creator, TOGETHERS gives me everything I need — from building my community to monetizing my content. I made Rs.2.5L last month just from my premium community!' },
  { id: '3', name: 'Vikram Reddy', role: 'Tech Lead', location: 'Hyderabad', avatar: 'https://i.pravatar.cc/150?img=22', rating: 5, text: 'Our engineering team collaboration improved 3x after moving to TOGETHERS. The team dashboard, shared tasks, and real-time collaboration tools are exactly what we needed.' },
  { id: '4', name: 'Anjali Gupta', role: 'Community Manager', location: 'Delhi', avatar: 'https://i.pravatar.cc/150?img=41', rating: 5, text: 'Managing 10,000+ member communities was chaotic before TOGETHERS. Now with the organizer dashboard and analytics, I run everything smoothly and the engagement has gone through the roof!' },
  { id: '5', name: 'Siddharth Rao', role: 'Product Manager', location: 'Bangalore', avatar: 'https://i.pravatar.cc/150?img=18', rating: 5, text: 'The AI recommendations on TOGETHERS are incredibly accurate. It introduced me to communities I never would have found on my own, and now those connections are crucial to my career.' },
];

export const BLOG_POSTS = [
  { id: '1', title: 'The Future of Community-Led Growth in India', excerpt: 'How Indian startups are leveraging community platforms to achieve hypergrowth without massive marketing budgets.', category: 'Strategy', author: 'Priya Sharma', authorAvatar: 'https://i.pravatar.cc/150?img=47', date: '2025-05-15', readTime: '8 min', tags: ['community', 'growth', 'startup'], featured: true },
  { id: '2', title: '10 Ways Creators Are Earning Rs.1L+ Monthly on TOGETHERS', excerpt: 'Real stories from Indian creators who built sustainable income through community engagement and premium content.', category: 'Creator Economy', author: 'Arjun Mehta', authorAvatar: 'https://i.pravatar.cc/150?img=12', date: '2025-05-12', readTime: '12 min', tags: ['creator', 'monetization', 'income'], featured: true },
  { id: '3', title: 'Building Remote Teams That Actually Collaborate', excerpt: 'Lessons from 500 remote teams on TOGETHERS about what makes virtual collaboration work effectively.', category: 'Team Building', author: 'Kavita Singh', authorAvatar: 'https://i.pravatar.cc/150?img=25', date: '2025-05-10', readTime: '6 min', tags: ['remote', 'team', 'collaboration'], featured: false },
  { id: '4', title: 'AI-Powered Community Recommendations: How It Works', excerpt: 'A deep dive into the machine learning models powering TOGETHERS community discovery engine.', category: 'Technology', author: 'Ravi Kumar', authorAvatar: 'https://i.pravatar.cc/150?img=33', date: '2025-05-08', readTime: '10 min', tags: ['ai', 'technology', 'recommendations'], featured: false },
  { id: '5', title: 'Event Organizing in the Hybrid World: Best Practices', excerpt: 'How top organizers are blending virtual and in-person events to maximize attendance and engagement.', category: 'Events', author: 'Sneha Patel', authorAvatar: 'https://i.pravatar.cc/150?img=29', date: '2025-05-05', readTime: '7 min', tags: ['events', 'hybrid', 'organizing'], featured: false },
  { id: '6', title: 'TOGETHERS Year in Review: 2024 Highlights', excerpt: 'From 0 to 1 million users in 12 months — the incredible journey of building India\'s top community platform.', category: 'Company', author: 'Priya Sharma', authorAvatar: 'https://i.pravatar.cc/150?img=47', date: '2024-12-31', readTime: '15 min', tags: ['company', 'milestone', 'review'], featured: false },
];
