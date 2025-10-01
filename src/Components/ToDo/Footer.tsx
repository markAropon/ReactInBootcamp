import React from 'react';

interface FooterProps {
    copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({ copyright = `© ${new Date().getFullYear()} My App` }) => {
    return (
        <footer className="footer w-full shadow-inner">
            <div className="py-2 text-center">
                <p className="text-xs leading-tight text-gray-500">{copyright}</p>
            </div>
        </footer>
    );
};