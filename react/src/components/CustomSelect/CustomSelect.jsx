import { forwardRef, useImperativeHandle, useState } from "react";
import "./CustomSelect.scss";

import arrowDown from "../../assets/images/arrow-down.svg";

const CustomSelect = forwardRef(({ options, onChange, useIndex, id }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionClick = (option, index) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(useIndex ? index : option);
    };

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    useImperativeHandle(ref, () => ({
        toggleSelect,
    }));

    return (
        <div id={id} onClick={toggleSelect} className={`custom-select`}>
            <div className="selected-option">{selectedOption}</div>
            <img src={arrowDown} alt="down" className="arrow-down" />
            <ul className={`options ${isOpen ? "open" : ""}`}>
                {options.map((option, index) => (
                    <li
                        key={index}
                        value={index}
                        onClick={() => handleOptionClick(option, index)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
});

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
