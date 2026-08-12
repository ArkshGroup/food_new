"use client";

import React from "react";

import type z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Upload, X, GripVertical, ImageIcon } from "lucide-react";
import { productImageValidationSchema } from "../../_validation/products.validation";
import { isImageFile } from "@/lib/handle-upload";
import { toast } from "sonner";

interface ImageItem {
  id?: string;
  file: File | string;
  sortOrder: number;
  isImageRemoved?: boolean;
  tempId: string; // for internal tracking
}

const ProductImagePreview = ({ file, alt }: { file: File | string; alt: string }) => {
  const [previewUrl, setPreviewUrl] = React.useState("");

  React.useEffect(() => {
    if (typeof file === "string") {
      setPreviewUrl(file);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!previewUrl) {
    return null;
  }

  return (
    <img
      src={previewUrl}
      alt={alt}
      className="w-full h-full object-cover"
    />
  );
};

export const ImageUploadContainer = ({
  productImages,
  setProductImages,
}: {
  productImages: Array<z.infer<typeof productImageValidationSchema>>;
  setProductImages: React.Dispatch<
    React.SetStateAction<Array<z.infer<typeof productImageValidationSchema>>>
  >;
}) => {
  const [images, setImages] = React.useState<ImageItem[]>(() =>
    productImages.map((img) => ({
      ...img,
      id: img.id !== undefined ? String(img.id) : undefined,
      file: img.file || "", // Ensure file is never undefined
      tempId:
        img.id !== undefined
          ? String(img.id)
          : Math.random().toString(36).substr(2, 9),
    }))
  );
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const formData = images.map((img) => ({
      id: img.id,
      file: img.file,
      sortOrder: img.sortOrder,
      isImageRemoved: img.isImageRemoved || false,
    }));
    setProductImages(formData);
  }, [images, setProductImages]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!isImageFile(file)) {
        toast.error(`"${file.name}" is not a supported image file.`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(`"${file.name}" is larger than 5 MB.`);
        return;
      }

      setImages((prev) => {
        const newImage: ImageItem = {
          file,
          sortOrder: prev.filter((img) => !img.isImageRemoved).length,
          tempId: Math.random().toString(36).substr(2, 9),
          isImageRemoved: false,
        };

        return [...prev, newImage];
      });
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeImage = (tempId: string) => {
    setImages((prev) => {
      const updated = prev.map((img) =>
        img.tempId === tempId
          ? { ...img, isImageRemoved: true } // Mark as removed instead of filtering
          : img
      );
      // Reorder remaining non-removed images
      const activeImages = updated.filter((img) => !img.isImageRemoved);
      return updated.map((img) => {
        if (img.isImageRemoved) return img;
        const activeIndex = activeImages.findIndex(
          (active) => active.tempId === img.tempId
        );
        return { ...img, sortOrder: activeIndex };
      });
    });
  };

  const updateSortOrder = (tempId: string, newSortOrder: number) => {
    setImages((prev) => {
      const updated = prev.map((img) =>
        img.tempId === tempId ? { ...img, sortOrder: newSortOrder } : img
      );
      return updated.sort((a, b) => a.sortOrder - b.sortOrder);
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleImageDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const activeImages = images.filter((img) => !img.isImageRemoved);
    const sortedImages = [...activeImages].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    const draggedImage = sortedImages[draggedIndex];
    const newImages = [...sortedImages];

    // Remove dragged item and insert at new position
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);

    // Update sort orders for active images
    const reorderedImages = newImages.map((img, index) => ({
      ...img,
      sortOrder: index,
    }));

    // Update the full images array
    setImages((prev) => {
      return prev.map((img) => {
        if (img.isImageRemoved) return img;
        const reordered = reorderedImages.find((r) => r.tempId === img.tempId);
        return reordered || img;
      });
    });
    setDraggedIndex(null);
  };

  const activeImages = images.filter((img) => !img.isImageRemoved);
  const sortedImages = activeImages.sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        )}
      >
        <CardContent className="p-8">
          <div
            className="flex flex-col items-center justify-center text-center space-y-4"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="p-4 rounded-full bg-muted">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload Product Images</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your images here, or click to browse
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Choose Images
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.heic,.heif"
              className="hidden"
              onChange={(e) => {
                handleFileSelect(e.target.files);
                e.target.value = "";
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Grid */}
      {sortedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Uploaded Images</h4>
            <Badge variant="secondary">
              {sortedImages.length} image{sortedImages.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedImages.map((img, index) => (
              <Card
                key={img.tempId}
                className={cn(
                  "group relative overflow-hidden transition-all duration-200",
                  draggedIndex === index && "opacity-50 scale-95"
                )}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleImageDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <ProductImagePreview
                      file={img.file}
                      alt={`Product Image ${index + 1}`}
                    />

                    {/* Overlay Controls */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        title="Drag to reorder"
                      >
                        <GripVertical className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0"
                        onClick={() => removeImage(img.tempId)}
                        title="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Sort Order Badge */}
                    <Badge
                      className="absolute top-2 left-2 h-6 w-6 p-0 flex items-center justify-center text-xs"
                      variant="default"
                    >
                      {img.sortOrder + 1}
                    </Badge>
                  </div>

                  {/* Sort Order Input */}
                  <div className="p-3 border-t">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Order:
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max={sortedImages.length - 1}
                        value={img.sortOrder}
                        onChange={(e) => {
                          const newOrder = Number.parseInt(e.target.value, 10);
                          if (
                            !isNaN(newOrder) &&
                            newOrder >= 0 &&
                            newOrder < sortedImages.length
                          ) {
                            updateSortOrder(img.tempId, newOrder);
                          }
                        }}
                        className="w-20 h-8 text-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
