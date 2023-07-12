import React from 'react'

const CatanRules = () => {
    return (
        <div className="w-[1200px] bg-gray-200 p-8 rounded shadow hover:scale-105 hover:duration-300">
            <h2 className="text-2xl font-bold mb-4">Catan Rules</h2>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Setup</h3>
                <p className='font-normal'>
                    Catan is a strategy board game played with a modular board. Players
                    take turns building and trading resources to expand their settlements
                    and earn victory points.
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Gameplay</h3>
                <p className='font-normal'>
                    During the game, players roll dice to determine resource production,
                    trade resources with each other, and strategically place settlements
                    and cities. The first player to reach a certain number of victory
                    points wins.
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Development Cards</h3>
                <p className='font-normal'>
                    In addition to building settlements and cities, players can acquire
                    development cards that provide various advantages and special
                    abilities.
                </p>
            </div>
        </div>
    )
}

export default CatanRules
