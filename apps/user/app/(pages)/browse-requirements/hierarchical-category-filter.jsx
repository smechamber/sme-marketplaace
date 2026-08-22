"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Search, X, Filter } from "lucide-react"
import { productCategories } from "@/lib/constants"
import { cn } from "@/lib/utils"




export function HierarchicalCategoryFilter({
  selectedCategory,
  onCategoryChange,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedNodes, setExpandedNodes] = useState(new Set())
  const [categoryTree, setCategoryTree] = useState([])
  const [filteredTree, setFilteredTree] = useState([])

  // Build category tree from product categories
  useEffect(() => {
    const buildTree = () => {
      const tree= []

      productCategories.forEach((category) => {
        const categoryNode = {
          name: category.name,
          fullPath: category.name,
          level: 0,
          children: [],
        }

        // Add subcategories
        if (category.subcategories) {
          category.subcategories.forEach((subcategory) => {
            const subcategoryNode = {
              name: subcategory.name,
              fullPath: `${category.name} > ${subcategory.name}`,
              level: 1,
              children: [],
            }

            // Add sub-subcategories
            if (subcategory.sub_subcategories) {
              subcategory.sub_subcategories.forEach((subSubcategory) => {
                const subSubcategoryNode = {
                  name: subSubcategory,
                  fullPath: `${category.name} > ${subcategory.name} > ${subSubcategory}`,
                  level: 2,
                }
                subcategoryNode.children.push(subSubcategoryNode)
              })
            }

            categoryNode.children.push(subcategoryNode)
          })
        }

        tree.push(categoryNode)
      })

      return tree
    }

    const tree = buildTree()
    setCategoryTree(tree)
    setFilteredTree(tree)
  }, [])

  // Filter tree based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTree(categoryTree)
      return
    }

    const filterTree = (nodes) => {
      return nodes.reduce((filtered, node) => {
        const matchesSearch =
          node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          node.fullPath.toLowerCase().includes(searchTerm.toLowerCase())

        let filteredChildren  = []
        if (node.children) {
          filteredChildren = filterTree(node.children)
        }

        if (matchesSearch || filteredChildren.length > 0) {
          filtered.push({
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children,
          })

          // Auto-expand nodes that have matches
          if (filteredChildren.length > 0) {
            setExpandedNodes((prev) => new Set([...prev, node.fullPath]))
          }
        }

        return filtered
      }, [])
    }

    setFilteredTree(filterTree(categoryTree))
  }, [searchTerm, categoryTree])

  const toggleExpanded = (path) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  const handleCategorySelect = (fullPath) => {
    onCategoryChange(fullPath === selectedCategory ? "all" : fullPath)
    setIsOpen(false)
  }

  const clearSelection = () => {
    onCategoryChange("all")
    setIsOpen(false)
  }

  const renderCategoryNode = (node) => {
    const isExpanded = expandedNodes.has(node.fullPath)
    const isSelected = selectedCategory === node.fullPath
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.fullPath} className="w-full">
        <div
          className={cn(
            "flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors",
            "hover:bg-gray-50",
            isSelected && "bg-[#29688A]/10 text-[#29688A] font-medium",
            `ml-${node.level * 4}`,
          )}
          onClick={() => handleCategorySelect(node.fullPath)}
        >
          <div className="flex items-center flex-1 min-w-0">
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 border-1 drop-shadow-sm bg-gray-50 p-0 mr-2 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpanded(node.fullPath)
                }}
              >
                {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </Button>
            )}
            {!hasChildren && <div className="w-8" />}

            <span className="text-sm " title={node.fullPath}>
              {node.name}
            </span>
          </div>

          {isSelected && (
            <Badge variant="secondary" className="ml-2 text-xs">
              Selected
            </Badge>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4 border-l border-gray-200 pl-2 ">
            {node.children.map((child) => renderCategoryNode(child))}
          </div>
        )}
      </div>
    )
  }

  const getSelectedCategoryDisplay = () => {
    if (selectedCategory === "all") return "All Categories"

    // Find the selected category in the tree to get its display name
    const findCategory = (nodes) => {
      for (const node of nodes) {
        if (node.fullPath === selectedCategory) return node
        if (node.children) {
          const found = findCategory(node.children)
          if (found) return found
        }
      }
      return null
    }

    const category = findCategory(categoryTree)
    return category ? category.fullPath : selectedCategory
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full justify-between border-gray-200",
          selectedCategory !== "all" && "border-[#29688A] text-[#29688A]",
        )}
      >
        <div className="flex items-center overflow-hidden">
          <Filter className="h-4 w-4 mr-2" />
          <span className="truncate text-xs ">{getSelectedCategoryDisplay()}</span>
        </div>
        <div className="flex items-center ml-2">
          {selectedCategory !== "all" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 mr-1 hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                clearSelection()
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </div>
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 w-96 overflow-hidden shadow-lg">
          <CardContent className="p-0">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200"
                />
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              <div className="p-2">
                <div
                  className={cn(
                    "flex items-center p-2 rounded-md cursor-pointer transition-colors",
                    "hover:bg-gray-50",
                    selectedCategory === "all" && "bg-[#29688A]/10 text-[#29688A] font-medium",
                  )}
                  onClick={() => handleCategorySelect("all")}
                >
                  <span className="text-sm">All Categories</span>
                  {selectedCategory === "all" && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Selected
                    </Badge>
                  )}
                </div>

                <div className="mt-2 space-y-1">{filteredTree.map((node) => renderCategoryNode(node))}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
