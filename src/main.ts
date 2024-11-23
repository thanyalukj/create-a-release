/* eslint-disable @typescript-eslint/no-explicit-any */
import * as core from '@actions/core'
import { context } from '@actions/github'
import { Octokit } from '@octokit/rest'
import * as fs from 'fs'

interface ReleaseParams {
  owner: string
  repo: string
  tag: string
  releaseName: string
  body: string
  draft: boolean
  prerelease: boolean
  commitish: string
  generate_release_notes: boolean
  bodyFileContent: string | null
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const octokit = getOctokit()
    const {
      owner,
      repo,
      tag,
      releaseName,
      body,
      draft,
      prerelease,
      commitish,
      generate_release_notes,
      bodyFileContent
    } = getInputs()
    const createReleaseResponse = await octokit.rest.repos.createRelease({
      owner,
      repo,
      tag_name: tag,
      name: releaseName,
      body: bodyFileContent || body,
      draft,
      prerelease,
      target_commitish: commitish,
      generate_release_notes: generate_release_notes
    })

    const {
      data: { id: releaseId, html_url: htmlUrl, upload_url: uploadUrl }
    } = createReleaseResponse
    core.setOutput('id', releaseId)
    core.setOutput('html_url', htmlUrl)
    core.setOutput('upload_url', uploadUrl)
  } catch (error) {
    handleError(error)
  }
}

function getOctokit(): Octokit {
  return new Octokit({
    auth: `token ${process.env.GITHUB_TOKEN}`
  })
}

function getInputs(): ReleaseParams {
  const { owner: currentOwner, repo: currentRepo } = context.repo
  const tagName = core.getInput('tag_name', { required: true })
  const tag = tagName.replace('refs/tags/', '')
  const releaseName = core
    .getInput('release_name', { required: false })
    .replace('refs/tags/', '')
  const body = core.getInput('body', { required: false })
  const draft = 'true' === core.getInput('draft', { required: false })
  const prerelease = 'true' === core.getInput('prerelease', { required: false })
  const commitish =
    core.getInput('commitish', { required: false }) || context.sha
  const bodyPath = core.getInput('body_path', { required: false })
  const generate_release_notes =
    'true' === core.getInput('generate_release_notes', { required: false })
  const owner = core.getInput('owner', { required: false }) || currentOwner
  const repo = core.getInput('repo', { required: false }) || currentRepo
  let bodyFileContent = null
  if ('' !== bodyPath && !!bodyPath) {
    try {
      bodyFileContent = fs.readFileSync(bodyPath, { encoding: 'utf8' })
    } catch (error) {
      handleError(error)
    }
  }
  return {
    owner,
    repo,
    tag,
    releaseName,
    body,
    draft,
    prerelease,
    commitish,
    generate_release_notes,
    bodyFileContent
  }
}

function handleError(error: any): void {
  if (error instanceof Error) {
    core.setFailed(error.message)
  } else {
    core.setFailed(String(error))
  }
}
