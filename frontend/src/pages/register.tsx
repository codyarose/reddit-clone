import React, { FC } from "react"
import { Form, Formik } from "formik"

import Wrapper from "../components/Wrapper"
import InputField from "../components/InputField"
import { Box, Button } from "@chakra-ui/react"
import { useMutation } from "urql"

interface RegisterProps {}

const REGISTER_MUTATION = `
		mutation Register($username: String!, $password: String!) {
			register(options: { username: $username, password: $password }) {
				errors {
				field
				message
				}
				user {
				id
				username
				}
			}
		}
	`

const Register: FC<RegisterProps> = () => {
	const [, register] = useMutation(REGISTER_MUTATION)

	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={(values) => register(values)}
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
