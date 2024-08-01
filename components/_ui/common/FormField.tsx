import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FieldInfo {
    name: string;
    type: number;
    isRequired: boolean;
    keyName: string;
  }

export const FormField: React.FC<{
    field: FieldInfo;
    value: string;
    onChange: (key: string, value: string) => void;
  }> = ({ field, value, onChange }) => (
    <div>
      <label className="capitalize">{field.name}</label>
      {field.type === 2 ? (
        <Textarea
          placeholder={field.name}
          required={field.isRequired}
          value={value}
          onChange={(e) => onChange(field.keyName, e.target.value)}
        />
      ) : (
        <Input
          placeholder={field.name}
          required={field.isRequired}
          value={value}
          onChange={(e) => onChange(field.keyName, e.target.value)}
        />
      )}
    </div>
  );