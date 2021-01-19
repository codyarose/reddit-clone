import React, { FC, InputHTMLAttributes } from "react"
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from "@chakra-ui/react"
import { useField } from "formik"

type Props = InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label: string
}

const InputField: FC<Props> = ({ label, size: _, ...props }) => {
	const [field, { error }] = useField(props)
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<Input
				{...props}
				{...field}
				id={field.name}
				placeholder={props.placeholder}
			/>
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	)
}

export default InputField
