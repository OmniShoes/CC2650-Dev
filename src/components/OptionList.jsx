import React from 'react';

import { useHistory } from 'react-router-dom';

function OptionItem({ title, icon, link }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(link);
  };

  return (
    <div
      className="flex flex-row content-center px-6 py-6 focus:bg-gray-100 hover:bg-gray-100 hover:cursor-pointer"
      role="link"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          handleClick();
        }
      }}
    >
      {icon}
      <span className="text-lg ml-4">
        {title}
      </span>
    </div>
  );
}

export default function OptionList() {
  return (
    <div className="flex flex-col min-h-32 bg-white shadow-xl rounded-xl">
      <OptionItem title="deviceNamePrefix" link="/settings" />
      <OptionItem title="retrievalInterval" link="/settings" />
      <OptionItem title="selectedData" link="/settings" />
      <OptionItem title="allowMarking" link="/settings" />
    </div>
  );
}
