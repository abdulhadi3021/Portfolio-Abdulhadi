declare module 'framer-motion' {
    export const motion: {
      div: React.ComponentType<{
        children?: React.ReactNode;
        initial?: any;
        animate?: any;
        transition?: any;
        className?: string;
      }>;
    };
  }