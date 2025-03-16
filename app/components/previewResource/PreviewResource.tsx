import React, { useEffect, useState } from 'react';
import { faker } from "@faker-js/faker";


interface Field {
  property: string;
  fakerMethod: string;
  isObject: boolean;
  subFields?: Field[];
}

interface PreviewResourceProps {
  fields: Field[];
}

export default function PreviewResource({ fields }: PreviewResourceProps) {

  const [generatedJson, setGeneratedJson] = useState<string>("");
  const [numRecords, setNumRecords] = useState(1);


  useEffect(() => {
    const generatedData = Array.from({ length: numRecords }, () => generateJsonData(fields));
    setGeneratedJson(JSON.stringify(generatedData, null, 2));

    

  }, [fields, numRecords])


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



  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-4 text-center">Preview Resource</h1>
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
      <div className="mt-6 w-full max-w-2xl p-4 shadow-md rounded-md">
        <pre className="p-3 rounded text-sm overflow-auto">{generatedJson}</pre>

      </div>
    </div>
  );
}