import * as React from 'react';
import {useState} from 'react';
import {Stack} from '@fluentui/react/lib/Stack'
import { Checkbox } from '@fluentui/react';


export interface AvailableOption {
    label: string;
    value: number;
}

export interface MultiCheckBoxProps {
    availableOptions:AvailableOption[],
    selectedOptions: number[],
    handleChange: (selectedOptions:number[])=>void
}

const stackTokens = {childrenGap: 10};

export const MultiCheckBox =  ({availableOptions, selectedOptions, handleChange}:MultiCheckBoxProps) => {


    const [selectedItems, setSelectedItems] = useState(selectedOptions);
    const onHandleChange = (e?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?:boolean, value?:number):void => {   
        let newSelectedItems = selectedItems
        if (value){
            if(checked){
                newSelectedItems.push(value)
            } else {
                newSelectedItems.splice(newSelectedItems.indexOf(value),1)
            }
        }
        setSelectedItems(newSelectedItems);
        handleChange(selectedItems)
    };

    return (
        <Stack tokens={stackTokens}>
            { availableOptions.map(option => (
                
                <Checkbox 
                    key={option.value}
                    label={option.label}
                    checked={selectedItems.includes(option.value)}
                    onChange={(e, checked) => onHandleChange(e, checked, option.value)}
                    />
            ))
            }
        </Stack>
        
    )
}