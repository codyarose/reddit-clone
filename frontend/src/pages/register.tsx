import React, { FC } from "react"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"

import Wrapper from "../components/Wrapper"
import InputField from "../components/InputField"
import { Box, Button } from "@chakra-ui/react"
import { useRegisterMutation } from "../generated/graphql"
import { toErrorMap } from "../utils/toErrorMap"

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
	const router = useRouter()
	const [, register] = useRegisterMutation()

	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values)
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors))
					} else if (response.data?.register.user) {
						router.push("/")
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Box mb={4}>
							<InputField
								name='username'
								placeholder='username'
								label='Username'
							/>
						</Box>
						<Box mb={4}>
							<InputField
								name='password'
								placeholder='password'
								label='Password'
								type='password'
							/>
						</Box>
						<Button
							type='submit'
							isLoading={isSubmitting}
							colorScheme='green'
						>
							register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	)
}

export default Register
