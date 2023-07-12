import React from 'react'

//This is the template style. Can be edit later.
const WerewolfRules = () => {
    return (
        <div className="w-[1200px] bg-gray-200 p-8 rounded shadow hover:scale-105 hover:duration-300">
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Setup</h3>
                <p className='font-normal'>
                    Werewolves is a social deduction game played with a group of players.
                    The game requires a moderator and the remaining players are divided
                    into two teams: werewolves and villagers.
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Main Phases</h3>
                <p className='font-normal'>
                    The game consists of night and day phases. During the night, the
                    werewolves choose a player to eliminate, and special roles may perform
                    their actions. During the day, players discuss and vote to eliminate
                    someone they suspect to be a werewolf.
                </p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Winning and Losing</h3>
                <p className='font-normal'>
                    The game continues until one team achieves their win condition. The
                    werewolves win if all the villagers are eliminated, while the
                    villagers win if they eliminate all the werewolves. Special roles may
                    have unique win conditions.
                </p>
            </div>
        </div>
    )
}

export default WerewolfRules
