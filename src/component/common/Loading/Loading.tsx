import Lottie from 'lottie-react';
import Loading from '@/assets/lotties/Loading.json';

export default function Loader({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <Lottie animationData={Loading} loop autoplay style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
