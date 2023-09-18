import { useState } from "react";
import "./CustomSelect.scss";

import arrowDown from "../../assets/images/arrow-down.svg";

const CustomSelect = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div onClick={toggleSelect} className={`custom-select`}>
            <div className="selected-option">{selectedOption}</div>
            <img src={arrowDown} alt="down" className="arrow-down" />
            <ul className={`options ${isOpen ? "open" : ""}`}>
                {options.map((option) => (
                    <li key={option} onClick={() => handleOptionClick(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomSelect;
