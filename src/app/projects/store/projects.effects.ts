import { Injectable } from "@angular/core";
import { ProjectService } from "../../services/projects.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap } from "rxjs";
import { ProjectActions } from "./projects.actions";

@Injectable()
export class ProjectsEffects {

    constructor(private actions$: Actions, private projectService: ProjectService) { }

    getAllProjects = createEffect(() => this.actions$.pipe(
        ofType(ProjectActions.get_all),
        mergeMap(() => {
            return this.projectService.GetAllProjects()
                .pipe(
                    map(projectsData => ProjectActions.get_all_success({projects: projectsData})),
                    catchError(() => EMPTY)
                )
        })
    ));

}
