import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { signIn, signUpWithEmailAndPassword } from '~/utils/db.server'
import { createUserSession, getUserSession } from '~/utils/sessions.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const actionType = formData.get('actionType')

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Email or password is not a string')
  }

  if (actionType === 'signup') {
    const { user } = await signUpWithEmailAndPassword(email, password)
    const token = await user.getIdToken()
    return createUserSession(token, '/history')
  } else if (actionType === 'login') {
    const { user } = await signIn(email, password)
    const token = await user.getIdToken()
    return createUserSession(token, '/history')
  }

  throw new Error('Invalid action')
}

export const loader = async (request: Request) => {
  const userSession = await getUserSession(request)
  if (userSession) {
    return redirect('/exercises')
  }
  return null
}

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Form method="post" className="p-8 bg-white dark:bg-gray-800 rounded-md shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-dark dark:text-primary-light">Log in</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
          <input
            id="email"
            required
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full dark:text-gray-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full dark:text-gray-300"
          />
        </div>
        <div className="flex justify-between gap-5">
          <button
            type="submit"
            name="actionType"
            value="login"
            className="w-48 py-2 bg-button-bg-light text-button-text-light rounded-md shadow-md font-semibold hover:bg-button-bg-hover-light dark:bg-button-bg-dark dark:text-button-text-dark dark:hover:bg-button-bg-hover-dark transition-colors duration-300"
          >
            Log in
          </button>
          <button
            type="submit"
            name="actionType"
            value="signup"
            className="w-48 py-2 bg-button-bg-light text-button-text-light rounded-md shadow-md font-semibold hover:bg-button-bg-hover-light dark:bg-button-bg-dark dark:text-button-text-dark dark:hover:bg-button-bg-hover-dark transition-colors duration-300"
          >
            Sign up
          </button>
        </div>
      </Form>
    </div>
  )
}
