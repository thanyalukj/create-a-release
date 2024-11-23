/**
 * The entrypoint for the action.
 */
import { run } from './main'

run().catch( error => {
    console.error(error)
    process.exit(1)
})

