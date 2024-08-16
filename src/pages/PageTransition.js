import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        scale: 0.9,
        opacity: 0,
    },
    enter: {
        scale: 1,
        opacity: 1,
    },
    exit: {
        scale: 1.1,
        opacity: 0,
    },
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
