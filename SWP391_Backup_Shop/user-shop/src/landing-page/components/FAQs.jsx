import React, { useState } from 'react';
import ToggleIcon from './../assets/raphael_arrowup.svg';

const Question_Data = [
  {
    question: 'Question 1 - How many people are required to participate in the game?',
    answer: 'You will need only 8 players to compete in the game.',
  },
  {
    question: 'Question 2 - Can I use Text Message to play in the game?',
    answer: 'Unfortunately not. Our game was designed so that everyone will play together through voice communication only.',
  },
  {
    question: 'Question 3 - What type of Werewolves are we going to play in the web game?',
    answer: 'For now, our developer team has included the basic edition of Werewolves for 8 people.',
  },
];

const FAQs = () => {
  const [selected, setSelected] = useState(-1);

  const toggle = (i) => {
    setSelected((prevSelected) => (prevSelected === i ? -1 : i));
  };

  return (
    <div className='h-[1000px] max-w-[1600px] mx-auto md:grid-cols-2 bg-gradient-to-br from-[#FFC98D] to-[#4850A9] flex flex-col items-center justify-center'>
      <div className='w-[800px] p-[10px] text-white'>
        <div className='flex flex-col justify-center text-left space-y-[20px] mb-[20px]'>
            <h1 className='text-4xl font-bold text-white'>FAQs</h1>
            <p>Frequently Asked Questions to get ahead of the game</p>
        </div>
            <div>
              {Question_Data.map((item, i) => (
                <div className='mb-4' key={i}>
                  <div className='leading-[30px] bg-[#B04DAE] px-[10px] border-2 border-[#903E9E]'>
                    <div
                      className='font-bold flex justify-between cursor-pointer'
                      onClick={() => toggle(i)}
                    >
                      <h2>{item.question}</h2>
                      <div>
                        <img
                          src={ToggleIcon}
                          alt='Toggle'
                          className={`w-[50px] h-[50px] ${selected === i ? '-rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all max-h-0 ${
                        selected === i ? 'max-h-[200px] py-[20px] font-semibold mb-[8px]' : ''
                      }`}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
      </div>
    </div>
  );
};

export default FAQs;
