import React, {useState} from 'react';
import MyButton from '../MyButton/MyButton';
import { DropdownPopup, DropdownItem, DropdownList } from '@salutejs/plasma-web';
import Strings from '../../constants/Strings';

export default function SberRadioButtons({ value, onChange }) {
;
    const [isOpen, setIsOpen] = useState(false);

    function onSelect(difficulty) {
        onChange(difficulty);
        setIsOpen(false);
    }

    function keyDown(e) {
        if (e.key == 'Enter') {
            e.target.click();
        }
    }

    return (
        
        <DropdownPopup
            isOpen={isOpen}
            trigger="click"
            className='Dropdown'
            id="example-dropdown-click"
            placement='auto'
            onToggle={(is) => setIsOpen(is)}
            disclosure={<MyButton title={`Уровень: ${value.label}`} />}
        >
            <DropdownList>
                <DropdownItem tabIndex={0} value='easy' label={Strings.easy} color='#32a852' onClick={onSelect} onKeyDown={keyDown}  />
                <DropdownItem tabIndex={0} value='medium' label={Strings.medium} color="#d1ab00" onClick={onSelect} onKeyDown={keyDown} />
                <DropdownItem tabIndex={0} value='hard' label={Strings.hard} color="#d13400" onClick={onSelect} onKeyDown={keyDown} />
            </DropdownList>
        </DropdownPopup>
    );
}