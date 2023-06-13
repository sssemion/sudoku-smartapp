import React from 'react';
import { RadioGroup, Radiobox, Cell } from '@salutejs/plasma-ui';
import Strings from '../../constants/Strings';

export default function SberRadioButtons({ value, onChange }) {
    return (
        <RadioGroup>
            <div>
                <h3>{Strings.chooseDifficulty}</h3>
            </div>
            <Cell style={{
                "--cell-content-margin-left": "1rem"
            }} description={Strings.chooseDifficulty} />
            <div>
                <Radiobox id="option1" name="options" value="easy" 
                checked={value == "easy" ? true : false} onChange={onChange} label={Strings.easy}></Radiobox>
            </div>
            <div>
                <Radiobox id="option2" name="options" value="medium" 
                checked={value == "medium" ? true : false} onChange={onChange} label={Strings.medium} />
            </div>
            <div>
                <Radiobox id="option3" name="options" value="hard"
                checked={value=="hard"? true: false} onChange={onChange} label={Strings.hard}/>
            </div>
        </RadioGroup>
    );
}