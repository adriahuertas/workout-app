import { Form } from '@remix-run/react'

export default function LoginPage() {
  return (
    <Form method="post">
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        required
        name="email"
        type="email"
        autoComplete="email"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
      />

      <button type="submit">Log in</button>
    </Form>
  )
}
