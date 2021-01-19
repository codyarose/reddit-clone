import React, { FC } from "react"
import { Box } from "@chakra-ui/react"

interface Props {
	variant?: "small" | "default"
}

const maxWidth = {
	default: "800px",
	small: "400px",
}

const Wrapper: FC<Props> = ({ children, variant = "default" }) => {
	return (
		<Box maxW={maxWidth[variant]} w='100%' mt={8} mx='auto'>
			{children}
		</Box>
	)
}

export default Wrapper
