import { useState, useContext } from 'react';
import { User } from '../util/validation';
import { useNavigate } from 'react-router-dom';
import Chance from 'chance';

const chance = new Chance();

export function Registration() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleRegister() {
    try {
      const id = chance.guid();
      const createdAt = new Date().toLocaleString();
      const userInput = {
        id,
        email,
        password: password1, 
        confirmPassword: password2, 
        createdAt,
      };

      User.parse(userInput);
      setErrors({});
      const user = {
        id,
        email,
        password: password1, 
        createdAt,
      };

      saveUserToDatabase(user);
    } catch (err) {
      console.error(err);
      const fieldErrors = {};

      if (err.message.includes('Неправильно введённый email')) {
        fieldErrors.email = 'Неправильно введённый email';
      }

      if (err.message.includes('Длина пароля должна быть не больше или равна 8')) {
        fieldErrors.password = 'Длина пароля должна быть не больше или равна 8';
      }

      if (password1 !== password2) {
        fieldErrors.confirmPassword = 'Пароли не совпадают';
      }

      if (err.errors) {
        err.errors.forEach((error) => {
          if (error.path && error.message) {
            const path = error.path.join('.');
            fieldErrors[path] = error.message;
          }
        });
      }

      setErrors(fieldErrors);
      console.log(fieldErrors);
    }
  }

  async function saveUserToDatabase(user) {
    try {
      const response = await fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('Пользователь успешно сохранён');
        navigate('/login');
      } else {
        console.error('Не удалось сохранить пользователя');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      console.log(errors);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mt-3 mb-6">Sign up</h1>
        <div className="mb-4">
          <input
            className="w-80 py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            className="w-80 py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)} 
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <input
            className="w-80 py-2 px-3 text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            placeholder="Repeat password"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)} 
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>

        <button
          type="button"
          onClick={handleRegister}
          className="bg-gray-300 hover:bg-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign up
        </button>
    </div>
  );
}
