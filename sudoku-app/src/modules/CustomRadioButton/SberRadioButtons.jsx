import React, {useContext} from 'react';
import MyButton from '../MyButton/MyButton';
import { Dropdown } from '@salutejs/plasma-web';
import Strings from '../../constants/Strings';

export default function SberRadioButtons({ value, onChange }) {
;

    return (
        
        <Dropdown
            className='Dropdown'
            id="example-dropdown-click"
            items={[
                { value: 'easy', label: Strings.easy, color: '#32a852' },
                { value: 'medium', label: Strings.medium, color: '#d1ab00' },
                { value: 'hard', label: Strings.hard, color: '#d13400' }
            ]}
            trigger="click"
            onItemSelect={onChange}
            placement='bottom'
        >
            <MyButton title={`Уровень: ${value.label}`} />
        </Dropdown>
    );
}