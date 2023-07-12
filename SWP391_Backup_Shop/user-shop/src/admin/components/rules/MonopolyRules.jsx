import React from 'react'

const MonopolyRules = () => {
    return (
        <div className="w-[1200px] bg-gray-200 p-8 rounded shadow hover:scale-105 hover:duration-300">
            <h2 className="text-2xl font-bold mb-4">Monopoly Rules</h2>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Objective</h3>
                <p className='font-normal'>
                    Monopoly is a classic board game where players buy, sell, and trade
                    properties to build monopolies and bankrupt opponents. The goal is to
                    be the last player remaining with money and assets.
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Property Management</h3>
                <p className='font-normal'>
                    Players collect rent from opponents who land on their properties,
                    upgrade their properties with houses and hotels, and strategically
                    negotiate and trade to gain advantages.
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Chance and Luck</h3>
                <p className='font-normal'>
                    The game involves chance cards, community chest cards, and dice rolls
                    that can impact players' progress and fortunes, adding an element of
                    luck and unpredictability.
                </p>
            </div>
        </div>
    )
}

export default MonopolyRules
