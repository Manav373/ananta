import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';


type AnimatedTextProps = {
    text: string;
    el?: any;
    className?: string;
    once?: boolean;
    animation?: {
        hidden: Variants['hidden'];
        visible: Variants['visible'];
    };
};

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
        },
    },
};

export const AnimatedText = ({
    text,
    el: Wrapper = 'p',
    className,
    once = true,
    animation = defaultAnimations,
}: AnimatedTextProps) => {
    const defaultContainer = {
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const controls = useRef(null);
    const isInView = useInView(controls, { amount: 0.5, once });

    return (
        <Wrapper className={className}>
            <span className="sr-only">{text}</span>
            <motion.span
                ref={controls}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={defaultContainer}
                aria-hidden
            >
                {text.split(' ').map((word, wordIndex) => (
                    <span className="inline-block" key={`${word}-${wordIndex}`}>
                        {word.split('').map((char, charIndex) => (
                            <motion.span
                                key={`${char}-${charIndex}`}
                                className="inline-block"
                                variants={animation}
                            >
                                {char}
                            </motion.span>
                        ))}
                        <span className="inline-block">&nbsp;</span>
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );
};
