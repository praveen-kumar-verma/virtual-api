"use client";
import NewResourceModal from "@/app/components/modal/NewResourceModal";
// import Button from "../../components/button/Button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProjectDetail {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: string | number | boolean | object | undefined;
}

export default function ViewSpecificProject() {
  const { data: session } = useSession();
  const params = useParams();

  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  // const [isResourceModalOpen, setIsResourceModalOpen] =
  //   useState<boolean>(false);

  useEffect(() => {
    if (session && params.id) {
      fetchDetails(params.id as string);
    }
  }, [session, params.id]);

  const fetchDetails = async (id: string) => {
    try {
      setLoading(true);
      const url = `/api/projects/${id}`;
      const res = await axios.get<{ detail: ProjectDetail }>(url);
      setProjectDetail(res.data.detail);
    } catch (error) {
      console.error("Error fetching project details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!projectDetail) {
    return <p>No project details found.</p>;
  }

  // const openResource = () => {
  //   console.log("hhaha")
  //   setIsResourceModalOpen(true);
  // };
  // const newResource = () => {
  //   console.log("haha");
  //   setIsResourceModalOpen(false);
  // };

  return (
    <div>
      <h1 className="text-white">Project Details</h1>
      <ul className="text-white">
        {Object.entries(projectDetail).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {value !== null && typeof value === "object"
              ? JSON.stringify(value, null, 2)
              : String(value)}
          </li>
        ))}
      </ul>
{/* 
      <Button onClick={() => openResource()} className="text-xl">
        New Resource
      </Button> */}

      <NewResourceModal

      />
    </div>
  );
}
