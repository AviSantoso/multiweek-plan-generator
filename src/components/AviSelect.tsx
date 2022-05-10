import { Center, GridItem, FormLabel, Select } from "@chakra-ui/react";
import { useMemo } from "react";
import slugify from "slugify";

export interface SelectOption {
  value: string;
  text: string;
}

export interface AviSelectProps {
  label: string;
  value: string;
  onValue: (value: string) => void;
  options: SelectOption[];
}

export function AviSelect({ label, value, onValue, options }: AviSelectProps) {
  const name = useMemo(() => slugify(`AviSelect ${label}`), [label]);
  return (
    <>
      <Center as={GridItem} justifyContent="left">
        <FormLabel htmlFor={name} fontWeight={400}>
          {label}
        </FormLabel>
      </Center>
      <Center as={GridItem}>
        <Select
          id={name}
          value={value}
          onChange={(e) => onValue(e.target.value)}
          placeholder="Select option"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </Select>
      </Center>
    </>
  );
}
