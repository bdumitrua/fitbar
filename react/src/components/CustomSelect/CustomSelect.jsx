import { useState } from "react";
import "./CustomSelect.scss";

const CustomSelect = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    const toggleSelect = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`custom-select ${isOpen ? "open" : ""}`}>
            <div className="selected-option" onClick={toggleSelect}>
                {selectedOption || "Выберите категорию"}
            </div>
            <ul className="options">
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
