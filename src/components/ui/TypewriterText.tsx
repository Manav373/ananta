import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export const TypewriterText = ({ text, className = "" }: { text: string; className?: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const handleTyping = () => {
            if (!isDeleting) {
                // Typing
                if (displayedText.length < text.length) {
                    setDisplayedText((prev) => text.slice(0, prev.length + 1));
                } else {
                    // Finished typing, wait before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (displayedText.length > 0) {
                    setDisplayedText((prev) => prev.slice(0, -1));
                } else {
                    // Finished deleting, loop back to typing
                    setIsDeleting(false);
                }
            }
        };

        const speed = isDeleting ? 40 : 50;
        const timer = setTimeout(handleTyping, speed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, isInView, text]);

    return (
        <h2 ref={ref} className={`${className} min-h-[1.2em]`}>
            {displayedText}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[3px] h-[1em] bg-[#2563EB] ml-1 align-middle"
            />
        </h2>
    );
};
