interface Props {
    title: string
}

export default function Title(props: Props) {
    return (
        <div className='font-extralight tracking-wider text-gray-600 text-9xl mb-10'>{props.title}</div>
    )
}