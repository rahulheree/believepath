import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProblemSolution from '../components/ProblemSolution';
import Features from '../components/Features';
import MarketStats from '../components/MarketStats';
import Team from '../components/Team';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import MoodTracker from '../components/MoodTracker';
import TherapeuticGames from '../components/TherapeuticGames';

const LandingPage = () => {
    return (
        <div className="font-sans text-slate-900 bg-neutral min-h-screen selection:bg-teal-100 selection:text-teal-900">
            <Navbar />
            <main>
                <Hero />
                <ProblemSolution />
                <TherapeuticGames />
                <MoodTracker />
                <Features />
                <MarketStats />
                <Pricing />
                <Team />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
