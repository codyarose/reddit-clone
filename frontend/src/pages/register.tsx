import React, { FC } from "react"
import { Form, Formik } from "formik"

import Wrapper from "../components/Wrapper"
import InputField from "../components/InputField"
import { Box, Button } from "@chakra-ui/react"

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={(values) => console.log(values)}
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
