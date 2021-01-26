import React, { useState } from 'react';
import './index.css';

export default function App() {
  const [inputVal, setInputVal] = useState({
    value1: '',
    value2: '',
    value3: '',
  });
  const [checkedVal, setCheckedVal] = useState([]);
  const [sum, setSum] = useState('');
  const { value1, value2, value3 } = inputVal;
  const noValue = !!value1 || !!value2 || !!value3;

  const handleOnChange = (name) => (e) => {
    setInputVal({
      ...inputVal,
      [name]: e.target.value,
    });
  };

  const handleCheckedVal = (e) => {
    const { checked, value } = e.target;
    setCheckedVal(
      checked ? [...checkedVal, value] : checkedVal.filter((v) => v !== value)
    );
  };

  const handleCalculation = (type) => () => {
    switch (type) {
      case 'TAMBAH':
        return setSum(
          checkedVal.reduce((acc, curr) => Number(acc) + Number(curr))
        );
      case 'KURANG':
        return setSum(
          checkedVal.reduce((acc, curr) => Number(acc) - Number(curr))
        );
      case 'KALI':
        return setSum(
          checkedVal.reduce((acc, curr) => Number(acc) * Number(curr))
        );
      case 'BAGI':
        return setSum(
          checkedVal.reduce((acc, curr) => Number(acc) / Number(curr))
        );
      default:
        return;
    }
  };

  const renderButton = () => {
    const button = [
      { symbol: '+', type: 'TAMBAH' },
      { symbol: '-', type: 'KURANG' },
      { symbol: 'x', type: 'KALI' },
      { symbol: '/', type: 'BAGI' },
    ];
    return (
      <div className="button-wrapper">
        {button.map((val, i) => (
          <button key={i} onClick={handleCalculation(val.type)}>
            {val.symbol}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="input">
      <div>
        <input
          type="number"
          value={value1}
          onChange={handleOnChange('value1')}
        />
        <input type="checkbox" onChange={handleCheckedVal} value={value1} />
      </div>
      <div>
        <input
          type="number"
          value={value2}
          onChange={handleOnChange('value2')}
        />
        <input type="checkbox" onChange={handleCheckedVal} value={value2} />
      </div>
      <div>
        <input
          type="number"
          value={value3}
          onChange={handleOnChange('value3')}
        />
        <input type="checkbox" onChange={handleCheckedVal} value={value3} />
      </div>
      {renderButton()}
      <hr />
      {checkedVal.length <= 1 && noValue ? (
        <p>masukan lebih dari 1 angka</p>
      ) : null}
      <p>Hasil: {sum}</p>
    </div>
  );
}
