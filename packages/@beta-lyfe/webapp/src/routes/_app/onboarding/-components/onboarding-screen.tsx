
import React, { useState, useEffect } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Stethoscope, Pill, FlaskRoundIcon as Flask, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@beta-lyfe/ui/components/button"
import { Card, CardContent } from "@beta-lyfe/ui/components/shad/ui/card"
import { Link } from "@tanstack/react-router"

const onboardingSlides = [
  {
    title: "Connect with Doctors",
    description: "Schedule virtual consultations with qualified healthcare professionals anytime, anywhere.",
    icon: Stethoscope,
    color: "bg-blue-100 text-blue-600",
    illustration: "/placeholder.svg?height=200&width=200&text=Doctor+Consultation",
  },
  {
    title: "Order Medications",
    description: "Get prescriptions and medications delivered to your doorstep with just a few taps.",
    icon: Pill,
    color: "bg-green-100 text-green-600",
    illustration: "/placeholder.svg?height=200&width=200&text=Medication+Delivery",
  },
  {
    title: "Book Lab Tests",
    description: "Schedule lab appointments and receive results directly on the app.",
    icon: Flask,
    color: "bg-purple-100 text-purple-600",
    illustration: "/placeholder.svg?height=200&width=200&text=Lab+Tests",
  },
  {
    title: "Manage Your Health",
    description: "Keep track of appointments, medications, and health records all in one place.",
    icon: Calendar,
    color: "bg-orange-100 text-orange-600",
    illustration: "/placeholder.svg?height=200&width=200&text=Health+Management",
  },
]

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      if (currentSlide < onboardingSlides.length - 1) {
        setDirection(1)
        setCurrentSlide(currentSlide + 1)
      } else {
        setIsAutoPlaying(false)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, isAutoPlaying])

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setDirection(1)
      setCurrentSlide(currentSlide + 1)
      setIsAutoPlaying(false)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(currentSlide - 1)
      setIsAutoPlaying(false)
    }
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  }

  const backgroundColors = [
    "from-blue-50 to-background",
    "from-green-50 to-background",
    "from-purple-50 to-background",
    "from-orange-50 to-background",
  ]

  return (
    <div
      className={`flex flex-col h-dvh bg-gradient-to-b transition-colors duration-700 ${backgroundColors[currentSlide]}`}
    >
        <div className="absolute top-4 left-4">
        <img src="/images/betalyfe-icon.svg" className="w-12 h-12 rounded-full"/>
      </div>

      {/* Skip button */}
      <div className="absolute top-4 right-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/dashboard">
            Skip <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="flex justify-center">
            <motion.div
              className="relative w-32 h-32"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-primary/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  key={currentSlide}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {React.createElement(onboardingSlides[currentSlide].icon, {
                    className: "w-16 h-16 text-primary",
                  })}
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.h1
            className="text-3xl font-bold mb-2 text-primary"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Beta-Lyfe
          </motion.h1>

          <motion.p
            className="text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Your complete healthcare companion
          </motion.p>

          <div className="relative h-[200px] pt-3 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 left-0 w-full"
              >
                <Card className="border-none bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div
                        className={`w-16 h-16 rounded-full ${onboardingSlides[currentSlide].color} flex items-center justify-center shrink-0`}
                      >
                        {React.createElement(onboardingSlides[currentSlide].icon, { className: "w-8 h-8" })}
                      </div>

                      <div className="text-left">
                        <h2 className="text-xl font-semibold mb-2">{onboardingSlides[currentSlide].title}</h2>
                        <p className="text-muted-foreground">{onboardingSlides[currentSlide].description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          {currentSlide < onboardingSlides.length - 1 ? (
          <></>
        ) : (
          <motion.div
            className="w-full max-w-md space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button asChild className="w-full">
              <Link to="/auth/sign-in" className="text-white">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/auth/sign-up">Create Account</Link>
            </Button>
          </motion.div>
        )}

          {/* Navigation controls */}
          <div className="flex items-center justify-between pt-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={currentSlide === 0 ? "invisible" : ""}
            >
              <ChevronRight className="h-4 w-4 rotate-180 mr-1" /> Previous
            </Button>

            <div className="flex justify-center gap-1">
              {onboardingSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    currentSlide === index ? "bg-primary w-6" : "bg-muted hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === onboardingSlides.length - 1}
              className={currentSlide === onboardingSlides.length - 1 ? "invisible" : ""}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

    
      </div>
    </div>
  )
}

