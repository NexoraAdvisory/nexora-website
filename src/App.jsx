import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Lightbulb, Settings, ClipboardCheck, Building2, Handshake, Bot, LineChart, PieChart, Laptop, ClipboardList, Headset, UtensilsCrossed, Warehouse, ArrowLeft, Users, Pizza, Coffee, Salad, Soup, BarChart3, Package, Smartphone, CheckCircle, Clock, FileText, DollarSign, BrainCircuit, TrendingUp, CreditCard, Puzzle, ShieldCheck, Gift, Link2, BellRing, Thermometer } from 'lucide-react';
import logoImage from './assets/logo.png'; 

// --- ASSET PLACEHOLDERS ---
// In a real app, you would import these from your assets folder.
<img src={logoImage} alt="Nexora Logo" className="h-12" />
const Tech1 = 'https://images.unsplash.com/photo-1634655610309-b4b1a2c9c8e8?q=80&w=2070&auto-format&fit=crop';
const Tech3 = 'https://images.unsplash.com/photo-1581092921440-41f49635e06b?q=80&w=2070&auto-format&fit=crop';
const Tech5 = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto-format&fit=crop';
// --- END ASSET PLACEHOLDERS ---


// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('advisory');
  const [scrollTarget, setScrollTarget] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const advisoryPageRef = useRef(null);

  const navigateToPage = (pageName, sectionId = null) => {
    if (pageName === 'advisory' && sectionId) {
      if (currentPage === 'restaurant') {
        setScrollTarget(sectionId);
        setCurrentPage('advisory');
      } else {
        advisoryPageRef.current?.scrollToSection(sectionId);
      }
    } else {
      setScrollTarget(null);
      setCurrentPage(pageName);
      window.scrollTo(0, 0);
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);


  return (
    <div className="bg-white text-slate-700 font-['Roboto',_sans_serif]">
      <Header 
        navigateToPage={navigateToPage}
        currentPage={currentPage}
        activeLink={advisoryPageRef.current?.activeLink || 'home'}
        setIsModalOpen={setIsModalOpen}
      />
      <main>
        {currentPage === 'advisory' && <AdvisoryPage ref={advisoryPageRef} initialScrollTarget={scrollTarget} setScrollTarget={setScrollTarget} navigateToPage={navigateToPage} />}
        {currentPage === 'restaurant' && <RestaurantPage navigateToPage={navigateToPage} setIsModalOpen={setIsModalOpen} />}
      </main>
      <Footer />
      <DemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

// Advisory Page Component
const AdvisoryPage = React.forwardRef(({ initialScrollTarget, setScrollTarget, navigateToPage }, ref) => {
  const [activeLink, setActiveLink] = useState('home');

  const sections = useRef({
    home: null, about: null, solutions: null,
    industries: null, technology: null, clients: null,
    partners: null, blog: null, contact: null,
  }).current;

  const scrollToSection = useCallback((sectionId) => {
    if (sections[sectionId]) {
      sections[sectionId].scrollIntoView({ behavior: 'smooth' });
    }
  }, [sections]);

  React.useImperativeHandle(ref, () => ({
    scrollToSection,
    activeLink
  }));
  
  useEffect(() => {
    if (initialScrollTarget && sections[initialScrollTarget]) {
        setTimeout(() => {
            scrollToSection(initialScrollTarget);
            setScrollTarget(null);
        }, 100);
    }
  }, [initialScrollTarget, sections, setScrollTarget, scrollToSection]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSection = '';
      for (const sectionId in sections) {
        const section = sections[sectionId];
        if (section && scrollPosition >= section.offsetTop) {
          currentSection = sectionId;
        }
      }
      if (currentSection) {
        setActiveLink(currentSection);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <>
      <HomePage ref={node => sections.home = node} scrollToSection={scrollToSection}/>
      <WhatWeDoSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <AboutPage ref={node => sections.about = node} />
      <SolutionsPage ref={node => sections.solutions = node} />
      <IndustriesPage ref={node => sections.industries = node} />
      <RestaurantCtaSection navigateToPage={navigateToPage} />
      <TechnologyPage ref={node => sections.technology = node} />
      <ClientsPage ref={node => sections.clients = node} />
      <PartnersPage ref={node => sections.partners = node} />
      <BlogPage ref={node => sections.blog = node} />
      <ContactPage ref={node => sections.contact = node} />
    </>
  );
});


// Header Component
const Header = ({ navigateToPage, currentPage, activeLink, setIsModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const advisoryNavLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Solutions', id: 'solutions' }, 
    { name: 'Industries', id: 'industries' }, 
    { name: 'Technology', id: 'technology' },
    { name: 'Clients', id: 'clients' },
    { name: 'Partners', id: 'partners' },
  ];

  const NavLinkButton = ({ id, name, isMobile = false }) => (
    <button onClick={() => { navigateToPage('advisory', id); if(isMobile) setIsMenuOpen(false); }} 
       className={isMobile ? "block w-full text-left py-3 px-4 text-sm hover:bg-slate-100" : `font-medium text-slate-600 transition-colors duration-300 hover:text-red-500 ${currentPage === 'advisory' && activeLink === id ? 'text-red-500 border-b-2 border-red-500' : ''}`}>
        {name}
    </button>
  );

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md shadow-slate-200/50 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <button onClick={() => navigateToPage('advisory', 'home')} className="flex items-center cursor-pointer text-left">
          <img src={logoImage} alt="Nexora Advisory Logo" className="h-10 mr-3" />
          <span className="text-xl font-bold text-slate-800">Nexora Advisory</span>
        </button>
        
        <nav className="hidden md:flex items-center space-x-6">
          {currentPage === 'advisory' && (
            <>
              {advisoryNavLinks.map(link => <NavLinkButton key={link.id} {...link} />)}
               <a href="https://www.linkedin.com/company/nexora-advisory" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-600 transition-colors duration-300 hover:text-red-500">Careers</a>
              <button onClick={() => navigateToPage('restaurant')} 
                 className={`font-medium transition-colors duration-300 text-slate-600 hover:text-red-500`}>
                Nexora for Restaurants
              </button>
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
           <button 
              onClick={() => currentPage === 'restaurant' ? setIsModalOpen(true) : navigateToPage('advisory', 'contact')} 
              className="font-bold py-2 px-5 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 text-white hover:from-red-600 hover:to-amber-600 shadow-md hover:shadow-lg"
            >
              {currentPage === 'restaurant' ? 'Get a Free Demo' : 'Contact Us'}
            </button>
        </div>
        
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none text-slate-600 hover:text-red-500">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden bg-slate-50`}>
          {currentPage === 'advisory' && (
            <>
              {advisoryNavLinks.map(link => <NavLinkButton key={link.id} {...link} isMobile />)}
               <a href="https://www.linkedin.com/company/nexora-advisory" target="_blank" rel="noopener noreferrer" className="block w-full text-left py-3 px-4 text-sm hover:bg-slate-100">Careers</a>
              <button onClick={() => { navigateToPage('restaurant'); setIsMenuOpen(false); }} className="block w-full text-left py-3 px-4 text-sm hover:bg-slate-100">Nexora for Restaurants</button>
            </>
          )}
          <button 
             onClick={() => {
                if (currentPage === 'restaurant') {
                    setIsModalOpen(true);
                } else {
                    navigateToPage('advisory', 'contact');
                }
                setIsMenuOpen(false);
            }} 
            className="block w-full text-left py-3 px-4 text-sm hover:bg-slate-100 bg-slate-200 font-semibold"
          >
            {currentPage === 'restaurant' ? 'Get a Free Demo' : 'Contact Us'}
          </button>
        </div>
      )}
    </header>
  );
};


// Section wrapper for scroll animations
const AnimatedSection = React.forwardRef(({ children, id, className }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(sectionRef.current);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) { observer.unobserve(sectionRef.current); }};
  }, []);

  return (
    <section 
      id={id}
      ref={(node) => { 
        sectionRef.current = node; 
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }} 
      className={`py-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
    >
      {children}
    </section>
  );
});

const TextGradient = ({ children }) => <span className="bg-gradient-to-r from-red-500 to-amber-500 text-transparent bg-clip-text">{children}</span>;

// Reusable Contact Form Component
const ContactFormComponent = ({ title, buttonText = "Submit" }) => (
    <div>
        <h3 className="text-2xl font-bold mb-4 text-slate-800">{title}</h3>
        <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
            <input type="hidden" name="access_key" value="b66e945e-142e-455c-a390-51ed9663d900" />
            <input type="hidden" name="subject" value="New Demo Request from Nexora Restaurants Page" />
            <input type="text" name="name" required placeholder="Full Name" className="w-full p-3 bg-slate-100 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none transition" />
            <input type="email" name="email" required placeholder="Email Address" className="w-full p-3 bg-slate-100 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none transition" />
            <input type="tel" name="phone" required placeholder="Phone Number" className="w-full p-3 bg-slate-100 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none transition" />
            <input type="text" name="company" required placeholder="Restaurant or Franchise Group Name" className="w-full p-3 bg-slate-100 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none transition" />
            <textarea name="message" rows="4" placeholder="Tell us about your needs (optional)" className="w-full p-3 bg-slate-100 border border-slate-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none transition"></textarea>
            <button type="submit" className="w-full font-bold py-3 px-4 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 text-white hover:from-red-600 hover:to-amber-600 shadow-md hover:shadow-lg">{buttonText}</button>
        </form>
    </div>
);


// ==================================================================
// == NEW AND UPDATED RESTAURANT PAGE COMPONENTS
// ==================================================================

const DemoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative transition-transform duration-300 transform scale-95"
                style={{ transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors z-10"
                >
                    <X size={28} />
                </button>
                <div className="p-8">
                    <ContactFormComponent title="Request Your Free Demo" buttonText="Book My Demo" />
                </div>
            </div>
        </div>
    );
};

const RestaurantPage = ({ navigateToPage, setIsModalOpen }) => {
    const openDemoModal = () => {
        setIsModalOpen(true);
    };

    return (
    <>
        <RestaurantHeroUpdated scrollToDemo={openDemoModal} />
        <SocialProofSection />
        <HowItWorksSection />
        <CoreSolutionsSection />
        <IotFoodSafetySection onRequestDemo={openDemoModal}/>
        <FeatureDetailSection />
        <WhoWeHelpSection />
        <PricingPackagesSection scrollToDemo={openDemoModal} />
        <MobileSuiteSection />
        <AddOnsSection />
        <FinalCtaSection onRequestDemo={openDemoModal} />
        <div className="container mx-auto px-6 text-center pt-8 pb-24">
            <button 
                onClick={() => navigateToPage('advisory', 'home')} 
                className="inline-flex items-center font-bold py-3 px-8 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 text-white hover:from-red-600 hover:to-amber-600 shadow-lg text-lg"
            >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Advisory Home
            </button>
        </div>
    </>
    );
};

const RestaurantHeroUpdated = ({ scrollToDemo }) => (
    <section className="relative text-white min-h-[90vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" alt="Modern restaurant interior" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">Master Your Restaurant.<br/> Maximize Your Profits.</h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-slate-200 mb-8">The all-in-one platform for franchisee owners to automate financials, control inventory, manage labor, and unlock data-driven profitability.</p>
            <button 
                onClick={scrollToDemo}
                className="font-bold py-4 px-10 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 text-white hover:from-red-600 hover:to-amber-600 shadow-lg text-xl"
            >
                Request a Live Demo
            </button>
        </div>
    </section>
);

const SocialProofSection = () => (
    <AnimatedSection id="social-proof" className="bg-white !py-16">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
                Trusted by Industry Leaders to Drive Growth
            </h2>
            <p className="text-lg text-center text-slate-500 mb-12 max-w-3xl mx-auto">
                We partner with leading restaurant groups, turning their complex data into clear, actionable insights for smarter decision-making and enhanced profitability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-slate-50 p-6 rounded-lg shadow-md border border-slate-200 text-center">
                    <img src="https://www.provisioneronline.com/ext/resources/2023/06/25/Savvy-Sliders-logo.png?1687719579" alt="Savvy Sliders Logo" className="h-16 mx-auto mb-4 object-contain" />
                    <h3 className="text-xl font-bold text-slate-700">Our Partnership</h3>
                    <p className="text-slate-600 mt-2">
                        For Savvy Sliders, we are developing a suite of powerful Power BI dashboards and KPIs. This provides their leadership with real-time visibility into sales trends, food costs, and labor efficiency, enabling data-informed strategic decisions.
                    </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg shadow-md border border-slate-200 text-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDF7tDS5TDcnNme6OUcvIogYjQQhnbdRKv67_9kB0zI23x4ecGXurNlkUz6jdF15Tp7kM&usqp=CAU" alt="Burger Fi Logo" className="h-16 mx-auto mb-4 object-contain" />
                    <h3 className="text-xl font-bold text-slate-700">Our Partnership</h3>
                    <p className="text-slate-600 mt-2">
                        We provide Burger Fi with critical data analytics, creating custom Power BI reports that track key performance metrics. Our work helps them optimize operations and drive profitability across their locations.
                    </p>
                </div>
            </div>

            <div className="mt-16 max-w-4xl mx-auto">
                 <div className="bg-slate-800 text-white p-8 rounded-lg shadow-lg">
                    <p className="italic text-lg mb-4 opacity-90">“Nexora’s insights have been a game-changer. We now have a clear, real-time view of our store-level profitability, which has been invaluable for our growth strategy.”</p>
                    <p className="font-bold text-amber-400">— A. West, COO</p>
                    <p className="text-sm opacity-70">Leading QSR Franchise Group</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const HowItWorksSection = () => {
    const steps = [
        { icon: Link2, title: "Connect Your Systems", description: "We seamlessly integrate with your existing POS, vendor, and banking systems to pull all your data into one place." },
        { icon: BrainCircuit, title: "Automate & Analyze", description: "Our platform automates tedious tasks and uses AI to analyze your data, uncovering hidden trends and opportunities." },
        { icon: TrendingUp, title: "Drive Profitability", description: "Use powerful dashboards and real-time alerts to make smarter decisions that cut costs and boost your bottom line." },
    ];
    return (
        <AnimatedSection id="how-it-works" className="bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12"><TextGradient>Unlock Profitability in 3 Simple Steps</TextGradient></h2>
                </div>
                <div className="relative">
                     <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-300 -translate-y-1/2"></div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {steps.map((step, index) => (
                             <div key={step.title} className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-amber-500">
                                <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">{index + 1}</div>
                                <step.icon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                                <p className="text-slate-600">{step.description}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </AnimatedSection>
    );
};


const CoreSolutionsSection = () => {
    const solutions = [
        { icon: Clock, title: "Workforce Scheduling", description: "Optimize labor costs with AI-powered sales forecasting and smart scheduling." },
        { icon: Warehouse, title: "Inventory & Cost Control", description: "Manage food costs with real-time tracking, plate costing, and vendor alerts." },
        { icon: FileText, title: "Financial Automation", description: "Streamline accounting and payroll by eliminating manual data entry." },
        { icon: BarChart3, title: "Enterprise Analytics", description: "Gain deep insights into sales, labor, and profitability trends instantly." },
        { icon: Smartphone, title: "Mobile Management Suite", description: "Run your operations from anywhere with dedicated apps for every core task." },
        { icon: BrainCircuit, title: "Data-Driven Intelligence", description: "Convert complex data into actionable strategies for growth and efficiency." },
    ];
    return (
        <AnimatedSection id="core-solutions" className="bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4"><TextGradient>One Platform to Run Your Entire Operation</TextGradient></h2>
                    <p className="text-lg text-slate-600 mb-12">Nexora integrates every critical function of your restaurant, giving you unparalleled control and visibility from a single, easy-to-use system. We connect your data points so you can connect with your guests.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {solutions.map(s => {
                        const Icon = s.icon;
                        return (
                            <div key={s.title} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500 text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <Icon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{s.title}</h3>
                                <p className="text-slate-600">{s.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </AnimatedSection>
    );
};

const IotFoodSafetySection = ({ onRequestDemo }) => {
    const problems = [
        { icon: DollarSign, title: "$5k - $10k Lost Annually", description: "From spoiled food due to equipment failures and manual temperature errors." },
        { icon: Clock, title: "30-60 Minutes Wasted Daily", description: "On staff manually filling out paper logs that are prone to inaccuracy and fraud." },
        { icon: FileText, title: "Failed Audits & Fines", description: "A single failed inspection can cost thousands and permanently damage your brand's reputation." },
    ];

    const solutions = [
        { icon: Thermometer, title: "24/7 Equipment Monitoring", description: "IoT sensors track walk-ins, freezers, hot holds, and prep lines, ensuring temperatures are always in the safe zone." },
        { icon: BellRing, title: "Instant Mobile Alerts", description: "Be notified via SMS or push notification the moment a cooler warms up or a sanitizer cycle fails." },
        { icon: ClipboardCheck, title: "Digital HACCP Logs", description: "Automated, 100% audit-ready logs. Say goodbye to paper and prove compliance instantly." },
        { icon: Smartphone, title: "Smart Food Probes", description: "Enable one-tap cooking and holding temperature verification, with data logged automatically." },
    ];
    return (
        <AnimatedSection id="iot-food-safety" className="bg-slate-900 text-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold"><TextGradient>Food Safety. Guaranteed.</TextGradient></h2>
                    <p className="text-lg text-slate-300 mt-4 mb-12">Cut food waste by up to 40%, save 30 minutes per day in manual checks, and stay audit-ready 24/7 with our IoT-powered monitoring platform.</p>
                </div>

                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-center mb-8">Manual Processes Aren't Enough.</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {problems.map(problem => (
                            <div key={problem.title} className="bg-slate-800 p-6 rounded-lg text-center">
                                <problem.icon className="h-10 w-10 mx-auto text-red-500 mb-4" />
                                <p className="text-xl font-semibold">{problem.title}</p>
                                <p className="text-slate-400 mt-2">{problem.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20">
                    <h3 className="text-3xl font-bold text-center mb-12">Our IoT Platform Puts Compliance on Autopilot</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {solutions.map(solution => (
                            <div key={solution.title} className="bg-slate-800 p-6 rounded-lg text-center border-t-2 border-amber-500">
                                <solution.icon className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                                <h4 className="text-xl font-bold mb-2">{solution.title}</h4>
                                <p className="text-slate-400">{solution.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                         <h3 className="text-3xl font-bold mb-4">Peace of Mind, Powered by Data</h3>
                         <p className="text-slate-300 mb-6">Imagine opening your dashboard tomorrow morning and seeing this. Our platform turns costly risks into manageable data points, giving you the confidence that your food and brand are protected.</p>
                         <ul className="space-y-3">
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3"/> 20-40% reduction in spoilage</li>
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3"/> 150-300 labor hours reclaimed annually</li>
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3"/> 100% audit-ready reports, anytime</li>
                         </ul>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-lg">Live Compliance Dashboard</h4>
                            <span className="text-xs text-green-400">● LIVE</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-700 p-4 rounded">
                                <p className="text-2xl font-bold text-green-400">0</p>
                                <p className="text-sm text-slate-400">Open Alerts</p>
                            </div>
                             <div className="bg-slate-700 p-4 rounded">
                                <p className="text-2xl font-bold text-green-400">100%</p>
                                <p className="text-sm text-slate-400">Compliance</p>
                            </div>
                             <div className="bg-slate-700 p-4 rounded">
                                <p className="text-2xl font-bold text-green-400">$2,500</p>
                                <p className="text-sm text-slate-400">Food Saved</p>
                            </div>
                        </div>
                    </div>
                 </div>
                 
                 <div className="mt-20 text-center">
                    <h3 className="text-3xl font-bold">Protect your food. Protect your brand. Protect your bottom line.</h3>
                    <button onClick={onRequestDemo} className="mt-6 font-bold py-3 px-8 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 text-white hover:from-red-600 hover:to-amber-600 shadow-lg text-lg">
                        Get a Demo Today
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};


const FeatureDetailSection = () => {
    const features = {
        inventory: {
            title: "Inventory & Food Cost", icon: Warehouse,
            points: ["Automated Vendor Invoice Processing", "Digital Receiving & Reconciliation", "Detailed Plate & Recipe Costing", "Food Cost Variance Reporting", "Vendor Price Fluctuation Alerts", "Commissary Management"]
        },
        labor: {
            title: "Labor Scheduling", icon: Clock,
            points: ["AI-Powered Sales Forecasting", "Text/Email Schedule Delivery", "Mobile App for Team Members", "Manager App for Approvals", "Automated Tip Pooling & Payouts", "Integrated Task Management"]
        },
        accounting: {
            title: "Accounting & Payroll", icon: FileText,
            points: ["One-Click Accounting Software Sync", "Eliminate Manual Data Entry", "Automated Vendor Payment Sync", "Import Payroll Hours & Totals", "Bank & Credit Card Reconciliation", "Royalty & Franchise Fee Automation"]
        },
        reporting: {
            title: "Enterprise Reporting", icon: BarChart3,
            points: ["Customizable Dashboards", "Store vs. Store Performance Analysis", "Real-Time Sales & Labor Tracking", "Profit & Loss Reporting", "Theoretical vs. Actual Cost Analysis", "Menu Engineering Reports"]
        }
    };
    return (
        <AnimatedSection id="feature-details" className="bg-slate-50">
            <div className="container mx-auto px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4"><TextGradient>Features Designed to Maximize Profitability</TextGradient></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    {[features.inventory, features.labor, features.accounting, features.reporting].map(feature => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.title} className="bg-white p-8 rounded-lg shadow-xl border border-slate-200 flex flex-col">
                                <div className="flex items-center mb-4">
                                    <Icon className="h-8 w-8 text-red-500 mr-3" />
                                    <h3 className="text-2xl font-bold text-slate-800">{feature.title}</h3>
                                </div>
                                <ul className="space-y-3 flex-grow">
                                    {feature.points.map(point => (
                                        <li key={point} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </div>
        </AnimatedSection>
    );
};

const WhoWeHelpSection = () => {
    const types = [
        { title: 'QSR & Franchise Brands', img: 'https://www.savvysliders.com/wp-content/themes/savvysliders/images/own-savvy.jpg', description: "Standardize operations, manage royalties, and gain enterprise-level visibility across all your locations." },
        { title: 'Fast Casual', img: 'https://d1pbny5bq445o3.cloudfront.net/get/wp-content/uploads/2023/08/11101201/fast-food-vs-fast-casual.png', description: "Balance speed with quality. Optimize inventory for fresh ingredients and schedule staff for peak efficiency." },
        { title: 'Casual & Fine Dining', img: 'https://www.coastlinenservices.com/wp-content/uploads/2019/07/shutterstock_741884605.jpg', description: "Manage complex menus, control plate costs with precision, and analyze sales to engineer a more profitable menu." },
        { title: 'Coffee Shops & Cafes', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop', description: "Track daily inventory on perishables like milk and pastries, manage staff schedules, and automate daily bookkeeping." }
    ];
    return (
        <AnimatedSection id="who-we-help" className="bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4"><TextGradient>Built for Your Unique Restaurant</TextGradient></h2>
                    <p className="text-lg text-slate-600 mb-12">No matter your concept, our flexible platform adapts to your specific operational needs, providing the tools you need to succeed.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {types.map(type => (
                        <div key={type.title} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                             <img src={type.img} alt={type.title} className="w-full h-48 object-cover" />
                             <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{type.title}</h3>
                                <p className="text-slate-600">{type.description}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const PricingPackagesSection = ({ scrollToDemo }) => (
    <AnimatedSection id="pricing" className="bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-4"><TextGradient>Simple Pricing, Powerful Results</TextGradient></h2>
                <p className="text-lg text-slate-600 mb-12">Start with what you need and scale as you grow. Bundle services to save up to 40% and unlock the full power of the Nexora platform. No hidden fees, just transparent partnership.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-slate-300 text-center flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-800">Modular Packages</h3>
                    <p className="text-slate-500 mb-4">A La Carte Solutions</p>
                    <div className="text-lg text-slate-600 mb-6 flex-grow">
                        <p className="mb-4">Choose individual solutions to solve your most pressing challenges first:</p>
                        <ul className="text-left list-disc list-inside space-y-1">
                            <li>Inventory & Food Cost</li>
                            <li>Workforce Scheduling</li>
                            <li>Accounting & Payroll</li>
                        </ul>
                    </div>
                    <button onClick={scrollToDemo} className="font-bold w-full py-3 px-6 rounded-md transition-all duration-300 bg-slate-700 text-white hover:bg-slate-800">Get a Custom Quote</button>
                </div>
                 <div className="bg-slate-800 p-8 rounded-lg shadow-lg text-white text-center flex flex-col border-2 border-red-500">
                    <h3 className="text-2xl font-bold text-amber-400">All-In-One Platform</h3>
                    <p className="opacity-80 mb-4">Best Value & Maximum Power</p>
                    <div className="text-lg opacity-90 mb-6 flex-grow">
                        <p className="mb-4">Combine all modules for a fully integrated system that provides complete control:</p>
                        <ul className="text-left list-disc list-inside space-y-1">
                            <li>Includes Inventory, Labor, & Accounting</li>
                            <li><span className="font-bold">Plus</span> Enterprise Reporting</li>
                            <li><span className="font-bold">Plus</span> Mobile App Suite</li>
                        </ul>
                    </div>
                    <button onClick={scrollToDemo} className="font-bold w-full py-3 px-6 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600">Request Demo & Pricing</button>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const MobileSuiteSection = () => (
    <AnimatedSection id="mobile-suite">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="pr-8">
                <h2 className="text-4xl font-bold mb-4"><TextGradient>Manage Your Restaurant From Anywhere</TextGradient></h2>
                <p className="text-lg text-slate-600 mb-8">Our mobile app suite empowers you and your team to stay efficient on the go. Whether you're counting inventory, checking reports, or managing schedules, Nexora is always in your pocket.</p>
                <ul className="space-y-4">
                    <li className="flex items-center text-xl"><Smartphone className="h-6 w-6 text-red-500 mr-3" /> Labor Scheduling Apps (Manager & Employee)</li>
                    <li className="flex items-center text-xl"><ClipboardCheck className="h-6 w-6 text-red-500 mr-3" /> Digital Inventory & Receiving App</li>
                    <li className="flex items-center text-xl"><BarChart3 className="h-6 w-6 text-red-500 mr-3" /> Real-Time Reporting & Analytics App</li>
                </ul>
            </div>
            <div className="bg-slate-800 p-4 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                 <div className="bg-white rounded-2xl p-4">
                    <div className="bg-slate-100 rounded-xl p-6 text-center">
                        <Smartphone className="h-24 w-24 text-red-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">Nexora Mobile Suite</h3>
                        <p className="text-slate-500">All your data, one tap away.</p>
                    </div>
                 </div>
            </div>
        </div>
    </AnimatedSection>
);

const AddOnsSection = () => (
    <AnimatedSection id="add-ons" className="bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold mb-4"><TextGradient>Supercharge Your Platform with Powerful Add-Ons</TextGradient></h2>
                <p className="text-lg text-slate-600 mb-12">Elevate your analytics and operational capabilities with our advanced, fully-integrated services.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-red-500">
                    <BrainCircuit className="h-8 w-8 text-red-500 mb-3" />
                    <h3 className="text-2xl font-bold text-slate-800">Business Intelligence</h3>
                    <p className="text-slate-600 mt-2">Our experts convert complex data into simple, informative, and visually stunning custom reports to guide your strategic decisions.</p>
                </div>
                 <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-amber-500">
                    <Puzzle className="h-8 w-8 text-amber-500 mb-3" />
                    <h3 className="text-2xl font-bold text-slate-800">Marketplace Integration</h3>
                    <p className="text-slate-600 mt-2">Automatically sync sales and order data from third-party delivery services (Uber Eats, DoorDash, etc.) directly into your financial reports.</p>
                </div>
                 <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-slate-500">
                    <ShieldCheck className="h-8 w-8 text-slate-500 mb-3" />
                    <h3 className="text-2xl font-bold text-slate-800">Compliance & Loss Prevention</h3>
                    <p className="text-slate-600 mt-2">Monitor cash handling, track key inventory items, and set up alerts to proactively reduce loss and ensure compliance.</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);


const FinalCtaSection = ({ onRequestDemo }) => (
    <AnimatedSection id="final-cta" className="!py-0">
        <div className="relative py-20 bg-slate-800 text-white">
             <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Restaurant dining area" className="w-full h-full object-cover opacity-20" />
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl font-bold mb-4">See Nexora in Action</h2>
                <p className="max-w-2xl mx-auto text-lg mb-8 text-slate-200">
                    Ready to see how Nexora can transform your restaurant? Click the button below for a personalized, no-obligation demo with one of our specialists.
                </p>
                <button 
                    onClick={onRequestDemo}
                    className="font-bold py-4 px-10 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 shadow-lg text-xl"
                >
                    Request a Live Demo
                </button>
            </div>
        </div>
    </AnimatedSection>
);


// ==================================================================
// == ORIGINAL ADVISORY PAGE COMPONENTS (UNCHANGED)
// ==================================================================
const HomePage = React.forwardRef(({ scrollToSection }, ref) => (
  <section ref={ref} id="home" className="pt-16 relative text-white min-h-[calc(100vh-68px)] flex items-center">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop" alt="Professional team working" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-60"></div>
    </div>
    <div className="container mx-auto px-6 py-24 text-center relative z-10">
      <h2 className="text-5xl font-bold mb-4">Empowering Your Business for the Digital Age</h2>
      <p className="max-w-3xl mx-auto text-lg leading-relaxed text-slate-200 mb-8">In today's fast-paced market, staying ahead means embracing digital transformation. We create fully connected systems that streamline your operations, unlock powerful insights from your data, and drive innovation.</p>
      <button onClick={() => scrollToSection('solutions')} className="font-bold py-3 px-6 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 shadow-md hover:shadow-lg">Explore Our Solutions</button>
    </div>
  </section>
));

const WhatWeDoSection = () => (
    <AnimatedSection>
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10"><TextGradient>What We Do</TextGradient></h2>
            <p className="max-w-4xl mx-auto text-center text-lg leading-relaxed text-slate-600">At Nexora Advisory, we offer strategic recommendations that power business growth and enable organizations to tap into innovation and maximize performance. With world-class solutions and expertise in each industry, we help businesses stay ahead of the complexities and reap sustainable success.</p>
        </div>
    </AnimatedSection>
);

const WhyChooseUsSection = () => (
    <AnimatedSection className="bg-slate-50">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10"><TextGradient>Why Choose Us?</TextGradient></h2>
            <p className="max-w-4xl mx-auto text-center text-lg leading-relaxed mb-12 text-slate-600">Whether you require seasoned advice, strategic counsel or customized solutions, Nexora Advisory is committed to assisting your business growth. Get in touch with us for individualized consultations and learn how we can assist you in turning obstacles into opportunities.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md"><Lightbulb className="text-4xl text-amber-500 mb-4" /><h4 className="text-xl font-bold mb-2 text-slate-800">Strategic Expertise</h4><p className="text-slate-600">We apply industry-leading expertise to support high-impact, informed decisions for businesses.</p></div>
                <div className="bg-white p-6 rounded-lg shadow-md"><Settings className="text-4xl text-amber-500 mb-4" /><h4 className="text-xl font-bold mb-2 text-slate-800">Innovative Solutions</h4><p className="text-slate-600">With AI, data analytics, and leading-edge technology, we drive transformation that meets your objectives.</p></div>
                <div className="bg-white p-6 rounded-lg shadow-md"><ClipboardCheck className="text-4xl text-amber-500 mb-4" /><h4 className="text-xl font-bold mb-2 text-slate-800">Proven Methodology</h4><p className="text-slate-600">Our proven methodology ensures smooth execution, maximizing business performance and financial returns.</p></div>
                <div className="bg-white p-6 rounded-lg shadow-md"><Building2 className="text-4xl text-amber-500 mb-4" /><h4 className="text-xl font-bold mb-2 text-slate-800">Industry-Focused Approach</h4><p className="text-slate-600">With our specialist knowledge in banking, healthcare, retail, and other industries, we deliver targeted insights that count.</p></div>
                <div className="bg-white p-6 rounded-lg shadow-md"><Handshake className="text-4xl text-amber-500 mb-4" /><h4 className="text-xl font-bold mb-2 text-slate-800">End-to-End Support</h4><p className="text-slate-600">From strategy creation to execution and managed services, we have our customers’ backs every step of the way.</p></div>
            </div>
        </div>
    </AnimatedSection>
);

const TestimonialsSection = () => (
    <AnimatedSection>
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10"><TextGradient>What People Are Saying</TextGradient></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-lg shadow-md"><p className="text-slate-600 italic mb-4">“Nexora Advisory’s financial transformation expertise assisted us in streamlining processes and enhancing report accuracy. Their inputs were invaluable in achieving efficiency.”</p><p className="font-bold text-slate-800">Adeline West</p><p className="text-sm text-slate-500">Banker</p></div>
                <div className="bg-slate-50 p-8 rounded-lg shadow-md"><p className="text-slate-600 italic mb-4">“Nexora Advisory showed us how to deploy cutting-edge technology solutions for smooth digital integration. Their thought process far exceeded our expectations.”</p><p className="font-bold text-slate-800">Rachel Graham</p><p className="text-sm text-slate-500">Healthcare CIO</p></div>
                <div className="bg-slate-50 p-8 rounded-lg shadow-md"><p className="text-slate-600 italic mb-4">“With Nexora Advisory’s data-based strategies, we have been able to unlock essential market insights that enriched decision-making and customer interaction. Their method was truly revolutionary.”</p><p className="font-bold text-slate-800">Theresa Reeves</p><p className="text-sm text-slate-500">Head of Analytics</p></div>
                <div className="bg-white p-8 rounded-lg shadow-md"><p className="text-slate-600 italic mb-4">“Nexora Advisory was a partner who helped us to simplify operations, increase productivity, and adopt innovation with confidence. Their experience made all the difference to our company.”</p><p className="font-bold text-slate-800">Ada Leonard</p><p className="text-sm text-slate-500">Manufacturing CEO</p></div>
            </div>
        </div>
    </AnimatedSection>
);

const RestaurantCtaSection = ({ navigateToPage }) => (
    <AnimatedSection className="!py-0">
        <div className="relative py-20 bg-gray-800 text-white">
            <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Restaurant dining area" className="w-full h-full object-cover opacity-30" />
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl font-bold mb-4">Transform Your Restaurant Operations</h2>
                <p className="max-w-2xl mx-auto text-lg mb-8 text-slate-200">
                    Introducing a dedicated suite of tools to manage inventory, analyze performance with BI reports, and streamline every aspect of your business.
                </p>
                <button onClick={() => navigateToPage('restaurant')} className="font-bold py-3 px-8 rounded-md transition-all duration-300 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 shadow-lg text-lg">
                    Discover Nexora for Restaurants
                </button>
            </div>
        </div>
    </AnimatedSection>
);

const AboutPage = React.forwardRef((props, ref) => (
  <AnimatedSection id="about" ref={ref} className="bg-slate-50">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-4"><TextGradient>About Nexora Advisory</TextGradient></h2>
          <p className="text-lg leading-relaxed text-slate-600 mb-6">Founded in 2025, Nexora Advisory was born from a vision to bridge the gap between business strategy and technological execution. Our team of seasoned experts brings decades of experience from diverse industries, united by a passion for solving complex challenges and driving sustainable growth for our clients.</p>
          <p className="text-lg leading-relaxed text-slate-600">We believe in partnership, innovation, and delivering measurable results that matter. Our approach is built on a deep understanding of your business, allowing us to tailor solutions that are not just technologically advanced, but also strategically sound.</p>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop" alt="A diverse team of professionals in a meeting" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  </AnimatedSection>
));

const SolutionsPage = React.forwardRef((props, ref) => (
  <AnimatedSection id="solutions" ref={ref}>
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-4"><TextGradient>Our Solutions</TextGradient></h2>
      <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed mb-12 text-slate-600">We provide a comprehensive suite of services designed to address your most critical business needs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><Bot className="text-4xl text-red-500 mb-4" /><h3 className="text-xl font-bold mb-2 text-slate-800">Artificial Intelligence</h3><p className="text-slate-600">Leverage the strength of AI to hasten decision-making, automate operations and transform digitally.</p></div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><LineChart className="text-4xl text-red-500 mb-4" /><h3 className="text-xl font-bold mb-2 text-slate-800">Finance Transformations</h3><p className="text-slate-600">Revamp your finance processes with the latest strategies and technologies.</p></div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><PieChart className="text-4xl text-red-500 mb-4" /><h3 className="text-xl font-bold mb-2 text-slate-800">Data Analytics</h3><p className="text-slate-600">Convert data into actionable insights with our powerful analytics solutions.</p></div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><Laptop className="text-4xl text-red-500 mb-4" /><h3 className="text-xl font-bold mb-2 text-slate-800">Technology Strategy</h3><p className="text-slate-600">Optimize technological investments with a visionary approach.</p></div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><ClipboardList className="text-4xl text-red-500 mb-4" /><h3 className="text-xl font-bold mb-2 text-slate-800">Enterprise Performance Management</h3><p className="text-slate-600">Drive business effectiveness through full-portfolio EPM solutions.</p></div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><Headset className="text-4xl text-red-500 mb-4" /><h3 className="text-xl font-bold mb-2 text-slate-800">Managed Services</h3><p className="text-slate-600">Let us run your IT and strategic operations, allowing you to focus on your core business.</p></div>
      </div>
    </div>
  </AnimatedSection>
));

const IndustriesPage = React.forwardRef((props, ref) => (
  <AnimatedSection id="industries" ref={ref} className="bg-slate-50">
     <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4"><TextGradient>Industries We Serve</TextGradient></h2>
        <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed mb-12 text-slate-600">We apply our deep technological expertise to the unique challenges of your sector.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"><img src="https://latinia.com/wp-content/uploads/Latinia-AI-in-Banking-Building.png" className="w-full h-48 object-cover" alt="Banking"/><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Banking & Capital Markets</h3><p className="text-slate-600">Modernizing financial services with secure and compliant solutions.</p></div></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"><img src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202507/6877c9b356a01-insurance-164756948-16x9.png?size=948:533" className="w-full h-48 object-cover" alt="Insurance"/><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Insurance</h3><p className="text-slate-600">Driving innovation in risk management and customer engagement.</p></div></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"><img src="https://cdn.prod.website-files.com/650c1bee516c4e723b11b29a/65206264927e177f8bd65950_651f6a5b0bcc2eb5956182ea_Top%252050%2520Healthcare%2520Companies%2520and%2520Their%2520Impact%2520on%2520the%2520Industry.webp" className="w-full h-48 object-cover" alt="Healthcare"/><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Healthcare</h3><p className="text-slate-600">Improving patient outcomes with data-driven insights and EMR integration.</p></div></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"><img src="https://www.indifi.com/blog/wp-content/uploads/2019/12/How-To-Run-A-Successful-Retail-Business--e1579767687131.jpg" className="w-full h-48 object-cover" alt="Retail"/><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Retail & Customer Goods</h3><p className="text-slate-600">Enhancing customer experiences and supply chain logistics.</p></div></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"><img src="https://lirp.cdn-website.com/807f4305/dms3rep/multi/opt/Professional+services-1920w.jpg" className="w-full h-48 object-cover" alt="Professional Services"/><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Professional Services</h3><p className="text-slate-600">Optimizing operations for consulting, legal, and other service firms.</p></div></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"><img src="https://www.bitlyft.com/hubfs/Imported_Blog_Media/Cybersecurity-energy-utilities-header.jpg" className="w-full h-48 object-cover" alt="Energy & Utilities"/><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Energy & Utilities</h3><p className="text-slate-600">Driving efficiency and sustainability in a rapidly changing sector.</p></div></div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"><img src="https://www.mindinventory.com/blog/wp-content/uploads/2024/07/AI-in-Manufacturing.webp" className="w-full h-48 object-cover" alt="Manufacturing"/><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Manufacturing & Automotive</h3><p className="text-slate-600">Implementing smart factory solutions and supply chain automation.</p></div></div>
        </div>
    </div>
  </AnimatedSection>
));

const TechnologyPage = React.forwardRef((props, ref) => (
    <AnimatedSection id="technology" ref={ref}>
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-4"><TextGradient>Our Technology Expertise</TextGradient></h2>
             <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed mb-12 text-slate-600">We leverage a powerful suite of enterprise-grade technologies to drive transformation and deliver exceptional results for our clients.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                    <img src="https://keelsolution.com/wp-content/uploads/2019/10/5-SAP-S4-HANA-Data-Migration-Challenges-for-the-Oil-Gas-and-Energy-Industry.png"className="w-full h-48 object-cover" alt="SAP S/4HANA" /><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">SAP S/4HANA Migration</h3><p className="text-slate-600">Seamlessly transition from legacy systems to SAP's native in-memory platform for enhanced efficiency and speed.</p></div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                    <img src="https://i.ytimg.com/vi/9-53EMTmXkw/maxresdefault.jpg" className="w-full h-48 object-cover" alt="SAP Reporting" /><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">SAP Group Reporting</h3><p className="text-slate-600">Streamline your financial consolidation and reporting processes with our expert implementation.</p></div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                    <img src="https://www.b-a-w.com/wp-content/uploads/2022/10/3-1.jpg" className="w-full h-48 object-cover" alt="Anaplan" /><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Anaplan</h3><p className="text-slate-600">Connect your people, data, and plans to enable real-time planning and decision-making.</p></div>
                </div>
                 <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                    <img src="https://workday.wd5.myworkdayjobs.com/ja-JP/Workday_Early_Career/assets/logo" className="w-full h-48 object-contain p-4" alt="Workday" /><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">Workday</h3><p className="text-slate-600">Transform your HR and finance operations with a single, unified cloud-based system.</p></div>
                </div>
                 <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                    <img src="https://mms.businesswire.com/media/20231010822597/en/1120772/22/OneStream_BizWire_logo.jpg" className="w-full h-48 object-contain p-4" alt="OneStream" /><div className="p-6"><h3 className="text-xl font-bold mb-2 text-slate-800">OneStream</h3><p className="text-slate-600">Unify your corporate performance management in a single, extensible platform.</p></div>
                </div>
            </div>
        </div>
    </AnimatedSection>
));

const ClientsPage = React.forwardRef((props, ref) => (
    <AnimatedSection id="clients" ref={ref} className="bg-slate-50">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10"><TextGradient>Our Clients</TextGradient></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md"><img src="https://play-lh.googleusercontent.com/yoB3_PGDvkNVvRRWYevVr73njuljvvZG6ZUA4WjMkW5hpgGll_gNwbuFIF6_PrQr9g" alt="Savvy Sliders Logo" className="h-40 mx-auto mb-4 object-contain" /><p className="text-slate-600 text-center">For Savvy Sliders, we are creating powerful Power BI dashboards and KPIs to drive data-informed decision-making.</p></div>
                <div className="bg-white p-8 rounded-lg shadow-md"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDF7tDS5TDcnNme6OUcvIogYjQQhnbdRKv67_9kB0zI23x4ecGXurNlkUz6jdF15Tp7kM&usqp=CAU" alt="Burger Fi Logo" className="h-40 mx-auto mb-4 object-contain" /><p className="text-slate-600 text-center">For Burger Fi, we are creating powerful Power BI dashboards and KPIs to drive data-informed decision-making.</p></div>
            </div>
        </div>
    </AnimatedSection>
));

const PartnersPage = React.forwardRef((props, ref) => (
    <AnimatedSection id="partners" ref={ref}>
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-10"><TextGradient>Our Technology Partners</TextGradient></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" alt="Microsoft Logo" className="h-20 mx-auto mb-4 object-contain" />
                    <p className="text-slate-600">
                        As a Microsoft partner, we leverage Power BI and Azure to build powerful, scalable data analytics solutions for our clients, providing deep insights into their operations.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <img src="https://solutionsreview.com/data-management/files/2018/09/oie_1190H58e7ohK-768x384.jpg" alt="Snowflake Logo" className="h-20 mx-auto mb-4 object-contain" />
                    <p className="text-slate-600">
                        Our amazing partners at Snowflake allow us to utilize their Data Cloud to centralize and process vast amounts of data, forming the backbone of our business intelligence services.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <img src="https://mma.prnewswire.com/media/2664714/PAR_Logo.jpg" alt="PAR Logo" className="h-20 mx-auto mb-4 object-contain" />
                    <p className="text-slate-600">
                        We integrate with PAR's leading Point-of-Sale (POS) systems, ensuring seamless data flow from front-of-house transactions to back-end financial reporting.
                    </p>
                </div>
            </div>
        </div>
    </AnimatedSection>
));


const BlogPage = React.forwardRef((props, ref) => (
  <AnimatedSection id="blog" ref={ref} className="bg-slate-50">
     <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10"><TextGradient>Latest Insights</TextGradient></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><img src="https://keelsolution.com/wp-content/uploads/2019/10/5-SAP-S4-HANA-Data-Migration-Challenges-for-the-Oil-Gas-and-Energy-Industry.png" className="rounded-lg w-full h-64 object-cover mb-4" alt="SAP HANA Migration" /><h3 className="text-2xl font-bold mb-2 text-slate-800">SAP HANA Migration: Why It’s a Game-Changer for Business Transformation</h3><p className="text-sm text-slate-500 mb-4">May 19, 2025 | AI, SAP</p><p className="text-slate-600 mb-4">With digital transformation in full swing, businesses that depend on SAP solutions are in a hurry to migrate to SAP HANA. Transitioning from legacy third-party databases to SAP's native in-memory computing platform realizes efficiency, speed and...</p></div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><img src="https://a.storyblok.com/f/277218/1200x686/25da3dd052/ai-and-future-of-business-planning.webp/m/1000x656/filters:format(webp)" className="rounded-lg w-full h-64 object-cover mb-4" alt="AI in Business" /><h3 className="text-2xl font-bold mb-2 text-slate-800">Embracing AI: Artificial Intelligence is Revolutionizing Business Strategy</h3><p className="text-sm text-slate-500 mb-4">May 16, 2025 | AI</p><p className="text-slate-600 mb-4">Artificial Intelligence (AI) is not a thing of the future—it's an empowering force fueling innovation across all sectors. Companies globally are embracing AI to improve performance, automate and unlock valuable insights.The Emergence of AI in Business...</p></div>
        </div>
    </div>
  </AnimatedSection>
)); 



const ContactPage = React.forwardRef((props, ref) => (
  <AnimatedSection id="contact" ref={ref} className="bg-slate-50">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-10"><TextGradient>Get In Touch</TextGradient></h2>
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-slate-800">Our Office</h3>
          <address className="not-italic text-slate-600 mb-6"><strong>Nexora Offshore Services Pvt Ltd</strong><br />Sy No 11, WeWork Krishe Emerald, Kondapur Main Road,<br />Hyderabad, Telangana, 500081<br />India</address>
          <h3 className="text-2xl font-bold mb-4 text-slate-800">Contact Details</h3>
          <p className="text-slate-600 mb-2"><strong>Email:</strong> <a href="mailto:contact@nexoraadvisory.com" className="text-red-500 hover:underline">contact@nexoraadvisory.com</a></p>
          <p className="text-slate-600"><strong>Phone:</strong> <a href="tel:+919397982777" className="text-red-500 hover:underline">+91 9397982777</a></p>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-slate-200 mt-6 h-64">
            <iframe title="Nexora Office Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.941992124464!2d78.34844!3d17.448439000000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb934f133641eb%3A0x33a052f9denied!2sWeWork%20Krishe%20Emerald!5e0!3m2!1sen!2sin!4v1754407250694!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <ContactFormComponent title="Send Us a Message" />
      </div>
    </div>
  </AnimatedSection>
));

const Footer = () => (
    <footer className="bg-white border-t border-slate-200 py-6 mt-16">
        <div className="container mx-auto px-6 text-center text-slate-500">
            <p>&copy; 2025 Nexora Advisory | All Rights Reserved | contact@nexoraadvisory.com</p>
        </div>
    </footer>
);


export default App;

