import { Center, FormLabel, GridItem, Input } from "@chakra-ui/react";
import { useMemo } from "react";
import slugify from "slugify";

export interface AviInputProps {
  label: string;
  value: string;
  onValue: (value: string) => void;
}

export function AviInput({ label, value, onValue }: AviInputProps) {
  const name = useMemo(() => slugify(`AviInput ${label}`), [label]);
  return (
    <>
      <Center as={GridItem} justifyContent="left">
        <FormLabel htmlFor={name} fontWeight={400}>
          {label}
        </FormLabel>
      </Center>
      <Center as={GridItem}>
        <Input
          fontSize="0.9em"
          id={name}
          value={value}
          onChange={(e) => onValue(e.target.value)}
        />
      </Center>
    </>
  );
}
