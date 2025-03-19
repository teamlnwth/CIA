'use client'
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const [score, setScore] = useState(0); // สร้างสถานะสำหรับคะแนน

  // ฟังก์ชันเปลี่ยนสถานะเมื่อคลิก
  const handleClick = () => {
    setIsClicked(!isClicked);
    setScore(score + 1); // เพิ่มคะแนนทุกครั้งที่คลิก
  };

  return (
    <div className="relative min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* พื้นหลังจาง ๆ อยู่ที่เลเยอร์ล่างสุด */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 z-[-1]"
        style={{ backgroundImage: 'url("/2.jpg")' }} // พื้นหลังจาง
      ></div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">หลบมาตัดยางหว่าเรา</h1>
      <div className="mt-4 text-xl sm:text-2xl font-bold text-center">
        <p>ตัดยางไปแล้ว: {score} ต้น</p> {/* แสดงคะแนน */}
      </div>
      <div onClick={handleClick} className="cursor-pointer text-center">
        <Image 
          src={isClicked ? "/1.jpg" : "/1.jpg"} // เลือกภาพตามสถานะ
          alt="Popcat"
          width={500}  // กำหนดขนาดภาพ
          height={500}
          className="rounded-lg mx-auto" // เพิ่มขอบมนให้กับภาพ และจัดกึ่งกลาง
        />
      </div>
    </div>
  );
}
