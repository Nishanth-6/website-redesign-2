import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                    style={{
                        backgroundColor: 'var(--color-accent)',
                        boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)'
                    }}
                    aria-label="Scroll to top"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowUp className="w-4 h-4" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
