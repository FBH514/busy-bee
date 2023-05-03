interface ButtonProps {
    value?: string;
    icon?: string;
    onClick?: () => void;
}


export default function Button(props: {
    id?: string,
    className?: string,
    params: ButtonProps
}): JSX.Element {
    return <button
        id={props.id}
        className={props.className}
        onClick={props.params.onClick}
    >
        {props.params.value}
        {props.params.icon && <img src={props.params.icon} alt="icon"/>}
    </button>
}