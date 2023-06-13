import React from 'react';
import { Button } from '@salutejs/plasma-ui';

export default function MyButton(props) {
    return (
        <Button stretch={false} view="secondary" onClick={props.onClick} disabled={props.disabled}>{props.title}</Button>
    );
}