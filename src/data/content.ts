import boiLogo from '../assets/BOI.jpg';
import bobLogo from '../assets/bob.png';
import kotakLogo from '../assets/kotak.png';
import punjabLogo from '../assets/punjab.png';
import xpLogo from '../assets/xp.jpg';
import indusImport from '../assets/image-48-1.webp'; // Assuming this is the remaining logo based on file count
import pnbLogo from '../assets/pnb.png';

export const siteContent = {
    brand: {
        name: "Anantaa Finetech",
        tagline: "Guiding You Towards Unprecedented Success with Proven Strategies",
        logo: "/Ananta.svg",
        contact: {
            email: "bhavik@anantaaconsultancy.com",
            phone: "+91 94094 08199",
            address: "India",
        },
        socials: {
            instagram: "https://www.instagram.com/ananta_fintech/",
            facebook: "https://www.facebook.com",
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com",
        }
    },
    hero: {
        title: "Financial Infrastructure for the Digital Age",
        subtitle: "We architect the bridges between traditional banking and the next billion users through cutting-edge KIOSK technology and strategic fintech consulting.",
        bgImage: "https://static.wixstatic.com/media/c837a6_4380b6050e044e0b8eed12077cc1f883f000.jpg",
        cta: "Explore Our Solutions",
    },
    partners: [
        { name: "Bank of India", logo: boiLogo },
        { name: "Punjab & Sind Bank", logo: punjabLogo },
        { name: "Bank of Baroda", logo: bobLogo },
        { name: "Kotak Mahindra Bank", logo: kotakLogo },
        { name: "State Bank of India", logo: indusImport },
        { name: "Xpresso Bill Shop", logo: xpLogo },
        { name: "Punjab National Bank", logo: pnbLogo },
    ],
    about: {
        title: "Who We Are",
        header: "Welcome to Anantaa Finetech — where innovation meets excellence.",
        description: "Founded in 2024, Anantaa Finetech is a dedicated team of professionals delivering exceptional banking and financial services that truly make a difference. With a strong focus on quality, innovation, and client satisfaction, we craft tailored solutions that not only meet your business needs but consistently exceed expectations.",
        description2: "At Anantaa Finetech, we believe in building enduring partnerships through trust, transparency, and unmatched service excellence. Whether you're engaging with us for the first time or are a long-standing client, our commitment remains the same: to help you succeed.",
        image: "https://static.wixstatic.com/media/9eb0df_3d59b267f888487e8f5f30ba98565505~mv2.jpeg",
        founder: {
            name: "Bhavik Panchal",
            role: "Founder & CEO",
            bio: "As the Founder of Anantaa Finetech, I lead the company's vision, partnerships, and growth strategy while ensuring transparent and compliant fintech distribution through authorized platforms.",
            image: "https://static.wixstatic.com/media/9eb0df_3d59b267f888487e8f5f30ba98565505~mv2.jpeg",
            socials: {
                linkedin: "https://www.linkedin.com/in/bhavik-panchal-b04a2b219/",
                twitter: "#",
                email: "mailto:bhavik@anantaaconsultancy.com",
                instagram: "https://www.instagram.com/bhavik_8199"
            }
        },
        values: {
            title: "Our values",
            description: "This is the space to introduce visitors to the business or brand. Briefly explain who's behind it, what it does and what makes it unique. Share its core values and what this site has to offer.",
            list: ["Integrity", "People", "Velocity", "Flexibility", "Vision"]
        },
    },
    industries: [
        { name: "KIOSK Banking Centers", image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop" },
        { name: "Payment Gateway Services", image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070&auto=format&fit=crop" },
        { name: "Finance & Loan Services", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2070&auto=format&fit=crop" },
        { name: "Domestic Money Transfer", image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=2070&auto=format&fit=crop" },
        { name: "New ATM Installation", image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=2070&auto=format&fit=crop" }
    ],
    process: [
        {
            step: "01",
            title: "Consultation",
            description: "We analyze your requirements and identify the best financial solutions for your business goals."
        },
        {
            step: "02",
            title: "Strategy & Setup",
            description: "Our experts design a tailored roadmap and handle all technical and operational setups."
        },
        {
            step: "03",
            title: "Launch & Support",
            description: "Go live with confidence. We provide continuous support and real-time monitoring to ensure success."
        }
    ],
    detailedSolutions: [
        {
            title: "Risk Management",
            description: "We at Anantaa Finetech provide customer service centers for various banks. By opening these centers, individuals can earn a good income responsibly while also delivering excellent service to customers.",
            icon: "ShieldCheck"
        },
        {
            title: "Market Analysis",
            description: "At Anantaa Finetech, our market analysis shows a growing demand for accessible banking and financial services, especially in semi-urban and rural areas. Many customers seek convenient, local service centers for tasks like account opening, KYC, and loan guidance. By partnering with various banks, we tap into this unmet need—empowering individuals to run service centers that generate steady income while improving financial access in their communities.",
            icon: "TrendingUp"
        },
        {
            title: "Business Strategy",
            description: "Based on our market analysis, Anantaa Finetech focuses on expanding customer service centers in high-demand areas with limited banking access. Our strategy is to partner with leading banks, train local entrepreneurs, and equip them with the tools and support needed to operate efficiently. This approach not only boosts financial inclusion but also creates sustainable income opportunities at the grassroots level.",
            icon: "Globe"
        },
        {
            title: "Financial Advisory",
            description: "At Anantaa Finetech, we also provide expert financial advisory services to help customers make informed decisions about banking products, loans, and personal finance. Through our service centers, trained advisors guide individuals on loan eligibility, documentation, repayment planning, and government schemes—ensuring they choose the right financial solutions based on their needs and capacity.",
            icon: "BadgeIndianRupee"
        },
        {
            title: "Operational Efficiency",
            description: "At Anantaa Finetech, operational efficiency is achieved by streamlining our customer service center processes—using trained staff, digital tools, and standardized procedures to handle all types of banking and loan services quickly and accurately. This ensures faster service delivery, reduced errors, better customer satisfaction, and smooth coordination with partner banks, allowing each center to operate effectively and profitably.",
            icon: "Smartphone"
        }
    ],
    insights: {
        title: "Stay Ahead With Expert Knowledge",
        subtitle: "Subscribe to our newsletter for the latest fintech trends, regulatory updates, and expert strategies.",
        posts: []
    },
    services: [
        {
            title: "KIOSK Banking",
            description: "Complete setup and support for KIOSK banking centers.",
            icon: "Landmark",
            longDescription: "Our KIOSK Banking solution bridges the gap between urban banking infrastructure and rural accessibility. We provide a complete turnkey solution that empowers local entrepreneurs to set up mini-banks, offering essential financial services to the unbanked population.",
            features: ["Account Opening", "Cash Deposit/Withdrawal", "Money Transfer", "Aadhaar Seeding"],
            benefits: ["Low Setup Cost", "High Commission Structure", "Real-time Support", "RBI Compliant"]
        },
        {
            title: "Payment Gateway",
            description: "Secure and efficient payment gateway solutions for businesses.",
            icon: "CreditCard",
            longDescription: "AnantaPay provides a robust, secure, and seamless payment gateway integration for businesses of all sizes. Accept payments via Credit Cards, Debit Cards, Net Banking, UPI, and Wallets with industry-leading success rates.",
            features: ["Multi-mode Acceptance", "Instant Settlements", "Smart Analytics", "Fraud Protection"],
            benefits: ["T+1 Settlement", "Lowest MDR Rates", "99.9% Uptime", "Easy Integration API"]
        },
        {
            title: "Finance & Loans",
            description: "Assistance with various loan products and financial planning.",
            icon: "BadgeIndianRupee",
            longDescription: "We facilitate access to a wide range of credit products for individuals and MSMEs. Our streamlined digital process ensures quick approvals and minimal documentation, helping you secure the capital you need for growth.",
            features: ["Personal Loans", "Business Loans", "Home Loans", "Education Loans"],
            benefits: ["Paperless Process", "Competitive Interest Rates", "Flexible Tenure", "Quick Disbursal"]
        },
        {
            title: "Money Transfer",
            description: "Domestic Money Transfer (DMT) services for instant remittances.",
            icon: "Send",
            longDescription: "Send money instantly to any bank account in India, 24/7/365. Our Domestic Money Transfer (DMT) service is designed for migrant workers and high-transaction agents, ensuring safe and immediate fund transfers.",
            features: ["IMPS & NEFT Support", "Instant Beneficiary Addition", "Transaction History", "SMS Alerts"],
            benefits: ["Safe & Secure", "Works on Holidays", "Low Transaction Fees", "Instant Confirmation"]
        },
        {
            title: "ATM Installation",
            description: "Facilitating new ATM installations and management.",
            icon: "Banknote",
            longDescription: "Transform your commercial space into a revenue-generating asset with our White Label and Brown Label ATM installation services. We handle everything from site feasibility to installation, cash loading, and maintenance.",
            features: ["Site Survey", "Machine Installation", "Cash Management", "CCTV Surveillance"],
            benefits: ["Monthly Rental Income", "Transaction-based Earnings", "Increased Footfall", "Maintenance Included"]
        },
        {
            title: "Digital Payments",
            description: "AEPS (Aadhaar Enabled Payment System) and other digital solutions.",
            icon: "Smartphone",
            longDescription: "Empower your customers to withdraw cash using just their Aadhaar number and fingerprint. Our AEPS solution brings the bank to the doorstep of the customer, enabling financial inclusion in the deepest rural pockets.",
            features: ["Cash Withdrawal", "Balance Enquiry", "Mini Statement", "Aadhaar Pay"],
            benefits: ["No Debit Card Needed", "Secure Biometric Auth", "Instant Commission", "Works with all Banks"]
        },
    ],
    stats: [
        { label: "Years Experience", value: "3+" },
        { label: "Happy Clients", value: "200+" },
        { label: "Transaction Vol", value: "$1M+" },
    ],
    testimonials: [
        {
            name: "Sandip Patel",
            role: "Rajkot",
            content: "Good experience with Anantaa Finetech. Services are well-managed through authorized platforms, and support is always responsive when needed."
        },
        {
            name: "Rohit Singh",
            role: "Surat",
            content: "Professional approach and honest communication. Anantaa Finetech helped us start fintech services with proper training and continuous assistance."
        },
        {
            name: "Sachin",
            role: "Himmatnagar",
            content: "Anantaa Finetech provides clear guidance and reliable support. The onboarding process was smooth, and their team explains everything transparently."
        }
    ],
    faq: [
        {
            question: "How do I start a KIOSK banking center?",
            answer: "Starting is simple. Contact us for an initial consultation, and we will guide you through the documentation, hardware procurement, and software setup process."
        },
        {
            question: "What are the eligibility criteria?",
            answer: "You typically need a commercial space of at least 100 sq ft, a computer, internet connectivity, and valid ID proofs. We handle the bank liaisoning."
        },
        {
            question: "Do you provide training?",
            answer: "Yes, we provide comprehensive training for all operators to ensured they are proficient with the banking software and compliance norms."
        }
    ],
    benefits: [
        { title: "Bank-Grade Security", description: "Top-tier encryption and compliance with RBI guidelines ensure complete safety.", icon: "ShieldCheck" },
        { title: "Real-Time Tracking", description: "Monitor all transactions and commissions in real-time with our advanced dashboard.", icon: "TrendingUp" },
        { title: "24/7 Expert Support", description: "Dedicated relationship managers available round-the-clock to resolve any queries.", icon: "Smartphone" },
    ],
    cta: {
        title: "Ready to Transform Your Financial Infrastructure?",
        subtitle: "Join hundreds of successful partners who have scaled their business with Anantaa Finetech.",
        buttonText: "Get Started Now",
        link: "/contact"
    }
};
