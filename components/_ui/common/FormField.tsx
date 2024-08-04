import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FieldInfo {
  name: string;
  type: number;
  isRequired: boolean;
  keyName: string;
  fieldType?: string;
}

export const FormField: React.FC<{
  field: FieldInfo;
  value: string;
  onChange: (key: string, value: string) => void;
}> = ({ field, value, onChange }) => (
  <div className="form-field">
    <label htmlFor={field.keyName} className="capitalize block mb-2">
      {field.name}
    </label>
    {field.type === 2 ? (
      <Textarea
        id={field.keyName}
        placeholder={field.name}
        required={field.isRequired}
        value={value}
        onChange={(e) => onChange(field.keyName, e.target.value)}
        className="textarea-class" // Add any additional styling class here
      />
    ) : (
      <Input
        id={field.keyName}
        type={field.fieldType ?? "text"}
        placeholder={field.name}
        required={field.isRequired}
        value={value}
        onChange={(e) => onChange(field.keyName, e.target.value)}
        className="input-class" // Add any additional styling class here
      />
    )}
  </div>
);
