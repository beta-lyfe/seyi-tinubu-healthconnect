import { openapiToTsJsonSchema } from 'openapi-ts-json-schema'

await openapiToTsJsonSchema({
  openApiSchema: '../docs-api/src/spec/openapi.yaml',
  definitionPathsToGenerateFrom: ['paths', 'components.schemas'],
  outputPath: './schema'
})
