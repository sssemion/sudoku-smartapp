import React from 'react';
import Strings from '../../constants/Strings';

export function CustomRadioButtons({value, onChange}) {
  return (
    <div className="radio-group">
    <div>
        <h3>Выберите уровень сложности:</h3>
    </div>
    <div>
      <input type="radio" id="option1" name="options" value="easy" 
      checked={value=="easy"? true: false} onChange={onChange}/>
      <label className='label' htmlFor="option1">{Strings.easy}</label>
    </div>
    <div>
      <input type="radio" id="option2" name="options" value="medium" checked={value=="medium"? true: false} onChange={onChange}/>
      <label className='label'  htmlFor="option2">{Strings.medium}</label>
    </div>
    <div>
      <input type="radio" id="option3" name="options" value="hard" checked={value=="hard"? true: false} onChange={onChange}/>
      <label className='label'  htmlFor="option3">{Strings.hard}</label>
    </div>
  </div>
  );
};