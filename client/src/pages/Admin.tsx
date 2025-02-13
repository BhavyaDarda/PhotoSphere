import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPhotoSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlowingButton from "@/components/GlowingButton";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(insertPhotoSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      categoryId: undefined,
      metadata: {
        camera: "",
        lens: "",
        aperture: "",
        shutterSpeed: "",
        iso: "",
        location: "",
        date: "",
      }
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setUploadedImage(data.url);
      form.setValue("imageUrl", data.url);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      // Convert categoryId to number before sending
      const formData = {
        ...data,
        categoryId: data.categoryId ? parseInt(data.categoryId) : undefined
      };
      return apiRequest("POST", "/api/photos", formData);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Photo added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      form.reset();
      setUploadedImage(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen pt-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="font-playfair text-4xl text-center">Photo Management</h1>

          <div className="glass-effect p-8 rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-black/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-black/50 min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-black/50">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Nature</SelectItem>
                          <SelectItem value="2">Architecture</SelectItem>
                          <SelectItem value="3">Portraits</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Photo Metadata */}
                <div className="space-y-4">
                  <h3 className="text-lg font-playfair">Photo Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="metadata.camera"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Camera</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-black/50" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="metadata.lens"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lens</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-black/50" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="metadata.aperture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aperture</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-black/50" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="metadata.shutterSpeed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shutter Speed</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-black/50" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <FormLabel>Photo Upload</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-black/50"
                  />
                  {uploadedImage && (
                    <div className="mt-4">
                      <img
                        src={uploadedImage}
                        alt="Preview"
                        className="max-w-[200px] rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <GlowingButton
                    type="submit"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Adding Photo..." : "Add Photo"}
                  </GlowingButton>
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}