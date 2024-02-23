import React from 'react';

const MainPage = ({ children }) => {
    return (
        <div className="flex flex-col max-h-[446px] max-w-[350px] overflow-auto p-4 pt-0">
            {children}
        </div>
    );
};

export default MainPage;