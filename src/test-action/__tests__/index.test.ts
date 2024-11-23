/**
 * Unit tests for the action's entrypoint, src/index.ts
 */

import * as testAction from '../test-action'

// Mock the action's entrypoint
const runMock = jest.spyOn(testAction, 'run').mockImplementation()

describe('index', () => {
  it('calls run when imported', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../index')

    expect(runMock).toHaveBeenCalled()
  })
})
