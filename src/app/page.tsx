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

// localStorage keys
const STORAGE_KEYS = {
  SEARCH_HISTORY: 'hanzi_search_history',
  MISSING_CHARS: 'hanzi_missing_chars',
}

interface SearchHistory {
  char: string
  timestamp: number
  found: boolean
}

export default function Home() {
  const [inputChar, setInputChar] = useState("")
  const [result, setResult] = useState<HanziDetail | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [missingChars, setMissingChars] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const writerRef = useRef<HanziWriterInstance | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // 从 localStorage 加载数据
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      const history = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY)
      const missing = localStorage.getItem(STORAGE_KEYS.MISSING_CHARS)
      
      if (history) {
        setSearchHistory(JSON.parse(history))
      }
      if (missing) {
        setMissingChars(JSON.parse(missing))
      }
    } catch (e) {
      console.error('Failed to load from localStorage', e)
    }
  }, [])

  // 保存搜索历史
  const saveSearchHistory = useCallback((char: string, found: boolean) => {
    const newEntry: SearchHistory = {
      char,
      timestamp: Date.now(),
      found,
    }
    
    const updatedHistory = [newEntry, ...searchHistory.filter(h => h.char !== char)].slice(0, 50)
    setSearchHistory(updatedHistory)
    
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updatedHistory))
    } catch (e) {
      console.error('Failed to save search history', e)
    }

    if (!found) {
      const updatedMissing = [...new Set([char, ...missingChars])]
      setMissingChars(updatedMissing)
      
      try {
        localStorage.setItem(STORAGE_KEYS.MISSING_CHARS, JSON.stringify(updatedMissing))
      } catch (e) {
        console.error('Failed to save missing chars', e)
      }
    }
  }, [searchHistory, missingChars])

  // 清除历史记录
  const clearHistory = () => {
    setSearchHistory([])
    setMissingChars([])
    localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY)
    localStorage.removeItem(STORAGE_KEYS.MISSING_CHARS)
  }

  // 导出未收录字符
  const exportMissingChars = () => {
    const data = {
      missingChars,
      searchHistory: searchHistory.filter(h => !h.found),
      exportTime: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hanzi-missing-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getCanvasSize = useCallback(() => {
    if (typeof window === 'undefined') return 240
    const width = window.innerWidth
    if (width < 480) return Math.min(width - 80, 240)
    return 280
  }, [])

  // 初始化 HanziWriter
  useEffect(() => {
    const initWriter = async () => {
      if (!result || !containerRef.current) return

      containerRef.current.innerHTML = ""
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
          strokeColor: "#1a1a1a",
          outlineColor: "#e8e8e8",
          drawingColor: "#1a1a1a",
          radicalColor: "#1a1a1a",
          showCharacter: true,
          showHintAfterMisses: false,
          highlightOnComplete: true,
          highlightCompleteColor: "#b8860b",
        })

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

  // 改进的语音播放
  const playAudio = () => {
    if (!result) return

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()

      let voices = window.speechSynthesis.getVoices()
      
      if (voices.length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          voices = window.speechSynthesis.getVoices()
          speakWithVoice(voices)
        }, { once: true })
        return
      }

      speakWithVoice(voices)
    }
  }

  const speakWithVoice = (voices: SpeechSynthesisVoice[]) => {
    if (!result) return

    const chineseFemaleVoice = voices.find(v => 
      v.lang.includes('zh-CN') && 
      (v.name.includes('Female') || v.name.includes('女') || v.name.includes('Ting') || v.name.includes('Mei'))
    )
    
    const chineseVoice = voices.find(v => v.lang.includes('zh-CN'))
    const selectedVoice = chineseFemaleVoice || chineseVoice

    const utterance = new SpeechSynthesisUtterance(result.audioText)
    utterance.lang = "zh-CN"
    utterance.rate = 0.8
    utterance.pitch = 1.0
    
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
  }

  const handleSearch = (charFromHistory?: string) => {
    const char = charFromHistory || inputChar.trim()
    setError("")
    setResult(null)
    setShowHistory(false)

    if (!char) {
      setError("请输入一个汉字")
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
    saveSearchHistory(char, !!detail)

    if (!detail) {
      setError(`暂未收录「${char}」，已记录到待添加列表`)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setResult(detail)
      setIsLoading(false)
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
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleHistoryClick = (item: SearchHistory) => {
    setInputChar(item.char)
    handleSearch(item.char)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #f5f0e6 50%, #e8e0d0 100%)' }}>
      {/* 顶部 - 中国风设计 */}
      <header 
        className="relative shadow-lg"
        style={{ 
          background: 'linear-gradient(135deg, #8B0000 0%, #b91c1c 50%, #8B0000 100%)',
        }}
      >
        {/* 装饰纹理 */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="relative max-w-lg mx-auto px-5 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 印章图标 */}
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#fdf6e3' }}>
              <span className="text-2xl font-bold" style={{ color: '#8B0000', fontFamily: 'serif' }}>字</span>
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#fdf6e3' }}>汉字预习</h1>
              <p className="text-xs" style={{ color: 'rgba(253,246,227,0.7)' }}>笔顺 · 读音 · 组词</p>
            </div>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: '#fdf6e3' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        
        {/* 底部装饰线 */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ 
          background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
          opacity: 0.6
        }} />
      </header>

      {/* 历史记录面板 */}
      {showHistory && (
        <div className="max-w-lg mx-auto px-4 pt-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-amber-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-amber-900">搜索记录</h3>
              <button
                onClick={clearHistory}
                className="text-xs text-amber-600 hover:text-red-600"
              >
                清空
              </button>
            </div>
            
            {searchHistory.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchHistory.slice(0, 20).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHistoryClick(item)}
                    className={`px-3 py-1.5 rounded-lg text-base font-medium transition-all ${
                      item.found 
                        ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                    }`}
                  >
                    {item.char}
                  </button>
                ))}
              </div>
            )}

            {missingChars.length > 0 && (
              <div className="mt-4 pt-3 border-t border-amber-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-amber-700">
                    未收录 ({missingChars.length})
                  </span>
                  <button
                    onClick={exportMissingChars}
                    className="text-xs text-amber-600 hover:text-amber-800"
                  >
                    导出
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingChars.map((char, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-red-50 text-red-600 rounded text-sm border border-red-100"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <main className="max-w-lg mx-auto px-4 py-6 pb-12">
        {/* 输入区域 - 中国风卡片 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-5 mb-5 border border-amber-100/50" style={{ boxShadow: '0 4px 20px rgba(139,0,0,0.08)' }}>
          <div className="flex gap-3 items-stretch">
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
              className="flex-1 px-4 py-3 text-center rounded-xl border-2 transition-all bg-amber-50/50"
              style={{ 
                fontSize: '24px', 
                height: '52px', 
                minWidth: '0',
                borderColor: '#d4af37',
                color: '#1a1a1a',
              }}
              maxLength={1}
            />
            <button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="px-6 py-3 font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap flex-shrink-0"
              style={{ 
                height: '52px', 
                fontSize: '15px',
                background: 'linear-gradient(135deg, #8B0000 0%, #b91c1c 100%)',
                color: '#fdf6e3',
                boxShadow: '0 4px 12px rgba(139,0,0,0.3)'
              }}
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                "开始预习"
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-center text-sm border border-red-100">
              {error}
            </div>
          )}
        </div>

        {/* 结果展示 - 中国风设计 */}
        {result && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-amber-100/50" style={{ boxShadow: '0 8px 32px rgba(139,0,0,0.1)' }}>
            {/* 笔顺动画区 */}
            <div className="p-6" style={{ background: 'linear-gradient(180deg, #fdf6e3 0%, #fff 100%)' }}>
              <div className="flex justify-center mb-4">
                <div
                  ref={containerRef}
                  className="w-full max-w-[260px] aspect-square flex items-center justify-center rounded-2xl shadow-inner bg-white"
                  style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)' }}
                />
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={replayAnimation}
                  disabled={isPlaying}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center gap-2"
                  style={{ 
                    background: '#fdf6e3', 
                    color: '#8B0000',
                    border: '1px solid #d4af37'
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  重播笔顺
                </button>
                <button
                  onClick={pauseAnimation}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center gap-2"
                  style={{ 
                    background: '#f5f5f5', 
                    color: '#666',
                    border: '1px solid #e0e0e0'
                  }}
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

            {/* 拼音和发音 */}
            <div className="px-6 py-5 border-t border-amber-100">
              <div className="flex items-center justify-center gap-5">
                <span className="text-4xl font-bold text-amber-900" style={{ fontFamily: 'serif' }}>{result.pinyin}</span>
                <button
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="p-4 rounded-2xl transition-all active:scale-95 shadow-lg"
                  style={{ 
                    background: 'linear-gradient(135deg, #8B0000 0%, #b91c1c 100%)',
                    color: '#fdf6e3',
                    boxShadow: '0 4px 12px rgba(139,0,0,0.3)'
                  }}
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
              <p className="text-center text-amber-600 text-xs mt-2">点击播放读音</p>
            </div>

            {/* 词组区 */}
            <div className="px-6 py-5 border-t border-amber-100" style={{ background: 'linear-gradient(180deg, #fdf6e3 0%, #fff 100%)' }}>
              <h3 className="text-base font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #8B0000, #d4af37)' }} />
                常见词组
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {result.words.map((word, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 rounded-xl text-center text-amber-900 font-medium transition-all cursor-default text-base"
                    style={{ 
                      background: '#fff',
                      border: '1px solid #e8dcc8',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            {/* 再次查询 */}
            <div className="px-6 py-5 border-t border-amber-100">
              <button
                onClick={handleClear}
                className="w-full py-4 rounded-xl font-semibold transition-colors active:scale-95 text-base"
                style={{ 
                  background: '#f5f5f5', 
                  color: '#666',
                  border: '1px solid #e0e0e0'
                }}
              >
                查下一个字
              </button>
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!result && !error && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6" style={{ filter: 'grayscale(20%)' }}>📖</div>
            <p className="text-amber-700 text-lg">输入汉字开始预习</p>
          </div>
        )}
      </main>

      {/* 底部装饰 */}
      <div className="fixed bottom-0 left-0 right-0 h-2" style={{ 
        background: 'linear-gradient(90deg, #8B0000, #d4af37, #8B0000)',
        opacity: 0.3
      }} />
    </div>
  )
}
