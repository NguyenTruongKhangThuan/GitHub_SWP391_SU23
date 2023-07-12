import React from 'react'

const SpudnetRules = () => {
    return (
        <div className="w-[1200px] bg-gray-200 p-8 rounded shadow hover:scale-105 hover:duration-300">
            {/* Part 1: Setup */}
            <div className='mb-6'>
                <h3 className='text-2xl font-bold'>Setup</h3>
                <ul className='mt-4 ml-6 gap-y-4 font-normal'>
                    <li>1. Each player receives a set of Potato Pirate cards, which represent their crew members.</li>
                    <li>2. The Spudnet board is placed in the center of the play area.</li>
                    <li>3. The Programming Card deck and Action Card deck are shuffled and placed face-down.</li>
                    <li>4. Each player starts with a hand of Programming Cards and a designated number of Action Cards.</li>
                </ul>
            </div>
            {/* Part 2: Main phases*/}
            <div className='mb-8'>
                <h3 className='font-bold text-2xl mb-6'>Main Phases:</h3>
                <ol className="list-decimal pl-6">
                    <li>
                        <h4 className='font-semibold mb-2'>Code Planning Phase</h4>
                        <ul className="list-disc pl-8 mb-4 gap-y-2">
                            <li>
                                <p>Players select and arrange their Programming Cards face-down to create a sequence of actions for their Potato Pirate crew.</p>
                            </li>
                            <li>
                                <p>Programming Cards represent various commands such as attack, defend, heal, or special abilities.</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4 className='font-semibold mb-2'>Code Execution Phase</h4>
                        <ul className="list-disc pl-8 mb-4 gap-y-2">
                            <li>
                                <p>Players take turns revealing and executing their programmed actions one by one, following the sequence they have planned.</p>
                            </li>
                            <li>
                                <p>Actions may involve attacking opponents, defending against attacks, healing crew members, or using special abilities.</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4 className='font-semibold mb-2'>Spudnet Interaction Phase</h4>
                        <ul className="list-disc pl-8 mb-4 gap-y-2">
                            <li>
                                <p>During this phase, players can interact with the Spudnet, a network within the game.</p>
                            </li>
                            <li>
                                <p>They can hack into other players' Potato Pirates, steal cards, disrupt opponents' plans, or enhance their own crew's abilities.</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4 className='font-semibold mb-2'>Looting Phase</h4>
                        <ul className="list-disc pl-8 mb-4 gap-y-2">
                            <li>
                                <p>Players can loot captured Potato Pirates or Action Cards from defeated opponents or the Spudnet.</p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h4 className='font-semibold mb-2'>Repair Phase</h4>
                        <ul className="list-disc pl-8 mb-4 gap-y-2">
                            <li>
                                <p>Players can repair damaged Potato Pirates, allowing them to return to the game.</p>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
            {/* Part 3: Winning and Losing */}
            <div>
                <h3 className='text-2xl font-bold mb-6'>Winning and Losing Condition: </h3>
                <h5>The game will continue until one of the following conditions are met:</h5>
                <ul className="list-disc pl-8">
                    <li>
                    A player collects a certain number of Victory Points, typically obtained through successful attacks or achieving specific objectives.
                    </li>
                    <li>
                    A player eliminates all opponents' Potato Pirates from the game.
                    </li>
                </ul>
                <h5>Note:</h5>
                <ul className="list-disc pl-8">
                    <li>If multiple players meet the winning conditions simultaneously, the player with the highest number of Victory Points is declared the winner.</li>
                    <li>If a player loses all their Potato Pirates and cannot recover, they are eliminated from the game.</li>
                </ul>
            </div>
        </div>
    )
}

export default SpudnetRules
