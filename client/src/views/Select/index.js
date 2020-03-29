import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  faCaretDown as down,
  faCaretUp as up
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { SelectButton, OptionsWrapper, SelectWrapper } from "./styled";

const Select = ({ children, value, onChange, showSelected = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef();

  const onSelect = value => {
    setIsOpen(false);
    onChange(value);
  };

  useEffect(() => {
    const clickListener = event => {
      if (isOpen && event.target !== optionsRef.current) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", clickListener);
    return () => document.removeEventListener("click", clickListener);
  }, [isOpen, setIsOpen]);

  return (
    <SelectWrapper>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        {children.find(option => option.props.value === value).props.children}{" "}
        <Icon icon={isOpen ? up : down} />
      </SelectButton>
      {isOpen && (
        <OptionsWrapper ref={optionsRef}>
          {children
            .filter(option => showSelected || option.props.value !== value)
            .map((option, index) => (
              <div key={index} onClick={() => onSelect(option.props.value)}>
                {option}
              </div>
            ))}
        </OptionsWrapper>
      )}
    </SelectWrapper>
  );
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showSelected: PropTypes.bool
};

export default Select;
