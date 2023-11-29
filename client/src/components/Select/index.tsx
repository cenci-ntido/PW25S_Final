import { FormControl, FormLabel, Select as SelectChakra } from "@chakra-ui/react";

interface SelectProps {
    id: string;
    label: string;
    list: { element: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    name: string;
}

export function Select({ id, label, list, onChange, value, name }: SelectProps) {
    return (
        <FormControl>
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <SelectChakra id={id} value={value} onChange={onChange} name={name}>
                {list.map(({ element }) => (
                    <option key={element} value={element}>
                        {element}
                    </option>
                ))}
            </SelectChakra>
        </FormControl>
    );
}
