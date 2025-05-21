import { create } from 'zustand'

type ProjectStoreProps = {}
type ProjectStoreActions = {}
type ProjectStoreState = ProjectStoreProps & ProjectStoreActions

const useProjectStore = create<ProjectStoreState>((set) => ({}))