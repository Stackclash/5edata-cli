import { Octokit } from 'octokit'

interface OctokitResponse {
  download_url: string
  name: string
  path: string
  type: string
  url: string
}

export class GitHubFile {
  content: string
  filename: string
  path: string
  url: string

  constructor(filename: string, path: string, url: string, content: string) {
    this.filename = filename
    this.url = url
    this.content = content
    this.path = path
  }

  toJson() {
    try {
      return JSON.parse(this.content)
    } catch {
      return null
    }
  }
}

export class GitHubClient {
  private octokit: Octokit

  constructor(octokit?: Octokit) {
    this.octokit = octokit || new Octokit()
  }

  async fetchGitHubDirectoryContent(owner: string, repo: string, path?: string, ref?: string): Promise<GitHubFile[]> {
    const result: GitHubFile[] = []
    const directoryInfo = await this.fetchGitHubDirectoryInfo(owner, repo, path, ref)

    // Handle single file response
    if (!Array.isArray(directoryInfo)) {
      if (directoryInfo.type === 'file' && directoryInfo.download_url) {
        const content = await this.fetchGitHubFileContent(directoryInfo.download_url)
        result.push(new GitHubFile(directoryInfo.name, directoryInfo.path, directoryInfo.url, content))
      }

      return result
    }

    // Handle directory with multiple items - process in parallel
    const filePromises: Promise<GitHubFile>[] = []
    const dirPromises: Promise<GitHubFile[]>[] = []

    for (const item of directoryInfo) {
      if (item.type === 'file' && item.download_url) {
        filePromises.push(
          this.fetchGitHubFileContent(item.download_url).then(
            (content) => new GitHubFile(item.name, item.path, item.url, content),
          ),
        )
      } else if (item.type === 'dir') {
        // Recursively fetch subdirectory contents
        dirPromises.push(this.fetchGitHubDirectoryContent(owner, repo, item.path, ref))
      }
    }

    // Wait for all file contents and subdirectories
    const files = await Promise.all(filePromises)
    const subDirectoryResults = await Promise.all(dirPromises)

    result.push(...files)
    for (const subDirFiles of subDirectoryResults) {
      result.push(...subDirFiles)
    }

    return result
  }

  async fetchGitHubDirectoryInfo(
    owner: string,
    repo: string,
    path?: string,
    ref?: string,
  ): Promise<OctokitResponse | OctokitResponse[]> {
    const response = await this.octokit.rest.repos.getContent({
      owner,
      path: path || '',
      ref: ref || 'refs/heads/main',
      repo,
    })
    return response.data as unknown as OctokitResponse
  }

  async fetchGitHubFileContent(url: string): Promise<string> {
    const response = await this.octokit.request(`GET ${url}`, {
      headers: {
        Accept: 'application/vnd.github.raw+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    return response.data as string
  }
}
