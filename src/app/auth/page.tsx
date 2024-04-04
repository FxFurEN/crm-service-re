import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Войти в систему</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Почта</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Войти</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
