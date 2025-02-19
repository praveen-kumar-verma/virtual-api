"use client";

import { faker } from "@faker-js/faker";
import { useState } from "react";

// Define categories to exclude
const EXCLUDED_CATEGORIES = new Set(["helpers", "_randomizer"]);

// Fetch available Faker.js methods
const getFakerMethods = (): { name: string; method: string }[] => {
    return Object.keys(faker)
        .filter((category) => !EXCLUDED_CATEGORIES.has(category)) // Exclude unwanted categories
        .flatMap((category) => {
            const categoryMethods = faker[category as keyof typeof faker];

            if (typeof categoryMethods === "object" && categoryMethods !== null) {
                return Object.keys(categoryMethods)
                    .filter((method) => typeof (categoryMethods as Record<string, unknown>)[method] === "function")
                    .map((method) => ({
                        name: `${category}.${method}`,
                        method: method,
                    }));
            }
            return [];
        });
};

// Precompute faker methods list
const fakerMethodsList: { name: string; method: string }[] = getFakerMethods();

interface Field {
    property: string;
    fakerMethod: string;
    isObject: boolean;
    subFields?: Field[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AddResource() {
    // const [resourceData, setResourceData] = React.useState('');
    const [numRecords, setNumRecords] = useState(1);
    const [fields, setFields] = useState<Field[]>([
        { property: "name", fakerMethod: "name.fullName", isObject: false },
    ]);
    const [generatedJson, setGeneratedJson] = useState<string>("");
    const [previewData, setPreviewData] = useState<string>("");


    // Add a new row
    const addRow = (parentIndex: number | null = null) => {
        const newField: Field = { property: "", fakerMethod: fakerMethodsList[0].name, isObject: false };

        if (parentIndex === null) {
            setFields([...fields, newField]);
        } else {
            const updatedFields = [...fields];
            if (!updatedFields[parentIndex].subFields) updatedFields[parentIndex].subFields = [];
            updatedFields[parentIndex].subFields!.push(newField);
            setFields(updatedFields);
        }
    };

    // Handle property name change
    const handlePropertyChange = (index: number, value: string, parentIndex: number | null = null) => {
        const updatedFields = [...fields];
        if (parentIndex === null) {
            updatedFields[index].property = value;
        } else {
            updatedFields[parentIndex].subFields![index].property = value;
        }
        setFields(updatedFields);
    };

    // Handle faker method change
    const handleFakerMethodChange = (index: number, method: string, parentIndex: number | null = null) => {
        const updatedFields = [...fields];
        if (parentIndex === null) {
            updatedFields[index].fakerMethod = method;
        } else {
            updatedFields[parentIndex].subFields![index].fakerMethod = method;
        }
        setFields(updatedFields);
    };

    // Handle toggle between normal field and object field
    const handleToggleObject = (index: number) => {
        const updatedFields = [...fields];
        updatedFields[index].isObject = !updatedFields[index].isObject;

        if (!updatedFields[index].isObject) {
            updatedFields[index].subFields = undefined; // Reset sub-fields if toggled off
        }

        setFields(updatedFields);
    };

    // Recursive JSON generation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const generateJsonData = (fields: Field[]): Record<string, any> => {
        return fields.reduce((acc, field) => {
            if (field.isObject) {
                acc[field.property] = field.subFields ? generateJsonData(field.subFields) : {};
            } else {
                const [category, method] = field.fakerMethod.split(".");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const categoryMethods = faker[category as keyof typeof faker] as Record<string, any>;

                if (categoryMethods && typeof categoryMethods[method] === "function") {
                    acc[field.property] = categoryMethods[method]();
                }
            }
            return acc;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as Record<string, any>);
    };

    // Generate JSON
    const generateJson = () => {
        const generatedData = Array.from({ length: numRecords }, () => generateJsonData(fields));
        setGeneratedJson(JSON.stringify(generatedData, null, 2));
    };
    const generatePreview = (fields: Field[]) => {
        const buildPreview = (fieldsArray: Field[]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return fieldsArray.reduce<Record<string, any>>((acc, field) => {
                if (field.isObject && field.subFields) {
                    acc[field.property] = buildPreview(field.subFields);
                } else {
                    acc[field.property] = field.fakerMethod;
                }
                return acc;
            }, {});
        };

        return buildPreview(fields);
    };

    const generatePreviewData = () => {
        console.log(generatePreview(fields))
        setPreviewData(JSON.stringify(generatePreview(fields), null, 2));
    };

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-center">Schema Generator</h1>

            <div className="flex" >
                <div className="flex flex-col flex-1 flex-grow items-center">
                    <div className="mb-4">
                        <label className="font-medium mr-2 ">Number of Records:</label>
                        <input
                            type="number"
                            value={numRecords}
                            onChange={(e) => setNumRecords(Number(e.target.value))}
                            className="border p-2 rounded w-20 bg-[#1D1616]"
                            min={1}
                        />
                    </div>

                    {/* Dynamic Fields Section */}
                    <div className="w-full max-w-2xl bg-[#1D1616] p-4 shadow-md rounded-md">
                        {fields.map((field, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex items-center space-x-2">
                                    {/* Property Name Input */}
                                    <input
                                        type="text"
                                        placeholder="Property Name"
                                        value={field.property}
                                        onChange={(e) => handlePropertyChange(index, e.target.value)}
                                        className="border p-2 w-1/3 rounded bg-[#1D1616]"
                                    />

                                    {/* Faker.js Data Type Dropdown */}
                                    <select
                                        className="border p-2 w-1/3 rounded bg-[#1D1616]"
                                        value={field.fakerMethod}
                                        onChange={(e) => handleFakerMethodChange(index, e.target.value)}
                                        disabled={field.isObject} // Disable if object
                                    >
                                        {fakerMethodsList.map(({ name }) => (
                                            <option key={name} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Checkbox to mark as Object */}
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={field.isObject}
                                            onChange={() => handleToggleObject(index)}
                                            className="mr-2"
                                        />
                                        Object
                                    </label>
                                </div>

                                {/* Subfields for Objects */}
                                {field.isObject && (
                                    <div className="ml-6 mt-2 p-2 rounded">
                                        <p className="font-medium mb-2">Sub-fields:</p>
                                        {field.subFields?.map((subField, subIndex) => (
                                            <div key={subIndex} className="flex items-center space-x-2 mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Sub Property Name"
                                                    value={subField.property}
                                                    onChange={(e) => handlePropertyChange(subIndex, e.target.value, index)}
                                                    className="border p-2 w-1/2 rounded bg-[#1D1616]"
                                                />
                                                <select
                                                    className="border p-2 w-1/2 rounded bg-[#1D1616]"
                                                    value={subField.fakerMethod}
                                                    onChange={(e) => handleFakerMethodChange(subIndex, e.target.value, index)}
                                                >
                                                    {fakerMethodsList.map(({ name }) => (
                                                        <option key={name} value={name}>
                                                            {name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => addRow(index)}
                                            className="w-full bg-blue-400 text-white py-1 rounded"
                                        >
                                            Add Sub-field
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add Row Button */}
                        <button onClick={() => addRow(null)} className="w-full bg-blue-500 text-white py-2 rounded-md mt-2">
                            Add Row
                        </button>
                    </div>

                    {/* Generate JSON Button */}
                    <button onClick={generateJson} className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md">
                        Generate JSON
                    </button>
                    <button onClick={generatePreviewData} className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md">
                        Preview Schema
                    </button>

                </div>

                <div className="flex-1 flex-grow">
                    <h2 className="text-lg font-semibold mb-2 text-center">Preview Schema:</h2>

                    {previewData && (
                        <div className="mt-6 w-full max-w-2xl p-4 shadow-md rounded-md">
                            <pre className="p-3 rounded text-sm overflow-auto">{previewData}</pre>
                        </div>
                    )}

                    {generatedJson && (
                        <div className="mt-6 w-full max-w-2xl p-4 shadow-md rounded-md">
                            <h2 className="text-lg font-semibold mb-2">Generated JSON:</h2>
                            <pre className="p-3 rounded text-sm overflow-auto">{generatedJson}</pre>
                        </div>
                    )}

                </div>
            </div>




        </div>
    );
}
