import { Center, FormLabel, GridItem, Textarea } from "@chakra-ui/react";
import { useMemo } from "react";
import slugify from "slugify";

export interface AviTextareaProps {
  label: string;
  value: string;
  onValue: (value: string) => void;
}

export function AviTextarea({ label, value, onValue }: AviTextareaProps) {
  const name = useMemo(() => slugify(`AviTextarea ${label}`), [label]);
  return (
    <>
      <Center as={GridItem} justifyContent="left">
        <FormLabel htmlFor={name} fontWeight={400}>
          {label}
        </FormLabel>
      </Center>
      <Center as={GridItem}>
        <Textarea
          fontSize="0.9em"
          rows={4}
          id={name}
          value={value}
          onChange={(e) => onValue(e.target.value)}
        />
      </Center>
    </>
  );
}
