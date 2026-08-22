"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"
import { Phone, Shield, Clock, Edit2 } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function PhoneVerificationDialog({
  open,
  onOpenChange,
  onVerificationComplete,
  initialPhone,
  required = false,
}) {
  const [step, setStep] = useState("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const { currentUser, refreshAuth } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (open && (initialPhone || currentUser?.phone || currentUser?.mobile)) {
      // Format existing phone number with country code if it doesn't have one
      const userPhone = initialPhone || currentUser.phone || currentUser.mobile
      if (userPhone && !userPhone.startsWith('+')) {
        setPhone(`+91${userPhone}`)
      } else {
        setPhone(userPhone || "")
      }
    }
  }, [open, initialPhone, currentUser?.phone, currentUser?.mobile])

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()

    if (!phone || !phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      })
      return
    }

    // Extract digits and validate
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 10 || digits.length > 12) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Extract the actual phone number (remove country code if present)
      const cleanPhone = digits.startsWith("91") ? digits.slice(2) : digits

      const response = await fetch("/api/phone-otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: cleanPhone,
          userId: currentUser?.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStep("otp")
        setCountdown(60)
        setIsEditingPhone(false)

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)

        toast({
          title: "OTP Sent",
          description: `Verification code sent to ${phone}`,
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Send OTP error:", error)
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()

    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const digits = phone.replace(/\D/g, "")
      const cleanPhone = digits.startsWith("91") ? digits.slice(2) : digits

      const response = await fetch("/api/phone-otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: cleanPhone,
          otp: otp,
          userId: currentUser?.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Phone number verified successfully!",
        })

        await refreshAuth()

        setStep("phone")
        setPhone("")
        setOtp("")
        setIsEditingPhone(false)

        onOpenChange(false)
        onVerificationComplete?.()
      } else {
        toast({
          title: "Error",
          description: data.error || "Invalid OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Verify OTP error:", error)
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return

    setIsLoading(true)

    try {
      const digits = phone.replace(/\D/g, "")
      const cleanPhone = digits.startsWith("91") ? digits.slice(2) : digits

      const response = await fetch("/api/phone-otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: cleanPhone,
          userId: currentUser?.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setCountdown(60)
        setOtp("")

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)

        toast({
          title: "OTP Resent",
          description: "New verification code sent to your phone",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to resend OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Resend OTP error:", error)
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDialogClose = (open) => {
    if (!open && required && !currentUser?.phone_verifed) return
    if (!open) {
      setStep("phone")
      setPhone("")
      setOtp("")
      setCountdown(0)
      setIsEditingPhone(false)
    }
    onOpenChange(open)
  }

  const handleChangeNumber = () => {
    setStep("phone")
    setIsEditingPhone(true)
  }

  const canEditPhone = !currentUser?.phone || isEditingPhone

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-md rounded-3xl border-0 p-5 shadow-2xl sm:p-7" showCloseButton={!required} onEscapeKeyDown={(event) => required && event.preventDefault()} onPointerDownOutside={(event) => required && event.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="w-5 h-5 text-[#29688A]" />
            Verify Phone Number
          </DialogTitle>
        </DialogHeader>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4 mt-4">
            <div className="text-center mb-6">
              {required && <span className="mb-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Required to continue</span>}
              <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-cyan-50"><Phone className="w-7 h-7 text-[#087f8c]" /></span>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Secure your account</h3>
              <p className="text-gray-600 text-sm">
                {currentUser?.phone && !isEditingPhone
                  ? "Verify your registered phone number"
                  : "Enter your phone number to receive a verification code"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="IN"
                  value={phone}
                  onChange={setPhone}
                  disabled={isLoading || (!canEditPhone && currentUser?.phone)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#29688A] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    '--PhoneInput-color--focus': '#29688A',
                    '--PhoneInputInternationalIconPhone-opacity': '0.8',
                    '--PhoneInputInternationalIconGlobe-opacity': '0.65',
                    '--PhoneInputCountrySelect-marginRight': '0.35em',
                    '--PhoneInputCountrySelectArrow-width': '0.3em',
                    '--PhoneInputCountrySelectArrow-marginLeft': '0.35em',
                  }}
                />
                {currentUser?.phone && !isEditingPhone && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingPhone(true)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#29688A] hover:text-[#29688A]/80 p-1 h-auto"
                    disabled={isLoading}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-gray-500 text-center">
                {currentUser?.phone && !isEditingPhone 
                  ? "This is your registered phone number" 
                  : "Enter your mobile number with country code"}
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                className="h-12 flex-1 rounded-xl bg-[#087f8c] hover:bg-[#066b75] text-white" 
                disabled={isLoading || !phone}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Sending OTP...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
              
              {isEditingPhone && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditingPhone(false)
                    // Reset to original phone if available
                    if (currentUser?.phone) {
                      const userPhone = currentUser.phone
                      setPhone(userPhone.startsWith('+') ? userPhone : `+91${userPhone}`)
                    }
                  }}
                  disabled={isLoading}
                  className="px-3"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4 mt-4">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 text-[#29688A] mx-auto mb-3" />
              <p className="text-gray-600 text-sm">Enter the 6-digit code sent to</p>
              <p className="font-medium text-gray-900">{phone}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp" className="text-center block">
                Verification Code
              </Label>
              <div className="flex justify-center">
                <InputOTP value={otp} onChange={setOtp} maxLength={6} disabled={isLoading}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-[#29688A] hover:bg-[#29688A]/90 text-white"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify Phone Number"
                )}
              </Button>

              <div className="flex items-center justify-between text-sm">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleChangeNumber}
                  disabled={isLoading}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Change Number
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOtp}
                  disabled={isLoading || countdown > 0}
                  className="text-[#29688A] hover:text-[#29688A]/80"
                >
                  {countdown > 0 ? (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {countdown}s
                    </span>
                  ) : (
                    "Resend Code"
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
