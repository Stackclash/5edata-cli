/* eslint-disable camelcase */
import { expect } from 'chai'
import { afterEach, beforeEach } from 'mocha'
import { SinonStub, stub } from 'sinon'

import { GitHubClient, GitHubFile } from '../../src/clients/github.js'

const mockOctokit = {
  request: stub(),
  rest: {
    repos: {
      getContent: stub(),
    },
  },
}

describe('GitHub Client', () => {
  beforeEach(() => {
    ;(mockOctokit.request as SinonStub).reset()
    ;(mockOctokit.rest.repos.getContent as SinonStub).reset()
  })

  afterEach(() => {
    ;(mockOctokit.request as SinonStub).reset()
    ;(mockOctokit.rest.repos.getContent as SinonStub).reset()
  })

  describe('GitHubFile', () => {
    it('creates an instance with correct properties', () => {
      const file = new GitHubFile('test.txt', 'path/to/test.txt', 'http://example.com/test.txt', 'file content')
      expect(file.filename).to.equal('test.txt')
      expect(file.path).to.equal('path/to/test.txt')
      expect(file.url).to.equal('http://example.com/test.txt')
      expect(file.content).to.equal('file content')
    })
  })

  describe('GitHubClient', () => {
    describe('fetchGitHubDirectoryInfo', () => {
      it('fetches directory info from GitHub', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const client = new GitHubClient(mockOctokit as any)
        const mockResponse = {
          data: [
            {
              download_url: 'http://example.com/file1.txt',
              name: 'file1.txt',
              path: 'file1.txt',
              type: 'file',
              url: 'http://example.com/file1.txt',
            },
          ],
        }
        ;(mockOctokit.rest.repos.getContent as SinonStub).resolves(mockResponse)

        const result = await client.fetchGitHubDirectoryInfo('owner', 'repo', 'path', 'ref')
        expect((mockOctokit.rest.repos.getContent as SinonStub).calledOnce).to.be.true
        expect(result).to.deep.equal(mockResponse.data)
      })
    })

    describe('fetchGitHubFileContent', () => {
      it('fetches file content from a URL', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const client = new GitHubClient(mockOctokit as any)
        const mockContent = 'file content'
        ;(mockOctokit.request as SinonStub).resolves({ data: mockContent })

        const result = await client.fetchGitHubFileContent('http://example.com/file.txt')
        expect((mockOctokit.request as SinonStub).calledOnce).to.be.true
        expect(result).to.equal(mockContent)
      })
    })

    describe('fetchGitHubDirectoryContent', () => {
      it('fetches directory content including files and subdirectories', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const client = new GitHubClient(mockOctokit as any)

        const mockDirResponse = {
          data: [
            {
              download_url: 'http://example.com/file1.txt',
              name: 'file1.txt',
              path: 'file1.txt',
              type: 'file',
              url: 'http://example.com/file1.txt',
            },
          ],
        }
        ;(mockOctokit.rest.repos.getContent as SinonStub).resolves(mockDirResponse)
        ;(mockOctokit.request as SinonStub).resolves({ data: 'file content' })

        const result = await client.fetchGitHubDirectoryContent('owner', 'repo', 'path', 'ref')
        expect((mockOctokit.rest.repos.getContent as SinonStub).calledOnce).to.be.true
        expect(result).to.have.lengthOf(1)
        expect(result[0]).to.be.instanceOf(GitHubFile)
        expect(result[0].filename).to.equal('file1.txt')
      })
    })
  })
})
