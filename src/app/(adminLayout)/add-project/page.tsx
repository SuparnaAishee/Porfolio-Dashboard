"use client";

import React from "react";
import { Form } from "@nextui-org/form";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner"; // Toast notification library
import { useAddProject, useGetAllProject } from "@/src/hooks/project";
import { IProject } from "@/src/types";

export default function AddProject() {
  const { mutate } = useAddProject(); // Mutation hook to add a project
  const { refetch } = useGetAllProject(); // Hook to refetch all projects
  const { handleSubmit, register, reset } = useForm<IProject>(); // Form management with react-hook-form

  const handleProjectSubmit = (values: IProject) => {
    // Destructure and prepare form data
    const { imageUrls, techStack, repoUrl, ...restData } = values;

    // Format data to match API structure
    const formData = {
      ...restData,
      imageUrls: imageUrls.split(",").map((url) => url.trim()), // Convert to array
      techStack: techStack.split(",").map((tech) => tech.trim()), // Convert to array
      repoUrl: repoUrl?.split(",").map((url) => url.trim()), // Convert to array
    };

    console.log("Submitted Data:", formData);

    // Call mutate function for API submission
    mutate(formData, {
      onSuccess(data) {
        if (data?.success) {
          refetch(); // Refetch project list
          reset(); // Reset form inputs
          toast.success(data?.message || "Project added successfully!");
        } else {
          console.error("Server Error:", data?.message);
          toast.error(data?.message || "Failed to add project");
        }
      },
      onError(error: any) {
        console.error("Error adding project:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "Failed to add project";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="h-full w-full">
      <Form
        onSubmit={handleSubmit(handleProjectSubmit)}
        className="w-full p-10 rounded-md flex flex-col gap-4"
      >
        {/* Form Fields */}
        <Input
          {...register("title", { required: true })}
          label="Title"
          placeholder="Enter Project Title"
          type="text"
        />
        <Textarea
          {...register("description", { required: true })}
          label="Description"
          placeholder="Enter Project Description"
        />
        <Textarea
          {...register("subDescription")}
          label="SubDescription"
          placeholder="Enter Project SubDescription (optional)"
        />
        <Input
          {...register("techStack", { required: true })}
          label="Tech Stack"
          placeholder="Enter Tech Stack (comma-separated)"
          type="text"
        />
        <Input
          {...register("category", { required: true })}
          label="Category"
          placeholder="Enter Project Category"
          type="text"
        />
        <Input
          {...register("demoUrl")}
          label="Demo URL"
          placeholder="Enter Demo URL (optional)"
          type="text"
        />
        <Textarea
          {...register("repoUrl")}
          label="Repository URLs"
          placeholder="Enter Repository URLs (comma-separated, optional)"
        />
        <Input
          {...register("imageUrls", { required: true })}
          label="Image URLs"
          placeholder="Enter Image URLs (comma-separated)"
          type="text"
        />

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="reset" variant="flat">
            Reset
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      {/* Toast Notifications */}
      <Toaster position="top-right" /> {/* Ensure toast messages appear */}
    </div>
  );
}
