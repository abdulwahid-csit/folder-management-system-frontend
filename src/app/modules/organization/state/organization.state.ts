import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface Organization {
  id: number;
  name: string;
  domain: string;
  status: string;
  application_count: number;
  user_count: number;
  created_at: string;
  logo: string;
}

export interface OrganizationStateModel {
    organizations: Organization[];
}

export class AddOrganization {
  static readonly type = '[Organization] Add';
  constructor(public payload: Organization) {}
}

@State<OrganizationStateModel>({
  name: 'organization',
  defaults: {
    organizations: []
  }
})
export class OrganizationState {
  @Selector()
  static getOrganizations(state: OrganizationStateModel) {
    return state.organizations;
  }

  @Action(AddOrganization)
  addUser({ getState, patchState }: StateContext<OrganizationStateModel>, { payload }: AddOrganization) {
    const state = getState();
    patchState({
        organizations: [...state.organizations, payload]
    });
  }
}
