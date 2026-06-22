import { Text } from "@/components/base/Text";
import React from "react";

type LabelProps = {
    id?:string
    required?: boolean
    children: React.ReactNode
}

export function Label({id, children, required=false} : LabelProps) {
  return (
    <Text
      as="label"
      htmlFor={id}
      className="flex gap-1 font-extrabold! text-sm md:text-base"
    >
      <span>{children}</span>
      {required && <span className="text-red-400">*</span>}
    </Text>
  )
}
