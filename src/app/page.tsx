"use client"

import { useState, useEffect, useRef } from "react"
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

      try {
        writerRef.current = window.HanziWriter.create(containerRef.current, result.char, {
          width: 280,
          height: 280,
          padding: 20,
          showOutline: true,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 200,
          strokeColor: "#333333",
          outlineColor: "#DDDDDD",
          drawingColor: "#333333",
          radicalColor: "#333333",
          showCharacter: true,
          showHintAfterMisses: false,
          highlightOnComplete: true,
          highlightCompleteColor: "#4CAF50",
        })

        // 自动播放动画
        setTimeout(() => {
          playAnimation()
        }, 500)
      } catch (err) {
        console.error("Error creating HanziWriter:", err)
      }
    }

    initWriter()
  }, [result?.char])

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
      utterance.rate = 0.8
      utterance.pitch = 1

      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      window.speechSynthesis.speak(utterance)
    } else {
      alert("当前浏览器不支持语音播放")
    }
  }

  const handleSearch = () => {
    setError("")
    setResult(null)

    const char = inputChar.trim()

    if (!char) {
      setError("请输入一个汉字")
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
      setError("无法获取该汉字的信息，请检查输入是否正确")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setResult(detail)
      setIsLoading(false)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isComposing) {
      handleSearch()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // 输入法输入期间，不做任何限制，让用户正常输入
    if (isComposing) {
      setInputChar(value)
      return
    }
    // 非输入法期间，只保留第一个字符
    if (value.length > 1) {
      setInputChar(value.charAt(0))
    } else {
      setInputChar(value)
    }
  }

  // 处理输入法 composition 事件
  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false)
    const value = e.currentTarget.value
    // 输入完成后只保留第一个字符
    if (value.length > 1) {
      setInputChar(value.charAt(0))
    }
  }

  const handleClear = () => {
    setInputChar("")
    setResult(null)
    setError("")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部标题 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            汉字预习
          </h1>
          <p className="text-center text-gray-400 text-sm mt-1">看笔顺 · 听读音 · 学组词</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        {/* 输入区域 */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputChar}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder="请输入一个汉字"
              className="flex-1 px-5 py-4 text-2xl text-center border-2 border-gray-100 rounded-2xl focus:border-blue-400 focus:outline-none transition-all bg-gray-50"
              maxLength={1}
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  查询中
                </span>
              ) : (
                "开始预习"
              )}
            </button>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-2xl text-center text-sm flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* 结果展示区域 */}
        {result && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 笔顺动画区 */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8">
              <div className="flex justify-center mb-6">
                <div
                  ref={containerRef}
                  className="w-[260px] h-[260px] flex items-center justify-center bg-white rounded-3xl shadow-inner"
                />
              </div>

              {/* 动画控制按钮 */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={replayAnimation}
                  disabled={isPlaying}
                  className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  重播笔顺
                </button>
                <button
                  onClick={pauseAnimation}
                  className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  {isPaused ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      继续
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      暂停
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 拼音和发音区 */}
            <div className="px-8 py-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-6">
                <span className="text-5xl font-bold text-gray-800">{result.pinyin}</span>
                <button
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
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
              <p className="text-center text-gray-400 text-xs mt-3">点击喇叭听读音</p>
            </div>

            {/* 词组区 */}
            <div className="px-8 py-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                常见词组
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {result.words.map((word, index) => (
                  <div
                    key={index}
                    className="px-5 py-3.5 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl text-center text-gray-700 font-medium hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all cursor-default border border-gray-100"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            {/* 再次查询按钮 */}
            <div className="px-8 py-6 border-t border-gray-100">
              <button
                onClick={handleClear}
                className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-medium hover:bg-gray-100 hover:text-gray-700 transition-all border border-gray-200"
              >
                查下一个字
              </button>
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!result && !error && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-bounce">📖</div>
            <p className="text-gray-400 text-lg">输入汉字开始预习</p>
          </div>
        )}
      </main>
    </div>
  )
}
