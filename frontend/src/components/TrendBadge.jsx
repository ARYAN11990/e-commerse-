import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

const TrendBadge = ({ trend, rate, className = "" }) => {
  const getStyles = () => {
    if (trend === 'up') return 'text-[#10B981] bg-[#10B981]/10';
    if (trend === 'down') return 'text-[#DC3545] bg-[#DC3545]/10';
    return 'text-[#64748B] bg-[#64748B]/10 dark:text-[#8A99AF] dark:bg-[#8A99AF]/10';
  };

  const getIcon = () => {
    if (trend === 'up') return <ArrowUp className="w-3 h-3" />;
    if (trend === 'down') return <ArrowDown className="w-3 h-3" />;
    return <ArrowRight className="w-3 h-3" />;
  };

  return (
    <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${getStyles()} ${className}`}>
      {getIcon()}
      {rate}
    </span>
  );
};

export default TrendBadge;
