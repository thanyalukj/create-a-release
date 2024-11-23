/**
 * The entrypoint for the test action.
 */
import { run } from './test-action'

run().catch(error => {
  console.error(error)
  process.exit(1)
})
