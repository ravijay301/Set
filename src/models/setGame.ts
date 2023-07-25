import { SetCardModel , SetCardColor, SetCardNumber, SetCardShading, SetCardShape} from "./setCard";


export default class SetGame {
    private deck: SetCardModel[] = [];
    private board: (SetCardModel | null)[] = [];

    MIN_BOARD_SIZE = 12

    constructor() {
        this.resetGame()
    }

    resetGame() {
        this.deck = [];
        this.generateDeck();
        this.board = [];
        for(let i = 0; i < this.MIN_BOARD_SIZE; i++) {
            this.board.push(null);
        }
        this.refillBoard();
    }

    private generateDeck() {

        // I don't understand how to enumerate through enums, none of the methods I could find were consistent :/
        for(let color = 0; color < 3; color++) {
            for(let number = 0; number < 3; number++) {
                for(let shading = 0; shading < 3; shading++) {
                    for(let shape = 0; shape < 3; shape++) {
                        this.deck.push({
                            color: color as SetCardColor,
                            number: number as SetCardNumber,
                            shading: shading as SetCardShading,
                            shape: shape as SetCardShape
                        })
                    }
                }
            }
        }
        this.shuffleDeck()
    }

    
    /**
     * Given three cards, checks if they are a valid set.
     * @param card1 
     * @param card2 
     * @param card3 
     * @returns true if they are a valid for the gamestate, then updates the board, false otherwise.
     */
    submitSet(card1: SetCardModel, card2: SetCardModel, card3: SetCardModel): boolean {
        let boardMap = this.board.map(c => `${c?.color}${c?.number}${c?.shading}${c?.shape}`)
        let idx1 = boardMap.indexOf(`${card1.color}${card1.number}${card1.shading}${card1.shape}`);
        let idx2 = boardMap.indexOf(`${card2.color}${card2.number}${card2.shading}${card2.shape}`);
        let idx3 = boardMap.indexOf(`${card3.color}${card3.number}${card3.shading}${card3.shape}`);

        console.log(idx1, idx2, idx3)

        if(SetGame.validateSet(card1, card2, card3) && idx1 !== idx2 && idx2 !== idx3 && idx1 !== idx3) {
            if(idx1 !== -1 && idx2 !== -1 && idx3 !== -1) {
                this.board[idx1] = null;
                this.board[idx2] = null;
                this.board[idx3] = null;
                this.organizeBoard();
                this.refillBoard();
                console.log("Valid set!")
                return true;
            }
        }
        return false;
    }
    getBoard(): (SetCardModel | null)[] {
        return this.board
    }

    cardsLeftInDeck(): number {
        return this.deck.length;
    }

    // Does some cool modular arithmetic to check if the cards are a set.
    static validateSet(card1: SetCardModel | null, card2: SetCardModel | null, card3: SetCardModel | null): boolean {
        if(card1 === null || card2 === null || card3 === null) {
            return false
        }
        if(card1.color as number + card2.color as number + card3.color as number % 3 !== 0) {
            return false;
        }
        else if(card1.shape as number + card2.shape as number + card3.shape as number% 3 != 0) {
            return false;
        }
        else if(card1.number as number + card2.number as number + card3.number as number % 3 != 0) {
            return false
        }
        else if(card1.shading as number + card2.shading as number + card3.shading as number % 3 != 0) {
            return false;
        }
        return true;
    }

    static indexOfCard(card: SetCardModel, board: (SetCardModel | null)[]): number {
        let boardMap = board.map(c => `${c?.color}${c?.number}${c?.shading}${c?.shape}`)
        return boardMap.indexOf(`${card.color}${card.number}${card.shading}${card.shape}`);
    }

    private refillBoard() {
        for(let i = 0; i < this.board.length && this.deck.length > 0; i++) {
            if(this.board[i] === null) {
                this.board[i] = this.deck.pop() ?? null;
            }
        }
        
        while(!this.validateBoard() && this.deck.length > 0) {
            for(let i = 0; i < 3 && this.deck.length > 0; i++) {
                this.board.push(this.deck.pop() ?? null)
            }
            console.log('No valid sets, adding 3 cards')
        }
    }

    private organizeBoard() {
        let notNullCards = 0;
        for(let i = 0; i < this.board.length; i++) {
            if(this.board[i] !== null) {
                notNullCards++;
            }
        }
        if(notNullCards >= this.MIN_BOARD_SIZE) {
            this.board.filter(c => c !== null)
        }
    }

    validateBoard(): boolean {
        for(let i = 0; i < this.board.length; i++) {
            for(let j = 1; j < this.board.length; j++) {
                for(let k = 2; k < this.board.length; k++) {
                    if(SetGame.validateSet(this.board[i], this.board[j], this.board[k]) && i !== j && j !== k && i !== k) {
                        console.log(i, j, k)
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Shuffles the deck in place using a modern version of the Fisher–Yates shuffle algorithm
    // Taken from stackoverflow: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    private shuffleDeck() {
        let j, x, i;
        for (i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = x;
        }
    }
}