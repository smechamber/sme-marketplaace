"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import AuthGuard from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { getClientPb } from "@/lib/pocketbase"
import { Home, ArrowLeft } from "lucide-react"
import Script from "next/script"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [otpId, setOtpId] = useState(null)
  const [loginMethod, setLoginMethod] = useState("password")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [recaptchaKey, setRecaptchaKey] = useState(0)
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false)

  const { login, requestOTP, authWithOTP, isLoading } = useAuth()
  const router = useRouter()
  
  // Single ref and widget ID for the current active form
  const recaptchaContainerRef = useRef(null)
  const recaptchaWidgetId = useRef(null)
  const initializationAttempts = useRef(0)
  const maxAttempts = 10

  // Check if grecaptcha is available
  const checkRecaptchaAvailability = useCallback(() => {
    if (window.grecaptcha && window.grecaptcha.render) {
      setRecaptchaLoaded(true)
      setIsRecaptchaReady(true)
      return true
    }
    return false
  }, [])

  // Load reCAPTCHA script - check on mount and after script loads
  useEffect(() => {
    // Check if already loaded
    if (checkRecaptchaAvailability()) {
      return
    }

    // Set up polling to check for grecaptcha availability
    const pollInterval = setInterval(() => {
      initializationAttempts.current++
      
      if (checkRecaptchaAvailability()) {
        clearInterval(pollInterval)
        initializationAttempts.current = 0
      } else if (initializationAttempts.current >= maxAttempts) {
        clearInterval(pollInterval)
        console.error("Failed to load reCAPTCHA after maximum attempts")
        setError("Failed to load security verification. Please refresh the page.")
      }
    }, 500) // Check every 500ms

    return () => clearInterval(pollInterval)
  }, [checkRecaptchaAvailability])

  // Initialize reCAPTCHA when ready and conditions are met
  useEffect(() => {
    if (isRecaptchaReady && recaptchaContainerRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeRecaptcha()
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [isRecaptchaReady, loginMethod, otpId, recaptchaKey])

  const initializeRecaptcha = useCallback(() => {
    // Skip if OTP is being verified (OTP field is shown)
    if (loginMethod === "otp" && otpId) {
      return
    }

    // Skip if grecaptcha is not ready
    if (!window.grecaptcha || !window.grecaptcha.render) {
      console.log("grecaptcha not ready yet")
      return
    }

    // Reset previous widget
    if (recaptchaWidgetId.current !== null) {
      try {
        window.grecaptcha.reset(recaptchaWidgetId.current)
        recaptchaWidgetId.current = null
      } catch (err) {
        console.log("Reset error (ignored):", err)
      }
    }

    // Clear container
    if (recaptchaContainerRef.current) {
      recaptchaContainerRef.current.innerHTML = ''
    }

    // Render new widget
    try {
      if (recaptchaContainerRef.current) {
        const widgetId = window.grecaptcha.render(recaptchaContainerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          callback: (token) => {
            setRecaptchaToken(token)
            setFieldErrors(prev => ({ ...prev, recaptcha: null }))
          },
          'expired-callback': () => {
            setRecaptchaToken(null)
            setFieldErrors(prev => ({ 
              ...prev, 
              recaptcha: "reCAPTCHA expired. Please verify again." 
            }))
          },
          'error-callback': () => {
            setRecaptchaToken(null)
            setFieldErrors(prev => ({ 
              ...prev, 
              recaptcha: "reCAPTCHA error. Please try again." 
            }))
          }
        })
        recaptchaWidgetId.current = widgetId
        console.log("reCAPTCHA initialized successfully")
      }
    } catch (err) {
      console.error("reCAPTCHA initialization error:", err)
      setFieldErrors(prev => ({ 
        ...prev, 
        recaptcha: "Failed to initialize security verification. Please refresh the page." 
      }))
    }
  }, [loginMethod, otpId])

  // Reset state when changing login methods
  useEffect(() => {
    setFieldErrors({})
    setError(null)
    setMessage(null)
    setRecaptchaToken(null)
  }, [loginMethod])

  // Handle script load event
  const handleScriptLoad = useCallback(() => {
    console.log("reCAPTCHA script loaded")
    // Give it a moment to fully initialize
    setTimeout(() => {
      if (checkRecaptchaAvailability()) {
        console.log("reCAPTCHA is ready after script load")
      }
    }, 100)
  }, [checkRecaptchaAvailability])

  const handleError = (err) => {
    console.error("Login error:", err)
    setFieldErrors({})

    let errorMessage = "An unexpected error occurred. Please try again."
    let hasFieldErrors = false

    // Handle PocketBase structured errors (err.data from PocketBase SDK)
    if (err?.data) {
      const errorData = err.data

      // Check for field-level validation errors
      if (errorData.data && typeof errorData.data === "object") {
        const fieldErrs = {}
        Object.keys(errorData.data).forEach((field) => {
          if (errorData.data[field]?.message) {
            fieldErrs[field] = errorData.data[field].message
            hasFieldErrors = true
          }
        })

        if (hasFieldErrors) {
          setFieldErrors(fieldErrs)
          errorMessage = errorData.message || "Please fix the validation errors below."
        }
      } else if (errorData.message) {
        errorMessage = errorData.message
      }
    } 
    // Handle axios-style errors (err.response.data)
    else if (err?.response?.data) {
      const errorData = err.response.data

      if (errorData.data && typeof errorData.data === "object") {
        const fieldErrs = {}
        Object.keys(errorData.data).forEach((field) => {
          if (errorData.data[field]?.message) {
            fieldErrs[field] = errorData.data[field].message
            hasFieldErrors = true
          }
        })

        if (hasFieldErrors) {
          setFieldErrors(fieldErrs)
          errorMessage = errorData.message || "Please fix the validation errors below."
        }
      } else if (errorData.message) {
        errorMessage = errorData.message
      }
    } 
    // Handle simple message errors
    else if (err?.message) {
      errorMessage = err.message
    } else if (typeof err === "string") {
      errorMessage = err
    }

    // Customize common error messages
    if (errorMessage.includes("invalid login credentials") || 
        errorMessage.includes("Failed to authenticate")) {
      errorMessage = "Invalid email or password. Please check your credentials and try again."
    } else if (errorMessage.includes("user not found") || 
               errorMessage.includes("no user found") ||
               errorMessage.includes("User not found")) {
      errorMessage = "No account found with this email address. Please check your email or sign up."
    } else if (errorMessage.includes("email not verified")) {
      errorMessage = "Please verify your email address before logging in."
    } else if (errorMessage.includes("too many requests")) {
      errorMessage = "Too many login attempts. Please wait a moment before trying again."
    } else if (errorMessage.includes("Failed to send OTP") ||
               errorMessage.includes("failed to send email")) {
      errorMessage = "Failed to send OTP. Please check your email address and try again."
    } else if (errorMessage.includes("Invalid OTP") ||
               errorMessage.includes("otp is invalid") ||
               errorMessage.includes("incorrect otp")) {
      errorMessage = "Invalid or expired OTP. Please request a new one."
    }

    setError(errorMessage)
    
    // Force complete reCAPTCHA reset by incrementing key
    setRecaptchaToken(null)
    setRecaptchaKey(prev => prev + 1)
  }

  const validateForm = () => {
    const errors = {}

    if (loginMethod === "password" || loginMethod === "otp" || 
        loginMethod === "forgot-password") {
      if (!email) {
        errors.email = "Email is required."
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address."
      }
    }

    if (loginMethod === "password" && !password) {
      errors.password = "Password is required."
    }

    if (loginMethod === "otp" && otpId && !otp) {
      errors.otp = "OTP is required."
    } else if (loginMethod === "otp" && otp && !/^\d{6}$/.test(otp)) {
      errors.otp = "OTP must be 6 digits."
    }

    // Validate reCAPTCHA only for initial requests (not OTP verification)
    if (!otpId && !recaptchaToken && isRecaptchaReady) {
      errors.recaptcha = "Please complete the reCAPTCHA verification."
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const verifyRecaptchaToken = async (token) => {
    try {
      const response = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("reCAPTCHA verification failed:", errorData)
        return false
      }

      const data = await response.json()
      return data.success
    } catch (err) {
      console.error("reCAPTCHA verification error:", err)
      return false
    }
  }

  const handlePasswordLogin = async (event) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setFieldErrors({})

    if (!validateForm()) {
      return
    }

    const isValidCaptcha = await verifyRecaptchaToken(recaptchaToken)
    if (!isValidCaptcha) {
      setError("reCAPTCHA verification failed. Please try again.")
      setRecaptchaKey(prev => prev + 1)
      return
    }

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      handleError(err)
    }
  }

  const handleRequestOTP = async (event) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setFieldErrors({})

    if (!validateForm()) {
      return
    }

    const isValidCaptcha = await verifyRecaptchaToken(recaptchaToken)
    if (!isValidCaptcha) {
      setError("reCAPTCHA verification failed. Please try again.")
      setRecaptchaKey(prev => prev + 1)
      return
    }

    try {
      // Request OTP - backend should validate user existence
      const id = await requestOTP(email)
      
      if (!id) {
        throw new Error("Failed to send OTP. Please try again.")
      }
      
      setOtpId(id)
      setMessage("OTP sent to your email. Please check your inbox and spam folder.")
    } catch (err) {
      console.error("OTP request error:", err)
      
      // Check for various "user not found" error patterns
      const errorMsg = err?.message?.toLowerCase() || 
                      err?.data?.message?.toLowerCase() || 
                      err?.response?.data?.message?.toLowerCase() || ""
      
      const isUserNotFound = 
        errorMsg.includes("user") && errorMsg.includes("not found") ||
        errorMsg.includes("no user found") ||
        errorMsg.includes("user not found") ||
        errorMsg.includes("failed to authenticate") ||
        err?.status === 404
      
      if (isUserNotFound) {
        setError("No account found with this email address. Please check your email or sign up.")
        setRecaptchaKey(prev => prev + 1)
      } else {
        handleError(err)
      }
    }
  }

  const handleOTPLogin = async (event) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setFieldErrors({})

    if (!otp) {
      setFieldErrors({ otp: "OTP is required." })
      return
    }

    if (!/^\d{6}$/.test(otp)) {
      setFieldErrors({ otp: "OTP must be 6 digits." })
      return
    }

    try {
      await authWithOTP(otpId, otp)
      router.push("/dashboard")
    } catch (err) {
      // Reset OTP field on error for security
      setOtp("")
      handleError(err)
    }
  }

  const handleForgotPasswordRequest = async (event) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setFieldErrors({})

    if (!validateForm()) {
      return
    }

    const isValidCaptcha = await verifyRecaptchaToken(recaptchaToken)
    if (!isValidCaptcha) {
      setError("reCAPTCHA verification failed. Please try again.")
      setRecaptchaKey(prev => prev + 1)
      return
    }

    try {
      await getClientPb().collection("users").requestPasswordReset(email)
      setMessage("If an account exists with this email, a password reset link has been sent. Please check your inbox and spam folder.")
    } catch (err) {
      handleError(err)
    }
  }

  const shouldShowRecaptcha = () => {
    // Don't show reCAPTCHA when verifying OTP
    return !(loginMethod === "otp" && otpId)
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={() => {
          console.error("Failed to load reCAPTCHA script")
          setError("Failed to load security verification. Please refresh the page.")
        }}
      />
      
      <AuthGuard redirectIfAuthenticated="/dashboard">
        <div className="min-h-screen flex items-center justify-center p-4 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 text-[#29688A] hover:bg-[#29688A] hover:text-white transition-colors"
            onClick={() => router.push("/")}
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>

          <div className="w-full max-w-md relative z-10">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#29688A]">Welcome Back</h1>
              <p className="text-gray-600 mt-1">Sign in to your account</p>
            </div>

            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-[#29688A]">
                  {loginMethod === "password" && "Login"}
                  {loginMethod === "otp" && "Login with OTP"}
                  {loginMethod === "forgot-password" && "Reset Password"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                {message && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                    <strong>Success:</strong> {message}
                  </div>
                )}

                {loginMethod === "password" && (
                  <form onSubmit={handlePasswordLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-[#29688A] font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-gray-300 focus:border-[#29688A] focus:ring-[#29688A] ${
                          fieldErrors.email ? "border-red-500" : ""
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-[#29688A] font-medium">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`border-gray-300 focus:border-[#29688A] focus:ring-[#29688A] ${
                          fieldErrors.password ? "border-red-500" : ""
                        }`}
                      />
                      {fieldErrors.password && (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.password}</p>
                      )}
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2 text-sm text-[#29688A] hover:text-[#1e5a7a]"
                        onClick={() => setLoginMethod("forgot-password")}
                        type="button"
                      >
                        Forgot password?
                      </Button>
                    </div>
                    
                    {shouldShowRecaptcha() && (
                      <>
                        <div className="flex justify-center" key={recaptchaKey}>
                          <div ref={recaptchaContainerRef}>
                            {!isRecaptchaReady && (
                              <div className="text-sm text-gray-500 text-center py-4">
                                Loading security verification...
                              </div>
                            )}
                          </div>
                        </div>
                        {fieldErrors.recaptcha && (
                          <p className="text-red-600 text-sm text-center">
                            {fieldErrors.recaptcha}
                          </p>
                        )}
                      </>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full bg-[#29688A] hover:bg-[#1e5a7a] text-white"
                      disabled={isLoading || (!isRecaptchaReady && shouldShowRecaptcha())}
                    >
                      {isLoading ? <LoadingSpinner /> : "Login"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white"
                      onClick={() => {
                        setLoginMethod("otp")
                        setOtpId(null)
                        setOtp("")
                      }}
                      type="button"
                    >
                      Login with OTP
                    </Button>
                  </form>
                )}

                {loginMethod === "otp" && (
                  <form onSubmit={otpId ? handleOTPLogin : handleRequestOTP} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-[#29688A] font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={otpId !== null}
                        className={`border-gray-300 focus:border-[#29688A] focus:ring-[#29688A] ${
                          fieldErrors.email ? "border-red-500" : ""
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                    
                    {shouldShowRecaptcha() && (
                      <>
                        <div className="flex justify-center" key={recaptchaKey}>
                          <div ref={recaptchaContainerRef}>
                            {!isRecaptchaReady && (
                              <div className="text-sm text-gray-500 text-center py-4">
                                Loading security verification...
                              </div>
                            )}
                          </div>
                        </div>
                        {fieldErrors.recaptcha && (
                          <p className="text-red-600 text-sm text-center">
                            {fieldErrors.recaptcha}
                          </p>
                        )}
                      </>
                    )}
                    
                    {otpId && (
                      <div>
                        <Label htmlFor="otp" className="text-[#29688A] font-medium">
                          OTP
                        </Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          required
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className={`border-gray-300 focus:border-[#29688A] focus:ring-[#29688A] ${
                            fieldErrors.otp ? "border-red-500" : ""
                          }`}
                        />
                        {fieldErrors.otp && (
                          <p className="text-red-600 text-sm mt-1">{fieldErrors.otp}</p>
                        )}
                      </div>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full bg-[#29688A] hover:bg-[#1e5a7a] text-white"
                      disabled={isLoading || (!isRecaptchaReady && shouldShowRecaptcha() && !otpId)}
                    >
                      {isLoading ? <LoadingSpinner /> : otpId ? "Verify OTP" : "Request OTP"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white"
                      onClick={() => {
                        setLoginMethod("password")
                        setOtpId(null)
                        setOtp("")
                      }}
                      type="button"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Password Login
                    </Button>
                  </form>
                )}

                {loginMethod === "forgot-password" && (
                  <form onSubmit={handleForgotPasswordRequest} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-[#29688A] font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border-gray-300 focus:border-[#29688A] focus:ring-[#29688A] ${
                          fieldErrors.email ? "border-red-500" : ""
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
                      )}
                    </div>
                    
                    {shouldShowRecaptcha() && (
                      <>
                        <div className="flex justify-center" key={recaptchaKey}>
                          <div ref={recaptchaContainerRef}>
                            {!isRecaptchaReady && (
                              <div className="text-sm text-gray-500 text-center py-4">
                                Loading security verification...
                              </div>
                            )}
                          </div>
                        </div>
                        {fieldErrors.recaptcha && (
                          <p className="text-red-600 text-sm text-center">
                            {fieldErrors.recaptcha}
                          </p>
                        )}
                      </>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full bg-[#29688A] hover:bg-[#1e5a7a] text-white"
                      disabled={isLoading || (!isRecaptchaReady && shouldShowRecaptcha())}
                    >
                      {isLoading ? <LoadingSpinner /> : "Send Reset Link"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white"
                      onClick={() => setLoginMethod("password")}
                      type="button"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Login
                    </Button>
                  </form>
                )}

                <div className="mt-6 text-center text-sm border-t pt-4">
                  <span className="text-gray-600">Don&apos;t have an account? </span>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-[#29688A] hover:text-[#1e5a7a] font-medium"
                    onClick={() => router.push("/register")}
                  >
                    Sign up here
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <style jsx>{`
          .bg-grid-pattern {
            background-image: radial-gradient(circle, #29688A 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}</style>
      </AuthGuard>
    </>
  )
}