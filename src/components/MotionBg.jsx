import React from 'react'
import { motion } from 'framer-motion'
const MotionBg = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
        {/* 1 */}
        <motion.span
          className="absolute top-20 left-20 text-4xl text-blue-400 opacity-40"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          {`</>`}
        </motion.span>

        {/* 2 */}
        <motion.span
          className="absolute top-32 right-32 text-4xl text-blue-400 opacity-40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          {`{}`}
        </motion.span>

        {/* 3 */}
        <motion.span
          className="absolute bottom-20 left-1/4 text-3xl text-blue-400 opacity-40"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {`< />`}
        </motion.span>

        {/* 4 */}
        <motion.span
          className="absolute bottom-32 right-1/4 text-3xl text-blue-400 opacity-40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity }}
        >
          {`const`}
        </motion.span>

        {/* 5 */}
        <motion.span
          className="absolute top-1/2 left-1/3 text-3xl text-blue-400 opacity-30"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          {`function()`}
        </motion.span>

        {/* 6 */}
        <motion.span
          className="absolute top-10 right-1/4 text-3xl text-blue-400 opacity-30"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6.5, repeat: Infinity }}
        >
          {`=>`}
        </motion.span>

        {/* 7 */}
        <motion.span
          className="absolute bottom-10 left-10 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
        >
          {`[]`}
        </motion.span>

        {/* 8 */}
        <motion.span
          className="absolute top-1/3 right-10 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5.2, repeat: Infinity }}
        >
          {`<>`}
        </motion.span>

        {/* 9 */}
        <motion.span
          className="absolute bottom-1/4 left-1/2 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          {`let`}
        </motion.span>

        {/* 10 */}
        <motion.span
          className="absolute top-1/4 left-1/2 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 5.8, repeat: Infinity }}
        >
          {`import`}
        </motion.span>

        {/* 11 */}
        <motion.span
          className="absolute top-16 left-1/2 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 6.2, repeat: Infinity }}
        >
          {`export`}
        </motion.span>

        {/* 12 */}
        <motion.span
          className="absolute bottom-16 right-1/2 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 5.4, repeat: Infinity }}
        >
          {`map()`}
        </motion.span>

        {/* 13 */}
        <motion.span
          className="absolute top-40 left-80 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 4.8, repeat: Infinity }}
        >
          {`props`}
        </motion.span>

        {/* 14 */}
        <motion.span
          className="absolute bottom-40 right-10 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5.6, repeat: Infinity }}
        >
          {`state`}
        </motion.span>

        {/* 15 */}
        <motion.span
          className="absolute top-1/2 right-1/3 text-2xl text-blue-400 opacity-30"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6.3, repeat: Infinity }}
        >
          {`async`}
        </motion.span>
      </div>
  )
}

export default MotionBg
