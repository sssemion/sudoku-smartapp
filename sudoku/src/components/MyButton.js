import React from 'react';
import { Button } from '@salutejs/plasma-ui';

export default function MyButton(props) {
    return (
        <Button stretch={false} view={props.view} onClick={props.onClick}>{props.title}</Button>
    );
}