'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const [score, setScore] = useState(0); // สร้างสถานะสำหรับคะแนน
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // กำหนดประเภทของ audio เป็น HTMLAudioElement หรือ null

  // ฟังก์ชันเปลี่ยนสถานะเมื่อคลิก
  const handleClick = () => {
    setIsClicked(!isClicked);
    setScore(score + 1); // เพิ่มคะแนนทุกครั้งที่คลิก
    if (audio) {
      audio.play(); // เล่นเสียงเมื่อคลิก
    }
  };

  useEffect(() => {
    const newAudio = new Audio("/song.mp3"); // สร้าง audio object 
    newAudio.loop = true; // ตั้งค่าให้เสียงเล่นซ้ำ
    setAudio(newAudio); // ตั้งค่า audio state เป็น newAudio
  }, []); // จะทำงานครั้งแรกเมื่อ component ถูก render

  return (
    <div className="relative min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* พื้นหลังคลิปวิดีโอ */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1]" 
        autoPlay loop muted
      >
        <source src="/2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">ร๊าก อ้วน ที่สุด</h1>
      <div className="mt-4 text-xl sm:text-2xl font-bold text-center">
        <p>วันนี้บอกแรกไปแล้ว: {score} ครั้ง</p> {/* แสดงคะแนน */}
      </div>
      <div onClick={handleClick} className="cursor-pointer text-center mt-8">
        <Image 
          src={isClicked ? "/1.jpg" : "/3.jpg"} // เลือกภาพตามสถานะ
          alt="Popcat"
          width={500}  // กำหนดขนาดภาพ
          height={500}
          className="rounded-lg mx-auto" // เพิ่มขอบมนให้กับภาพ และจัดกึ่งกลาง
        />
      </div>

      {/* แสดงข้อความถ้าเสียงไม่สามารถเล่นได้ */}
      {!audio && <p className="text-center text-red-500 mt-4">ไม่สามารถเล่นเสียงได้</p>}
      
      {/* ฝัง MP3 ให้เล่นอัตโนมัติ (เมื่อเสียงเล่นได้) */}
      {audio && (
        <audio autoPlay loop>
          <source src="/song.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
