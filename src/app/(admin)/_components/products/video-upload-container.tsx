"use client";

import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateProductDTO } from "../../_validation/products.validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, X, Video, ImageIcon } from "lucide-react";

const VideoUploadContainer = ({
  form,
}: {
  form: UseFormReturn<CreateProductDTO>;
}) => {
  const removeField = (field: keyof CreateProductDTO) => {
    form.setValue(field, "" as any, { shouldValidate: true });
  };

  return (
    <div className="space-y-6">
      {/* YouTube URL Input */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" /> YouTube Video URL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Input
              type="url"
              placeholder="Enter YouTube video URL"
              value={form.watch("videoUrl") || ""}
              onChange={(e) =>
                form.setValue("videoUrl", e.target.value, {
                  shouldValidate: true,
                })
              }
            />
            {form.watch("videoUrl") && (
              <div className="relative w-full max-w-md">
                <iframe
                  className="w-full aspect-video rounded-lg"
                  src={form
                    .watch("videoUrl")
                    ?.replace("watch?v=", "embed/")
                    ?.replace("shorts/", "embed/")}
                  title="YouTube preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeField("videoUrl")}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoUploadContainer;
