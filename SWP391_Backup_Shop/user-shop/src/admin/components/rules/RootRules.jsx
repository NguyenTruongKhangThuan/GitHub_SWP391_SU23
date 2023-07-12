import React from 'react'

const RootRules = () => {
    return (
        <div className="w-[1200px] bg-gray-200 p-8 rounded shadow hover:scale-105 hover:duration-300">
            <h2 className="text-2xl font-bold mb-4">Root Rules</h2>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Factions</h3>
                <p className='font-normal'>
                    Root is an asymmetric strategy game with different factions vying for
                    control of the forest. Each faction has unique abilities, goals, and
                    playstyles, offering varied gameplay experiences.
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Battle and Control</h3>
                <p className='font-normal'>
                    Players engage in battles, craft items, and spread their influence to
                    control key areas of the forest. The faction that achieves its
                    specific victory condition first wins the game.
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Decisions and Strategy</h3>
                <p className='font-normal'>
                    Root involves careful decision-making, managing resources, forming
                    alliances, and adapting to changing dynamics to gain an edge over
                    opponents and emerge victorious.
                </p>
            </div>
        </div>
    )
}

export default RootRules
