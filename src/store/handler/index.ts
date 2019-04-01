import appHandlers from "./app"
import projectHandlers from "./project"
const handlers={
  ...appHandlers,
  ...projectHandlers
}

export default handlers;