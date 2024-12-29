'use client'

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { fetchProjects } from "~/lib/api"
import { useGSAP } from "@gsap/react"

export default function LoadingSlider() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useGSAP(() => {
    const controller = new AbortController()
    let progressInterval: NodeJS.Timeout
    let finishTimeout: NodeJS.Timeout

    const startLoading = () => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      finishTimeout = setTimeout(() => {
        clearInterval(progressInterval)
        setProgress(100)
      }, 30000) 
    }

    const loadData = async () => {
      try {
        startLoading()
        await fetchProjects()
        setProgress(100)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
        setIsLoading(false)
      } finally {
        clearTimeout(finishTimeout)
      }
    }

    loadData()

    return () => {
      controller.abort()
      clearInterval(progressInterval)
      clearTimeout(finishTimeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        >
          <div className="mb-8 flex flex-col items-center">
            <div className="relative h-12 w-12">
              
            </div>
            <h1 className="ml-4 text-5xl font-indie text-gray-800">Don Aime</h1>
          </div>
          <div className="relative h-2 overflow-clip w-64 rounded-full bg-gray-200">
            <motion.div
              className="absolute h-full shadow-2xl shadow-sky-700 bg-sky-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          {/* <p className="mt-4 text-lg text-gray-600">{progress}%</p> */}
          {error && (
            <p className="mt-4 text-sm text-red-500">
              Error loading data: {error}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
