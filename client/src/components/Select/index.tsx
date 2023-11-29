import { FormControl, FormLabel, Select as SelectChakra } from "@chakra-ui/react";

interface SelectProps {
    id: string;
    label: string;
    list: { element: string }[]; // Corrigindo o tipo de list
}

export function Select({ id, label, list }: SelectProps) {
    return (
        <FormControl>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <SelectChakra id={id}>
                {list.map(({ element }) => (
                    <option key={element} value={element}>
                        {element}
                    </option>
                ))}
            </SelectChakra>
        </FormControl>
    );
}
