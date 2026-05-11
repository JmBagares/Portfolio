import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blob 1 */}
      <svg
        className="blob-animate absolute -top-32 -right-32 w-[600px] h-[600px] opacity-18 blur-[40px]"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#56B6C6" />
            <stop offset="100%" stopColor="#8ACBD0" />
          </linearGradient>
        </defs>
        <path
          d="M300,520C360,520 420,480 460,430C500,380 530,320 530,260C530,200 510,140 470,100C430,60 380,30 320,20C260,10 200,20 150,50C100,80 60,130 40,190C20,250 20,310 40,370C60,430 100,480 160,500C220,520 260,520 300,520Z"
          fill="url(#grad1)"
        />
      </svg>

      {/* Blob 2 */}
      <svg
        className="blob-animate-delay absolute top-1/3 -left-48 w-[500px] h-[500px] opacity-12 blur-[30px]"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8ACBD0" />
            <stop offset="100%" stopColor="#56B6C6" />
          </linearGradient>
        </defs>
        <path
          d="M250,450C300,450 350,420 390,380C430,340 450,290 450,240C450,190 440,140 410,100C380,60 340,30 290,20C240,10 190,20 150,50C110,80 80,120 60,170C40,220 40,270 50,320C60,370 90,410 140,430C190,450 220,450 250,450Z"
          fill="url(#grad2)"
        />
      </svg>

      {/* Blob 3 */}
      <svg
        className="blob-animate-delay-2 absolute -bottom-20 right-1/4 w-[450px] h-[450px] opacity-15 blur-[35px]"
        viewBox="0 0 450 450"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#56B6C6" />
            <stop offset="100%" stopColor="#8ACBD0" />
          </linearGradient>
        </defs>
        <circle cx="225" cy="225" r="200" fill="url(#grad3)" />
      </svg>

      {/* Floating lines */}
      <motion.svg
        className="absolute top-20 left-1/4 w-64 h-64 opacity-15"
        viewBox="0 0 256 256"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <circle
          cx="128"
          cy="128"
          r="100"
          fill="none"
          stroke="#56B6C6"
          strokeWidth="0.5"
          strokeDasharray="8 12"
        />
        <circle
          cx="128"
          cy="128"
          r="60"
          fill="none"
          stroke="#8ACBD0"
          strokeWidth="0.5"
          strokeDasharray="4 16"
        />
      </motion.svg>
    </div>
  )
}
