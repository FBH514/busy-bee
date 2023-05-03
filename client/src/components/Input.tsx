import React, {ChangeEvent, RefObject} from 'react';

interface InputProps {
    placeholder?: string;
    inputRef?: RefObject<HTMLInputElement>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    inputType?: string;
    value?: string;
    name?: string;
}

export default function Input(props: {id?: string, className?: string, params: InputProps}): JSX.Element {
    return <input
        id={props.id}
        className={props.className}
        type={props.params.inputType}
        placeholder={props.params.placeholder}
        ref={props.params.inputRef}
        onChange={props.params.onChange}
        value={props.params.value}
    />
}