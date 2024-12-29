"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { DeleteIcon } from "@/src/components/icons";
import { IProject } from "@/src/types";
import { toast } from "sonner";
import { useDeleteProject, useGetAllProject } from "@/src/hooks/project";
import Link from "next/link";
import UpdateProject from "@/src/components/modal/UpdateProject";

export const columns = [
  { name: "Image", uid: "image" },
  { name: "Title", uid: "title" },
  { name: "Category", uid: "category" },
  { name: "Demo URL", uid: "demoUrl" },
  { name: "Repo URL", uid: "repoUrl" },
  { name: "Actions", uid: "actions" },
];

export default function Projects() {
  const { data, refetch } = useGetAllProject();
  const { mutate: deleteProject } = useDeleteProject();
  const projectData =
    data?.data?.map((project) => ({
      imageUrls: project.imageUrls,
      title: project.title,
      _id: project?._id,
      demoUrl: project?.demoUrl,
      repoUrl: project?.repoUrl,
      category: project?.category,
    })) || [];

  const handleDelete = (_id: string) => {
    deleteProject(_id, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const renderCell = React.useCallback(
    (project: Partial<IProject>, columnKey: string) => {
      const cellValue = project[columnKey as keyof IProject];

      switch (columnKey) {
        case "image":
          return (
            <User
            //@ts-ignore
              avatarProps={{ radius: "lg", src: project.imageUrls[0] }}
              name=""
            />
          );
        case "demoUrl":
          return (
            <Link
              target="_blank"
              className="underline"
              href={project?.demoUrl!}
            >
              Demo URL
            </Link>
          );
        case "repoUrl":
          return (
            <Link
              target="_blank"
              className="underline"
              href={project?.repoUrl!}
            >
              Repo URL
            </Link>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Tooltip content="Edit project">
                <UpdateProject id={project?._id as string} />
              </Tooltip>
              <Tooltip color="danger" content="Delete project">
                <Button
                  onPress={() => handleDelete(project._id as string)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="p-3">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "end" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={projectData}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof IProject)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
