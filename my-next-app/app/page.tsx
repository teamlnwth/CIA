'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const [score, setScore] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isAnimated, setIsAnimated] = useState(false); // สำหรับจัดการแอนิเมชัน

  const handleClick = () => {
    setIsClicked(!isClicked);
    setScore(score + 1);
    if (audio) {
      audio.play();
    }
    setIsAnimated(true);
    setTimeout(() => setIsAnimated(false), 300); // รีเซ็ตแอนิเมชันหลังจาก 300 มิลลิวินาที
  };

  useEffect(() => {
    const newAudio = new Audio("/song.mp3");
    newAudio.loop = true;
    setAudio(newAudio);
  }, []);

  return (
    <div className="relative min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <video
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
        autoPlay loop muted
      >
        <source src="/2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">ร๊าก อ้วน ที่สุด</h1>
      <div className="mt-4 text-xl sm:text-2xl font-bold text-center">
        <p>วันนี้คิดถึงไป: {score} ครั้ง</p>
      </div>

      <div
        onClick={handleClick}
        className={`cursor-pointer text-center mt-8 transition-transform duration-300 ${isAnimated ? "scale-110" : "scale-100"}`}
      >
        <Image
          src={isClicked ? "/1.jpg" : "/3.jpg"}
          alt="Popcat"
          width={500}
          height={500}
          className="rounded-lg mx-auto"
        />
      </div>

      {/* เพิ่มการเปลี่ยนสีของข้อความเมื่อคลิก */}
      <div className="text-center mt-4">
        <p className={`text-xl sm:text-2xl font-bold ${score >= 10 ? 'text-red-500' : 'text-black'}`}>
          {score >= 15 ? 'คิดถึงมากเลยอ่ะะะดิ่' : 'คิดถึงเค้าแค่นี้เองหรอออ'}
        </p>
      </div>

      {!audio && <p className="text-center text-red-500 mt-4">ไม่สามารถเล่นเสียงได้</p>}

      {audio && (
        <audio autoPlay loop>
          <source src="/song.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
