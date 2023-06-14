import React, {useContext} from 'react';
import { RadioGroup, Radiobox } from '@salutejs/plasma-ui';
import Strings from '../../constants/Strings';

export default function SberRadioButtons({ value, onChange }) {

    return (
        <RadioGroup>
            <div>
                <h3>{Strings.chooseDifficulty}</h3>
            </div>
            <div>
                <Radiobox id="option1" name="options" value="easy" 
                checked={value === "easy"} onChange={onChange} label={Strings.easy}
                ></Radiobox>
            </div>
            <div>
                <Radiobox id="option2" name="options" value="medium" 
                checked={value === "medium"} onChange={onChange} label={Strings.medium}
                 />
            </div>
            <div>
                <Radiobox id="option3" name="options" value="hard"
                checked={value === "hard"} onChange={onChange} label={Strings.hard}
                />
            </div>
        </RadioGroup>
    );
}