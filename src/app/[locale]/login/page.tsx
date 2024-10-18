import { loginAction } from "@/actions";
import bg from "@/assets/images/bg.png";
import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <Form action={loginAction}>
      <div className="w-full h-screen overflow-hidden bg-accent flex flex-col gap-4 items-center justify-center">
        <Image src={bg} alt="background image" className="object-cover" fill />
        <div className="w-[400px] flex items-center justify-center gap-4">
          <Image src={logo} alt="Icon" className="size-8" />
          <span className="text-xl font-medium">代理后台</span>
        </div>
        <div className="w-[400px] bg-background p-10 border rounded-lg flex flex-col gap-10 z-10">
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium flex gap-1">
              账号
              <span className="text-red-500">*</span>
            </Label>
            <Input placeholder="请输入您的账号" name="username" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium flex gap-1">
              密码<span className="text-red-500">*</span>
            </Label>
            <Input placeholder="请输入您的密码" name="password" />
          </div>
          <Button>登录</Button>
        </div>
      </div>
    </Form>
  );
}
