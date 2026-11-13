// The fetch mutator returns raw SSE text; parsed events belong to iterRenderEvents.
export default function sdkWireSpec(spec) {
  const wireSpec = structuredClone(spec);
  for (const item of Object.values(wireSpec.paths ?? {})) {
    for (const operation of Object.values(item ?? {})) {
      for (const response of Object.values(operation?.responses ?? {})) {
        const stream = response?.content?.["text/event-stream"];
        if (stream) stream.schema = { type: "string" };
      }
    }
  }
  return wireSpec;
}
