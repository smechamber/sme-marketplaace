"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, MapPin, Calendar, MessageSquare, Eye, Download, FileText } from "lucide-react"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"
import { getClientPb } from "@/lib/pocketbase"
import { InquiryDialog } from "@/components/inquiry-dialog"
import { HierarchicalCategoryFilter } from "./hierarchical-category-filter"

export default function BrowseRequirementsPage() {
  const pb = getClientPb()
  const [requirements, setRequirements] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [budgetFilter, setBudgetFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const fetchRequirements = useCallback(
    async (signal) => {
      try {
        let filter = 'approvalStatus = "approved"'

        if (searchTerm) {
          // Using quoteFor and requirementDetails fields that exist in your schema
          filter += ` && (quoteFor ~ "${searchTerm}" || requirementDetails ~ "${searchTerm}")`
        }

        if (categoryFilter !== "all") {
          // Handle hierarchical category filtering - match exact path or any part of the hierarchy
          const categoryParts = categoryFilter.split(" > ")
          const categoryConditions = categoryParts.map((part, index) => {
            if (index === 0) {
              // Main category - match if category starts with this
              return `category ~ "${part}"`
            } else {
              // Subcategory or sub-subcategory - match the full path up to this point
              const partialPath = categoryParts.slice(0, index + 1).join(" > ")
              return `category ~ "${partialPath}"`
            }
          })

          // Use OR condition to match any level of the hierarchy
          filter += ` && (${categoryConditions.join(" || ")})`
        }

        // Note: Budget filtering removed since there's no budget field in your schema
        // You may need to add a budget field to your PocketBase collection
        if (budgetFilter !== "all") {
          console.warn("Budget filtering not available - budget field not found in schema")
        }

        let sort = "-created"
        if (sortBy === "oldest") sort = "+created"
        // Budget sorting removed since budget field doesn't exist
        if (sortBy === "budget-low" || sortBy === "budget-high") {
          console.warn("Budget sorting not available - budget field not found in schema")
          sort = "-created"
        }

        const records = await pb.collection("requirements").getList(1, 50, {
          filter,
          sort,
          expand: "user", // Changed from "buyer" to "user" as per your schema
          signal,
        })

        setRequirements(records.items)
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching requirements:", error)
        }
      }
    },
    [searchTerm, categoryFilter, budgetFilter, sortBy],
  )

  const isLoading = usePocketBaseFetchWithLoading(fetchRequirements, [searchTerm, categoryFilter, budgetFilter, sortBy])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatBudget = (budget) => {
    if (!budget) return "Budget not specified"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(budget)
  }

  const getFileUrl = (requirement, filename) => {
    if (!filename) return null
    return pb.files.getUrl(requirement, filename)
  }

  const handleFileDownload = (requirement, filename) => {
    const url = getFileUrl(requirement, filename)
    if (url) {
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const formatCategoryDisplay = (category) => {
    if (!category) return null

    const parts = category.split(" > ")
    if (parts.length === 1) return category

    return (
      <div className="flex flex-wrap items-center gap-1 text-xs">
        {parts.map((part, index) => (
          <span key={index} className="flex items-center">
            <span className={index === parts.length - 1 ? "font-medium" : "text-gray-500"}>{part}</span>
            {index < parts.length - 1 && <span className="text-gray-400 mx-1">›</span>}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Background texture */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2329688A' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Browse Requirements</h1>
                <p className="text-gray-600 mt-2">
                  Discover opportunities and connect with buyers looking for your services
                </p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search requirements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-[#29688A] focus:ring-[#29688A]"
                  />
                </div>

                <div className="flex gap-2">
                  <HierarchicalCategoryFilter
                    selectedCategory={categoryFilter}
                    onCategoryChange={setCategoryFilter}
                    className="w-64 "
                  />

                  {/* Budget filter temporarily disabled - add budget field to your schema first */}
                  {/*
                  <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                    <SelectTrigger className="w-32 border-gray-200">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Budget</SelectItem>
                      <SelectItem value="0-100">$0 - $100</SelectItem>
                      <SelectItem value="100-500">$100 - $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1K</SelectItem>
                      <SelectItem value="1000+">$1K+</SelectItem>
                    </SelectContent>
                  </Select>
                  */}

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32 border-gray-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      {/* Budget sorting disabled until budget field is added */}
                      {/*
                      <SelectItem value="budget-high">Budget: High</SelectItem>
                      <SelectItem value="budget-low">Budget: Low</SelectItem>
                      */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#29688A]"></div>
              <span className="ml-3 text-gray-600">Loading requirements...</span>
            </div>
          ) : requirements.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requirements found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {requirements.map((requirement) => (
                <Card
                  key={requirement.id}
                  className="border border-gray-200 hover:border-[#29688A] transition-colors duration-200 hover:shadow-lg"
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {requirement.quoteFor || "Requirement"}
                      </CardTitle>
                      {requirement.category && (
                        <div className="self-start bg-[#29688A]/10 text-[#29688A] border-[#29688A]/20 rounded-lg p-2">
                          {formatCategoryDisplay(requirement.category)}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {requirement.requirementDetails || "No details provided"}
                    </p>

                    <div className="space-y-2">
                      {/* Budget display removed since field doesn't exist in schema */}
                      {/*
                      <div className="flex items-center text-sm text-gray-500">
                        <DollarSign className="h-4 w-4 mr-2 text-[#29688A]" />
                        <span className="font-medium text-[#29688A]">{formatBudget(requirement.budget)}</span>
                      </div>
                      */}

                      {requirement.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{requirement.location}</span>
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Posted {formatDate(requirement.created)}</span>
                      </div>

                      {requirement.expand?.user && (
                        <div className="text-sm text-gray-500">
                          <span>By: {requirement.expand.user.name || requirement.expand.user.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 space-y-2">
                      <InquiryDialog
                        requirement={{
                          id: requirement.id,
                          quoteFor: requirement.quoteFor || "Requirement",
                          requirementDetails: requirement.requirementDetails,
                          userId: requirement.user,
                        }}
                        seller={{
                          id: requirement.user,
                          name:
                            requirement.expand?.user?.name || requirement.expand?.user?.email || "Requirement Poster",
                          email: requirement.expand?.user?.email,
                        }}
                        trigger={
                          <Button className="w-full bg-[#29688A] hover:bg-[#29688A]/90 text-white" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Proposal
                          </Button>
                        }
                      />

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full border-[#29688A] text-[#29688A] hover:bg-[#29688A]/10 bg-transparent"
                            size="sm"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-semibold text-gray-900">
                              {requirement.quoteFor || "Requirement Details"}
                            </DialogTitle>
                          </DialogHeader>

                          <div className="space-y-6">
                            {/* Category */}
                            {requirement.category && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                                <div className="bg-[#29688A]/10 text-[#29688A] border border-[#29688A]/20 rounded-lg p-3">
                                  {formatCategoryDisplay(requirement.category)}
                                </div>
                              </div>
                            )}

                            {/* Requirement Details */}
                            <div>
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Requirement Details</h3>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-800 whitespace-pre-wrap">
                                  {requirement.requirementDetails || "No details provided"}
                                </p>
                              </div>
                            </div>

                            {/* Location */}
                            {requirement.location && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
                                <div className="flex items-center text-gray-600">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{requirement.location}</span>
                                </div>
                              </div>
                            )}

                            {/* Posted By */}
                            {requirement.expand?.user && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Posted By</h3>
                                <div className="text-gray-600">
                                  <span>{requirement.expand.user.name || requirement.expand.user.email}</span>
                                  {requirement.expand.user.email && requirement.expand.user.name && (
                                    <span className="text-gray-500 ml-2">({requirement.expand.user.email})</span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Posted Date */}
                            <div>
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Posted Date</h3>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{formatDate(requirement.created)}</span>
                              </div>
                            </div>

                            {/* File Attachment */}
                            {requirement.attachment && (
                              <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Attachment</h3>
                                <div className="border border-gray-200 rounded-lg p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <FileText className="h-5 w-5 text-[#29688A] mr-3" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">{requirement.attachment}</p>
                                        <p className="text-xs text-gray-500">Click to download</p>
                                      </div>
                                    </div>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleFileDownload(requirement, requirement.attachment)}
                                      className="border-[#29688A] text-[#29688A] hover:bg-[#29688A]/10"
                                    >
                                      <Download className="h-4 w-4 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Approval Status */}
                            <div>
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                  requirement.approvalStatus === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : requirement.approvalStatus === "rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {requirement.approvalStatus || "pending"}
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
