import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectValidator } from "../../lib/validator/projectValidator";
import Button from "../button/Button";

interface ProjectFormData {
  id?: string;
  name: string;
  description?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  initialData?: ProjectFormData | null;
}

export default function Modal({ isOpen, onClose, onSubmit, initialData }: ModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectValidator),
    defaultValues: initialData || { name: "", description: "" },
  });

  useEffect(() => {
    reset(initialData || { name: "", description: "" });
  }, [initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-[40%] shadow-lg">
        <h2 className="text-center text-3xl pb-5 text-[#ff8433]">
          {initialData ? "Edit Project" : "Add New Project"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4 text-xl text-[#ff8433]">
            <label htmlFor="name">Project Name</label>
            <input
              id="name"
              {...register("name")}
              placeholder="Enter project name"
              className="border p-2 my-2 w-full text-gray-600"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="my-4 text-xl text-[#ff8433]">
            <label htmlFor="description">Project Description</label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Enter project description"
              className="border p-2 my-2 w-full h-[250px] text-gray-600"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="flex text-xl justify-center">
            <Button onClick={onClose} className="mr-2">
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update Project" : "Add Project"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}