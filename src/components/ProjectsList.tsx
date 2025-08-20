import Project from './Project';
import { getAllProjects } from '../data/projects';

export default function ProjectsList() {
    const projects = getAllProjects();

    return (
        <div>
            {projects.map((project) => (
                <Project key={project.id} {...project} description2={project.description2 || ''} />
            ))}
        </div>
    );
}
