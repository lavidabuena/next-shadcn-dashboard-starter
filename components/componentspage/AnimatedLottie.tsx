'use client';
import React, { useRef, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimatedLottieProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedLottie: React.FC<AnimatedLottieProps> = ({
  src,
  className,
  style
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
      }}
      transition={{ duration: 0.5 }}
    >
      <Player src={src} autoplay loop className={className} style={style} />
    </motion.div>
  );
};

export default AnimatedLottie;
