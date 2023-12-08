import React from 'react';

/**
 * Represents the navigation bar component of the application.
 * This component renders the top navigation bar with branding and action buttons.
 */
export default function Navbar() {
    return (
        <nav className="z-20 flex w-full items-start gap-4 bg-custom-dark-gray p-4 text-[28px] shadow-md transition-colors lg:flex-row lg:items-center justify-between">
            <h2 className="flex items-center gap-1">
                <span className="pr-2">🍻</span>
                <span className="tx-inverted text-white hover:text-[#b066f3] transition-colors">Brest</span>
                <span className="gradient bg-clip-text text-transparent">bar</span>
            </h2>
            <div className="flex justify-between gap-2">
                <button
                    className="bg-violet rounded-[4px] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105">
                    🙋‍♀️ Faire une demande
                </button>
            </div>
        </nav>
    )
}
