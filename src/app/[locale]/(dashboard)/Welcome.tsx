import React from 'react'
import {
  Card,
} from "@/components/ui/card"

import Image from "next/image";

import welcome01 from "@/assets/images/welcome/welcome01.svg";
import welcome02 from "@/assets/images/welcome/welcome02.svg";
import welcome03 from "@/assets/images/welcome/welcome03.svg";
import welcome04 from "@/assets/images/welcome/welcome04.svg";


export default function Welcome(props: any) {
  const { user } = props;
  const icons = [welcome01, welcome02, welcome03, welcome04];
  return (
    <div className='w-[910px]'>
      <Card className="w-full h-[548px] p-5">
        <div  className='pb-5 text-xl border-b'>
          👏欢迎回来，{user.name}
        </div>
        <div  className='w-full py-5 border-b flex items-center'>
          <Item name="游戏总盈亏" value={user.data.value1} icon={welcome01} />
          <Item name="游戏总盈亏" value={user.data.value1} icon={welcome01} />
          <Item name="游戏总盈亏" value={user.data.value1} icon={welcome01} />
          <Item name="游戏总盈亏" value={user.data.value1} icon={welcome01} />
        </div>
      </Card>
    </div>
  )
}

const Item = (props: any) => {
  const {name, value, icon} = props;
  return (
    <div className='w-[208px] h-[60px] flex items-center'>
      <Image src={icon} alt="Icon" className="size-14" />
      <div className='pl-3'>
        <div className='text-xs pb-2'>
          {name}
        </div>
        <div className='text-xl font-bold underline'>
          {value}
        </div>
      </div>
    </div>
  )
}