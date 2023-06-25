import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import comment from "./comment";
import pin from "./pin";
import postedBy from "./postedBy";
import save from "./save";
import user from "./user";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([user, pin, comment, postedBy, save]),
});
