import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  ShoppingCart,
  Clock,
  Info,
  AlertCircle,
  Heart,
  MapPin
} from 'lucide-react'
import { Button } from '@beta-lyfe/ui/components/button'
import { Card, CardContent } from '@beta-lyfe/ui/components/shad/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@beta-lyfe/ui/components/shad/ui/tabs'
import { Badge } from '@beta-lyfe/ui/components/shad/ui/badge'
import { Separator } from '@beta-lyfe/ui/components/shad/ui/separator'
import { Link } from '@tanstack/react-router'
import { MainLayout } from '../../../-components/main-layout'

export const Route = createFileRoute(
  '/_app/_dashboard/dashboard/pharmacy/product/$id/'
)({
  component: DrugDetailsPage
})

function DrugDetailsPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedPharmacy, setSelectedPharmacy] = useState('QuickCare Pharmacy')

  const drug = {
    id: 'med-123',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    strength: '10mg',
    form: 'Tablet',
    manufacturer: 'Zydus Pharmaceuticals',
    price: 12.99,
    discountPrice: 9.99,
    prescription: true,
    image: '/images/drug.png',
    description:
      'Lisinopril is used to treat high blood pressure (hypertension) and heart failure. It is also used to improve survival after a heart attack.',
    usage:
      'Take this medication by mouth with or without food as directed by your doctor, usually once daily.',
    sideEffects: ['Dizziness', 'Headache', 'Tiredness', 'Dry cough', 'Nausea'],
    warnings: [
      'Do not use if pregnant or planning to become pregnant',
      'May cause low blood pressure',
      'Contact doctor if experiencing swelling of face, lips, tongue, or throat'
    ],
    stock: 45
  }

  const pharmacies = [
    {
      id: 1,
      name: 'QuickCare Pharmacy',
      address: '123 Health St, Medical District',
      distance: '0.8 miles',
      deliveryTime: '30-45 min',
      deliveryFee: 2.99,
      rating: 4.8
    },
    {
      id: 2,
      name: 'MediExpress',
      address: '456 Wellness Ave, Downtown',
      distance: '1.2 miles',
      deliveryTime: '45-60 min',
      deliveryFee: 1.99,
      rating: 4.6
    },
    {
      id: 3,
      name: 'HealthPoint Pharmacy',
      address: '789 Care Blvd, Northside',
      distance: '2.5 miles',
      deliveryTime: '60-75 min',
      deliveryFee: 0,
      rating: 4.9
    }
  ]

  const incrementQuantity = () => {
    if (quantity < drug.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    console.log(
      `Added ${quantity} of ${drug.name} to cart from ${selectedPharmacy}`
    )
    // Implement actual cart functionality here
  }

  return (
    <div className="md:container py-0 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Left Column - Drug Image */}
        <div className="flex justify-center items-start">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="relative aspect-square">
              <img
                src={drug.image || '/placeholder.svg'}
                alt={drug.name}
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Drug Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">
                {drug.name} {drug.strength}
              </h1>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
            <p className="text-muted-foreground">
              {drug.genericName} • {drug.form}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              By {drug.manufacturer}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              ${drug.discountPrice.toFixed(2)}
            </span>
            {drug.price > drug.discountPrice && (
              <span className="text-muted-foreground line-through">
                ${drug.price.toFixed(2)}
              </span>
            )}
            {drug.price > drug.discountPrice && (
              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                Save ${(drug.price - drug.discountPrice).toFixed(2)}
              </Badge>
            )}
          </div>

          {drug.prescription && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
              <Info className="h-5 w-5" />
              <span>
                Prescription required. Upload your prescription during checkout.
              </span>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Quantity</h2>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 px-3"
                >
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementQuantity}
                  disabled={quantity >= drug.stock}
                  className="h-10 px-3"
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {drug.stock > 10 ? 'In Stock' : `Only ${drug.stock} left`}
              </span>
            </div>

            <Button
              className="w-full h-12 text-base text-white"
              onClick={addToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart - ${(drug.discountPrice * quantity).toFixed(2)}
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            {/* <h2 className="text-lg font-medium">Delivery Options</h2>

            <div className="space-y-3">
              {pharmacies.map((pharmacy) => (
                <Card
                  key={pharmacy.id}
                  className={`cursor-pointer transition-all ${selectedPharmacy === pharmacy.name ? "border-primary" : ""}`}
                  onClick={() => setSelectedPharmacy(pharmacy.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">{pharmacy.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {pharmacy.address} • {pharmacy.distance}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {pharmacy.deliveryTime}
                          </span>
                          <span>
                            {pharmacy.deliveryFee === 0
                              ? "Free Delivery"
                              : `$${pharmacy.deliveryFee.toFixed(2)} Delivery`}
                          </span>
                        </div>
                      </div>
                      <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
                        {selectedPharmacy === pharmacy.name && <div className="h-3 w-3 rounded-full bg-primary" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className=" justify-start border-b rounded-none h-auto p-0 ">
            <TabsTrigger
              value="description"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Usage
            </TabsTrigger>
            <TabsTrigger
              value="sideEffects"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Side Effects
            </TabsTrigger>
            <TabsTrigger
              value="warnings"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
            >
              Warnings
            </TabsTrigger>
          </TabsList>
          <div className="p-4 border rounded-md mt-4">
            <TabsContent value="description" className="mt-0">
              <p>{drug.description}</p>
            </TabsContent>
            <TabsContent value="usage" className="mt-0">
              <p>{drug.usage}</p>
            </TabsContent>
            <TabsContent value="sideEffects" className="mt-0">
              <ul className="list-disc pl-5 space-y-1">
                {drug.sideEffects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="warnings" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Important Warnings</span>
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  {drug.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
