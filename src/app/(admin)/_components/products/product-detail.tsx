"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  DollarSign,
  BarChart3,
  Calendar,
  Tag,
  ImageIcon,
  Settings,
  CornerUpLeftIcon,
  EditIcon,
} from "lucide-react";
import { IGetProductById } from "../../types/products.d";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatToNPR } from "@/helper/format-npr";

interface ProductDetailProps {
  product: IGetProductById;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const discountAmount = product.unitSellingPrice - product.specialPrice;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className=" flex justify-end gap-2">
        <Link href="/admin/products">
          <Button variant="secondary" className="mb-4">
            <CornerUpLeftIcon />
            Back to Products
          </Button>
        </Link>
        <Link href={`${product.id}/edit`}>
          <Button variant="secondary" className="mb-4">
            <EditIcon className="w-4 h-4" />
            Edit Product
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product image display */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Product Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                <Image
                  src={
                    product.images[selectedImage]?.imageUrl ||
                    "/placeholder.svg?height=300&width=300&query=coconut biscuit package" ||
                    "/placeholder.svg"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                      selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      height={64}
                      width={64}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product information display */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Product Name</Label>
                  <p className="text-sm font-medium mt-1">{product.name}</p>
                </div>
                <div>
                  <Label>Slug</Label>
                  <p className="text-sm font-medium mt-1">
                    {product.slug || "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Pricing & Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Unit Price ({product.currency})</Label>
                  <p className="text-lg font-bold mt-1">
                    {formatToNPR(product.unitSellingPrice)}
                  </p>
                </div>
                <div>
                  <Label>Discount Amount</Label>
                  <p className="text-lg font-bold mt-1">
                    {formatToNPR(discountAmount)}
                  </p>
                </div>
                <div>
                  <Label>Final Price</Label>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    {formatToNPR(product.specialPrice)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Stock Quantity</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Package className="w-4 h-4 text-green-500" />
                    <span className="font-medium">
                      {product.stockQuantity} units
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Weight (g)</Label>
                  <p className="text-sm font-medium mt-1">
                    {product.approxWeight}g
                  </p>
                </div>
                <div>
                  <Label>Unit</Label>
                  <p className="text-sm font-medium mt-1">{product.unit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Product Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={product.isVisible ? "outline" : "destructive"}
                  >
                    Visible:{product.isVisible ? "Visible" : "Hidden"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={product.isFeatured ? "default" : "secondary"}>
                    {product.isFeatured ? "Featured" : "Not Featured"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={product.onSale ? "default" : "secondary"}>
                    Product On Sale: {product.onSale ? "On Sale" : "Regular"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={product.isNewProduct ? "default" : "secondary"}
                  >
                    New Product: {product.isNewProduct ? "New" : "Not New"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics & Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Created</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {product.createdAt
                        ? new Date(product.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Last Updated</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {product.updatedAt
                        ? new Date(product.updatedAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Meta Title</Label>
                <p className="text-sm mt-1">{product.metaTitle}</p>
              </div>

              <div>
                <Label>Meta Description</Label>
                <p className="text-sm mt-1">{product.metaDescription}</p>
              </div>

              <div>
                <Label>Meta Keywords</Label>
                <p className="text-sm mt-1">{product.metaKeywords}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
