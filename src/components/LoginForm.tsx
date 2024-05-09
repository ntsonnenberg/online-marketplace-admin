import Button from "./Button";
import Input from "./Input";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-10 w-1/4">
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <Input id="email" name="email" placeholder="Enter email..." />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password..."
        />
      </div>
      <Button color="red" type="filled" className="font-bold">
        Log In
      </Button>
    </form>
  );
}
