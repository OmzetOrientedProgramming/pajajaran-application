import React from 'react';
import 'twin.macro';

interface DetailTableProps {
  children: React.ReactNode;
  title: string;
}

const DetailTable: React.FC<DetailTableProps> = ({ children, title }) => {
  return (
    <div tw="">
      <div tw="background[#003366] flex justify-center items-center">
        <h2 tw="font-bold text-2xl color[#FFFFFF]">{title}</h2>
      </div>
      <div tw="">{children}</div>
    </div>
  );
};

export default DetailTable;
