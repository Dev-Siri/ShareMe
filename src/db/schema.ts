import type { SchemaTypeDefinition } from "sanity";

import comment from "./schemas/comment";
import pin from "./schemas/pin";
import postedBy from "./schemas/postedBy";
import save from "./schemas/save";
import user from "./schemas/user";

const schemaTypes: SchemaTypeDefinition[] = [
  user,
  pin,
  comment,
  postedBy,
  save,
];

export default schemaTypes;
