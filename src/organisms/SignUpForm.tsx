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
import { registerUser } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(30, { message: 'Username cannot exceed 30 characters' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address' })
    .max(255, { message: 'Email cannot exceed 255 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(128, { message: 'Password cannot exceed 128 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    type SignupField = keyof SignupFormData;
  
    const isSignupField = (id: string): id is SignupField => {
      return id === "username" || id === "email" || id === "password";
    };
  
    if (isSignupField(id)) {
      setFormData((prev) => ({ ...prev, [id]: value }));
  
      const fieldSchema = signupSchema.pick({ [id]: true } as { [K in SignupField]?: true });
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
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignupFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitted(false);
      setApiError(null);
    } else {
      setErrors({});
      setApiError(null);

      try {
        const response = await dispatch(registerUser(result.data)).unwrap();
        console.log('Registration successful:', response);
        setSubmitted(true);
        navigate('/signin');
      } catch (error: any) {
        console.log('API Error:', error);

        const errorMessage =
          error  || 'Something went wrong. Please try again.';
        setApiError(errorMessage);
        setSubmitted(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-1.5 md:w-2/5 p-6">
      <Heading level={1} className="text-2xl font-bold flex items-center mb-2">
        <span className="text-blue-600 mr-2">+</span> Sign Up
      </Heading>
      <Text className="text-gray-600 mb-6">Free forever. No credit card needed.</Text>

      <FormField label="Your Name" htmlFor="username">
        <Input
          id="username"
          type="text"
          placeholder="Your Name"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <Text className="text-red-500 text-sm mt-1">{errors.username}</Text>}
      </FormField>

      <FormField label="Your E-mail" htmlFor="email">
        <Input
          id="email"
          type="email"
          placeholder="Your E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>}
      </FormField>

      <PasswordField id="password" value={formData.password} onChange={handleChange} />
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
        <Text className="mt-4 text-green-500 text-center">Registered successfully!</Text>
      )}

      <Text className="mt-6 text-center">
        <span className="text-gray-600">Have an account? </span>
        <a href="/signin" className="text-blue-600 hover:underline">Log in</a>
      </Text>
    </form>
  );
};