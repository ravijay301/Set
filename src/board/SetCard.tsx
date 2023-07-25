import { SetCardColor, SetCardModel, SetCardShading, SetCardShape } from "../models/setCard";

interface Props {
    card: SetCardModel
    onCardSelection: (card: SetCardModel) => void
}

export default function SetCard (props: Props) {

    const handleClick = () => {
        props.onCardSelection(props.card)
    }

    let svgColor = 'blue'
    if(props.card.color === SetCardColor.RED) {
        svgColor = 'red'
    }
    else if(props.card.color === SetCardColor.GREEN) {
        svgColor = 'green'
    }
    else if(props.card.color === SetCardColor.PURPLE) {
        svgColor = 'purple'
    }

    let svgShade = '0';
    if(props.card.shading === SetCardShading.STRIPED) {
        svgShade = '0.2';
    }
    else if(props.card.shading === SetCardShading.SOLID) {
        svgShade = '1';
    }
    let toMap = []
    for(let i = 0; i <= props.card.number; i++) {
        toMap.push(i);
    }

    return (
        <div className='drop-shadow-lg w-[18rem] h-[10rem] flex justify-center bg-gray-300 items-center border-2 border-black rounded-lg hover:bg-gray-400 hover:scale-110 cursor-pointer transition-transform' onClick={handleClick}>
            {
                toMap.map((_, index) => {
                    return <div key={index} className='mr-1 ml-1'>
                        <svg version="1.1"
                            width="60" height="110" viewBox="0 0 60 110"
                            xmlns="http://www.w3.org/2000/svg">

                            {props.card.shape === SetCardShape.OVAL && <rect x='5' y='5' rx="50%" width="50" height="100" stroke={svgColor} strokeWidth="5" fill={svgColor} fillOpacity={svgShade}/>}
                            {props.card.shape === SetCardShape.DIAMOND && <polygon points="5 55,30 105,55 55,30 5" stroke={svgColor} strokeWidth="5" fill={svgColor} fillOpacity={svgShade}/>}
                            {props.card.shape === SetCardShape.SQUIGGLE &&   
                                <path fill={svgColor} fillOpacity={svgShade} stroke={svgColor} d="m10.72223,18.63735c22.31582,16.16191 4.26777,57.29678 -0.48531,75.20609c-4.75308,17.90932 58.34815,16.63408 43.77242,5.37163c-14.57574,-11.26245 6.36728,-61.46857 -4.9291,-80.99452c-11.29638,-19.52595 -60.67381,-15.74511 -38.35799,0.41679l-0.00001,0z" strokeWidth="5"/>
                            }
                        </svg>
                    </div>
                })
            }
        </div>
    )
}