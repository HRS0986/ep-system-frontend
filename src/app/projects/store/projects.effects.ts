import { Injectable } from "@angular/core";
import { ProjectService } from "../../services/projects.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, distinctUntilChanged, EMPTY, map, mergeMap, of, withLatestFrom } from "rxjs";
import { ProjectActions } from "./projects.actions";
import { Store } from "@ngrx/store";
import { ProjectsState } from "./projects.state";
import { projectsSelector } from "./projects.selectors";

@Injectable()
export class ProjectsEffects {

    constructor(private actions$: Actions, private projectService: ProjectService, private store: Store<ProjectsState>) {
    }

    getAllProjects$ = createEffect(() => this.actions$.pipe(
        ofType(ProjectActions.get_all),
        withLatestFrom(this.store.select(projectsSelector)),
        distinctUntilChanged(),
        mergeMap(([_, projectsData]) => {
            if (!projectsData.length){
                return this.projectService.GetAllProjects()
                    .pipe(
                        map(projectsData => ProjectActions.get_all_success({ projects: projectsData })),
                        catchError((error) => of(ProjectActions.get_all_failed({error: error})))
                    )
            }else{
                return of(ProjectActions.get_all_success({ projects: projectsData }))
            }
        })
    ));

}
