// components/HeaderTitle.tsx
import React from 'react';

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return (
    <div className="mb-8 flex items-center justify-between py-5 md:mb-16 md:flex-row md:py-20">
      <h2
        className="mb-4 text-4xl font-bold md:mb-0 md:text-[100px]"
        style={{
          fontFamily: 'Panchang-Bold, sans-serif',
          letterSpacing: '-2px'
        }}
      >
        {title}
      </h2>
    </div>
  );
};

export default HeaderTitle;
