import appHandlers from "./app"
import projectHandlers from "./project"
import metadataHandlers from "./metadata"
const handlers={
  ...appHandlers,
  ...projectHandlers,
  ...metadataHandlers
}

export default handlers;