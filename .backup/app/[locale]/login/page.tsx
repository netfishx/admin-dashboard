import bg from "@/assets/images/bg.png";
import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full h-screen overflow-hidden bg-neutral-50 flex flex-col gap-4 items-center justify-center">
      <Image src={bg} alt="Bg" className="object-cover" fill />
      <div className="w-[400px] flex items-center justify-center gap-2">
        <Image src={logo} alt="Icon" className="size-6" />
        <span className="text-xl font-medium">代理后台</span>
      </div>
      <div className="w-[400px] bg-white p-10 border rounded-lg flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium flex gap-1">
            账号
            <span className="text-red-500">*</span>
          </Label>
          <Input placeholder="请输入您的账号" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium flex gap-1">
            密码<span className="text-red-500">*</span>
          </Label>
          <Input placeholder="请输入您的密码" />
        </div>
        <Button>登录</Button>
      </div>
    </div>
  );
}
