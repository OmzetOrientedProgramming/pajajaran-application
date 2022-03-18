import React from 'react';
import 'twin.macro';

interface DetailRingkasanProps {
  children: React.ReactNode;
  title: string;
}

const DetailRingkasan: React.FC<DetailRingkasanProps> = ({
  children,
  title,
}) => {
  return (
    <div tw="flex flex-col justify-center">
      <div tw="flex justify-center items-center">
        <h2 tw="text-2xl color[#003366] font-bold">{title}</h2>
      </div>
      <div tw="flex flex-col justify-center">{children}</div>
    </div>
  );
};

export default DetailRingkasan;
