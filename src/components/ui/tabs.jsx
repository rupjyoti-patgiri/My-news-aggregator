import React, { useState } from 'react';

// export const Tabs = ({ children, defaultValue }) => {
//   const [activeTab, setActiveTab] = useState(defaultValue);

//   const triggers = React.Children.toArray(children).filter(
//     (child) => child.type === TabsTrigger
//   );
//   const contents = React.Children.toArray(children).filter(
//     (child) => child.type === TabsContent
//   );


export const Tabs = ({ children, value, onValueChange }) => {
  const triggers = React.Children.toArray(children).filter(
    (child) => child.type === TabsTrigger
  );
  const contents = React.Children.toArray(children).filter(
    (child) => child.type === TabsContent
  );

  return (
//     <div>
//       <div className="flex space-x-2 border-b">{triggers.map((trigger) => React.cloneElement(trigger, { setActiveTab, activeTab }))}</div>
//       <div>{contents.find((content) => content.props.value === activeTab)}</div>
//     </div>
//   );
// };

<div>
      <div className="flex space-x-2 border-b">
        {triggers.map((trigger) =>
          React.cloneElement(trigger, {
            isActive: trigger.props.value === value,
            onClick: () => onValueChange(trigger.props.value),
          })
        )}
      </div>
      <div>
        {contents.find((content) => content.props.value === value)}
      </div>
    </div>
  );
};

export const TabsList = ({ children, className }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

// export const TabsTrigger = ({ children, value, setActiveTab, activeTab, className }) => {
//   const isActive = activeTab === value;

//   return (
//     <button
//       onClick={() => setActiveTab(value)}
//       className={`px-4 py-2 rounded-t-md border-t-2 ${
//         isActive ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-600'
//       } ${className}`}
//     >
//       {children}
//     </button>
//   );
// };

export const TabsTrigger = ({ children, value, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border-t-2 ${
        isActive
          ? 'bg-blue-700 text-white-600'
          : 'bg-blue-300 border-transparent text-gray-600 hover:text-blue-600'
      }`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ children, value }) => {
  return <div>{children}</div>;
};
