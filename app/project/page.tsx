"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Modal from "../components/modal/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import axios from "axios";
import { useRouter } from "next/navigation";

type ProjectType = {
  id: string;
  name: string;
  description: string;
};

export default function Project() {
  const { data: session } = useSession();
  const router = useRouter();

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  useEffect(() => {
    if (session) {
      fetchProjects();
    }
  }, [session]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.project_list) {
        setProjects(data.project_list);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const viewProject = async (project : ProjectType)=>{
    router.push(`/project/${project.id}`)
    console.log(project)
    
  }

  const handleSaveProject = async (data: { id?: string; name: string; description?: string }) => {
    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const response = await res.json();

        setProjects((prev) =>
          prev.map((proj) => (proj.id === response.updatedProject.id ? response.updatedProject : proj))
        );
      } else {
        
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const newProject = await res.json();
        setProjects((prevProjects) => [...prevProjects, newProject.project]);
      }
    } catch (err) {
      console.error("Error saving project:", err);
    } finally {
      setIsModalOpen(false);
      setEditingProject(null);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/projects/${deleteProjectId}`);
      setProjects((prev) =>
        prev.filter((proj) => proj.id !== deleteProjectId) 
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteProjectId(null);
    }
  };
  
  

  const handleEditModal = (project: ProjectType) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };
  const deleteModal = (project : ProjectType )=>{
    setIsDeleteModalOpen(true)
    setDeleteProjectId(project.id)
    
  }

  return (
    <div>
      {session ? (
        <div>
          <div className="flex flex-col items-center justify-center text-white">
            <div className="w-[75%] px-4 sm:px-6 lg:px-8">
              <div className="flex w-full text-right justify-between items-end py-4">
                <h1 className="text-3xl">Your Projects:</h1>
                <Button onClick={() => setIsModalOpen(true)} className="text-xl">
                  Add Project
                </Button>
              </div>
              <div className="py-4">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex justify-between items-center my-4 bg-white text-black font-bold text-xl tracking-wider rounded-md hover:bg-sky-700"
                    >
                      <div className="w-[80%] hover:text-[#ff8433] cursor-pointer p-4" onClick={()=> viewProject(project)} ><span>{project.name}</span></div>
                      
                      <div className="p-4">
                        <button className="mr-6" onClick={() => handleEditModal(project)}>
                          <Edit className="hover:text-[#ff8433] transition duration-200" />
                        </button>
                        <button onClick={() => deleteModal(project)}>
                          <DeleteIcon className="hover:text-[#ff8433] transition duration-200" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No projects found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingProject(null);
            }}
            onSubmit={handleSaveProject}
            initialData={editingProject}
          />

            <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setDeleteProjectId(null);
            }}
            onYes={handleDelete}
          />


        </div>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
}

