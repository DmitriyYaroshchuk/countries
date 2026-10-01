import {Select} from "radix-ui";
import styled from "styled-components";
import type {JSX} from "react";
import type {TCustomSelectProps} from "../types/types.ts";
import {IoCheckmark, IoChevronDown, IoChevronUp, IoClose} from "react-icons/io5";

const SelectWrapper = styled.div`
    position: relative;
    max-width: 300px;
    width: 100%;
`

const SelectTrigger = styled(Select.Trigger)`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background-color: var(--colors-ui-base);
    color: var(--colors-text);
    border-radius: var(--radii);
    padding: 20px;
    border: none;
    box-shadow: var(--shadow);
    height: 50px;
    width: 100%;
    cursor: pointer;
`;

const ValueWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex: 1;
    overflow: hidden;
`;

const ClearButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: var(--colors-text);

    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
        color: red;
    }
`;

const SelectContent = styled(Select.Content)`
    background-color: var(--colors-ui-base);
    color: var(--colors-text);
    border-radius: var(--radii);
    box-shadow: var(--shadow);
    border: none;
    overflow: hidden;
`;

const SelectItem = styled(Select.Item)`
    padding: 0.25rem 0.5rem;
    font-size: 14px;
    color: var(--colors-text);
    cursor: pointer;
    border-radius: var(--radii);
    position: relative;

    &[data-highlighted] {
        background-color: #e6f0ff;
        color: #000;
        outline: none;
    }
`;

const SelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  right: 8px;
`;

function CustomSelect({ options, value, onChange, placeholder } : TCustomSelectProps) : JSX.Element {
    return (
        <Select.Root value={value} onValueChange={onChange}>
            <SelectWrapper>
                <SelectTrigger>
                    <ValueWrapper>
                        <Select.Value placeholder={placeholder} />
                    </ValueWrapper>
                    <Select.Icon>
                        <IoChevronDown />
                    </Select.Icon>
                </SelectTrigger>

                {value && (
                    <ClearButton onClick={() => onChange("")}>
                        <IoClose />
                    </ClearButton>
                )}
            </SelectWrapper>

            <Select.Portal>
                <SelectContent>
                    <Select.ScrollUpButton>
                        <IoChevronUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport>
                        {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                <Select.ItemText>{opt.label}</Select.ItemText>
                                <SelectItemIndicator>
                                    <IoCheckmark />
                                </SelectItemIndicator>
                            </SelectItem>
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton>
                        <IoChevronDown />
                    </Select.ScrollDownButton>
                </SelectContent>
            </Select.Portal>
        </Select.Root>

    );
}
export default CustomSelect;