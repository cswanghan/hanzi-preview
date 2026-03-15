"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { getHanziDetail, isValidChineseChar, type HanziDetail } from "@/data/hanziData"

// Hanzi Writer 类型声明
declare global {
  interface Window {
    HanziWriter: {
      create: (element: string | HTMLElement, character: string, options?: object) => HanziWriterInstance
    }
  }
}

interface HanziWriterInstance {
  animate: () => Promise<void>
  pauseAnimation: () => void
  resumeAnimation: () => void
  showOutline: () => void
  hideOutline: () => void
  animateCharacter: () => Promise<void>
  writeOutline: () => Promise<void>
}

export default function Home() {
  const [inputChar, setInputChar] = useState("")
  const [result, setResult] = useState<HanziDetail | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const writerRef = useRef<HanziWriterInstance | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 获取屏幕宽度来动态设置画布大小
  const getCanvasSize = useCallback(() => {
    if (typeof window === 'undefined') return 240
    const width = window.innerWidth
    // 移动端使用更小的画布
    if (width < 480) return Math.min(width - 80, 240)
    return 280
  }, [])

  // 初始化 HanziWriter
  useEffect(() => {
    const initWriter = async () => {
      if (!result || !containerRef.current) return

      // 清除之前的实例
      containerRef.current.innerHTML = ""

      // 延迟创建新实例
      await new Promise(resolve => setTimeout(resolve, 100))

      if (!window.HanziWriter) {
        console.error("HanziWriter not loaded")
        return
      }

      const canvasSize = getCanvasSize()

      try {
        writerRef.current = window.HanziWriter.create(containerRef.current, result.char, {
          width: canvasSize,
          height: canvasSize,
          padding: 15,
          showOutline: true,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 250,
          strokeColor: "#1f2937",
          outlineColor: "#e5e7eb",
          drawingColor: "#1f2937",
          radicalColor: "#1f2937",
          showCharacter: true,
          showHintAfterMisses: false,
          highlightOnComplete: true,
          highlightCompleteColor: "#22c55e",
        })

        // 自动播放动画
        setTimeout(() => {
          playAnimation()
        }, 600)
      } catch (err) {
        console.error("Error creating HanziWriter:", err)
      }
    }

    initWriter()
  }, [result?.char, getCanvasSize])

  const playAnimation = async () => {
    if (!writerRef.current) return
    setIsPlaying(true)
    setIsPaused(false)
    try {
      await writerRef.current.animateCharacter()
    } catch (err) {
      console.error("Animation error:", err)
    }
    setIsPlaying(false)
  }

  const pauseAnimation = () => {
    if (!writerRef.current) return
    if (isPaused) {
      writerRef.current.resumeAnimation()
      setIsPaused(false)
    } else {
      writerRef.current.pauseAnimation()
      setIsPaused(true)
    }
  }

  const replayAnimation = () => {
    playAnimation()
  }

  // 文字转语音
  const playAudio = () => {
    if (!result) return

    if ("speechSynthesis" in window) {
      // 停止当前播放
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(result.audioText)
      utterance.lang = "zh-CN"
      utterance.rate = 0.85
      utterance.pitch = 1

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      window.speechSynthesis.speak(utterance)
    } else {
      // 兼容不支持 SpeechSynthesis 的浏览器
      alert("当前浏览器不支持语音播放")
    }
  }

  const handleSearch = () => {
    setError("")
    setResult(null)

    const char = inputChar.trim()

    if (!char) {
      setError("请输入一个汉字")
      // 聚焦输入框
      inputRef.current?.focus()
      return
    }

    if (char.length > 1) {
      setError("当前仅支持单个汉字查询")
      return
    }

    if (!isValidChineseChar(char)) {
      setError("请输入正确的汉字")
      return
    }

    const detail = getHanziDetail(char)
    if (!detail) {
      setError("暂未收录该汉字，请换一个试试")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setResult(detail)
      setIsLoading(false)
      // 隐藏键盘
      inputRef.current?.blur()
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isComposing) {
      handleSearch()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (isComposing) {
      setInputChar(value)
      return
    }
    if (value.length > 1) {
      setInputChar(value.charAt(0))
    } else {
      setInputChar(value)
    }
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false)
    const value = e.currentTarget.value
    if (value.length > 1) {
      setInputChar(value.charAt(0))
    }
  }

  const handleClear = () => {
    setInputChar("")
    setResult(null)
    setError("")
    // 聚焦输入框
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      {/* 顶部标题 - 固定在顶部 */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 safe-area-top">
        <div className="max-w-lg mx-auto px-5 py-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            汉字预习
          </h1>
          <p className="text-center text-gray-400 text-xs mt-0.5">看笔顺 · 听读音 · 学组词</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 pb-12">
        {/* 输入区域 */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-5 border border-gray-100">
          <div className="flex gap-2 items-stretch">
            <input
              ref={inputRef}
              type="text"
              inputMode="text"
              enterKeyHint="search"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={inputChar}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder="输入汉字"
              className="flex-1 px-3 py-3 text-2xl text-center border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-all bg-gray-50 font-medium"
              style={{ fontSize: '24px', height: '48px', minWidth: '0' }}
              maxLength={1}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-4 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 disabled:bg-gray-300 transition-all active:scale-95 whitespace-nowrap flex-shrink-0"
              style={{ height: '48px', fontSize: '15px' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </span>
              ) : (
                "开始预习"
              )}
            </button>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-xl text-center text-sm">
              {error}
            </div>
          )}
        </div>

        {/* 结果展示区域 */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* 笔顺动画区 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5">
              <div className="flex justify-center mb-4">
                <div
                  ref={containerRef}
                  className="w-full max-w-[260px] aspect-square flex items-center justify-center bg-white rounded-2xl shadow-inner"
                />
              </div>

              {/* 动画控制按钮 */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={replayAnimation}
                  disabled={isPlaying}
                  className="px-5 py-3 bg-blue-50 text-blue-600 rounded-xl text-base font-medium hover:bg-blue-100 transition-colors flex items-center gap-2 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  重播
                </button>
                <button
                  onClick={pauseAnimation}
                  className="px-5 py-3 bg-gray-100 text-gray-600 rounded-xl text-base font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 active:scale-95"
                >
                  {isPaused ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      继续
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      暂停
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 拼音和发音区 */}
            <div className="px-5 py-5 border-t border-gray-100">
              <div className="flex items-center justify-center gap-5">
                <span className="text-4xl font-bold text-gray-800">{result.pinyin}</span>
                <button
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="p-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/30"
                >
                  {isPlaying ? (
                    <svg className="w-7 h-7 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-center text-gray-400 text-xs mt-2">点击播放读音</p>
            </div>

            {/* 词组区 */}
            <div className="px-5 py-5 border-t border-gray-100">
              <h3 className="text-base font-semibold text-gray-700 mb-3">常见词组</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {result.words.map((word, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-slate-50 rounded-xl text-center text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default text-base"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            {/* 再次查询按钮 */}
            <div className="px-5 py-5 border-t border-gray-100">
              <button
                onClick={handleClear}
                className="w-full py-4 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-colors active:scale-95 text-base"
              >
                查下一个字
              </button>
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!result && !error && (
          <div className="text-center py-16">
            <div className="text-7xl mb-4">📖</div>
            <p className="text-gray-400">输入汉字开始预习</p>
          </div>
        )}
      </main>

      {/* 底部安全区域 */}
      <div className="h-safe-bottom" />
    </div>
  )
}
