import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

// Define the schema
type FormSchema = z.infer<ReturnType<typeof authFormSchema>>;


interface CustomInputProps {
  control: Control<FormSchema>;
  name: FieldPath<FormSchema>;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="form-item">
          {/* Label */}
          <FormLabel htmlFor={`form-${name}`} className="form-label">
            {label}
          </FormLabel>

          <div className="flex w-full flex-col">
            {/* <Input 
              placeholder={placeholder}
              className="input-class"
              type={name === 'password' ? 'password' : 'text'}
              {...field}
            /> */}
            <FormControl>
              <Input
                id={`form-${name}`} // Ensure unique id
                placeholder={placeholder}
                className="input-class"
                type={name === "password" ? "password" : "text"}
                aria-invalid={fieldState.invalid} // Accessibility
                {...field}
              />
            </FormControl>

            {/* Error Message */}
            <FormMessage className="form-message mt-2">
              {fieldState.error?.message}
            </FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
