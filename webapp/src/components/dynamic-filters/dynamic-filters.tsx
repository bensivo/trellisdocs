import { useEffect, useState } from 'react';
import './dynamic-filters.less';

// TODO: comments that explain all these fields, and how to use this component

export interface FilterOptions {
    name: string;
    options: string[];
}

export interface FilterState {
    name: string;
    value: string;
}

export interface DynamicFiltersProps {
    filterOptions: FilterOptions[];
    onChange: (fs: FilterState[]) => void;
}


interface Filter {
    name: string;
    value: string;
    options: string[];
}

export function DynamicFilters(props: DynamicFiltersProps) {

    const [filters, setFilters] = useState<Filter[]>([]);

    useEffect(() => {
        props.onChange(filters);
    }, [filters])

    return (
        <div className="dynamic-filters">
            {filters.map((filter, i) => (
                <>
                <label>{filter.name}:</label>
                {/* TODO: different kinds of filter input based on the attribute type (date-range, numbers, multiselect, etc.) */}
                <select key={i} className="filter" value={filter.value} onChange={(e) => {
                    const value = e.target.value;
                    if (value === '- Remove Filter -') {
                        setFilters(filters.filter(f => f.name !== filter.name));
                        return;
                    }
                    const newFilters =filters.map(f => {
                        if (f.name === filter.name) {
                            return {
                                ...filter,
                                value: value,
                            }
                        } else {
                            return f;
                        }
                    }) 
                    setFilters(newFilters);
                }}>
                    <option value=''>- Unassigned -</option>
                    {filter.options.map(o => (
                        <option>{o}</option>
                    ))}
                    <option>- Remove Filter -</option>
                </select>
                </>
            ))}

            {/* Add filter select box */}
            <select key='add-filter' className='filter' value="New Filter" onChange={(e) => {
                e.preventDefault();

                const name = e.target.value;
                const filterOption = props.filterOptions.find(o => o.name === name)
                if (filterOption === undefined) {
                    return;
                }
                const options = filterOption.options;

                setFilters([
                    ...filters,
                    {
                        name: name,
                        options: options,
                        value: '',
                    }
                ]);
            }}>
                <option>New Filter</option>
                {props.filterOptions
                .filter(fo => {
                    const currentFilterNames = filters.map(f => f.name);
                    return !currentFilterNames.includes(fo.name);
                })
                .map(f => (
                    <option>{f.name}</option>
                ))}
            </select>
        </div>
    )
}