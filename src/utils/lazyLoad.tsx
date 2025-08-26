import { lazy, Suspense, ComponentType } from 'react';

// Loading component to show while the actual component is loading
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '2rem',
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '3px solid rgba(0, 255, 245, 0.3)',
      borderRadius: '50%',
      borderTop: '3px solid #00fff5',
      animation: 'spin 1s linear infinite',
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Generic function to lazy load any component
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <LoadingFallback />
) {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Helper function to detect if the user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Helper function to detect device capabilities
export const getDeviceCapabilities = () => {
  if (typeof window === 'undefined') return { isLowEnd: false };
  
  // Check for low-end devices based on memory and CPU cores
  // Use type assertion for non-standard navigator properties
  const isLowMemory = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
  const isLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  
  return {
    isLowEnd: isLowMemory || isLowCPU,
  };
};