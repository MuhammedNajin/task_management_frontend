import React, { useState } from 'react';
import { z } from 'zod';
import { Heading } from '../atoms/Headings';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { PasswordField } from '../molecules/PasswordField';
import { Icon } from '../atoms/Icon';
import { useAppDispatch } from '../hooks/redux';
import { loginUser } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';


export const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, { message: 'Username or email is required' })
    .max(255, { message: 'Username or email cannot exceed 255 characters' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(128, { message: 'Password cannot exceed 128 characters' }),
});


type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    usernameOrEmail: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  type LoginField = "usernameOrEmail" | "password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
  
    const isLoginField = (id: string): id is LoginField => {
      return id === "usernameOrEmail" || id === "password";
    };
  
    if (isLoginField(id)) {
      setFormData((prev) => ({ ...prev, [id]: value }));
  

      const fieldSchema =
        id === "usernameOrEmail"
          ? loginSchema.pick({ usernameOrEmail: true })
          : loginSchema.pick({ password: true });
  
      const result = fieldSchema.safeParse({ [id]: value });
  
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [id]: result.error.errors[0].message,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [id]: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitted(false);
      setApiError(null);
    } else {
      setErrors({});
      setApiError(null);

      try {
        await dispatch(loginUser(result.data)).unwrap();
        navigate('/home');
        setSubmitted(true);
      } catch (error: any) {
        console.log('API Error:', error);
        const errorMessage = error || 'Something went wrong. Please try again.';
        setApiError(errorMessage);
        setSubmitted(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-1.5 md:w-2/5 p-6">
      <Heading level={1} className="text-2xl font-bold flex items-center mb-2">
        <span className="text-blue-600 mr-2">+</span> Sign In
      </Heading>
      <Text className="text-gray-600 mb-6">Free forever. No credit card needed.</Text>

      <FormField label="Username or Email" htmlFor="usernameOrEmail">
        <Input
          id="usernameOrEmail"
          type="text"
          placeholder="Username or Email"
          value={formData.usernameOrEmail}
          onChange={handleChange}
        />
        {errors.usernameOrEmail && (
          <Text className="text-red-500 text-sm mt-1">{errors.usernameOrEmail}</Text>
        )}
      </FormField>

      <PasswordField
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>}

      {apiError && (
        <Text className="text-red-500 text-sm mt-4 text-center">{apiError}</Text>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors flex justify-between items-center mt-6"
      >
        <span></span>
        <span>Continue</span>
        <Icon>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </Icon>
      </Button>

      {submitted && !apiError && (
        <Text className="mt-4 text-green-500 text-center">Logged in successfully!</Text>
      )}

      <Text className="mt-6 text-center">
        <span className="text-gray-600">Don’t have an account? </span>
        <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
      </Text>
    </form>
  );
};