import { useState } from 'react';
import './dynamic-filters.less';


export interface FilterOptions {
    name: string;
    options: string[];
}

export interface DynamicFiltersProps {
    filterOptions: FilterOptions[];
}


interface Filter {
    name: string;
    value: string;
    options: string[];
}

export function DynamicFilters(props: DynamicFiltersProps) {

    const [filters, setFilters] = useState<Filter[]>([]);

    return (
        <div className="dynamic-filters">
            {filters.map((filter, i) => (
                <>
                <label>{filter.name}:</label>
                {/* TODO: different kinds of filter input based on the attribute type (date-range, number comparitors, etc.) */}
                <select key={i} className="filter" value={filter.value}>
                    {filter.options.map(o => (
                        <option>{o}</option>
                    ))}
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