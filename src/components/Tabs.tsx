import React, { useState } from 'react';

function Tabs({
  titles,
  children,
}: {
  titles: string[];
  children: React.ReactNode[];
}) {
  const [index, setIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs__list">
        {titles.map((title, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={index === i ? 'active' : ''}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="tabs__content">{children[index]}</div>
    </div>
  );
}

export default Tabs;
