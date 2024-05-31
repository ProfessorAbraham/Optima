import React from "react";
import useFetchProjects from "../../../../hooks/useFetchProjects";
import ProjectListItem from "./ProjectListItem";

const ProjectList = () => {
  const { data, error, isLoading } = useFetchProjects();
  if (isLoading)
    return (
      <div className="flex w-full justify-center mt-10">
        <span className="loading loading-dots loading-lg"></span>{" "}
      </div>
    );

  if (error) {
    return (
      <div role="alert" className="alert alert-error mt-10 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Couldn't load Project</span>
      </div>
    );
  }

  if (data) {
    return (
      <div className="">
        <ul className="px-3">
          {data.myProjects.map((project) => (
            <li key={project.projectId}>
              <ProjectListItem project={project}></ProjectListItem>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default ProjectList;
