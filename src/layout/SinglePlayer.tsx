import { useState } from 'react'
import SetBoard from '../board/SetBoard'

export default function SinglePlayer() {

    let [ playerScore,      setPlayerScore ]    = useState<number>(0);
    let [ cardsLeft,        setCardsLeft ]      = useState<number>(81);

    const increaseScore = () => {
        setPlayerScore(playerScore => playerScore + 1)
    }
    const onCardsLeft = (cards: number) => {
        setCardsLeft(cards)
    }

    return <>
        <div className='flex justify-center relative'>
            <div className='p-5 bg-teal-500 rounded-lg flex justify-center w-fit self-center relative'>
                <SetBoard increaseScore={increaseScore} onCardsLeft={onCardsLeft}/>
            </div>
            <div className='flex-col'>
                <div className='bg-teal-500 p-4 rounded-lg ml-2 absolute'>
                    <div className='font-semibold mb-2 right-0 text-start w-[10rem] bg-gray-300 rounded-lg p-2'>{playerScore} Sets</div>
                    <div className='font-semibold right-0 text-start w-[10rem] bg-gray-300 rounded-lg p-2'>{cardsLeft} Cards Left</div>
                </div>
            </div>
        </div>
    </>
}   