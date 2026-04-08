import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Store user in localStorage (mock)
      localStorage.setItem('syncstudy_user', JSON.stringify({ name: formData.name, email: formData.email }));
      navigate('/home');
    } else {
      setErrors(newErrors);
    }
  };

  const handleGoogleSignUp = () => {
    // Mock Google Sign Up
    localStorage.setItem('syncstudy_user', JSON.stringify({ name: 'Google User', email: 'user@gmail.com' }));
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center
