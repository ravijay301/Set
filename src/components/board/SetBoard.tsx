import { SetCardModel } from "../../models/setCard";
import SetGame from "../../models/setGame";
import SetCard from "./SetCard";
import { useEffect , useState } from "react";

interface Props {
    increaseScore: () => void
    onCardsLeft: (cardsLeft: number) => void
}

let game = new SetGame();

export default function SetBoard(props: Props) {
    
    let [board,             setBoard] =             useState<(SetCardModel | null)[]>([]);
    let [selectedCards,     setSelectedCards] =     useState<(SetCardModel)[]>([]);
    let [selectedIndices,   setSelectedIndices] =   useState<(number)[]>([]);

    const handledSelectedCard = (card: SetCardModel) => {
        let index = SetGame.indexOfCard(card, selectedCards)
        if(index !== -1) {
            setSelectedCards(selectedCards => selectedCards.filter((_, i) => i !== index))
            setSelectedIndices(selectedIndices => selectedIndices.filter((_, i) => i !== index))
            return
        }
        if(selectedCards.length === 2) {
            if(game.submitSet(selectedCards[0], selectedCards[1], card)) {
                props.increaseScore()
                props.onCardsLeft(game.cardsLeftInDeck())
            }
            setSelectedCards([])
            setSelectedIndices([])
        }
        else {
            setSelectedCards(selectedCards => [...selectedCards, card])
            setSelectedIndices(selectedIndices => [...selectedIndices, SetGame.indexOfCard(card, board)])
        }
    }

    useEffect(() => {
        props.onCardsLeft(game.cardsLeftInDeck())
        setBoard(game.getBoard());
    }, [board])

    return (
        <>
            <div className='grid grid-cols-3 gap-x-1 w-[60.4rem] relative'>
                {board.map((card, index) => {
                    return <div className={`m-4`} key={index}>
                        {card ? <SetCard key={index} card={card} selected={selectedIndices.indexOf(index) !== -1} onCardSelection={handledSelectedCard}/> : <div></div>}
                    </div>
                })}
            </div>
        </>
    );
}