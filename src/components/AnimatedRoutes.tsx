
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import About from '../pages/About';
import Solutions from '../pages/Solutions';
import Contact from '../pages/Contact';
import PageTransition from './PageTransition';

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <PageTransition>
                        <Home />
                    </PageTransition>
                } />
                <Route path="/about" element={
                    <PageTransition>
                        <About />
                    </PageTransition>
                } />
                <Route path="/solutions" element={
                    <PageTransition>
                        <Solutions />
                    </PageTransition>
                } />
                <Route path="/contact" element={
                    <PageTransition>
                        <Contact />
                    </PageTransition>
                } />
            </Routes>
        </AnimatePresence>
    );
}
