import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/pharmacy/product/')({
  component: MedicationsPage
})

import { useState } from 'react'
import {
  Search,
  Filter,
  ShoppingCart,
  ChevronDown,
  X,
  Pill,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react'

import { Button } from '@beta-lyfe/ui/components/button'
import { Input } from '@beta-lyfe/ui/components/shad/ui/input'
import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import { Checkbox } from '@beta-lyfe/ui/components/shad//ui/checkbox'
import { Slider } from '@beta-lyfe/ui/components/shad/ui/slider'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@beta-lyfe/ui/components/shad/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@beta-lyfe/ui/components/shad/ui/select'
import { Separator } from '@beta-lyfe/ui/components/shad/ui/separator'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@beta-lyfe/ui/components/shad/ui/collapsible'
import WhatsAppButton from '@beta-lyfe/ui/components/whatappbtn'

// Sample medication data
const medications = [
  {
    id: 1,
    name: 'Paracetamol',
    generic: 'Acetaminophen',
    price: 500,
    category: 'Pain Relief',
    type: 'otc',
    brand: 'Emzor',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Paracetamol'
  },
  {
    id: 2,
    name: 'Amoxicillin',
    generic: 'Amoxicillin',
    price: 1200,
    category: 'Antibiotics',
    type: 'prescription',
    brand: 'GSK',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Amoxicillin'
  },
  {
    id: 3,
    name: 'Vitamin C',
    generic: 'Ascorbic Acid',
    price: 800,
    category: 'Vitamins & Supplements',
    type: 'otc',
    brand: "Nature's Way",
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Vitamin+C'
  },
  {
    id: 4,
    name: 'Lisinopril',
    generic: 'Lisinopril',
    price: 1500,
    category: 'Blood Pressure',
    type: 'prescription',
    brand: 'Zydus',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Lisinopril'
  },
  {
    id: 5,
    name: 'Ibuprofen',
    generic: 'Ibuprofen',
    price: 600,
    category: 'Pain Relief',
    type: 'otc',
    brand: 'Emzor',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Ibuprofen'
  },
  {
    id: 6,
    name: 'Metformin',
    generic: 'Metformin Hydrochloride',
    price: 1100,
    category: 'Diabetes',
    type: 'prescription',
    brand: 'Teva',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Metformin'
  },
  {
    id: 7,
    name: 'Cetirizine',
    generic: 'Cetirizine Hydrochloride',
    price: 750,
    category: 'Allergy',
    type: 'otc',
    brand: 'Cipla',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Cetirizine'
  },
  {
    id: 8,
    name: 'Omeprazole',
    generic: 'Omeprazole',
    price: 950,
    category: 'Digestive Health',
    type: 'otc',
    brand: 'AstraZeneca',
    inStock: false,
    img: '/placeholder.svg?height=200&width=200&text=Omeprazole'
  },
  {
    id: 9,
    name: 'Atorvastatin',
    generic: 'Atorvastatin Calcium',
    price: 1800,
    category: 'Cholesterol',
    type: 'prescription',
    brand: 'Pfizer',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Atorvastatin'
  },
  {
    id: 10,
    name: 'Loratadine',
    generic: 'Loratadine',
    price: 680,
    category: 'Allergy',
    type: 'otc',
    brand: 'Schering-Plough',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Loratadine'
  },
  {
    id: 11,
    name: 'Metoprolol',
    generic: 'Metoprolol Tartrate',
    price: 1350,
    category: 'Blood Pressure',
    type: 'prescription',
    brand: 'Novartis',
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Metoprolol'
  },
  {
    id: 12,
    name: 'Folic Acid',
    generic: 'Folic Acid',
    price: 450,
    category: 'Vitamins & Supplements',
    type: 'otc',
    brand: "Nature's Bounty",
    inStock: true,
    img: '/placeholder.svg?height=200&width=200&text=Folic+Acid'
  }
]

// Categories for filtering
const categories = [
  'Pain Relief',
  'Antibiotics',
  'Vitamins & Supplements',
  'Blood Pressure',
  'Diabetes',
  'Allergy',
  'Digestive Health',
  'Cholesterol'
]

// Brands for filtering
const brands = [
  'Emzor',
  'GSK',
  "Nature's Way",
  'Zydus',
  'Teva',
  'Cipla',
  'AstraZeneca',
  'Pfizer',
  'Schering-Plough',
  'Novartis',
  "Nature's Bounty"
]

export default function MedicationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [availability, setAvailability] = useState<boolean | null>(null)
  const [sortOption, setSortOption] = useState('popularity')

  // Filter medications based on all criteria
  const filteredMedications = medications.filter((med) => {
    // Search query filter
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.generic.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(med.category)

    // Brand filter
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(med.brand)

    // Type filter (prescription/otc)
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(med.type)

    // Price range filter
    const matchesPrice =
      med.price >= priceRange[0] && med.price <= priceRange[1]

    // Availability filter
    const matchesAvailability =
      availability === null || med.inStock === availability

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesType &&
      matchesPrice &&
      matchesAvailability
    )
  })

  // Sort medications
  const sortedMedications = [...filteredMedications].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price
      case 'price-high-low':
        return b.price - a.price
      case 'name-a-z':
        return a.name.localeCompare(b.name)
      case 'name-z-a':
        return b.name.localeCompare(a.name)
      default: // popularity or any other default
        return a.id - b.id
    }
  })

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  // Toggle medication type selection
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('')
    setPriceRange([0, 2000])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedTypes([])
    setAvailability(null)
    setSortOption('popularity')
  }

  // Format price with Naira symbol
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2">
              <img
                src="/images/betalyfe-icon.svg"
                className="w-10 h-10 rounded-full"
                alt="BetaLyfe"
              />
              <span className="text-xl font-bold">BetaLyfe</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/pharmacy/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
              <span className="sr-only">View cart</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link to="/dashboard" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link to="/pharmacy/product" className="hover:text-foreground">
            Pharmacy
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground">Medications</span>
        </div>

        <h1 className="text-3xl font-bold mb-6">All Medications</h1>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search medications..."
              className="w-full pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Reset All
                    </Button>
                  </div>
                  {/* Mobile Filters - Same as desktop but in a sheet */}
                  <div className="space-y-6">
                    {/* Medication Type */}
                    <div>
                      <h3 className="font-medium mb-3">Medication Type</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="type-otc-mobile"
                            checked={selectedTypes.includes('otc')}
                            onCheckedChange={() => toggleType('otc')}
                          />
                          <label htmlFor="type-otc-mobile" className="text-sm">
                            Over-the-Counter
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="type-prescription-mobile"
                            checked={selectedTypes.includes('prescription')}
                            onCheckedChange={() => toggleType('prescription')}
                          />
                          <label
                            htmlFor="type-prescription-mobile"
                            className="text-sm"
                          >
                            Prescription
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 2000]}
                          max={2000}
                          step={100}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>{formatPrice(priceRange[0])}</span>
                          <span>{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <h3 className="font-medium mb-3">Availability</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="availability-in-stock-mobile"
                            checked={availability === true}
                            onCheckedChange={() =>
                              setAvailability(
                                availability === true ? null : true
                              )
                            }
                          />
                          <label
                            htmlFor="availability-in-stock-mobile"
                            className="text-sm"
                          >
                            In Stock
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <Collapsible>
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Categories</h3>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="space-y-2 mt-2">
                          {categories.map((category) => (
                            <div
                              key={category}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`category-${category.toLowerCase().replace(/\s+/g, '-')}-mobile`}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={() => toggleCategory(category)}
                              />
                              <label
                                htmlFor={`category-${category.toLowerCase().replace(/\s+/g, '-')}-mobile`}
                                className="text-sm"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Brands */}
                    <Collapsible>
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Brands</h3>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="space-y-2 mt-2">
                          {brands.map((brand) => (
                            <div
                              key={brand}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`brand-${brand.toLowerCase().replace(/\s+/g, '-')}-mobile`}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => toggleBrand(brand)}
                              />
                              <label
                                htmlFor={`brand-${brand.toLowerCase().replace(/\s+/g, '-')}-mobile`}
                                className="text-sm"
                              >
                                {brand}
                              </label>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                <SelectItem value="name-z-a">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset All
                </Button>
              </div>

              {/* Medication Type */}
              <div>
                <h3 className="font-medium mb-3">Medication Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="type-otc"
                      checked={selectedTypes.includes('otc')}
                      onCheckedChange={() => toggleType('otc')}
                    />
                    <label htmlFor="type-otc" className="text-sm">
                      Over-the-Counter
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="type-prescription"
                      checked={selectedTypes.includes('prescription')}
                      onCheckedChange={() => toggleType('prescription')}
                    />
                    <label htmlFor="type-prescription" className="text-sm">
                      Prescription
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 2000]}
                    max={2000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Availability */}
              <div>
                <h3 className="font-medium mb-3">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="availability-in-stock"
                      checked={availability === true}
                      onCheckedChange={() =>
                        setAvailability(availability === true ? null : true)
                      }
                    />
                    <label htmlFor="availability-in-stock" className="text-sm">
                      In Stock
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Categories */}
              <Collapsible defaultOpen>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Categories</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="space-y-2 mt-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Separator />

              {/* Brands */}
              <Collapsible defaultOpen>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Brands</h3>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="space-y-2 mt-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label
                          htmlFor={`brand-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Medications Grid */}
          <div className="flex-grow">
            {/* Active Filters */}
            {(selectedCategories.length > 0 ||
              selectedBrands.length > 0 ||
              selectedTypes.length > 0 ||
              availability !== null ||
              priceRange[0] > 0 ||
              priceRange[1] < 2000) && (
                <div className="mb-4 flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium">Active Filters:</span>

                  {selectedTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {type === 'otc' ? 'Over-the-Counter' : 'Prescription'}
                      <button type="button" onClick={() => toggleType(type)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {selectedCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => toggleCategory(category)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {selectedBrands.map((brand) => (
                    <Badge
                      key={brand}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {brand}
                      <button onClick={() => toggleBrand(brand)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {availability !== null && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      In Stock
                      <button onClick={() => setAvailability(null)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}

                  {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      <button onClick={() => setPriceRange([0, 2000])}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="ml-auto"
                  >
                    Clear All
                  </Button>
                </div>
              )}

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {sortedMedications.length} of {medications.length}{' '}
                medications
              </p>
            </div>

            {sortedMedications.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedMedications.map((medication) => (
                  <Link
                    to="/pharmacy/product/$id"
                    key={medication.id}
                    params={{
                      id: medication.id.toString()
                    }}
                  >
                    <Card className="h-full overflow-hidden transition-all hover:border-primary">
                      <div className="aspect-square relative bg-muted/20">
                        <img
                          src={medication.img || '/placeholder.svg'}
                          alt={medication.name}
                          className="object-cover p-4"
                        />
                        {medication.type === 'prescription' && (
                          <Badge className="absolute top-2 right-2 bg-amber-500">
                            Prescription
                          </Badge>
                        )}
                        {!medication.inStock && (
                          <Badge className="absolute top-2 right-2 bg-destructive">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">
                          {medication.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {medication.generic}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-bold">
                            {formatPrice(medication.price)}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            disabled={!medication.inStock}
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="sr-only">Add to cart</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <SlidersHorizontal className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  No medications found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query to find what you're
                  looking for.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}

            {/* Pagination - would be implemented with actual pagination logic */}
            {sortedMedications.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 p-0 bg-primary text-primary-foreground"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="w-full border-t bg-background mt-12">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} BetaLyfe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  )
}
